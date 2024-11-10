import { getUserPhotosModule } from './typedef.js';

const { User } = getUserPhotosModule();

User.photos.$auth({
	$granted: 'readUserPhotos',
});
