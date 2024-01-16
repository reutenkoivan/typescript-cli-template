import { Command } from 'commander'
import pkg from '../package.json' assert { type: 'json' };
import { startCommandRegistrar } from "@commands/start";

const program = new Command();

program
    .name(pkg.name)
    .description(pkg.description)
    .version(pkg.version);

const commands = [
    startCommandRegistrar
]

for (const register of commands) {
    register(program)
}

program.parse(process.argv);
