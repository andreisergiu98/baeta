import { db } from '../../lib/db/prisma.ts';
import { UserPhotosModule } from './typedef.ts';
import { userPhotoCache } from './user-photos.cache.ts';

const { User, UserPhoto } = UserPhotosModule;

const userPhotosResolver = User.photos
	.$useCache(userPhotoCache)
	// OR
	.use(userPhotoCache.createMiddleware(User.photos.$cacheRef))
	.resolve(({ source }) => {
		return db.user
			.findUnique({
				where: {
					id: source.id,
				},
			})
			.photos();
	});

export default UserPhotosModule.$schema({
	UserPhoto: UserPhoto.$fields({
		id: UserPhoto.id.key('id'),
		url: UserPhoto.url.key('url'),
	}),
	User: User.$fields({
		photos: userPhotosResolver,
	}),
});
