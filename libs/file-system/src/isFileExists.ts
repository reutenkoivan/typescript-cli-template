import path from 'node:path'
import { err, ok } from 'neverthrow'
import { fileSystemDebug } from './_fileSystemDebug.js'
import { getFileStats } from './getFileStats.js'

const debug = fileSystemDebug.extend('isFileExists')

export const isFileExists = (filePath: string, { cwd = process.cwd() } = {}) => {
  debug.log('Checking if file exists:', filePath)
  const fullPath = path.isAbsolute(filePath) ? filePath : path.resolve(cwd, filePath)

  return ok(fullPath)
    .andThen((fullPath) => {
      debug.log('Checking if file exists on disk:', fullPath)

      const stats = getFileStats(fullPath)

      if (stats.isErr()) {
        debug.error('Error getting file stats:', `"${stats.error.message}"`)
        return err(stats.error)
      }

      return ok(stats)
    })
    .andThen((stats) => {
      if (stats.isOk() && stats.value.isFile()) {
        debug.log('File exists:', fullPath)

        return ok(fullPath)
      }

      debug.error('File does not exist or is not a file:', fullPath)

      return err(new Error(`File does not exist or is not a file: ${fullPath}`))
    })
}
