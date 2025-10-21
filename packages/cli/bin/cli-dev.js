import { createJiti } from 'jiti';

const jiti = createJiti(import.meta.url, {
	tryNative: false,
	interopDefault: true,
	jsx: {
		runtime: 'automatic',
		importSource: 'react',
	},
	extensions: ['.ts', '.tsx'],
	rebuildFsCache: true,
});

await jiti.import('./cli.ts');
