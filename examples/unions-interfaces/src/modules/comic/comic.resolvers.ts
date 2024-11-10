import { getComicModule } from './typedef.ts';

const { Readable } = getComicModule();

Readable.$resolveType(({ value }) => {
	if (value.__typename) {
		return value.__typename;
	}

	if ('artist' in value) {
		return 'Comic';
	}

	return 'Book';
});
