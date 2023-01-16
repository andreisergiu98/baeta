import { BaetaOptions } from '@baeta/config';
import { Generator } from '../components/generator';
import { createCommand } from '../utils/command';
import { renderComponent } from '../utils/render-component';

interface Args {
  watch?: boolean;
  skipInitial?: boolean;
}

export function createGenerateCommand(config?: BaetaOptions, configPath?: string) {
  return createCommand<Args>({
    command: 'generate',
    aliases: ['g'],
    describe: 'generate types and module definitions',
    builder: (yargs) => {
      return yargs
        .option('watch', {
          alias: 'w',
          boolean: true,
          describe: 'watch for changes',
        })
        .option('skipInitial', {
          alias: 's',
          boolean: true,
          describe: 'skip initial generation when running in watch mode',
        });
    },
    handler: createHandler(config, configPath),
  });
}

function createHandler(config?: BaetaOptions, configPath?: string) {
  return (args: Args) => {
    if (!config) {
      throw new Error('');
    }

    return renderComponent(
      Generator,
      {
        watch: args.watch,
        skipInitial: args.skipInitial,
      },
      {
        watchConfig: args.watch,
        initialConfig: config,
        configPath: configPath || '',
      }
    );
  };
}
