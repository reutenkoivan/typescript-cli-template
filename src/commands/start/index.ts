import { CommandRegistrar } from "@models/project";
import { startAction } from "@commands/start/startAction";
import { StartCommandOptionsModel } from "@commands/start/model";

export const startCommandRegistrar: CommandRegistrar = (program) => {
    program.command('start')
        .description('Start the application')
        .option('-e, --enable-logs', 'Enable logs')
        .action((options) => {
            startAction(StartCommandOptionsModel.parse(options))
        });
}
