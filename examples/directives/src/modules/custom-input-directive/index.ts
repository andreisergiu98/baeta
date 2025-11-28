import { createInputDirective } from '@baeta/core';
import type { Context } from '../../types/context.ts';
import { CustomInputDirectiveModule } from './typedef.ts';

const { Query } = CustomInputDirectiveModule;

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

const queryResolver = Query.$fields({
	testIncrementDirective: Query.testIncrementDirective.resolve(({ args }) => {
		return args.value;
	}),
});

export default CustomInputDirectiveModule.$directive(incrementDirective).$schema({
	Query: queryResolver,
});
