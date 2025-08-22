import { err, ok } from 'neverthrow'
import { z } from 'zod'
import { fileSystemDebug } from '../_fileSystemDebug.js'
import { isFileExists } from '../isFileExists/index.js'
import { parseJson } from '../parseJson/index.js'
import { readFile } from '../readFile/readFile.js'

export const basePackageJsonSchema = z.object({
  description: z.string(),
  name: z.string().min(1, 'Package name is required'),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Version must be in the format x.y.z'),
})

type BasePackageJsonType = z.infer<typeof basePackageJsonSchema>

const debug = fileSystemDebug.extend('parsePackageJson')

export const parsePackageJson = <T extends BasePackageJsonType>(
  packageJsonPath: string,
  schema = basePackageJsonSchema as z.ZodType<T>,
) => {
  const file = isFileExists(packageJsonPath)

  if (file.isErr()) {
    debug.error('File does not exist or is not a file:', packageJsonPath)

    return err(`File does not exist or is not a file: ${packageJsonPath}`)
  }

  const fileContent = readFile(packageJsonPath, 'utf-8')

  if (fileContent.isErr()) {
    debug.error('Failed to read file:', fileContent.error.message)
    return err(`Failed to read file: ${fileContent.error.message}`)
  }

  if (fileContent.value.length === 0) {
    debug.error('File is empty:', packageJsonPath)
    return err('File is empty')
  }

  const parsedJson = parseJson(fileContent.value.toString())

  if (parsedJson.isErr()) {
    debug.error('Failed to parse JSON:', parsedJson.error.message)
    return err(`Failed to parse JSON: ${parsedJson.error.message}`)
  }

  const result = schema.safeParse(parsedJson.value)

  if (result.success) {
    debug.log('Package JSON parsed and validated successfully:', result.data)

    return ok(result.data)
  }

  debug.error('Package JSON validation failed:', result.error.message)

  return err(result.error)
}
