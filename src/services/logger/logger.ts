
type LogLevel = 'log' | 'error' | 'warn' | 'info' | 'debug'

export class LoggerService {
    logLevel: LogLevel = 'log'

    constructor() {
        this.log = console.log
        this.error = console.error
        this.warn = console.warn
        this.info = console.info
        this.debug = console.debug
    }

    setLogLevel(logLevel: LogLevel) {
        this.logLevel = logLevel
    }

    log(...args: any[]) {
        console.log(...args)
    }
    error(...args: any[]) {
        console.error(...args)
    }
    warn(...args: any[]) {
        console.warn(...args)
    }
    info(...args: any[]) {
        console.info(...args)
    }
    debug(...args: any[]) {
        console.debug(...args)
    }
}

export const loggerService = new LoggerService()
