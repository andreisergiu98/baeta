import { UserModule } from './typedef.ts';

const { User } = UserModule;

export default User.$fields({
	id: User.id.key('id'),
	email: User.email.key('email'),
	lastName: User.lastName.key('lastName'),
	profile: User.profile.key('profile'),
	givenName: User.givenName.key('givenName'),
	birthday: User.birthday.key('birthday'),
});
