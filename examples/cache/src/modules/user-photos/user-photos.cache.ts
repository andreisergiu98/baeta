import { createCache, defineQuery } from '@baeta/cache';
import { z } from 'zod';
import { db } from '../../lib/db/prisma.ts';
import { redisClient } from '../../lib/redis.ts';
import { UserPhotosModule } from './typedef.ts';

const { UserPhoto } = UserPhotosModule;

const UserPhotoCacheSchema = z.object({
	id: z.string(),
	userId: z.string(),
	url: z.string(),
});

export const userPhotoCache = createCache(redisClient, {
	name: 'UserPhotoCache',
	parse: (value) => UserPhotoCacheSchema.parse(JSON.parse(value)),
	serialize: (value) => JSON.stringify(UserPhotoCacheSchema.encode(value)),
})
	.withQueries({
		findUserPhotos: defineQuery({
			resolve: async (args: { userId: string }) => {
				return await db.user
					.findUnique({
						where: {
							id: args.userId,
						},
					})
					.photos();
			},
			indexArgsBy: {
				userId: true,
			},
			onInsert(items, helpers) {
				const args = items.map((item) => ({ userId: item.userId }));
				return helpers.invalidateByArgs(args);
			},
			onDelete(pairs, helpers) {
				const args = pairs
					.map((item) => item.previous && { userId: item.previous.userId })
					.filter((el) => el != null);
				return helpers.invalidateByArgs(args);
			},
		}),
		findPhotosConnection: defineQuery({
			resolve: async (args: { userId: string; cursor?: string | null; limit: number }) => {
				return await db.user
					.findUnique({
						where: {
							id: args.userId,
						},
					})
					.photos({
						take: args.limit + 2,
						skip: 0,
						cursor: args.cursor
							? {
									id: args.cursor,
								}
							: undefined,
					});
			},
			indexArgsBy: {
				userId: true,
			},
			onInsert(items, helpers) {
				const args = items.map((item) => ({ userId: item.userId }));
				return helpers.invalidateByArgs(args);
			},
			onDelete(pairs, helpers) {
				const args = pairs
					.map((item) => item.previous && { userId: item.previous.userId })
					.filter((el) => el != null);
				return helpers.invalidateByArgs(args);
			},
		}),
	})
	.build();
