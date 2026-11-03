import type { WatcherFile } from '@baeta/generator-sdk';
import test from '@baeta/testing';
import { createSchemaWatchMatcher } from './schema-watch.ts';

function createFile(relativePath: string): WatcherFile {
	return { type: 'update', path: `/work/app/${relativePath}`, relativePath };
}

test('createSchemaWatchMatcher matches relative and absolute globs', (t) => {
	for (const glob of ['src/**/*.gql', '/work/app/src/**/*.gql']) {
		const isSchemaFile = createSchemaWatchMatcher([glob]);
		t.true(isSchemaFile(createFile('src/modules/user/user.gql')), glob);
		t.false(isSchemaFile(createFile('src/modules/user/typedef.ts')), glob);
	}
});

test('createSchemaWatchMatcher treats negated globs as exclusions', (t) => {
	for (const globs of [
		['src/**/*.gql', '!src/legacy/**'],
		['/work/app/src/**/*.gql', '!/work/app/src/legacy/**'],
	]) {
		const isSchemaFile = createSchemaWatchMatcher(globs);
		t.true(isSchemaFile(createFile('src/modules/user/user.gql')), globs.join());
		t.false(isSchemaFile(createFile('src/legacy/old.gql')), globs.join());
		t.false(isSchemaFile(createFile('src/__generated__/sdl.ts')), globs.join());
	}
});
