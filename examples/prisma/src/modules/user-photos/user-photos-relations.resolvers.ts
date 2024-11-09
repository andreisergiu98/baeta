import { db } from '../../lib/db/prisma.js';
import { getUserPhotosModule } from './typedef.js';
import { userPhotoCache } from './user-photos-cache.js';

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
