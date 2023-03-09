import path from 'path'
import fs from 'fs'
const { CID } = require('ipfs-http-client-latest')

// regex to check if a directory or just a regular file
// if directory - will have both outer and inner properties in match.groups
// else - will have just outer property, no inner
const CID_DIRECTORY_REGEX =
  /\/(?<outer>Qm[a-zA-Z0-9]{44})\/?(?<inner>Qm[a-zA-Z0-9]{44})?/

// variable to cache if we've run `ensureDirPathExists` in getTmpTrackUploadArtifactsPath so we don't run
// it every time a track is uploaded
let TMP_TRACK_ARTIFACTS_CREATED = false

// @ts-ignore
class DiskManger {
  /**
   * Return the storagePath from the config
   */
  static getConfigStoragePath() {
    return './file_storage'
  }

  static getTmpTrackUploadArtifactsPath() {
    const dirPath = path.join('./file_storage', 'files', 'tmp_track_artifacts')
    if (!TMP_TRACK_ARTIFACTS_CREATED) {
      this.ensureDirPathExists(dirPath)
      TMP_TRACK_ARTIFACTS_CREATED = true
    }
    return dirPath
  }

  static computeFilePath(cid: string) {
    try {
      CID.isCID(new CID(cid))
    } catch (e: any) {
      throw new Error(
        `Please pass in a valid cid to computeFilePath. Passed in ${cid} ${e.message}`
      )
    }

    // This is the directory path that file with cid will go into.
    // The reason for nesting `files` inside `/file_storage` is because legacy nodes store files at the root of `/file_storage`, and
    // that can cause potential collisions if we're creating large amounts of subdirectories. A way to mitigate this is create one
    // directory in the root `/file_storage` and all other directories inside of it like `file_storage/files/<directoryID>/<cid>
    const directoryID = cid.slice(-4, -1)
    const parentDirPath = path.join(
      this.getConfigStoragePath(),
      'files',
      directoryID
    )
    // in order to easily dev against the older and newer paths, the line below is the legacy storage path
    // const parentDirPath = this.getConfigStoragePath()

    // create the subdirectories in parentDirHash if they don't exist
    this.ensureDirPathExists(parentDirPath)

    return path.join(parentDirPath, cid)
  }

  static ensureDirPathExists(dirPath: any) {
    console.log(dirPath, 'dirPath')
    try {
      // the mkdir recursive option is equivalent to `mkdir -p` and should created nested folders several levels deep
      fs.mkdirSync(dirPath, { recursive: true })
    } catch (e: any) {
      throw new Error(`Error making directory at ${dirPath} - ${e.message}`)
    }
  }
}

export default DiskManger
