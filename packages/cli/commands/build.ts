import { Builder, BuilderWithGenerator } from '../components/builder';
import { createCommand } from '../utils/command';
import { renderComponent } from '../utils/render-component';

interface Args {
  watch?: boolean;
  generate?: boolean;
  onSuccess?: string;
  onError?: string;
}

export default createCommand<Args>({
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
  handler,
});

async function handler(args: Args) {
  if (args.generate) {
    return renderComponent(BuilderWithGenerator, args, {
      watchConfig: args.watch,
    });
  }
  return renderComponent(Builder, args, {
    watchConfig: args.watch,
  });
}
