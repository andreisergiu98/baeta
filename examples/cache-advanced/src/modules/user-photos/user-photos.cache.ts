import { UserPhotosModule } from './typedef.ts';

const { UserPhoto } = UserPhotosModule;

export const userPhotoCache = UserPhoto.$createCache();
