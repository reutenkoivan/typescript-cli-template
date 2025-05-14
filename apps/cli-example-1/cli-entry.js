#!/usr/bin/env node

const { Command } = require('commander')
const { shortTaskAction } = require('@cli-template/cli-example-1')
const packageJson = require('./package.json')

const program = new Command()
program.name(packageJson.name).description(packageJson.description).version(packageJson.version)

program
  .command('short-task')
  .description('Some short task')
  .argument('<string>', 'Argument to be passed')
  .option('--boolean-key', 'Boolean option')
  .option('-t, --template-option <char>', 'Template option', '===')
  .option('--number-option <number>', 'Number option', '1')
  .action(async (arg, options) => {
    const exitCode = await shortTaskAction({ arg, options })
    process.exit(exitCode)
  })

program.parse()
