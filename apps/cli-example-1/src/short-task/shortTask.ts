export type ShortTaskOptions = {
  taskName: string
  taskDescription: string
  taskDuration: number
  taskPriority: 'low' | 'medium' | 'high'
}

export const shortTask = async (options: ShortTaskOptions) => {
  const { taskName, taskDescription, taskDuration, taskPriority } = options

  console.log(`Task Name: ${taskName}`)
  console.log(`Task Description: ${taskDescription}`)
  console.log(`Task Duration: ${taskDuration} minutes`)
  console.log(`Task Priority: ${taskPriority}`)
  console.log('Task created successfully!')
  console.log('You can now start working on your task.')

  await sleep(taskDuration * 60 * 1000) // Simulate task duration
  console.log(`Task "${taskName}" completed!`)

  return 1
}
