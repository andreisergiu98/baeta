import { randomUUID } from 'node:crypto';
import { getUserModule } from './typedef.ts';

const { Query } = getUserModule();

Query.user((_params) => {
	return {
		id: randomUUID(),
		email: 'jon.doe@baeta.io',
		lastName: 'Doe',
		birthday: new Date('1990-01-01'),
	};
});
