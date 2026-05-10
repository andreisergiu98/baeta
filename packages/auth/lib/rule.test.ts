import test from '@baeta/testing';
import { isLogicRule, logicRules } from './rule.ts';

test('isLogicRule returns true for valid logic rules', (t) => {
	for (const rule of logicRules) {
		t.true(isLogicRule(rule));
	}
});

test('isLogicRule returns false for invalid logic rules', (t) => {
	const invalidRules = ['$invalid', '', 'and', '$notarule', '$AND'];
	for (const rule of invalidRules) {
		t.false(isLogicRule(rule));
	}
});
