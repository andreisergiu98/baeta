import { getUserPhotosModule } from './typedef.js';

const { UserPhoto } = getUserPhotosModule();

export const userPhotoCache = UserPhoto.$createCache({});
