import yargs from 'yargs';
import build from './commands/build';
import generate from './commands/generate';

export { createConfig } from './lib/config';
export type { BaetaOptions } from './lib/config';

yargs(process.argv.slice(2))
  .scriptName('baeta')
  .command(build)
  .command(generate)
  .demandCommand()
  .version(false)
  .help().argv;
