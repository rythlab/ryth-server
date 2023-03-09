import { TextEncoder } from 'util'
import ipfsClient from 'ipfs-http-client'
import { importer } from 'ipfs-unixfs-importer'
import fs from 'fs'
const ipfsClientLatest = require('ipfs-http-client-latest')
const ENABLE_ASYNC_IPFS_ADD = false

// Make ipfs clients exportable to be used in rehydrate queue
const ipfsAddr = 'localhost'
if (!ipfsAddr) {
  throw new Error('Must set ipfsAddr')
}
// const ipfs = ipfsClient(ipfsAddr, 5001)
const ipfs = ipfsClient({
  // host: 'ipfs.infura.io',
  // port: 5001,
  // protocol: 'https'
  host: ipfsAddr,
  port: 5001,
  protocol: 'http'
})

const ipfsLatest = ipfsClientLatest({
  host: ipfsAddr,
  port: 5001,
  protocol: 'http'
})

async function logIpfsPeerIds() {
  const identity = await ipfs.id()
  // Pretty print the JSON obj with no filter fn (e.g. filter by string or number) and spacing of size 2
  console.log(`Current IPFS Peer ID: ${JSON.stringify(identity, null, 2)}`)

  // init latest version of ipfs
  const identityLatest = await ipfsLatest.id()
  console.log(
    `Current IPFS Peer ID (using latest version of ipfs client): ${JSON.stringify(
      identityLatest,
      null,
      2
    )}`
  )
}

/**
 * Wrapper to ipfs.addToFs() -- This wrapper allows for ipfs calls to be made async or synchronous.
 * @param {Object} ipfs ipfs library -- can be two different versions (see ipfsClient.js)
 * @param {Buffer|Buffer[]} buffers
 * @param {Object?} ipfsConfig ipfs add config options
 * @param {string?} logContext the name of the caller fn
 * @param {boolean?} addToIPFSDaemon flag to override adding to ipfs daemon
 * @returns {string|string[]} hashes
 */
async function ipfsAddWrapper(
  buffers: any,
  ipfsConfig = {},
  logContext = {},
  addToIPFSDaemon = false
) {
  // If async ipfs add is enabled, or if `addToIPFSDaemon` flag passed in is false, asynchronously
  // add to ipfs. Else, synchronously add to ipfs and wait for the response.
  let ipfsDaemonHashes: any
  if (!addToIPFSDaemon) {
    ipfs.add(buffers, ipfsConfig) // Do not await it
  } else {
    ipfsDaemonHashes = await ipfs.add(buffers, ipfsConfig)
  }

  // If `buffers` is an array, get the content hash of each element. Else, it will be a single element.
  // Also, if `buffers` is a single element, get the single element hash from `ipfsDaemonHashes`
  let onlyHashes = []
  if (Array.isArray(buffers)) {
    // Note: See ipfs add code in `resizeImage.js` for `buffers` structure
    for (const { content } of buffers) {
      // @ts-ignore
      const hash = await ipfsHashOf(content)
      // @ts-ignore
      onlyHashes.push(hash)
    }
  } else {
    // @ts-ignore
    onlyHashes = await ipfsHashOf(buffers)
    ipfsDaemonHashes = ipfsDaemonHashes[0].hash
  }

  const ipfsDaemonHashLogStr = `ipfsDaemonHash=${ipfsDaemonHashes} isSameHash=${
    onlyHashes === ipfsDaemonHashes
  }`
  console.log(
    `[ipfsClient - ipfsAddWrapper()] onlyHash=${onlyHashes} ${
      ipfsDaemonHashes ? ipfsDaemonHashLogStr : ''
    }`
  )

  // If content was added to ipfs daemon, prioritize using that hash response
  return ipfsDaemonHashes || onlyHashes
}

/**
 * Wrapper to ipfs.add() -- This wrapper allows for ipfs calls to be made async or synchronous.
 * @param {Object} ipfs ipfs library -- can be two different versions (see ipfsClient.js)
 * @param {string|string[]} srcPath
 * @param {Object?} ipfsConfig ipfs add config options
 * @param {string?} logContext request context; used to log more info on caller
 * @returns {string|string[]} hashes
 */
async function ipfsAddToFsWrapper(
  ipfs: { addFromFs: (arg0: any, arg1: {}) => void },
  srcPath: any,
  ipfsConfig = {}
) {
  const stream = fs.createReadStream(srcPath)
  // @ts-ignore
  const onlyHash = await ipfsHashOf(stream)
  if (ENABLE_ASYNC_IPFS_ADD) {
    console.log(`[ipfsClient - ipfsAddToFsWrapper()] onlyHash=${onlyHash}`)
    ipfs.addFromFs(srcPath, ipfsConfig) // Do not await it
    return onlyHash
  }

  // @ts-ignore
  const ipfsDaemonHash = (await ipfs.addFromFs(srcPath, ipfsConfig))[0].hash
  console.log(
    `[ipfsClient - ipfsAddToFsWrapper()] onlyHash=${onlyHash} ipfsDaemonHash=${ipfsDaemonHash} isSameHash=${
      onlyHash === ipfsDaemonHash
    }`
  )
  return ipfsDaemonHash
}

// Custom content-hashing logic. Taken from https://github.com/alanshaw/ipfs-only-hash/blob/master/index.js
const block = {
  get: async (cid: any) => {
    throw new Error(`unexpected block API get for ${cid}`)
  },
  put: async () => {
    throw new Error('unexpected block API put')
  }
}

async function ipfsHashOf(
  content: string | Uint8Array,
  options: { onlyHash?: any; cidVersion?: any }
) {
  options = options || {}
  options.onlyHash = true
  options.cidVersion = 0

  if (typeof content === 'string') {
    content = new TextEncoder().encode(content)
  }

  let lastCid
  // @ts-ignore
  for await (const { cid } of importer([{ content }], block, options)) {
    lastCid = cid
  }

  return `${lastCid}`
}

export {
  ipfs,
  ipfsLatest,
  logIpfsPeerIds,
  ipfsAddWrapper,
  ipfsAddToFsWrapper,
  ipfsHashOf
}
