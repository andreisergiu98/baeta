import test from '@baeta/testing';
import { nameFunction } from './functions.ts';

const createAnonymousFunction = () => () => {};

test('nameFunction sets the name property of the function', (t) => {
	const fn = createAnonymousFunction();
	const name = 'myFunction';

	nameFunction(fn, name);

	t.is(fn.name, name);
});

test('nameFunction does not set the name property if the function already has a name', (t) => {
	const fn = createAnonymousFunction();

	nameFunction(fn, 'existingName');
	nameFunction(fn, 'newName');

	t.is(fn.name, 'existingName');
});
