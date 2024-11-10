import { db } from '../../lib/db/prisma.ts';
import { createEdges } from '../../utils/pagination.ts';
import { getUserPhotosModule } from './typedef.ts';

const { User } = getUserPhotosModule();

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

	return createEdges(photos ?? [], args.page.cursor, args.page.limit, (photo) => photo.id);
});
