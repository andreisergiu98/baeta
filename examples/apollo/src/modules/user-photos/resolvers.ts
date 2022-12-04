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
