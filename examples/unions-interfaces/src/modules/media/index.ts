import { MediaModule } from './typedef.ts';

const { Book, Movie, TVShow, Query } = MediaModule;

const bookResolver = Book.$fields({
	id: Book.id.key('id'),
	title: Book.title.key('title'),
	year: Book.year.key('year'),
	author: Book.author.key('author'),
	pages: Book.pages.key('pages'),
});

const movieResolver = Movie.$fields({
	id: Movie.id.key('id'),
	title: Movie.title.key('title'),
	year: Movie.year.key('year'),
});

const tvShowResolver = TVShow.$fields({
	id: TVShow.id.key('id'),
	title: TVShow.title.key('title'),
	year: TVShow.year.key('year'),
	seasons: TVShow.seasons.key('seasons'),
});

export default MediaModule.$schema({
	Book: bookResolver,
	Movie: movieResolver,
	TVShow: tvShowResolver,
	Query: Query.$fields({
		media: Query.media.resolve(() => {
			return [
				{
					id: '1',
					title: 'The Book',
					author: 'Jon Doe',
					year: 2021,
					pages: 100,
					__typename: 'Book',
				},
				{
					id: '2',
					title: 'The Movie',
					year: 2022,
					__typename: 'Movie',
				},
				{
					id: '3',
					title: 'The TV Show',
					year: 2023,
					seasons: 1,
					__typename: 'TVShow',
				},
				{
					__typename: 'Movie',
					id: '4',
					title: 'The Other Movie',
					year: 2023,
				},
			];
		}),
	}),
});
