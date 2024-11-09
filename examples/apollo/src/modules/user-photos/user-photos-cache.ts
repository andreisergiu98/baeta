import { getUserPhotosModule } from './typedef.ts';

const { UserPhoto } = getUserPhotosModule();

export const userPhotoCache = UserPhoto.$createCache({});
