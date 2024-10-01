import test from 'ava';
import { mergeExtensions } from './extension';

test('mergeExtensions merges items correctly', (t) => {
	const items = [
		{ name: 'Extension 1', version: '1.0.0' },
		{ name: 'Extension 2', version: '2.0.0' },
		{ name: 'Extension 3', version: '3.0.0' },
	];

	const callback = (item: { name: string; version: string }) => ({ [item.name]: item.version });

	const merged = mergeExtensions(items, callback);

	t.deepEqual(merged, {
		'Extension 1': '1.0.0',
		'Extension 2': '2.0.0',
		'Extension 3': '3.0.0',
	});
});

test('mergeExtensions handles empty items array', (t) => {
	const items: Array<{ name: string; version: string }> = [];
	const callback = (item: { name: string; version: string }) => ({ [item.name]: item.version });

	const merged = mergeExtensions(items, callback);

	t.deepEqual(merged, {});
});
