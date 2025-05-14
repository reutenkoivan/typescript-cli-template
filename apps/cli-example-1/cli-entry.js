#!/usr/bin/env node

const { Command } = require('commander')
const { shortTask } = require('@cli-template/cli-example-1')
const packageJson = require('./package.json')

const program = new Command()
program.name(packageJson.name).description(packageJson.description).version(packageJson.version)

program
  .command('short-task')
  .description('Some short task')
  .argument('<string>', 'Argument to be passed')
  .option('--boolean-key', 'Boolean option')
  .option('-t, --template-option <char>', 'Template option', '===')
  .action((cliArgument, { booleanKey, templateOption }) => {
    shortTask({
      taskName: 'short-task',
      taskDescription: `${JSON.stringify({ booleanKey, templateOption }, null, 2)}`,
      taskDuration: 1,
      taskPriority: 'medium',
    })
      .then(() => {
        console.log('Task finished!')
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  })

program.parse()
