import { defineOptions } from '@baeta/builder/dev-watch';

export default defineOptions({
  ignore: ['dist/'],
  onEvent: (_, spawn) => {
    return spawn('yarn build');
  },
});
