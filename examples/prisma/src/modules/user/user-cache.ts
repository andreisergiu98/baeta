import { getUserModule } from './typedef.js';

const { User } = getUserModule();

export const userCache = User.$createCache({
	revision: 2,
});
