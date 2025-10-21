import { UserPhotosModule } from './typedef.ts';

const { User, UserPhoto } = UserPhotosModule;

const userPhotoResolver = UserPhoto.$fields({
	id: UserPhoto.id.key('id'),
	userId: UserPhoto.userId.key('userId'),
	url: UserPhoto.url.key('url'),
});

const userPhotosResolver = User.photos.resolve(({ source }) => {
	const userPhotos = Array.from({ length: 10 }).map((_, i) => ({
		id: `u${source.id}_p${i}`,
		userId: source.id,
		url: `https://baeta.io/user/${source.id}/photo/${i}.png`,
	}));
	return userPhotos;
});

export default UserPhotosModule.$schema({
	UserPhoto: userPhotoResolver,
	User: User.$fields({
		photos: userPhotosResolver,
	}),
});
