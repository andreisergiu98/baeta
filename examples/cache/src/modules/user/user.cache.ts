import { UserModule } from './typedef.ts';

const { User } = UserModule;

export const userCache = User.$createCache({
	revision: 2,
});
