import { makeErrorMessage } from '../components/errors';
import { Generator } from '../components/generator';
import { LoadedBaetaConfig } from '../lib/config';
import { createCommand } from '../utils/command';
import { renderComponent } from '../utils/render-component';

interface Args {
  watch?: boolean;
  skipInitial?: boolean;
}

export function createGenerateCommand(config?: LoadedBaetaConfig) {
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
    handler: createHandler(config),
  });
}

function createHandler(config?: LoadedBaetaConfig) {
  return (args: Args) => {
    if (!config) {
      console.log(makeErrorMessage("baeta.js is required to run 'generate'"));
      return;
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
      }
    );
  };
}
