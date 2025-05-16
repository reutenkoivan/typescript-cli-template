import { sleep } from '@cli-template/utils/sleep'
import { z } from 'zod'
import { debug } from './debug.js'

const shortTaskOptionsSchema = z.object({
  arg: z.string().min(1, 'Task name is required'),
  options: z.object({
    booleanKey: z.boolean().optional().default(false),
    templateOption: z.string().default('default template'),
    numberOption: z.coerce.number().optional().default(0),
  }),
})

type ShortTaskOptions = z.infer<typeof shortTaskOptionsSchema>

const shortTaskActionDebug = debug('shortTaskAction')

// Test!!!!! Create reporter!!!!
const parseSchema = (schema: z.ZodSchema, data: unknown) => {
  const result = schema.safeParse(data)

  if (!result.success) {
    const errors = result.error.format()

    const formattedErrors = Object.entries(errors).reduce(
      (acc, [key, value]) => {
        // @ts-ignore
        acc[key] = value._errors
        return acc
      },
      {} as Record<string, string[]>,
    )
    throw new Error(`Validation failed: ${JSON.stringify(formattedErrors)}`)
  }

  return result.data as z.infer<typeof schema>
}

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
