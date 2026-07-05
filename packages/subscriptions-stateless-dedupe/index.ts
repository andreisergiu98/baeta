import {
	createAppPluginId,
	makePluginSymbol,
	type ModuleCompiler,
	type AppPlugin,
	type SubscriptionUsePlugin,
	createSchemaState,
} from '@baeta/core/sdk';
import type { DedupeRegistry, SubscriptionDedupeKeyFn } from '@baeta/subscriptions-stateless';

interface SubscriptionDedupeState {
	enabled: true;
	getKey?: SubscriptionDedupeKeyFn | undefined;
}

const dedupeSchemaState = createSchemaState<DedupeRegistry>(
	Symbol.for('@baeta/subscriptions-stateless/dedupe-state'),
);

export function createSubscriptionDedupe() {
	const id = createAppPluginId<SubscriptionDedupeState>('@baeta/subscriptions-stateless-dedupe');

	const dedupe = <Result, Source, Context, Args, Info>(
		keyFn?: SubscriptionDedupeKeyFn<Source, Args, Context>,
	): SubscriptionUsePlugin<Result, Source, Context, Args, Info, 'resolve'> => {
		return {
			[makePluginSymbol]: {
				id,
				make: (session) => {
					if (session.hasPluginState(id)) {
						throw new Error('Subscription dedupe can only be applied once per subscription field.');
					}
					session.setPluginState(id, {
						enabled: true,
						getKey: keyFn as SubscriptionDedupeKeyFn | undefined,
					});
				},
			},
		};
	};

	const dedupeAppPlugin: AppPlugin<SubscriptionDedupeState, DedupeRegistry> = {
		id,
		mutate: (compilers) => {
			const registry: DedupeRegistry = new Map();
			for (const field of iterateSubscriptionFields(compilers)) {
				const state = field.resolve.getPluginState(id);
				if (state != null) {
					registry.set(field.field, {
						enabled: true,
						getKey: state.getKey,
					});
				}
			}
			return {
				schemaState: dedupeSchemaState.build(registry),
			};
		},
	};

	return {
		dedupe,
		dedupeAppPlugin,
	};
}

function* iterateSubscriptionFields(compilers: ModuleCompiler[]) {
	for (const compiler of compilers) {
		for (const typeCompiler of compiler.types) {
			for (const field of typeCompiler.fields) {
				if (field.kind === 'Subscription') {
					yield field;
				}
			}
		}
	}
}
