import type { ActionContextType } from '../types.js'
import type { CatCommandConfigType } from './cat-command-configuration.js'

const CAT_COMMAND_STDOUT_NAMESPACE = 'cat-command-action'

export const catCommandAction = async ({ argument, options }: CatCommandConfigType, ctx: ActionContextType) => {
  const debug = ctx.debug.extend(CAT_COMMAND_STDOUT_NAMESPACE)
  const logger = ctx.logger.extend({ namespace: CAT_COMMAND_STDOUT_NAMESPACE })

  debug.log('Starting short task action with config:', { argument, options })

  debug.error('This is an error message')
  logger.error('This is an error message from logger')
}
