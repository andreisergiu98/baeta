import { db } from '../../lib/db/prisma.ts';
import { createEdges } from '../../utils/pagination.ts';
import { UserPhotosPagesModule } from './typedef.ts';

const { User } = UserPhotosPagesModule;

const userPhotosConnectionResolver = User.photosConnection.resolve(async ({ source, args }) => {
	const photos = await db.user
		.findUnique({
			where: {
				id: source.id,
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

	return createEdges(photos ?? [], args.page.cursor, args.page.limit, (photo) => photo.id);
});

export default UserPhotosPagesModule.$schema({
	User: User.$fields({
		photosConnection: userPhotosConnectionResolver,
	}),
});
