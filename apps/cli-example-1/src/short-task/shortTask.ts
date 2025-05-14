import { sleep } from '@cli-template/utils'
import { z } from 'zod'

const shortTaskOptionsSchema = z.object({
  arg: z.string().min(1, 'Task name is required'),
  options: z.object({
    booleanKey: z.boolean().optional(),
    templateOption: z.string(),
    numberOption: z.coerce.number().optional(),
  }),
})

type ShortTaskOptions = z.infer<typeof shortTaskOptionsSchema>

export const shortTaskAction = async (props: ShortTaskOptions) => {
  const { arg, options } = shortTaskOptionsSchema.parse(props)

  console.log(`Task Name: ${arg}`)
  console.log(`Task Options: ${JSON.stringify(options)}`)

  // Simulate task duration
  await sleep(2000) // 2 seconds

  console.log(`Task "${arg}" completed!`)

  return 0
}
