import { UserPhotosModule } from './typedef.ts';
import { userPhotoCache } from './user-photos.cache.ts';

const { User, UserPhoto } = UserPhotosModule;

const userPhotosResolver = User.photos
	.map(({ source }) =>
		userPhotoCache.queries.findUserPhotos({
			userId: source.id,
		}),
	)
	.withDefault([]);

export default UserPhotosModule.$schema({
	UserPhoto: UserPhoto.$fields({
		id: UserPhoto.id.key('id'),
		url: UserPhoto.url.key('url'),
	}),
	User: User.$fields({
		photos: userPhotosResolver,
	}),
});
