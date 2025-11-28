import { z } from 'zod';
import { UserModule } from './typedef.ts';

const { User } = UserModule;

const UserCacheSchema = z.object({
	id: z.string(),
	email: z.string(),
	lastName: z.string(),
	givenName: z.string().nullable(),
	profile: z.string().nullable(),
	phoneNumber: z.string().nullable(),
	birthday: z.date().nullable(),
});

export const userCache = User.$createCache({
	revision: 2,
	parse: (value) => UserCacheSchema.parse(JSON.parse(value)),
	serialize: (value) => JSON.stringify(UserCacheSchema.encode(value)),
});
