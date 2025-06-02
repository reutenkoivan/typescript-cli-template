import debug from 'debug'

export type DebugConfig = string | string[]

export class Debug {
  private namespace: string

  constructor(namespace: DebugConfig) {
    this.namespace = Array.isArray(namespace) ? namespace.join(':') : namespace
  }

  private formatMessage(args: unknown[]): string {
    return args
      .map((arg) => {
        if (typeof arg === 'object' && arg !== null) {
          return JSON.stringify(arg, null, 2)
        }

        return arg
      })
      .join(' ')
  }

  log(...args: unknown[]): void {
    debug(`${this.namespace}:log`)(this.formatMessage(args))
  }
  error(...args: unknown[]): void {
    debug(`${this.namespace}:error`)(this.formatMessage(args))
  }

  extend(namespace: DebugConfig): Debug {
    return new Debug(
      Array.isArray(namespace) ? [...this.namespace.split(':'), ...namespace] : `${this.namespace}:${namespace}`,
    )
  }
}
