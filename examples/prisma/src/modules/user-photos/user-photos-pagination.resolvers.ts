import { CacheRef } from '@baeta/extension-cache';
import { ne } from '@faker-js/faker';
import type * as Types from '../../__generated__/types.js';
import { db } from '../../lib/db/prisma.js';
import { createEdges } from '../../utils/pagination.js';
import { getUserPhotosModule } from './typedef.js';
import { userPhotoCache } from './user-photos-cache.js';

const { User } = getUserPhotosModule();

export function customPhotosRef() {
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

	userPhotoCache.saveQueryResult(customPhotosRef(), photos, {
		args,
		parentRef: root.id,
	});

	return createEdges(photos ?? [], args.page.cursor, args.page.limit, (photo) => photo.id);
});

User.photosConnection.$use(async (params, next) => {
	const cached = await userPhotoCache.getQueryResult(customPhotosRef(), {
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

User.photosConnection.$auth((params) => {
	if (params.args.page.limit <= 10) {
		return {
			$granted: 'readUserPhotos',
		};
	}

	return {
		$granted: 'readUserPhotos',
		hasAccess: 'admin',
	};
});
