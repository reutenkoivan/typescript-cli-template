import * as winston from 'winston'
import z from 'zod/v4'
import { Elements } from './elements.js'

export type LoggerConfig = {
  namespace: string
  level?: winston.Logger['level']
  filePath?: string
  errorFilePath?: string
}

export class Logger {
  private print: winston.Logger
  private elements = new Elements()
  private config: LoggerConfig

  constructor(config: LoggerConfig) {
    this.config = config
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

  extend(config: Partial<LoggerConfig> & Pick<LoggerConfig, 'namespace'>): Logger {
    return new Logger({ ...this.config, ...config, namespace: `${this.config.namespace}:${config.namespace}` })
  }

  log(message: string) {
    this.print.info(message)
  }

  error(message: string) {
    this.print.error(message)
  }

  zodError(error: z.ZodError) {
    for (const line of z.prettifyError(error).split('\n')) {
      this.print.error(line)
    }
  }

  header(text: string) {
    const formattedText = this.elements.shelf(text)

    for (const line of formattedText.split('\n')) {
      this.print.info(line)
    }
  }
}
