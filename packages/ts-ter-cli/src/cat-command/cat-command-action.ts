import { Debug } from '@repo/utils/debug'
import { Logger } from '@repo/utils/logger'
import { sleep } from '@repo/utils/sleep'
import type { CatCommandOptionsType } from './cat-command-configuration.js'

const CAT_COMMAND_LOGGER_NAMESPACE = 'ts-ter:cat-command-action'

const debug = new Debug(CAT_COMMAND_LOGGER_NAMESPACE)
const logger = new Logger({
  namespace: CAT_COMMAND_LOGGER_NAMESPACE,
})

export const catCommandAction = async (argument: string, options: CatCommandOptionsType) => {
  debug.log('Starting short task action with config:', options)

  await sleep(1000)

  debug.error('This is an error message')
  logger.error('This is an error message from logger')
}
