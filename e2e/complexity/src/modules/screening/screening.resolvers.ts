import { complexity } from '../../lib/complexity.ts';
import { ScreeningModule } from './typedef.ts';

const { Query, Screening } = ScreeningModule;

export const screeningResolver = Screening.$use(
	complexity(() => ({
		complexity: 3,
	})),
).$fields({
	id: Screening.id.key('id'),
	movieId: Screening.movieId.key('movieId'),
	date: Screening.date.key('date'),
	theater: Screening.theater.key('theater'),
	availableSeats: Screening.availableSeats.key('availableSeats'),
});

const screeningQuery = Query.screening.resolve(({ args }) => {
	return {
		id: args.id,
		movieId: '1',
		date: '2024-01-15',
		theater: 'Theater 1',
		availableSeats: 120,
	};
});

const screeningsQuery = Query.screenings
	.$use(
		complexity(({ args }) => ({
			multiplier: args.limit ?? 10,
		})),
	)
	.resolve(({ args }) => {
		const limit = args.limit ?? 10;
		return Array.from({ length: limit }).map((_, i) => ({
			id: `s${i}`,
			movieId: '1',
			date: `2024-01-${15 + i}`,
			theater: `Theater ${i + 1}`,
			availableSeats: 100 + i * 10,
		}));
	});

export const queryResolver = Query.$fields({
	screening: screeningQuery,
	screenings: screeningsQuery,
});
