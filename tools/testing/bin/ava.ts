import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

type Run = () => Promise<void>;
const require = createRequire(import.meta.url);
const cliPath = resolve(require.resolve('ava'), '../../lib/cli.js');
const result = (await import(pathToFileURL(cliPath).href)) as { default: Run } | Run;
const run = 'default' in result ? result.default : result;
const argv = process.argv;
process.argv = [argv[0], cliPath, ...argv.slice(2)];
await run();
