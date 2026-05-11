import { createEdges } from '../../utils/pagination.ts';
import { userPhotoCache } from '../user-photos/user-photos.cache.ts';
import { UserPhotosPagesModule } from './typedef.ts';

const { User } = UserPhotosPagesModule;

const userPhotosConnectionResolver = User.photosConnection
	.map(({ source, args }) =>
		userPhotoCache.queries.findPhotosConnection({
			userId: source.id,
			cursor: args.page.cursor,
			limit: args.page.limit,
		}),
	)
	.map(({ source, args }) => {
		return createEdges(source ?? [], args.page.cursor, args.page.limit, (photo) => photo.id);
	});

export default UserPhotosPagesModule.$schema({
	User: User.$fields({
		photosConnection: userPhotosConnectionResolver,
	}),
});
