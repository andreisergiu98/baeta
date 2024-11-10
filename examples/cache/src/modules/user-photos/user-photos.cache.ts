import { getUserPhotosModule } from './typedef.ts';

const { UserPhoto, User } = getUserPhotosModule();

export const userPhotoCache = UserPhoto.$createCache({});

User.photos.$useCache(userPhotoCache, {});
// OR
// User.photos.$use(userPhotoCache.createMiddleware(User.photos.$cacheRef, {}));
