import type { Ctx, GeneratorPluginV1, GeneratorPluginV1Fn } from '@baeta/generator-sdk';

export function createRunner(
	ctx: Ctx,
	plugins: GeneratorPluginV1[],
	getFn: (plugin: GeneratorPluginV1) => GeneratorPluginV1Fn,
	onStart?: (plugin: GeneratorPluginV1) => void,
	onFinish?: (plugin: GeneratorPluginV1) => void,
) {
	let i = 0;

	const next = async () => {
		const plugin = plugins[i++];

		if (!plugin) {
			return Promise.resolve();
		}

		const fn = getFn(plugin);

		onStart?.(plugin);

		await fn(ctx, async () => {
			onFinish?.(plugin);
			return next();
		});
	};

	return next;
}

export function startRunner(
	ctx: Ctx<unknown>,
	plugins: GeneratorPluginV1[],
	getFn: (plugin: GeneratorPluginV1) => GeneratorPluginV1Fn,
	onStart?: (plugin: GeneratorPluginV1) => void,
	onFinish?: (plugin: GeneratorPluginV1) => void,
) {
	const run = createRunner(ctx, plugins, getFn, onStart, onFinish);
	return run();
}
