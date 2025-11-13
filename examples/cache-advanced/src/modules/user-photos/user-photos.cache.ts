import { z } from 'zod';
import { UserPhotosModule } from './typedef.ts';

const { UserPhoto } = UserPhotosModule;

const UserPhotoCacheSchema = z.object({
	id: z.string(),
	userId: z.string(),
	url: z.string(),
});

export const userPhotoCache = UserPhoto.$createCache({
	parse: (value) => UserPhotoCacheSchema.parse(JSON.parse(value)),
	serialize: (value) => JSON.stringify(UserPhotoCacheSchema.encode(value)),
});
