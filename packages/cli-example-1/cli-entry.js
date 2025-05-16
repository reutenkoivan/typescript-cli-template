#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { shortTaskAction } from '@cli-template/cli-example-1/shortTask.js'
import { Command } from 'commander'

const packageJsonPath = path.resolve(import.meta.dirname, './package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

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
    // TODO: Fix types in IDE
    const exitCode = await shortTaskAction({ arg, options })
    process.exitCode = exitCode
  })

program.parse()
