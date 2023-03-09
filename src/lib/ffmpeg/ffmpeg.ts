import fs from 'fs'
import path from 'path'

import { spawnSync } from 'child_process'
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
// const ffmpegPath = require('ffmpeg-static').path
// const { spawnSync } = require('child_process')

function segmentFile(fileDir: string, fileName: string) {
  return new Promise((resolve, reject) => {
    console.log(`Segmenting file ${fileName}...`)
    const absolutePath = path.resolve(fileDir, fileName)
    const m3u8FilePath = path.resolve(fileDir, fileName.split('.')[0] + '.m3u8')
    const ss = '6'
    const t = '10'

    const command = [
      '-i',
      absolutePath,
      '-ss',
      ss,
      '-t',
      t,
      '-hls_segment_type',
      'mpegts',
      '-hls_base_url',
      'segments/',
      '-hls_segment_filename',
      path.resolve(fileDir, 'segments', 'segment%03d.ts'),
      m3u8FilePath
    ]
    const ffmpeg = spawnSync(ffmpegPath, command)

    // console.log(ffmpeg, 'segment-result')

    if (ffmpeg.status === 0) {
      console.log('segment-finished-----')
      const segmentFilePaths = fs.readdirSync(fileDir + '/segments')
      return resolve(segmentFilePaths)
    } else {
      console.log('fetching-----')
    }
  })
}

/** Transcode file into 320kbps mp3 and store in same directory. */
function transcodeFileTo320(fileDir: string, fileName: string) {
  return new Promise((resolve, reject) => {
    console.log(`Transcoding file ${fileName}...${fileDir}`)
    const sourcePath = path.resolve(fileDir, fileName)
    const targetPath = path.resolve(fileDir, fileName.split('.')[0] + '-dl.mp3')

    // Exit if dl-copy file already exists at target path.
    if (fs.existsSync(targetPath)) {
      console.log(`Downloadable copy already exists at ${targetPath}.`)
      resolve(targetPath)
    }

    const command = [
      '-i',
      sourcePath,
      '-ar',
      '48000',
      '-b:a',
      '320k',
      '-vn',
      targetPath
    ]
    const ffmpeg = spawnSync(ffmpegPath, command)
    // console.log(ffmpeg, 'transcode-result')

    if (ffmpeg.status === 0) {
      console.log('transcode-finished-----')
      return resolve(targetPath)
    } else {
      console.log('fetching-----')
    }

    // capture output
    // const stdout = ''
    // const stderr = ''
    // // proc.stdout.on('data', (data: any) => (stdout += data.toString()))
    // ffmpeg.stderr.on('data', (data: any) => data.toString())

    // ffmpeg.on('exit', (code: number, signal: any) => {
    //   console.log(code, signal, 'code--------------------------------')
    //   if (signal) code = signal
    //   if (code !== 0) {
    //     reject(new Error('FFMPEG Error'))
    //     console.log('Error')
    //   } else {
    //     if (fs.existsSync(targetPath)) {
    //       resolve(targetPath)
    //     } else {
    //       reject(new Error('FFMPEG Error'))
    //     }
    //   }
    // })
  })
}

export default { segmentFile, transcodeFileTo320 }
