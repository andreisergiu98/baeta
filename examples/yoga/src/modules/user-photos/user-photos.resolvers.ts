import { UserPhotosModule } from './typedef.ts';

const { User, UserPhoto } = UserPhotosModule;

export const userPhotoResolver = UserPhoto.$fields({
	id: UserPhoto.id.key('id'),
	userId: UserPhoto.userId.key('userId'),
	url: UserPhoto.url.key('url'),
});

export const userResolver = User.$fields({
	photos: User.photos.resolve(({ source }) => {
		return Array.from({ length: 10 }).map((_, i) => ({
			id: `u${source.id}_p${i}`,
			userId: source.id,
			url: `https://baeta.io/user/${source.id}/photo/${i}.png`,
		}));
	}),
});
