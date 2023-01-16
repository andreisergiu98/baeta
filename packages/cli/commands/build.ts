import { BaetaOptions } from '@baeta/config';
import { Builder, BuilderWithGenerator } from '../components/builder';
import { createCommand } from '../utils/command';
import { renderComponent } from '../utils/render-component';

interface Args {
  watch?: boolean;
  generate?: boolean;
  onSuccess?: string;
  onError?: string;
}

export function createBuildCommand(config?: BaetaOptions, configPath?: string) {
  return createCommand<Args>({
    command: 'build',
    aliases: ['b'],
    describe: 'build a typescript application',
    builder: (yargs) => {
      return yargs
        .option('watch', {
          alias: 'w',
          boolean: true,
          describe: 'watch for changes',
        })
        .options('generate', {
          alias: 'g',
          boolean: true,
          describe: 'run generator before building',
        })
        .option('onSuccess', {
          string: true,
          describe: 'command to run on a successful build',
        })
        .option('onError', {
          alias: 'f',
          string: true,
          describe: 'command to run on a build error',
        });
    },
    handler: createHandler(config, configPath),
  });
}

function createHandler(config?: BaetaOptions, configPath?: string) {
  return (args: Args) => {
    if (!config) {
      throw new Error('0');
    }

    if (args.generate) {
      return renderComponent(BuilderWithGenerator, args, {
        watchConfig: args.watch,
        initialConfig: config,
        configPath: configPath || '',
      });
    }
    return renderComponent(Builder, args, {
      watchConfig: args.watch,
      initialConfig: config,
      configPath: configPath || '',
    });
  };
}
