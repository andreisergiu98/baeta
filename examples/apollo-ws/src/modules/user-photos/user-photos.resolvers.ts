import { getUserPhotosModule } from './typedef.js';

const { User } = getUserPhotosModule();

User.photos(({ root }) => {
	return Array.from({ length: 10 }).map((_, i) => ({
		id: `u${root.id}_p${i}`,
		userId: root.id,
		url: `https://baeta.io/user/${root.id}/photo/${i}.png`,
	}));
});
