import { Command } from "commander"

export type CommandResolver<T> = (options: T) => void | Promise<void>
export type CommandRegistrar = (program: Command) => void
