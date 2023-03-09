import { connectQueue } from '../config/queue/queue'
import redisClient from '../lib/redis/redisClient'
import shortid from 'shortid'
import { trackContentUpload } from '../infrastructure/services/tracks/componentService'
import { ipfs } from '../lib/ipfs/ipfsClient'

const nameQueue = 'segment-queue'
const ASYNC_PROCESSING_QUEUE_HISTORY = 500
const EXPIRATION = 86400 // 24 hours in secondsconst EXPIRATION = 86400 // 24 hours in seconds
const MAX_CONCURRENCY = 100
const EXPIRATION_SECONDS = 86400 // 24 hours in seconds

// Object.freeze: Prevents the modification of existing property attributes and values, and prevents the addition of new properties.
const PROCESS_NAMES = Object.freeze({
  transcode: 'transcode'
})
const PROCESS_STATES = Object.freeze({
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
  FAILED: 'FAILED'
})

const SegmentQueue = connectQueue(nameQueue, {
  removeOnComplete: ASYNC_PROCESSING_QUEUE_HISTORY,
  removeOnFail: ASYNC_PROCESSING_QUEUE_HISTORY
})

SegmentQueue.empty()

SegmentQueue.process(PROCESS_NAMES.transcode, async (job: any, done: any) => {
  const { transcodeParams } = job.data
  try {
    const response = await monitorProgress(
      PROCESS_NAMES.transcode,
      trackContentUpload,
      transcodeParams
    )
    console.log(response, 'SegmentQueue-response')
    done(null, { response })
  } catch (e) {
    console.log(
      // transcodeParams.logContext,
      `Could not process taskType=${PROCESS_NAMES.transcode}  ${e.toString()}`
    )
    done(e.message)
  }
})

const addTranscodeTask = async (transcodeParams: any) => {
  SegmentQueue.add(PROCESS_NAMES.transcode, {
    transcodeParams
  })
  return new Promise((resolve, reject) => {
    SegmentQueue.on('completed', async (job: any, result: any) => {
      console.log('addTranscodeTask-job-done', job, result)
      job.finished()
      resolve(result)
    })
  })
}

const monitorProgress = async (taskType: any, func: any, { req }: any) => {
  // const blacklistManager = await serviceRegistry.getBlacklistManager()

  const uuid = shortid.generate()
  const redisKey = constructProcessKey(taskType, uuid)

  let state = { status: PROCESS_STATES.IN_PROGRESS }
  console.log(`Starting ${taskType}! uuid=${uuid}}`)
  await redisClient.set(redisKey, JSON.stringify(state), 'EX', EXPIRATION)

  let response: any
  try {
    response = await func(req, ipfs)
    // @ts-ignore
    state = { status: PROCESS_STATES.DONE, resp: response }
    console.log(`Successful ${taskType}! uuid=${uuid}}`)
    await redisClient.set(redisKey, JSON.stringify(state), 'EX', EXPIRATION)
  } catch (e) {
    // @ts-ignore
    state = { status: PROCESS_STATES.FAILED, resp: e.message }
    console.log(
      `Error with ${taskType}. uuid=${uuid}} resp=${JSON.stringify(e.message)}`
    )
    await redisClient.set(redisKey, JSON.stringify(state), 'EX', EXPIRATION)
    throw e
  }

  return response
}

function constructProcessKey(taskType: any, uuid: string) {
  return `${taskType}:::${uuid}`
}

export { addTranscodeTask }
