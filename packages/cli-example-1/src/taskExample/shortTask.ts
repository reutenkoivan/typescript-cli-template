import { Debug } from '@cli-template/utils/debug'
import { Logger } from '@cli-template/utils/logger'
import { sleep } from '@cli-template/utils/sleep'
import { z } from 'zod'

export const shortTaskArgumentSchema = z.object({
  arg: z.string().min(1, 'Task name is required'),
  options: z.object({
    booleanKey: z.boolean(),
    templateOption: z.string(),
    numberOption: z.coerce.number().optional(),
  }),
})

export type ShortTaskArgument = z.infer<typeof shortTaskArgumentSchema>

const debug = new Debug('cli-example-1:shortTaskAction')
const logger = new Logger({
  namespace: 'shortTaskAction',
})

export const shortTaskAction = async ({ arg, options }: ShortTaskArgument) => {
  debug.log({ arg, options })

  // Simulate task duration
  await sleep(2000)

  debug.error('This is an error message')
  logger.log(`Task "${arg}" completed!`)
}
