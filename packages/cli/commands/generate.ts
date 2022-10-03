import { Generator } from '../components/generator';
import { createCommand } from '../utils/command';
import { renderComponent } from '../utils/render-component';

interface Args {
  watch?: boolean;
  skipInitial?: boolean;
}

export default createCommand<Args>({
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
  handler,
});

async function handler(args: Args) {
  return renderComponent(
    Generator,
    {
      watch: args.watch,
      skipInitial: args.skipInitial,
    },
    {
      watchConfig: args.watch,
    }
  );
}
