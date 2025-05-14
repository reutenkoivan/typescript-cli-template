#!/usr/bin/env node

const { shortTask } = require('@cli-template/cli-example-1')

shortTask({
  taskName: 'Example Task',
  taskDescription: 'This is an example task.',
  taskDuration: 1,
  taskPriority: 'medium',
})
  .then(() => {
    console.log('Task finished!')
  })
  .catch((error) => {
    console.error('Error:', error)
  })
