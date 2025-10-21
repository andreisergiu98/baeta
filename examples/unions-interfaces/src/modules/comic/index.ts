import { ComicModule } from './typedef.ts';

const { Comic } = ComicModule;

export default ComicModule.$schema({
	Comic: Comic.$fields({
		id: Comic.id.key('id'),
		title: Comic.title.key('title'),
		year: Comic.year.key('year'),
		artist: Comic.artist.key('artist'),
		pages: Comic.pages.key('pages'),
	}),
});
