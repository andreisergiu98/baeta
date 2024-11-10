import { getUserPhotosModule } from './typedef.ts';

const { User } = getUserPhotosModule();

User.photos.$auth({
	$granted: 'readUserPhotos',
});
