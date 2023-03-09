import path from 'path'
import fs from 'fs'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)

const SEGMENT_REGEXP = /(segment[0-9]*.ts)/

// Parse m3u8 file from HLS output and return map(segment filePath (segmentName) => segment duration)
async function getSegmentsDuration(filename: any, filedir: any) {
  try {
    const splitResults = filename.split('.')
    const fileRandomName = splitResults[0]
    const manifestPath = path.join(filedir, `${fileRandomName}.m3u8`)
    const manifestContents = await readFile(manifestPath)
    const splitManifest = manifestContents.toString().split('\n')

    const segmentDurations = {}
    for (let i = 0; i < splitManifest.length; i += 1) {
      const matchedResults = splitManifest[i].match(SEGMENT_REGEXP)
      if (matchedResults === null) {
        continue
      }
      const segmentName = matchedResults[0]
      const durationString = splitManifest[i - 1]
      const durationSplit = durationString.split(':')
      const duration = parseFloat(durationSplit[1])
      // @ts-ignore
      segmentDurations[segmentName] = duration
    }
    return segmentDurations
  } catch (e) {
    throw new Error(`Failed - ${e}`)
  }
}

export { getSegmentsDuration }
