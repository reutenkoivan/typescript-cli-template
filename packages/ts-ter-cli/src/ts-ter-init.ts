import { Command } from 'commander'

import { createActionContext } from '@repo/utils/actionContext'
import { parsePackageJson } from '@repo/utils/parse-package-json'
import {
  CAT_COMMAND_DEFAULT_OPTIONS,
  CAT_OUTPUT_OPTIONS,
  catCommandAction,
  parseCatOptions,
} from './cat-command/index.js'

const actionCtx = createActionContext({
  logger: {
    namespace: 'ts-ter',
  },
  debug: 'ts-ter',
})

export const tsTerInit = (packageJsonPath: string) => {
  const packageJson = parsePackageJson(packageJsonPath)

  const program = new Command()
  program.name(packageJson.name).description(packageJson.description).version(packageJson.version)

  program
    .command('cat')
    .description('Process a file and output its content')
    .argument('<file>', 'File to read')
    .option(
      '-o, --output <output>',
      `Output type (${Object.values(CAT_OUTPUT_OPTIONS)}). Can be set with the CAT_OUTPUT env variable.`,
      CAT_COMMAND_DEFAULT_OPTIONS.output,
    )
    .option('--output-file <outputFile>', 'Output file path. Can be set with the CAT_OUTPUT_FILE env variable.')
    .option('--debug', 'Enable debug', CAT_COMMAND_DEFAULT_OPTIONS.debug)
    .action(async (argument, options) => {
      actionCtx.logger.header('ts-ter cat command...')

      const cliConfig = parseCatOptions(argument, options)

      if (cliConfig.error) {
        actionCtx.logger.zodError(cliConfig.error)
        process.exit(1)
      }

      await catCommandAction(cliConfig.data, actionCtx)
    })

  program
    .command('ls')
    .description('List files in a directory')
    .argument('<directory>', 'Directory to list')
    .option('--recursive', 'List files recursively', false)
    .action(async (options) => {
      actionCtx.logger.header('ts-ter ls command...')
    })

  program.parse()
}
