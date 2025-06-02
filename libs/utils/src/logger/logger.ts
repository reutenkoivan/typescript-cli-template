import type { VoidFunction } from '@repo/typescript-config'
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
      transports: [new winston.transports.Console({ format: winston.format.cli({ all: true }) })],
    })

    const fileTransportFormat = winston.format.combine(
      winston.format.label({ label: config.namespace }),
      winston.format.timestamp(),
      winston.format.json(),
    )

    if (config.filePath) {
      this.print.add(new winston.transports.File({ filename: config.filePath, format: fileTransportFormat }))
    }

    if (config.errorFilePath) {
      this.print.add(
        new winston.transports.File({ filename: config.errorFilePath, level: 'error', format: fileTransportFormat }),
      )
    }
  }

  log(message: string) {
    this.print.info(message)
  }

  error(message: string) {
    this.print.error(message)
  }

  header(text: string) {
    const formattedText = this.elements.shelf(text)

    for (const line of formattedText.split('\n')) {
      this.print.info(line)
    }
  }
}
