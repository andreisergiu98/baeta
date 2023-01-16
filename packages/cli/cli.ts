import yargs from 'yargs';
import { createBuildCommand } from './commands/build';
import { createGenerateCommand } from './commands/generate';
import { loadConfig } from './lib/config';

loadConfig().then((config) => {
  yargs(process.argv.slice(2))
    .scriptName('baeta')
    .command(createBuildCommand(config?.config, config?.location))
    .command(createGenerateCommand(config?.config, config?.location))
    .demandCommand()
    .version(false)
    .help().argv;
});
