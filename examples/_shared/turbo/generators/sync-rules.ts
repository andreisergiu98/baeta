export interface SyncRule {
	from: string;
	to: string;
	dirs: PathMapping[];
	files: PathMapping[];
	transforms: TextTransform[];
	ignore: string[];
}

interface TextTransform {
	file: string;
	replacements: [search: string, replace: string][];
}

type PathMapping = `${string}:${string}`;

export function pathsFromMapping(mapping: PathMapping): [string, string] {
	const [relativeSrc, relativeDest] = mapping.split(':');
	return [relativeSrc, relativeDest];
}

function merge(
	rule: Pick<SyncRule, 'from' | 'to'> & Partial<SyncRule>,
	baseRule: Partial<SyncRule>,
): SyncRule {
	return {
		from: rule.from,
		to: rule.to,
		files: (rule.files ?? []).concat(baseRule.files ?? []),
		dirs: (rule.dirs ?? []).concat(baseRule.dirs ?? []),
		transforms: (rule.transforms ?? []).concat(baseRule.transforms ?? []),
		ignore: (rule.ignore ?? []).concat(baseRule.ignore ?? []),
	};
}

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

export const syncRules: SyncRule[] = [
	merge(
		{
			from: '_shared/base',
			to: 'yoga',
		},
		baseDefaults,
	),
	merge(
		{
			from: '_shared/base',
			to: 'apollo',
			ignore: ['app.ts'],
		},
		baseDefaults,
	),
	merge(
		{
			from: '_shared/base',
			to: 'cloudflare',
			ignore: ['types/context.ts'],
		},
		baseDefaults,
	),
	merge(
		{
			from: '_shared/subscriptions',
			to: 'apollo-ws',
			ignore: ['lib/pubsub.ts', 'types/context.ts', 'app.ts'],
			transforms: [
				{
					file: 'src/modules/user/user.resolvers.ts',
					replacements: [['ctx.pubsub.subscribe', 'ctx.pubsub.asyncIterableIterator']],
				},
				{
					file: 'src/modules/user/user.resolvers.ts',
					replacements: [['ctx.pubsub.publish', 'await ctx.pubsub.publish']],
				},
			],
		},
		subscriptionsDefaults,
	),
	merge(
		{
			from: '_shared/subscriptions',
			to: 'yoga-sse',
		},
		subscriptionsDefaults,
	),
	merge(
		{
			from: '_shared/subscriptions',
			to: 'yoga-ws',
			ignore: ['app.ts'],
		},
		subscriptionsDefaults,
	),
	merge(
		{
			from: '_shared/subscriptions',
			to: 'cloudflare-ws',
			ignore: ['lib/pubsub.ts', 'types/context.ts', 'app.ts'],
			transforms: [
				{
					file: 'src/modules/user/user.resolvers.ts',
					replacements: [
						['ctx.pubsub.publish', 'await ctx.publish'],
						['ctx.pubsub.subscribe', 'ctx.subscribe'],
					],
				},
			],
		},
		subscriptionsDefaults,
	),
	// Prisma
	merge(
		{
			from: '_shared/prisma',
			to: 'prisma',
			dirs: ['modules:src/modules'],
		},
		prismaDefaults,
	),
	merge(
		{
			from: '_shared/prisma',
			to: 'auth',
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
	merge(
		{
			from: '_shared/prisma',
			to: 'cache',
		},
		prismaDefaults,
	),
	merge(
		{
			from: '_shared/prisma',
			to: 'relay-pagination',
		},
		prismaDefaults,
	),
];
