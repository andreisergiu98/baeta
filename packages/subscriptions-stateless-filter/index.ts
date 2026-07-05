import {
	createAppPluginId,
	makePluginSymbol,
	type ModuleCompiler,
	nameFunction,
	type AppPlugin,
	type SubscriptionUsePlugin,
	createSchemaState,
} from '@baeta/core/sdk';
import type { FilterRegistry, SubscriptionFilterPredicate } from '@baeta/subscriptions-stateless';

interface SubscriptionFilterState {
	filters: SubscriptionFilterPredicate[];
}

const filterSchemaState = createSchemaState<FilterRegistry>(
	Symbol.for('@baeta/subscriptions-stateless/filter-state'),
);

export function createSubscriptionFilter() {
	const id = createAppPluginId<SubscriptionFilterState>('@baeta/subscriptions-stateless-filter');

	const filter = <Result, Source, Context, Args, Info>(
		predicate: SubscriptionFilterPredicate<Source, Args, Context>,
	): SubscriptionUsePlugin<Result, Source, Context, Args, Info, 'resolve'> => {
		return {
			[makePluginSymbol]: {
				id,
				make: (session, metadata) => {
					nameFunction(predicate, `Subscription.${metadata.field}.filter`);
					const current = session.getPluginState(id)?.filters ?? [];
					session.setPluginState(id, {
						filters: [
							...current,
							predicate as SubscriptionFilterPredicate<unknown, unknown, unknown>,
						],
					});
				},
			},
		};
	};

	const filterAppPlugin: AppPlugin<SubscriptionFilterState, FilterRegistry> = {
		id,
		mutate: (compilers) => {
			const registry: FilterRegistry = new Map();
			for (const field of iterateSubscriptionFields(compilers)) {
				const state = field.resolve.getPluginState(id);
				if (state != null) {
					registry.set(field.field, state.filters);
				}
			}
			return {
				schemaState: filterSchemaState.build(registry),
			};
		},
	};

	return {
		filter,
		filterAppPlugin,
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
