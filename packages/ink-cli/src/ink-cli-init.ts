import { Debug } from '@repo/debug'
import { parsePackageJson } from '@repo/file-system/parsePackageJson'
import { Logger } from '@repo/logger'
import { Command } from 'commander'
import { sampleCommandAction } from './sample-command/action.js'
import type { ActionContextType } from './types.js'

const actionCtx: ActionContextType = {
  debug: new Debug('@repo/ink-cli'),
  logger: new Logger({
    namespace: '@repo/ink-cli',
  }),
}

export const inkCliInit = (packageJsonPath: string) => {
  actionCtx.debug.log('Initializing ink-cli...')
  const parsePackageJsonResult = parsePackageJson(packageJsonPath)

  if (parsePackageJsonResult.isErr()) {
    actionCtx.logger.error('Failed to load the cli')
    process.exit(1)
  }

  const packageJson = parsePackageJsonResult.value

  const program = new Command()
  program.name(packageJson.name).description(packageJson.description).version(packageJson.version)

  program
    .command('run')
    .option('--recursive', 'List files recursively', false)
    .action(async (options) => {
      actionCtx.logger.header('simple-cli ls command...')
      actionCtx.debug.log('Listing files in directory:', options)
      await sampleCommandAction()
    })

  program.parse()
}
