import { sleep } from '@cli-template/utils'
import { z } from 'zod'
import { debug } from '../debug'

const shortTaskOptionsSchema = z.object({
  arg: z.string().min(1, 'Task name is required'),
  options: z.object({
    booleanKey: z.boolean().optional(),
    templateOption: z.string(),
    numberOption: z.coerce.number().optional(),
  }),
})

type ShortTaskOptions = z.infer<typeof shortTaskOptionsSchema>

const shortTaskActionDebug = debug('shortTaskAction')

export const shortTaskAction = async (props: ShortTaskOptions) => {
  shortTaskActionDebug(`arg "${props.arg}"`)
  shortTaskActionDebug(`options ${JSON.stringify(props.options)}`)

  const { arg, options } = shortTaskOptionsSchema.parse(props)

  shortTaskActionDebug(`parsed arg "${arg}"`)
  shortTaskActionDebug(`parsed options ${JSON.stringify(options)}`)

  // Simulate task duration
  await sleep(2000) // 2 seconds

  console.log(`Task "${arg}" completed!`)

  return 0
}
