import { getUserModule } from './typedef.ts';

const { User } = getUserModule();

export const userCache = User.$createCache({
	revision: 2,
});
