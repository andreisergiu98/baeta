import { createCache, defineQuery } from '@baeta/cache';
import { z } from 'zod';
import { db } from '../../lib/db/prisma.ts';
import { redisClient } from '../../lib/redis.ts';

const UserCacheSchema = z.object({
	id: z.string(),
	email: z.string(),
	lastName: z.string(),
	givenName: z.string().nullable(),
	profile: z.string().nullable(),
	phoneNumber: z.string().nullable(),
	birthday: z.date().nullable(),
});

const findUser = defineQuery({
	resolve: async (args: { id: string | null; email: string | null }) => {
		return await db.user.findUnique({
			where: {
				id: args.id ?? undefined,
				email: args.email ?? undefined,
			},
		});
	},
	indexArgsBy: {
		id: true,
		email: true,
	},
	onInsert(items, helpers) {
		const args = items.flatMap((item) => [{ id: item.id }, { email: item.email }] as const);
		return helpers.invalidateByArgs(args);
	},
});

const findUsers = defineQuery({
	resolve: async () => {
		return await db.user.findMany();
	},
	onDelete(_pairs, helpers) {
		return helpers.invalidateAll();
	},
	onInsert(_items, helpers) {
		return helpers.invalidateAll();
	},
});

export const userCache = createCache(redisClient, {
	revision: 2,
	name: 'UserCache',
	parse: (value) => UserCacheSchema.parse(JSON.parse(value)),
	serialize: (value) => JSON.stringify(UserCacheSchema.encode(value)),
})
	.withQueries({
		findUser,
		findUsers,
	})
	.build();
