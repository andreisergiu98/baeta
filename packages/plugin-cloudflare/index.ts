import { resolve } from 'node:path';
import {
	databaseMigrations,
	durableObjectsMigrations,
	wsConnectionClassName,
} from '@baeta/cloudflare-subscriptions/sdk';
import { FileBlock, createPluginV1 } from '@baeta/generator-sdk';

export interface CloudflarePluginOptions {
	databaseId?: string;
	databaseName?: string;
	databaseBinding?: string;
	databaseMigrationsPath?: string;
	wsConnectionsBinding?: string;
}

export function cloudflarePlugin(options?: CloudflarePluginOptions) {
	return createPluginV1({
		name: 'cloudflare-plugin',
		actionName: 'cloudflare plugin',
		generate: async (ctx, next) => {
			await next();

			const migrationsPath = options?.databaseMigrationsPath ?? './migrations/subscriptions';

			const databaseConfiguration: string[] = [
				`binding = "${options?.databaseBinding ?? 'SUBSCRIPTIONS'}"`,
				`database_name = "${options?.databaseName ?? 'SUBSCRIPTIONS'}"`,
				`migrations_dir = "${migrationsPath}"`,
			];

			if (options?.databaseId) {
				databaseConfiguration.push(`database_id = "${options?.databaseId}"`);
			}

			const durableObjectsConfiguration: string[] = [
				`name = "${options?.wsConnectionsBinding ?? 'WS_CONNECTIONS'}"`,
				`class_name = "${wsConnectionClassName}"`,
			];

			for (const migration of durableObjectsMigrations) {
				durableObjectsConfiguration.push('\n[[migrations]]');
				durableObjectsConfiguration.push(`tag = "${migration.tag}"`);
				durableObjectsConfiguration.push(...migration.content);
			}

			const configStart = '# Generated by Baeta Cloudflare Plugin - Begin';
			const configEnd = '# Generated by Baeta Cloudflare Plugin - End';

			const configInner = `
[[d1_databases]]
${databaseConfiguration.join('\n')}

[[durable_objects.bindings]]
${durableObjectsConfiguration.join('\n')}
`;

			const file = new FileBlock(
				resolve(ctx.generatorOptions.cwd, 'wrangler.toml'),
				configInner,
				configStart,
				configEnd,
				'cloudflare',
			);

			ctx.fileManager.add(file);

			for (const migration of databaseMigrations) {
				ctx.fileManager.createAndAdd(
					resolve(ctx.generatorOptions.cwd, migrationsPath, `${migration.name}.sql`),
					migration.sql,
					'cloudflare',
				);
			}

			return next();
		},
	});
}
