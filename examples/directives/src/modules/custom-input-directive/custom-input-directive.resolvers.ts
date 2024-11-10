import { createInputDirective } from '@baeta/core';
import type { Context } from '../../types/context.ts';
import { getCustomInputDirectiveModule } from './typedef.ts';

const { $directive, Query } = getCustomInputDirectiveModule();

const incrementDirective = createInputDirective<{ by: number }, Context>({
	name: 'increment',
	target: 'scalar',
	resolve: ({ directiveConfig, getValue, setValue }) => {
		const value = getValue();
		if (typeof value === 'number') {
			setValue(value + directiveConfig.by);
		}
	},
});

$directive(incrementDirective);

Query.testIncrementDirective(({ args }) => {
	return args.value;
});
