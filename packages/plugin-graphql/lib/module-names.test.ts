import test from '@baeta/testing';
import { assertModuleNames } from './module-names.ts';

test('assertModuleNames accepts module directories', (t) => {
	t.notThrows(() => assertModuleNames(['user', 'user-photos', 'user_photos2', 'café']));
});

test('assertModuleNames rejects other directory names', (t) => {
	for (const module of ['2fa', '_user', 'c#', 'a b', 'user.v2', 'back\\slash']) {
		t.throws(() => assertModuleNames([module]), { message: /can't be used as a module/ }, module);
	}
});
