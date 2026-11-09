import type { Ctx, GeneratorPluginV1Fn, GeneratorPluginV1WithId } from '@baeta/generator-sdk';

export function createRunner(
	ctx: Ctx,
	plugins: GeneratorPluginV1WithId[],
	getFn: (plugin: GeneratorPluginV1WithId) => GeneratorPluginV1Fn,
	onStart?: (plugin: GeneratorPluginV1WithId) => Promise<void>,
	onFinish?: (plugin: GeneratorPluginV1WithId) => Promise<void>,
) {
	let i = 0;
	const next = async (): Promise<void> => {
		const plugin = plugins[i++];
		if (!plugin) {
			return;
		}
		const fn = getFn(plugin);
		await onStart?.(plugin);
		await fn(ctx, next);
		await onFinish?.(plugin);
	};
	return next;
}

export function startRunner(
	ctx: Ctx<unknown>,
	plugins: GeneratorPluginV1WithId[],
	getFn: (plugin: GeneratorPluginV1WithId) => GeneratorPluginV1Fn,
	onStart?: (plugin: GeneratorPluginV1WithId) => Promise<void>,
	onFinish?: (plugin: GeneratorPluginV1WithId) => Promise<void>,
) {
	const run = createRunner(ctx, plugins, getFn, onStart, onFinish);
	return run();
}
