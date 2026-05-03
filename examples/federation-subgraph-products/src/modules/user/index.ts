import { UserModule } from './typedef.ts';

const { User } = UserModule;

const UserResolver = User.$fields({
	id: User.id.key('id'),
});

export default UserModule.$schema({
	User: UserResolver,
});
