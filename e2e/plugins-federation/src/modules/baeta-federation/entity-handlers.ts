import type { EntityHandlerMap } from '../../__generated__/federation.ts';

const entityHandlersMap: EntityHandlerMap = {
	Movie: (representation) => ({
		__typename: 'Movie',
		id: representation.id,
		title: `Federated Movie ${representation.id}`,
		year: 2010,
		rating: 8.8,
	}),
	Review: (representation) => ({
		__typename: 'Review',
		id: representation.id,
		movieId: '1',
		score: 5,
		comment: `Federated review ${representation.id}`,
	}),
};

export default entityHandlersMap;
