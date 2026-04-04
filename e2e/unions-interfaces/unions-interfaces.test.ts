import { createApplication } from '@baeta/core';
import { execute } from '@baeta/e2e-shared/execute';
import test from '@baeta/testing';
import { graphql } from './src/__generated__/gql/index.ts';
import modules from './src/modules/index.ts';

const { schema } = createApplication({ modules });

const MediaQuery = graphql(`
	query MediaQuery {
		media {
			... on Movie {
				__typename
				id
				title
				year
			}
			... on TVShow {
				__typename
				id
				title
				seasons
			}
			... on Book {
				__typename
				id
				title
				author
				pages
			}
		}
	}
`);

const MediaReadableQuery = graphql(`
	query MediaReadableQuery {
		media {
			... on Readable {
				id
				pages
			}
		}
	}
`);

test.serial('union type resolves with __typename', async (t) => {
	const result = await execute({
		schema,
		document: MediaQuery,
		contextValue: { appVersion: '1.0.0' },
	});

	const media = result.data?.media;
	t.falsy(result.errors);
	t.is(media?.length, 3);
	t.is(media?.[0]?.__typename, 'Book');
	t.is(media?.[0]?.__typename === 'Book' ? media[0].author : undefined, 'Jon Doe');
	t.is(media?.[1]?.__typename, 'Movie');
	t.is(media?.[2]?.__typename, 'TVShow');
	t.is(media?.[2]?.__typename === 'TVShow' ? media[2].seasons : undefined, 3);
});

test.serial('interface fields resolve on implementing types', async (t) => {
	const result = await execute({
		schema,
		document: MediaReadableQuery,
		contextValue: { appVersion: '1.0.0' },
	});

	const media = result.data?.media;
	t.falsy(result.errors);
	const book = media?.find((m) => 'pages' in m && m.pages !== undefined);
	t.truthy(book);
	t.is(book && 'pages' in book ? book.pages : undefined, 100);
});
