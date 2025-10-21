import { randomUUID } from 'node:crypto';
import { UserModule } from './typedef.ts';

const { Query, User } = UserModule;

export default UserModule.$schema({
	User: User.$fields({
		id: User.id.key('id'),
		email: User.email.key('email'),
		birthday: User.birthday.key('birthday'),
	}),
	Query: Query.$fields({
		user: Query.user.resolve(() => {
			return {
				id: randomUUID(),
				email: 'jon.doe@baeta.io',
				lastName: 'Doe',
				birthday: new Date('1990-01-01'),
			};
		}),
	}),
});
