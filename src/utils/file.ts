import fs from 'fs-extra'
import BufferListStream from 'bl'
import path from 'path'

export async function createDirForFile(fileStoragePath: string) {
  const dir = path.dirname(fileStoragePath)
  await fs.ensureDir(dir)
}

export async function writeStreamToFileSystem(
  stream: {
    pipe: (arg0: fs.WriteStream) => void
    on: (arg0: string, arg1: (err: any) => void) => void
  },
  expectedStoragePath: fs.PathLike | any,
  createDir = false
) {
  if (createDir) {
    await createDirForFile(expectedStoragePath)
  }

  const destinationStream = fs.createWriteStream(expectedStoragePath)
  stream.pipe(destinationStream)
  return new Promise<void>((resolve, reject) => {
    destinationStream.on('finish', () => {
      resolve()
    })
    destinationStream.on('error', (err) => {
      reject(err)
    })
    stream.on('error', (err: any) => {
      destinationStream.end()
      reject(err)
    })
  })
}

/**
 * Call ipfs.cat on a path with optional timeout and length parameters
 * @param {*} serviceRegistry
 * @param {*} logger
 * @param {*} path IPFS cid for file
 * @param {*} timeout timeout for IPFS op in ms
 * @param {*} length length of data to retrieve from file
 * @returns {Buffer}
 */
export const ipfsCat = (
  { ipfsLatest }: { ipfsLatest: any },
  logger: {
    debug: any
    error?: (arg0: string) => void
    warn?: (arg0: string) => void
  },
  path: any,
  timeout = 1000,
  length: any = null
) =>
  new Promise(async (resolve, reject) => {
    const start = Date.now()

    try {
      const chunks = []
      const options: any = {}
      if (length) options.length = length
      if (timeout) options.timeout = timeout

      // using a js timeout because IPFS cat sometimes does not resolve the timeout and gets
      // stuck in this function indefinitely
      // make this timeout 2x the regular timeout to account for possible latency of transferring a large file
      setTimeout(() => {
        return reject(new Error('ipfsCat timed out'))
      }, 2 * timeout)

      // ipfsLatest.cat() returns an AsyncIterator<Buffer> and its results are iterated over in a for-loop
      /* eslint-disable-next-line no-unused-vars */
      for await (const chunk of ipfsLatest.cat(path, options)) {
        chunks.push(chunk)
      }
      logger.debug(`ipfsCat - Retrieved ${path} in ${Date.now() - start}ms`)
      resolve(Buffer.concat(chunks))
    } catch (e) {
      reject(e)
    }
  })

export const ipfsGet = ({ ipfsLatest }: any, path: any, timeout = 1000) =>
  new Promise(async (resolve, reject) => {
    const start = Date.now()

    try {
      const chunks: readonly Uint8Array[] = []
      const options: any = {}
      if (timeout) options.timeout = timeout

      // using a js timeout because IPFS get sometimes does not resolve the timeout and gets
      // stuck in this function indefinitely
      // make this timeout 2x the regular timeout to account for possible latency of transferring a large file
      setTimeout(() => {
        return reject(new Error('ipfsGet timed out'))
      }, 2 * timeout)

      // ipfsLatest.get() returns an AsyncIterator<Buffer> and its results are iterated over in a for-loop
      /* eslint-disable-next-line no-unused-vars */
      for await (const file of ipfsLatest.get(path, options)) {
        if (!file.content) continue

        const content = new BufferListStream()
        for await (const chunk of file.content) {
          content.append(chunk)
        }
        resolve(content)
      }
      console.log(`ipfsGet - Retrieved ${path} in ${Date.now() - start}ms`)
      resolve(Buffer.concat(chunks))
    } catch (e) {
      reject(e)
    }
  })
