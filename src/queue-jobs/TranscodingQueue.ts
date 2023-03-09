import Bull from 'bull'
import os from 'os'
import ffmpeg from '../lib/ffmpeg/ffmpeg'
import { connectQueue } from '../config/queue/queue'

const MAX_ACTIVE_JOBS = os.cpus().length
const MAX_WAITING_JOBS = os.cpus().length

const MAX_CONCURRENCY = os.cpus().length

const PROCESS_NAMES = Object.freeze({
  segment: 'segment',
  transcode320: 'transcode_320'
})

const nameQueue = 'transcoding-queue'

const TranscodingQueue = connectQueue(nameQueue, {
  removeOnComplete: true,
  removeOnFail: true
})

TranscodingQueue.empty()

TranscodingQueue.process(
  PROCESS_NAMES.segment,
  MAX_CONCURRENCY,
  async (job: any, done: any) => {
    const start = Date.now()
    const { fileDir, fileName } = job.data

    try {
      logStatus(`segmenting ${fileDir} ${fileName}`)
      const filePaths = await ffmpeg.segmentFile(fileDir, fileName)
      console.log(
        `Successfully completed segment job ${fileDir} ${fileName} in duration ${
          Date.now() - start
        }ms ${filePaths}`
      )
      console.log(filePaths, 'filePaths')
      done(null, { filePaths })
    } catch (e) {
      console.log(`Segment Job Error ${e} in duration ${Date.now() - start}ms`)
      // @ts-ignore
      done(e)
    }
  }
)

TranscodingQueue.process(
  PROCESS_NAMES.transcode320,
  /* inherited */ 0,
  async (job: any, done: any) => {
    const start = Date.now()
    const { fileDir, fileName } = job.data

    try {
      logStatus(`transcoding to 320kbps ${fileDir} ${fileName}`)

      const filePath = await ffmpeg.transcodeFileTo320(fileDir, fileName)
      logStatus(
        `Successfully completed Transcode320 job ${fileDir} ${fileName} in duration ${
          Date.now() - start
        }ms  ${filePath}`
      )
      console.log(filePath, 'filePath')
      done(null, { filePath })
    } catch (e) {
      logStatus(`Transcode320 Job Error ${e} in duration ${Date.now() - start}`)
      done(e)
    }
  }
)

// const segment = async (fileDir: any, fileName: any) => {
//   TranscodingQueue.add(PROCESS_NAMES.segment, {
//     fileDir,
//     fileName
//   })
//   TranscodingQueue.on('completed', async (job: any, result: any) => {
//     console.log('segment-job-done', result)
//     job.finished()
//     return result
//   })
// }

const segment = async (fileDir: any, fileName: any) => {
  TranscodingQueue.add(PROCESS_NAMES.segment, {
    fileDir,
    fileName
  })

  return new Promise((resolve, reject) => {
    TranscodingQueue.on('completed', async (job: any, result: any) => {
      console.log('segment-job-done', job, result)
      job.finished()
      if (job.name === 'segment') {
        resolve(result)
      }
    })
  })
}

const transcode320 = async (fileDir: any, fileName: any) => {
  TranscodingQueue.add(PROCESS_NAMES.transcode320, {
    fileDir,
    fileName
  })
  return new Promise((resolve, reject) => {
    TranscodingQueue.on('completed', async (job: any, result: any) => {
      console.log('transcode320-job-done', job, result)
      job.finished()
      if (job.name === 'transcode_320') {
        resolve(result)
      }
    })
  })
}

const logStatus = async (message: string) => {
  const { waiting, active, completed, failed, delayed } =
    await TranscodingQueue.getJobCounts()
  console.log(
    `Transcoding Queue: ${message} || active: ${active}, waiting: ${waiting}, failed ${failed}, delayed: ${delayed}, completed: ${completed} `
  )
}

TranscodingQueue.on('completed', (job: any, result: any) => {
  console.log(`Job completed with result ${job}`)
})

TranscodingQueue.on('progress', (job: any, progress: any) => {
  console.log(`Job progress with result ${job} ${progress}`)
})

export { segment, transcode320 }
