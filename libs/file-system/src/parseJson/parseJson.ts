import { Result } from 'neverthrow'
import { fileSystemDebug } from '../_fileSystemDebug.js'

const debug = fileSystemDebug.extend('parseJson')

export const parseJson = Result.fromThrowable(
  (fileContent: string) => {
    debug.log('Parsing JSON content')
    const jsonData = JSON.parse(fileContent)
    debug.log('JSON parsed successfully')

    return jsonData
  },
  () => new Error('Failed to parse JSON content'),
)
