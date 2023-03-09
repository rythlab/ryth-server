import path from 'path'
import { getSegmentsDuration } from '../tracks/segmentDuration'
import {
  removeTrackFolder,
  saveFileToIPFSFromFS
} from '../../../config/filesystem/manager'
import { segment, transcode320 } from '../../../queue-jobs/TranscodingQueue'
import Upload from '../../../models/upload'
const SaveFileToIPFSConcurrencyLimit = 10

const trackContentUpload = async (
  requestProps: {
    fileDir: string
    fileName: any
    fileDestination: any
  },
  ipfs: any
) => {
  const routeTimeStart = Date.now()
  let codeBlockTimeStart
  // const cnodeUserUUID = requestProps.session.cnodeUserUUID

  // Create track transcode and segments, and save all to disk
  let transcodedFilePath
  let segmentFilePaths
  try {
    codeBlockTimeStart = Date.now()
    console.log('transcode----------------------started')
    const transcode = await Promise.all([
      segment(requestProps.fileDir, requestProps.fileName),
      transcode320(requestProps.fileDir, requestProps.fileName)
    ])
    console.log('transcode----------------------completed', transcode)

    // @ts-ignore
    segmentFilePaths = transcode[0].filePaths
    // @ts-ignore
    transcodedFilePath = transcode[1].filePath

    console.log(
      `Time taken in /track_content_async to re-encode track file: ${
        Date.now() - codeBlockTimeStart
      }ms for file ${requestProps.fileName}`
    )
  } catch (err) {
    console.log('Prune upload artifacts', err)
    // Prune upload artifacts
    removeTrackFolder(requestProps.fileDir)

    throw new Error(err.toString())
  }

  // Save transcode and segment files (in parallel) to ipfs and retrieve multihashes
  codeBlockTimeStart = Date.now()
  console.log(transcodedFilePath, 'saveFileToIPFSFromFS')
  const transcodeFileIPFSResp = await saveFileToIPFSFromFS(
    // requestProps.session.cnodeUserUUID,
    transcodedFilePath,
    ipfs
  )

  let segmentFileIPFSResps: any[] = []
  for (
    let i = 0;
    i < segmentFilePaths.length;
    i += SaveFileToIPFSConcurrencyLimit
  ) {
    const segmentFilePathsSlice = segmentFilePaths.slice(
      i,
      i + SaveFileToIPFSConcurrencyLimit
    )

    const sliceResps = await Promise.all(
      segmentFilePathsSlice.map(async (segmentFilePath: string) => {
        const segmentAbsolutePath = path.join(
          requestProps.fileDir,
          'segments',
          segmentFilePath
        )
        const { multihash, dstPath } = await saveFileToIPFSFromFS(
          // { logContext: requestProps.logContext },
          // requestProps.session.cnodeUserUUID,
          segmentAbsolutePath,
          ipfs
        )
        return { multihash, srcPath: segmentFilePath, dstPath }
      })
    )

    segmentFileIPFSResps = segmentFileIPFSResps.concat(sliceResps)
  }
  console.log(
    `Time taken in /track_content_async for saving transcode + segment files to IPFS: ${
      Date.now() - codeBlockTimeStart
    }ms for file ${requestProps.fileName}`
  )

  // Retrieve all segment durations as map(segment srcFilePath => segment duration)
  codeBlockTimeStart = Date.now()
  const segmentDurations: any = await getSegmentsDuration(
    requestProps.fileName,
    requestProps.fileDestination
  )
  console.log(
    `Time taken in /track_content_async to get segment duration: ${
      Date.now() - codeBlockTimeStart
    }ms for file ${requestProps.fileName}`
  )

  // For all segments, build array of (segment multihash, segment duration)
  let trackSegments = segmentFileIPFSResps.map((segmentFileIPFSResp) => {
    return {
      multihash: segmentFileIPFSResp.multihash,
      duration: segmentDurations[segmentFileIPFSResp.srcPath]
    }
  })

  // exclude 0-length segments that are sometimes outputted by ffmpeg segmentation
  trackSegments = trackSegments.filter((trackSegment) => trackSegment.duration)

  // error if there are no track segments
  if (!trackSegments || !trackSegments.length) {
    // Prune upload artifacts
    removeTrackFolder(requestProps.fileDir)

    throw new Error('Track upload failed - no track segments')
  }

  // Error if any segment CID is in blacklist.
  // try {
  //   await Promise.all(
  //     trackSegments.map(async (segmentObj) => {
  //       if (await blacklistManager.CIDIsInBlacklist(segmentObj.multihash)) {
  //         throw new Error(
  //           `Segment CID ${segmentObj.multihash} been blacklisted by this node.`
  //         )
  //       }
  //     })
  //   )
  // } catch (e) {
  //   // Prune upload artifacts
  //   removeTrackFolder(requestProps.fileDir)

  //   if (e.message.indexOf('blacklisted') >= 0) {
  //     throw new Error(
  //       `Track upload failed - part or all of this track has been blacklisted by this node: ${e.toString()}`
  //     )
  //   } else {
  //     throw new Error(e.message)
  //   }
  // }

  // Record entries for transcode and segment files in DB
  codeBlockTimeStart = Date.now()
  // const transaction = await models.sequelize.transaction()
  let transcodeFileUUID
  try {
    // Record transcode file entry in DB
    const createTranscodeFileQueryObj = {
      multihash: transcodeFileIPFSResp.multihash,
      sourceFile: requestProps.fileName,
      storagePath: transcodeFileIPFSResp.dstPath,
      type: 'copy320' // TODO - replace with models enum
    }

    Upload.create(createTranscodeFileQueryObj)
    // const file = await DBManager.createNewDataRecord(
    //   createTranscodeFileQueryObj,
    //   cnodeUserUUID,
    //   models.File,
    //   transaction
    // )
    // transcodeFileUUID = file.fileUUID

    // Record all segment file entries in DB
    // Must be written sequentially to ensure clock values are correctly incremented and populated
    for (const { multihash, dstPath } of segmentFileIPFSResps) {
      const createSegmentFileQueryObj = {
        multihash,
        sourceFile: requestProps.fileName,
        storagePath: dstPath,
        type: 'track' // TODO - replace with models enum
      }
      console.log(createSegmentFileQueryObj, 'createSegmentFileQueryObj')

      Upload.create(createSegmentFileQueryObj)
      // await DBManager.createNewDataRecord(
      //   createSegmentFileQueryObj,
      //   cnodeUserUUID,
      //   models.File,
      //   transaction
      // )
    }

    // await transaction.commit()
  } catch (e) {
    // await transaction.rollback()

    // Prune upload artifacts
    removeTrackFolder(requestProps.fileDir)

    throw new Error(e.toString())
  }
  console.log(
    `Time taken in /track_content_async for DB updates: ${
      Date.now() - codeBlockTimeStart
    }ms for file ${requestProps.fileName}`
  )

  // Prune upload artifacts after success
  removeTrackFolder(requestProps.fileDir)

  console.log(
    `Time taken in /track_content_async for full route: ${
      Date.now() - routeTimeStart
    }ms for file ${requestProps.fileName}`
  )
  return {
    transcodedTrackCID: transcodeFileIPFSResp.multihash,
    transcodedTrackUUID: transcodeFileUUID,
    track_segments: trackSegments,
    source_file: requestProps.fileName
  }
}

export { trackContentUpload }
