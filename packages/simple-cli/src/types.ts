import type { Debug } from '@repo/debug'
import type { Logger } from '@repo/logger'

export type ActionContextType = {
  logger: Logger
  debug: Debug
}
