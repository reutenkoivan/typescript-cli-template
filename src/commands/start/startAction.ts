import { z } from "zod";
import {fsService} from "@services/fs";
import {loggerService} from "@services/logger";
import {CommandResolver} from "@models/project";
import { StartCommandOptionsModel } from "@commands/start/model";

export type StartCommandOptions = z.infer<typeof StartCommandOptionsModel>

const patterns = {
  srcDir: '**/src',
}

export const startAction: CommandResolver<StartCommandOptions> = async (options) => {
  loggerService.info('Starting application...')

  if (options.enableLogs) {
    const dirs = await fsService.findDirectory(patterns.srcDir)

    loggerService.info('Found directories:', dirs)
  }

  loggerService.info('Application started')
}
