import { Debug } from '@repo/debug'
import { parsePackageJson } from '@repo/file-system/parsePackageJson'
import { Logger } from '@repo/logger'
import { Command } from 'commander'
import {
  CAT_COMMAND_DEFAULT_OPTIONS,
  CAT_OUTPUT_OPTIONS,
  catCommandAction,
  parseCatOptions,
} from './cat-command/index.js'
import type { ActionContextType } from './types.js'

const actionCtx: ActionContextType = {
  debug: new Debug('@repo/simple-cli'),
  logger: new Logger({
    namespace: '@repo/simple-cli',
  }),
}

export const simpleCliInit = (packageJsonPath: string) => {
  actionCtx.debug.log('Initializing ts-ter CLI...')
  const parsePackageJsonResult = parsePackageJson(packageJsonPath)

  if (parsePackageJsonResult.isErr()) {
    actionCtx.logger.error('Failed to load the cli')
    process.exit(1)
  }

  const packageJson = parsePackageJsonResult.value

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
      actionCtx.debug.log('Command options:', { argument, options })
      actionCtx.logger.header('ts-ter cat command...')

      const cliConfig = parseCatOptions(argument, options)

      if (cliConfig.error) {
        actionCtx.debug.error('Invalid command options:', cliConfig.error.message)
        actionCtx.logger.zodError(cliConfig.error)

        process.exit(1)
      }

      actionCtx.debug.log('Parsed CLI config:', cliConfig.data)

      await catCommandAction(cliConfig.data, actionCtx)
    })

  program
    .command('ls')
    .description('List files in a directory')
    .argument('<directory>', 'Directory to list')
    .option('--recursive', 'List files recursively', false)
    .action(async (options) => {
      actionCtx.logger.header('ts-ter ls command...')
      actionCtx.debug.log('Listing files in directory:', options)
    })

  program.parse()
}
