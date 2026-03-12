import z from 'zod';
import type { Action } from './actions.ts';

export type ActionHandlerMap<Actions extends ReadonlyArray<Action<any, any, any>>> = {
	[K in Actions[number]['type']]: Extract<Actions[number], Action<K, any, any>> extends Action<
		K,
		infer Args,
		infer Res
	>
		? (args: Args) => Res | Promise<Res>
		: never;
};

export function createActionsRequestHandler<
	Type extends string,
	Args,
	Res,
	Actions extends ReadonlyArray<Action<Type, Args, Res>>,
>(actions: Actions, handlers: ActionHandlerMap<Actions>) {
	const actionsMap = new Map(actions.map((action) => [action.type, action]));
	const reqSchema = z.union(actions.map((action) => action.requestSchema));
	return async (request: Request) => {
		try {
			const json = await request.json();
			const parsed = reqSchema.safeParse(json);

			if (parsed.success === false) {
				return new Response(
					JSON.stringify({ error: 'bad_request', message: parsed.error.message }),
					{
						status: 400,
					},
				);
			}

			const { type, args } = parsed.data;
			const action = actionsMap.get(type);

			if (action == null) {
				throw new Error(`Unknown action type: ${type}. This should'd be possible`);
			}

			const handler = handlers[type];
			const result = await handler(args);
			return new Response(
				JSON.stringify(
					action.responseSchema.encode({
						type,
						response: result as any,
					}),
				),
				{ status: 200 },
			);
		} catch (err) {
			if (err instanceof Error) {
				return new Response(JSON.stringify({ error: 'internal_error', message: err.message }), {
					status: 500,
				});
			}
			return new Response(JSON.stringify({ error: 'internal_error', message: 'Unknown error' }), {
				status: 500,
			});
		}
	};
}
