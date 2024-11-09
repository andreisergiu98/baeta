import { getUserModule } from './typedef.ts';

const { Query } = getUserModule();

Query.user((params) => {
	return {
		id: '1',
		email: 'jon.doe@baeta.io',
		lastName: 'Doe',
		birthday: new Date('1990-01-01'),
	};
});
