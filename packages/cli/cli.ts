import yargs from 'yargs';
import { createBuildCommand } from './commands/build';
import { createGenerateCommand } from './commands/generate';
import { loadConfig } from './lib/config-loader';

process.on('exit', () => {
  const fixCursor = '\x1B[?25h';
  process.stdout.write(fixCursor);
});

loadConfig().then((config) => {
  yargs(process.argv.slice(2))
    .scriptName('baeta')
    .command(createBuildCommand(config))
    .command(createGenerateCommand(config))
    .demandCommand()
    .version(false)
    .help().argv;
});
