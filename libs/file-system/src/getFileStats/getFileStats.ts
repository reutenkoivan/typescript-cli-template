import fs from 'node:fs'
import { Result } from 'neverthrow'
import { fileSystemDebug } from '../_fileSystemDebug.js'

const debug = fileSystemDebug.extend('getFileStats')

export const getFileStats = Result.fromThrowable(
  (filePath: string) => {
    debug.log('Getting file stats for:', filePath)
    const stats = fs.statSync(filePath)
    debug.log('File stats:', stats)

    return stats
  },
  () => new Error('Failed to get file stats'),
)
