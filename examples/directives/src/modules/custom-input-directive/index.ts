import { createInputDirective, inputDirectives } from '@baeta/directives';
import { BadUserInput } from '@baeta/errors';
import type { Context } from '../../types/context.ts';
import { CustomInputDirectiveModule } from './typedef.ts';

const { Query } = CustomInputDirectiveModule;

const uniqueItemsDirective = createInputDirective<Record<string, never>, Context>({
	name: 'uniqueItems',
	target: 'list',
	resolve: ({ value }) => {
		if (Array.isArray(value) && new Set(value).size !== value.length) {
			throw new BadUserInput('List items must be unique');
		}
	},
});

const queryResolver = Query.$fields({
	testUniqueItemsDirective: Query.testUniqueItemsDirective.resolve(({ args }) => {
		return args.values;
	}),
});

export default CustomInputDirectiveModule.$use(inputDirectives([uniqueItemsDirective])).$schema({
	Query: queryResolver,
});
