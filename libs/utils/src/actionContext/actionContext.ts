import { Debug, type DebugConfig } from '../debug/index.js'
import { Logger, type LoggerConfig } from '../logger/index.js'

export type CreateActionContextType = {
  logger: LoggerConfig
  debug: DebugConfig
}

export const createActionContext = (config: CreateActionContextType) => {
  return {
    logger: new Logger(config.logger),
    debug: new Debug(config.debug),
  }
}

export type ActionContextType = ReturnType<typeof createActionContext>
