import { isFileExists } from '@repo/file-system/isFileExists'
import { z } from 'zod/v4'

export const CAT_OUTPUT_OPTIONS = {
  file: 'file',
  console: 'console',
} as const

export const CAT_COMMAND_DEFAULT_OPTIONS = {
  output: CAT_OUTPUT_OPTIONS.console,
  debug: false,
} as const

const CatCommandArgumentSchema = z.string().refine((val) => isFileExists(val).isOk(), {
  error: 'File does not exist',
})

const CatCommandOptionsSchema = z
  .object({
    output: z.enum([CAT_OUTPUT_OPTIONS.file, CAT_OUTPUT_OPTIONS.console]).default(CAT_COMMAND_DEFAULT_OPTIONS.output),
    outputFile: z.string().optional(),
  })
  .refine(
    (data) => {
      return data.output === CAT_OUTPUT_OPTIONS.file && data.outputFile
    },
    {
      message: "Output file is required when output type is 'file'",
      path: ['outputFile'],
    },
  )

type CatCommandOptionsType = z.infer<typeof CatCommandOptionsSchema>

/* === Internal contract === */

const CatCommandConfigSchema = z.object({
  argument: CatCommandArgumentSchema,
  options: CatCommandOptionsSchema,
})

export type CatCommandConfigType = z.infer<typeof CatCommandConfigSchema>

/* === /Internal contract === */

export const parseCatOptions = <T extends CatCommandOptionsType>(argument: string, options: T) => {
  const argsEnvMapping = {
    output: process.env.CAT_OUTPUT ?? options.output,
    outputFile: process.env.CAT_OUTPUT_FILE ?? options.outputFile,
  }

  return CatCommandConfigSchema.safeParse({
    argument,
    options: argsEnvMapping,
  })
}
