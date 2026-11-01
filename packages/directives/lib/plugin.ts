import type { Middleware } from '@baeta/core';
import {
	type AppPlugin,
	createAppPluginId,
	type ModuleCompiler,
	type ModuleUsePlugin,
	makePluginSymbol,
	nameFunction,
} from '@baeta/core/sdk';
import { Kind } from 'graphql';
import {
	type ArgumentsCheck,
	createValidationCoordinate,
	createValidationDirectiveName,
	type ValidationCoordinate,
	type ValidationDirectiveName,
} from './compiler/compiler-types.ts';
import { compileArgumentChecks } from './compiler/compiler.ts';
import type { InputDirective } from './directive.ts';

interface InputValidationState {
	directives: ReadonlyArray<InputDirective>;
}

type ValidationSlot = {
	check: ArgumentsCheck;
	coordinate: ValidationCoordinate;
};

const id = createAppPluginId<InputValidationState>('@baeta/directives');

/**
 * Registers input directives on the module that declares them. Directives apply to the whole
 * schema, and the module will require `inputValidationAppPlugin` to be registered in the application.
 *
 * @param directives - Input directives created with `createInputDirective`
 *
 * @example
 * ```typescript
 * export default ValidationModule.$use(inputDirectives([multipleOfDirective])).$schema({});
 * ```
 */
export function inputDirectives<Context, Info>(
	directives: ReadonlyArray<InputDirective>,
): ModuleUsePlugin<Context, Info, InputValidationState> {
	return {
		[makePluginSymbol]: {
			id,
			make: (session) => {
				const registered = session.getPluginState(id)?.directives ?? [];
				session.setPluginState(id, { directives: [...registered, ...directives] });
			},
		},
	};
}

/**
 * Validates field arguments with the input directives registered through `inputDirectives`.
 * Validation runs as a top-level middleware, before the type, module and field middlewares of each
 * field, and before `subscribe` for subscription fields.
 *
 * @example
 * ```typescript
 * const baeta = createApplication({
 * 	modules,
 * 	plugins: [complexityAppPlugin, inputValidationAppPlugin, authAppPlugin],
 * });
 * ```
 */
export const inputValidationAppPlugin: AppPlugin<InputValidationState> = {
	id,
	mutate: (compilers) => {
		const directives = collectDirectives(compilers);
		if (directives.size === 0) {
			return;
		}

		const slots: ValidationSlot[] = [];
		const resolvedFields = new Set<ValidationCoordinate>();
		const fieldsWithArguments = findFieldsWithArguments(compilers);

		for (const compiler of compilers) {
			for (const typeCompiler of compiler.types) {
				for (const fieldCompiler of typeCompiler.fields) {
					const coordinate = createValidationCoordinate(typeCompiler.type, fieldCompiler.field);
					resolvedFields.add(coordinate);

					if (!fieldsWithArguments.has(coordinate)) {
						continue;
					}

					const slot: ValidationSlot = { coordinate, check: () => {} };
					slots.push(slot);
					const middleware = createValidationMiddleware(slot);

					switch (fieldCompiler.kind) {
						case 'Field':
							nameFunction(middleware, `${coordinate}.$use.inputValidation`);
							fieldCompiler.addTopLevelMiddleware(middleware);
							break;
						case 'Subscription':
							nameFunction(middleware, `${coordinate}.subscribe.$use.inputValidation`);
							fieldCompiler.subscribe.addTopLevelMiddleware(middleware);
							break;
						default:
							// @ts-expect-error: kind's type should be never
							throw new Error(`Unsupported field kind: ${fieldCompiler.kind}`);
					}
				}
			}
		}

		return {
			onSchema: (schema) => {
				const checks = compileArgumentChecks(schema, directives);
				for (const slot of slots) {
					const check = checks.get(slot.coordinate);
					if (check) {
						slot.check = check;
					}
				}
				const validatedFields = new Set(slots.map((slot) => slot.coordinate));
				for (const coordinate of checks.keys()) {
					if (validatedFields.has(coordinate)) {
						continue;
					}
					if (resolvedFields.has(coordinate)) {
						throw new Error(
							`${coordinate} has arguments that use input directives, but they aren't declared in the module typedefs, so they can't be validated.`,
						);
					}
					throw new Error(
						`${coordinate} has arguments that use input directives, but no resolver for it is registered in a Baeta module, so they can't be validated.`,
					);
				}
			},
		};
	},
};

function collectDirectives(compilers: ModuleCompiler[]) {
	const directivesMap = new Map<ValidationDirectiveName, InputDirective>();
	for (const compiler of compilers) {
		const directives = compiler.getPluginState(id)?.directives ?? [];
		for (const directive of directives) {
			const name = createValidationDirectiveName(directive.name);
			const registered = directivesMap.get(name);
			if (registered != null && registered !== directive) {
				throw new Error(
					`Input directive @${directive.name} is registered more than once with different implementations (module "${compiler.name}").`,
				);
			}
			directivesMap.set(name, directive);
		}
	}
	return directivesMap;
}

function findFieldsWithArguments(compilers: ModuleCompiler[]) {
	const coordinates = new Set<ValidationCoordinate>();
	for (const compiler of compilers) {
		for (const definition of compiler.typedef.definitions) {
			if (
				definition.kind !== Kind.OBJECT_TYPE_DEFINITION &&
				definition.kind !== Kind.OBJECT_TYPE_EXTENSION
			) {
				continue;
			}
			for (const field of definition.fields ?? []) {
				if (field.arguments != null && field.arguments.length > 0) {
					coordinates.add(createValidationCoordinate(definition.name.value, field.name.value));
				}
			}
		}
	}
	return coordinates;
}

function createValidationMiddleware(
	slot: ValidationSlot,
): Middleware<any, unknown, unknown, unknown, unknown> {
	return (next, params) => {
		slot.check(params);
		return next();
	};
}
