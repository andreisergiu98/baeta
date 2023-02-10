import { getUserPhotosModule } from './typedef';

const { User } = getUserPhotosModule();

User.photos(({ args, root }) => {
  return [
    {
      id: '1',
      url: 'https://example.com/1.jpg',
    },
  ];
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
