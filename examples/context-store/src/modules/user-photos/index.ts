import { UserPhotosModule } from './typedef.ts';

const { User, UserPhoto } = UserPhotosModule;

const userPhotosResolver = User.photos.resolve(({ source }) => {
	return Array.from({ length: 10 }).map((_, i) => ({
		id: `u${source.id}_p${i}`,
		userId: source.id,
		url: `https://baeta.io/user/${source.id}/photo/${i}.png`,
	}));
});

export default UserPhotosModule.$schema({
	UserPhoto: UserPhoto.$fields({
		id: UserPhoto.id.key('id'),
		userId: UserPhoto.userId.key('userId'),
		url: UserPhoto.url.key('url'),
	}),
	User: User.$fields({
		photos: userPhotosResolver,
	}),
});
