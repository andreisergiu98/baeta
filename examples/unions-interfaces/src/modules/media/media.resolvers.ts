import { getMediaModule } from './typedef.ts';

const { Media, Query } = getMediaModule();

Media.$resolveType(({ value }) => {
	if (value.__typename) {
		return value.__typename;
	}

	if ('author' in value) {
		return 'Book';
	}

	if ('artist' in value) {
		return 'Comic';
	}

	if ('seasons' in value) {
		return 'TVShow';
	}

	return 'Movie';
});

Query.media(() => {
	return [
		{
			id: '1',
			title: 'The Book',
			author: 'Jon Doe',
			year: 2021,
		},
		{
			id: '2',
			title: 'The Movie',
			year: 2022,
		},
		{
			id: '3',
			title: 'The TV Show',
			year: 2023,
			seasons: 1,
		},
		{
			__typename: 'Movie',
			id: '4',
			title: 'The TV Show',
			year: 2023,
		},
	];
});
