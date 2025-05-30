import type { VoidFunction } from '@cli-template/typescript-config'
import * as winston from 'winston'
import { Elements } from './elements.js'

type LoggerConfig = {
  namespace: string
  level?: winston.Logger['level']
  filePath?: string
  errorFilePath?: string
}

export class Logger {
  private print: winston.Logger
  private elements = new Elements()

  constructor(config: LoggerConfig) {
    this.print = winston.createLogger({
      level: config.level ?? 'info',
      defaultMeta: { namespace: config.namespace },
      transports: [
        new winston.transports.Console({
          format: winston.format.cli({
            all: true,
          }),
        }),
      ],
    })

    if (config.filePath) {
      this.print.add(new winston.transports.File({ filename: config.filePath }))
    }

    if (config.errorFilePath) {
      this.print.add(new winston.transports.File({ filename: config.errorFilePath, level: 'error' }))
    }
  }

  log(message: string) {
    this.print.info(message)
  }

  header(text: string) {
    const formattedText = this.elements.shelf(text)

    for (const line of formattedText.split('\n')) {
      this.print.info(line)
    }
  }

  profile<T extends string>(message: T): VoidFunction {
    this.print.profile(message)

    return () => {
      this.print.profile(message)
    }
  }
}
