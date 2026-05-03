import type {
	UserEntityHandler,
	UserEntityRepresentation,
} from '../../__generated__/federation.ts';

export const handleUserEntity: UserEntityHandler = async (
	representation: UserEntityRepresentation,
) => {
	return {
		__typename: 'User',
		id: representation.id,
		email: `jon.doe${representation.id}@baeta.io`,
		lastName: `Doe ${representation.id}`,
		profile: null,
		givenName: null,
	};
};
