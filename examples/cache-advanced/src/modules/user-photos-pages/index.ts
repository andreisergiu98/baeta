import { CacheRef } from '@baeta/extension-cache';
import type {
	UserPhoto,
	UserPhotosConnectionArgs,
	User as UserType,
} from '../../__generated__/types.ts';
import { db } from '../../lib/db/prisma.ts';
import { createEdges } from '../../utils/pagination.ts';
import { userPhotoCache } from '../user-photos/user-photos.cache.ts';
import { UserPhotosPagesModule } from './typedef.ts';

const { User } = UserPhotosPagesModule;

const userPhotosConnectionRef = new CacheRef<UserPhoto[], UserType, UserPhotosConnectionArgs>(
	'User',
	'photosConnection-custom',
);

const userPhotosConnectionResolver = User.photosConnection
	.use(async (next, { source, args }) => {
		const cached = await userPhotoCache.getQueryResult(userPhotosConnectionRef, {
			args,
			parentRef: source.id,
		});
		if (cached) {
			return createEdges(cached.query, args.page.cursor, args.page.limit, (photo) => photo.id);
		}
		return await next();
	})
	.resolve(async ({ source, args }) => {
		const photos = await db.user
			.findUnique({
				where: {
					id: source.id,
				},
			})
			.photos({
				take: args.page.limit + 2,
				skip: 0,
				cursor: args.page.cursor
					? {
							id: args.page.cursor,
						}
					: undefined,
			});

		userPhotoCache.saveQueryResult(userPhotosConnectionRef, photos, {
			args,
			parentRef: source.id,
		});

		return createEdges(photos ?? [], args.page.cursor, args.page.limit, (photo) => photo.id);
	});

export default UserPhotosPagesModule.$schema({
	User: User.$fields({
		photosConnection: userPhotosConnectionResolver,
	}),
});
