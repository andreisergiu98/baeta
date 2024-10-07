import { getUserPhotosModule } from './typedef.ts';

const { User, UserPhoto } = getUserPhotosModule();

const userPhotoCache = UserPhoto.$createCache({});

User.photos(({ args, root }) => {
	return [
		{
			id: '1',
			url: 'https://example.com/1.jpg',
		},
	];
});

User.photos.$useCache(userPhotoCache, {
	getRootRef(root) {
		return root.pid;
	},
});

User.photosConnection(({ args, root }) => {
	return {
		pageInfo: {
			hasNextPage: true,
			hasPreviousPage: true,
		},
		edges: [
			{
				cursor: '1',
				node: {
					id: '1',
					url: 'https://example.com/1.jpg',
				},
			},
		],
	};
});

User.photosConnection.$auth((params) => {
	return {
		$granted: 'readUserPhotos',
	};
});
