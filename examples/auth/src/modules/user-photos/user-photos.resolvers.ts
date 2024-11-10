import { db } from '../../lib/db/prisma.ts';
import { getUserPhotosModule } from './typedef.ts';

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
