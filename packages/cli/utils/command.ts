import { CommandModule } from 'yargs';

export function createCommand<Args>(options: CommandModule<Args, Args>) {
  return options;
}
