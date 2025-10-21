import { UserPhotosModule } from './typedef.ts';
import { userPhotoResolver, userResolver } from './user-photos.resolvers.ts';

export default UserPhotosModule.$schema({
	UserPhoto: userPhotoResolver,
	User: userResolver,
});
