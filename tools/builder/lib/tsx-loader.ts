import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { transform } from 'oxc-transform';

export async function load(
	url: string,
	context: unknown,
	nextLoad: (url: string, context: unknown) => Promise<unknown>,
) {
	if (!url.endsWith('.tsx')) {
		return await nextLoad(url, context);
	}
	const filename = fileURLToPath(url);
	const source = await readFile(filename, 'utf-8');
	const { code, map } = await transform(filename, source, {
		jsx: { runtime: 'automatic', importSource: 'react' },
		sourcemap: true,
	});
	const inlineMap = map
		? `//# sourceMappingURL=data:application/json;base64,${Buffer.from(JSON.stringify(map)).toString('base64')}`
		: '';
	const codeWithMap = `${code}\n${inlineMap}`;
	return { format: 'module', source: codeWithMap, shortCircuit: true };
}
