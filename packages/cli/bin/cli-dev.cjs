process.env.BAETA_CLI_DEV = '1';

const { register } = require('@baeta/build-tools/tsregister.cjs');

register({
  jsx: 'automatic',
});

require('../cli');
