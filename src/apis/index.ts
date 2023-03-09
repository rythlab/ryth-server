import express from 'express'
import { goveranceContractMeta } from '../helpers/contract'
import { handleTrackContentUpload } from '../config/filesystem/manager'
import { handleResponse, successResponse } from '../config/response/res'
import { addTranscodeTask } from '../queue-jobs/SegmentQueue'
import uuid from 'uuid'

const router = express.Router()

router.get('/config', (req, res) => {
  return res.json({ data: goveranceContractMeta })
})

router.post(
  '/upload',
  handleTrackContentUpload,
  handleResponse(async (req: any) => {
    if (req.fileSizeError || req.fileFilterError) {
      console.log('error uploading file')
    }
    const addTranscodeTaskRes = await addTranscodeTask({
      req: {
        fileName: req.fileName,
        fileDir: req.fileDir,
        fileDestination: req.file.destination
      }
    })
    console.log(addTranscodeTaskRes, 'addTranscodeTaskRes')
    return successResponse({ data: addTranscodeTaskRes })
  })
)

export default router
