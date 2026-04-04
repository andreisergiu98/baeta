import test from '@baeta/testing';
import { assertValidRefType } from './item.ts';

const validRefs = ['string', 123, BigInt(456)];
const invalidRefs = [true, false, null, undefined, {}, []];

test('assertValidRefType - accepts valid refs', (t) => {
	for (const ref of validRefs) {
		t.notThrows(() => assertValidRefType(ref));
	}
});

test('assertValidRefType - rejects invalid refs', (t) => {
	for (const ref of invalidRefs) {
		t.throws(() => assertValidRefType(ref), { instanceOf: TypeError });
	}
});
