import { getUserModule } from './typedef.js';

const { Query, User } = getUserModule();

User.$complexity(() => {
	// Make all user fields have a complexity of 2
	return {
		complexity: 2,
	};
});

Query.users.$complexity(({ args, ctx }) => {
	// Set complexity per field based on context or arguments
	return {
		multiplier: 5,
	};
});