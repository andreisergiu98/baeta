import { CacheRef } from '@baeta/extension-cache';
import { db } from '../../lib/db/prisma.ts';
import { createEdges } from '../../utils/pagination.ts';
import { getUserPhotosModule } from './typedef.ts';

import type * as Types from '../../__generated__/types.ts';

const { User, UserPhoto } = getUserPhotosModule();

const userPhotoCache = UserPhoto.$createCache({});

export function userPhotosConnectionRef() {
	return new CacheRef<Types.UserPhoto[], Types.User, Types.UserPhotosConnectionArgs>(
		'User',
		'photosConnection-custom',
		User.photosConnection.$cacheRef.getHash(),
	);
}

User.photosConnection(async ({ args, root }) => {
	const photos = await db.user
		.findUnique({
			where: {
				id: root.id,
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

	userPhotoCache.saveQueryResult(userPhotosConnectionRef(), photos, {
		args,
		parentRef: root.id,
	});

	return createEdges(photos ?? [], args.page.cursor, args.page.limit, (photo) => photo.id);
});

User.photosConnection.$use(async (params, next) => {
	const cached = await userPhotoCache.getQueryResult(userPhotosConnectionRef(), {
		args: params.args,
		parentRef: params.root.id,
	});

	if (cached) {
		return createEdges(
			cached.query,
			params.args.page.cursor,
			params.args.page.limit,
			(photo) => photo.id,
		);
	}

	return next();
});
