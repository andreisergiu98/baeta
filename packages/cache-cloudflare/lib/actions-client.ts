import type { Action } from './actions.ts';

export type ActionClientMap<Actions extends ReadonlyArray<Action<any, any, any>>> = {
	[K in Actions[number]['type']]: Extract<Actions[number], Action<K, any, any>> extends Action<
		K,
		infer Args,
		infer Res
	>
		? (args: Args) => Promise<Res>
		: never;
};

export function buildClient<
	Type extends string,
	Args,
	Res,
	Actions extends ReadonlyArray<Action<Type, Args, Res>>,
>(durableObject: DurableObjectNamespace, actions: Actions): ActionClientMap<Actions> {
	const client = {} as Partial<ActionClientMap<Actions>>;
	for (const action of actions) {
		const submit = async (args: Args) => await submitAction(durableObject, action, args);
		client[action.type] = submit as ActionClientMap<Actions>[typeof action.type];
	}
	return client as ActionClientMap<Actions>;
}

async function submitAction<Type extends string, Args, Response>(
	durableObject: DurableObjectNamespace,
	action: Action<Type, Args, Response>,
	args: Args,
) {
	const stubId = durableObject.idFromName('BAETA_CACHE');
	const stub = durableObject.get(stubId);

	const request = action.requestSchema.encode({
		type: action.type,
		args,
	});

	const response = await stub.fetch('https://baeta-cache-durable-object.internal', {
		method: 'POST',
		body: JSON.stringify(request),
		headers: { 'content-type': 'application/json' },
	});

	if (response.ok === false) {
		const errorText = await response.text();
		throw new Error(`Request failed with status ${response.status}: ${errorText}`);
	}

	const json = await response.json();
	const parsed = action.responseSchema.safeParse(json);
	if (parsed.success === false) {
		throw new Error(`Response validation failed: ${parsed.error.message}`);
	}
	return parsed.data.response;
}
