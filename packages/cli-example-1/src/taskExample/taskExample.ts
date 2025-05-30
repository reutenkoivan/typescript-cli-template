import { Logger } from '@cli-template/utils/logger'
import { parsePackageJson } from '@cli-template/utils/parse-package-json'
import { Command } from 'commander'
import { type ShortTaskArgument, shortTaskAction, shortTaskArgumentSchema } from './shortTask.js'

const logger = new Logger({
  namespace: 'taskExample',
})

export const initTaskExample = (packageJsonPath: string) => {
  const packageJson = parsePackageJson(packageJsonPath)

  const program = new Command()
  program.name(packageJson.name).description(packageJson.description).version(packageJson.version)

  program
    .command('short-task')
    .description('Some short task')
    .argument('<string>', 'Argument to be passed')
    .option('--boolean-key', 'Boolean option')
    .option('-t, --template-option <char>', 'Template option', '===')
    .option('--number-option <number>', 'Number option', '1')
    .action(async (arg: ShortTaskArgument['arg'], options: ShortTaskArgument['options']) => {
      logger.header('Executing short task...')
      const endProfile = logger.profile('short-task')
      const parsedOptions = shortTaskArgumentSchema.parse({ arg, options })

      await shortTaskAction(parsedOptions)
      endProfile()
    })

  program.parse()
}
