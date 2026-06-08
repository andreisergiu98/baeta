import fs from 'node:fs';
import path from 'node:path';
import { type AddRule, defineGenerateConfig, merge, type SyncRule } from '@baeta/builder/generate';

const baseDefaults: Partial<SyncRule> = {
	dirs: ['modules:src/modules', 'types:src/types'],
	ignore: ['modules/index.ts'],
};

const subscriptionsDefaults: Partial<SyncRule> = {
	dirs: ['modules:src/modules', 'lib:src/lib', 'types:src/types'],
	files: ['app.ts:src/app.ts'],
	ignore: ['modules/index.ts'],
};

const prismaDefaults: Partial<SyncRule> = {
	dirs: ['lib:src/lib', 'types:src/types', 'migrations:migrations'],
	files: [
		'app.ts:src/app.ts',
		'dev.db:dev.db',
		'.gitignore:.gitignore',
		'prisma.config.ts:prisma.config.ts',
		'schema.prisma:schema.prisma',
	],
	ignore: ['modules/index.ts'],
	transforms: [
		{
			file: 'schema.prisma',
			replacements: [
				['output   = "./__generated__/prisma"', 'output   = "./src/__generated__/prisma"'],
			],
		},
		{
			file: 'prisma.config.ts',
			replacements: [[`'yarn node ./lib/db/seed.ts'`, `'yarn node ./src/lib/db/seed.ts'`]],
		},
		{
			file: '.gitignore',
			replacements: [['__generated__/prisma', 'src/__generated__/prisma']],
		},
	],
};

const base = 'examples/_shared/base';
const subscriptions = 'examples/_shared/subscriptions';
const prisma = 'examples/_shared/prisma';

function getExampleDirs(): string[] {
	const examplesDir = path.resolve(process.cwd(), 'examples');
	return fs
		.readdirSync(examplesDir, { withFileTypes: true })
		.filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
		.map((entry) => entry.name)
		.sort();
}

function buildGraphqlRc(): AddRule {
	const lines: string[] = ['projects:'];
	for (const name of getExampleDirs()) {
		lines.push(`  examples/${name}:`);
		lines.push('    schema:');
		lines.push(`      - "examples/${name}/src/modules/**/*.gql"`);
		lines.push('    include:');
		lines.push(`      - "examples/${name}/src/**/*.gql"`);
		lines.push('');
	}
	return { kind: 'add', to: '.graphqlrc.yml', content: lines.join('\n') };
}

const pubsubResolvers = 'src/modules/user/user.resolvers.ts';

export default defineGenerateConfig([
	merge({ from: base, to: 'examples/yoga' }, baseDefaults),
	merge({ from: base, to: 'examples/apollo', ignore: ['app.ts'] }, baseDefaults),
	merge({ from: base, to: 'examples/cloudflare', ignore: ['types/context.ts'] }, baseDefaults),
	merge(
		{
			from: subscriptions,
			to: 'examples/apollo-ws',
			ignore: ['lib/pubsub.ts', 'types/context.ts', 'app.ts'],
			transforms: [
				{
					file: pubsubResolvers,
					replacements: [['ctx.pubsub.subscribe', 'ctx.pubsub.asyncIterableIterator']],
				},
				{
					file: pubsubResolvers,
					replacements: [['ctx.pubsub.publish', 'await ctx.pubsub.publish']],
				},
			],
		},
		subscriptionsDefaults,
	),
	merge({ from: subscriptions, to: 'examples/yoga-sse' }, subscriptionsDefaults),
	merge({ from: subscriptions, to: 'examples/yoga-ws', ignore: ['app.ts'] }, subscriptionsDefaults),
	merge(
		{
			from: subscriptions,
			to: 'examples/cloudflare-ws',
			ignore: ['lib/pubsub.ts', 'types/context.ts', 'app.ts'],
			transforms: [
				{
					file: pubsubResolvers,
					replacements: [
						['ctx.pubsub.publish', 'await ctx.publish'],
						['ctx.pubsub.subscribe', 'ctx.subscribe'],
					],
				},
			],
		},
		subscriptionsDefaults,
	),
	merge({ from: prisma, to: 'examples/prisma', dirs: ['modules:src/modules'] }, prismaDefaults),
	merge(
		{
			from: prisma,
			to: 'examples/auth',
			ignore: ['app.ts'],
			transforms: [
				{
					file: 'src/app.ts',
					replacements: [
						[
							`	context: {
		pubsub,
	},`,
							`	context: {
		userId: '1', // Comment this line in order to 'logout' the user
		pubsub,
	},`,
						],
					],
				},
				{
					file: 'src/types/context.ts',
					replacements: [
						[
							`export type Context = {
	pubsub: PubSub<PubSubMap>;
};`,
							`export type Context = {
	userId?: string;
	pubsub: PubSub<PubSubMap>;
};`,
						],
					],
				},
			],
		},
		prismaDefaults,
	),
	merge({ from: prisma, to: 'examples/cache' }, prismaDefaults),
	merge({ from: prisma, to: 'examples/relay-pagination' }, prismaDefaults),
	buildGraphqlRc(),
]);
