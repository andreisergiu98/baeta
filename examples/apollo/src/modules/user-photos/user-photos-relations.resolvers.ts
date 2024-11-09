import { db } from '../../lib/db/prisma.ts';
import { getUserPhotosModule } from './typedef.ts';
import { userPhotoCache } from './user-photos-cache.ts';

const { User } = getUserPhotosModule();

User.photos(({ root }) => {
	return db.user
		.findUnique({
			where: {
				id: root.id,
			},
		})
		.photos();
});

User.photos.$use(userPhotoCache.createMiddleware(User.photos.$cacheRef, {}));

User.photos.$auth({
	$granted: 'readUserPhotos',
});
