import { AggregateGraphQLError } from '@baeta/errors';
import { GraphQLError, type GraphQLInputType, type GraphQLResolveInfo } from 'graphql';
import { logger } from '../logger.ts';
import type { AppliedDirective } from './compiler-directives.ts';
import {
	type ArgumentsCheck,
	type Check,
	type CheckEnv,
	type CheckPath,
} from './compiler-types.ts';

export function atKey(key: string, check: Check): Check {
	return (object, path, env) => {
		const record = object as Record<string, unknown>;
		if (!Object.hasOwn(record, key)) {
			return;
		}
		const value = record[key];
		if (value != null) {
			check(value, [...path, key], env);
		}
	};
}

export function eachItem(check: Check): Check {
	return (value, path, env) => {
		const items = value as unknown[];
		for (let index = 0; index < items.length; index++) {
			const item = items[index];
			if (item != null) {
				check(item, [...path, index], env);
			}
		}
	};
}

export function runAll(checks: readonly Check[]): Check {
	return (value, path, env) => {
		for (const check of checks) {
			check(value, path, env);
		}
	};
}

export function withDirectives(
	directives: AppliedDirective[],
	type: GraphQLInputType,
	next: Check | null,
): Check | null {
	if (directives.length === 0) {
		return next;
	}
	return (value, path, env) => {
		runDirectives(directives, value, type, path, env);
		next?.(value, path, env);
	};
}

export function runDirectives(
	directives: AppliedDirective[],
	value: unknown,
	type: GraphQLInputType,
	path: CheckPath,
	env: CheckEnv,
) {
	for (const directive of directives) {
		try {
			directive.resolve({
				value,
				directiveConfig: directive.config,
				path,
				type,
				root: env.root,
				args: env.args,
				ctx: env.ctx,
				info: env.info,
			});
		} catch (error) {
			env.errors.push(error);
		}
	}
}

export function createArgumentsCheck(check: Check): ArgumentsCheck {
	return (params) => {
		const args = params.args as Record<string, unknown>;
		const env: CheckEnv = {
			root: params.source,
			args,
			ctx: params.ctx,
			info: params.info as GraphQLResolveInfo,
			errors: [],
		};
		check(args, [], env);
		throwErrors(env.errors);
	};
}

function throwErrors(errors: unknown[]) {
	if (errors.length === 0) {
		return;
	}

	const graphqlErrors = errors.filter((error) => error instanceof GraphQLError);
	const unexpectedErrors = errors.filter((error) => !(error instanceof GraphQLError));

	if (unexpectedErrors.length > 0) {
		logger.error({
			type: 'input-validation',
			message: 'Input validation threw non-GraphQL errors.',
			extra: { errors: unexpectedErrors },
		});
		if (errors.length === 1) {
			throw unexpectedErrors[0];
		}
		throw new AggregateError(errors);
	}

	if (graphqlErrors.length === 1) {
		throw graphqlErrors[0];
	}

	if (graphqlErrors.length > 0) {
		throw new AggregateGraphQLError(graphqlErrors);
	}
}
