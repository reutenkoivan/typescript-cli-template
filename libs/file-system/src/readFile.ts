import fs from 'node:fs'
import { Result } from 'neverthrow'
import { fileSystemDebug } from './_fileSystemDebug.js'

const debug = fileSystemDebug.extend('readFile')

type ReadFileArguments = Parameters<typeof fs.readFileSync>

export const readFile = Result.fromThrowable(
  (filePath: ReadFileArguments[0], options?: ReadFileArguments[1]) => {
    debug.log('Reading file:', filePath)
    const fileContent = fs.readFileSync(filePath, options)
    debug.log('File read successfully:', filePath)

    return fileContent
  },
  () => new Error('Failed to read file'),
)
