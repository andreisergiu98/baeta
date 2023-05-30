import { createHandler } from '@baeta/builder/dev-watch';

export default createHandler({
  dir: __dirname,
  ignore: ['.turbo/', 'dist/', 'tsup.watch.ts'],
  onEvent: async (event, spawn) => {
    return spawn('yarn build');
  },
});
