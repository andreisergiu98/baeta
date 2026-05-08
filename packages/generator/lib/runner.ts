import type { Ctx, GeneratorPluginV1, GeneratorPluginV1Fn } from '@baeta/generator-sdk';

export function createRunner(
	ctx: Ctx,
	plugins: GeneratorPluginV1[],
	getFn: (plugin: GeneratorPluginV1) => GeneratorPluginV1Fn,
	onStart?: (plugin: GeneratorPluginV1) => Promise<void>,
	onFinish?: (plugin: GeneratorPluginV1) => Promise<void>,
) {
	let i = 0;

	const next = async (): Promise<void> => {
		const plugin = plugins[i++];

		if (!plugin) {
			return;
		}

		const fn = getFn(plugin);

		await onStart?.(plugin);

		await fn(ctx, async () => {
			await onFinish?.(plugin);
			return await next();
		});
	};

	return next;
}

export function startRunner(
	ctx: Ctx<unknown>,
	plugins: GeneratorPluginV1[],
	getFn: (plugin: GeneratorPluginV1) => GeneratorPluginV1Fn,
	onStart?: (plugin: GeneratorPluginV1) => Promise<void>,
	onFinish?: (plugin: GeneratorPluginV1) => Promise<void>,
) {
	const run = createRunner(ctx, plugins, getFn, onStart, onFinish);
	return run();
}
