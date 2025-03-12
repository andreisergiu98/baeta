import test from '@baeta/testing';
import { extendFunction, nameFunction } from './functions.ts';

test('extendFunction extends the function with the provided properties', (t) => {
	const originalFn = () => {};
	const extension = {
		prop1: 'value1',
		prop2: 'value2',
	};

	const extendedFn = extendFunction(originalFn, extension);

	t.is(extendedFn.prop1, 'value1');
	t.is(extendedFn.prop2, 'value2');
});

test('extended function retains original function behavior', (t) => {
	let called = false;

	const originalFn = () => {
		called = true;
	};

	const extension = {
		prop1: 'value1',
		prop2: 'value2',
	};

	const extendedFn = extendFunction(originalFn, extension);

	extendedFn();

	t.true(called);
});

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
