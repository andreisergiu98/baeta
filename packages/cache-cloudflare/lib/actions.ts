import z from 'zod';

export type Action<Type extends string, Args, Response> = {
	type: Type;
	requestSchema: z.ZodObject<{
		type: z.ZodLiteral<Type>;
		args: z.Schema<Args>;
	}>;
	responseSchema: z.ZodObject<{
		type: z.ZodLiteral<Type>;
		response: z.Schema<Response>;
	}>;
};

function defineAction<T extends string, Req, Res>(
	type: T,
	request: z.Schema<Req>,
	response: z.Schema<Res>,
): Action<T, Req, Res> {
	return {
		type,
		requestSchema: z.object({
			type: z.literal(type),
			args: request,
		}),
		responseSchema: z.object({
			type: z.literal(type),
			response: response,
		}),
	};
}

const getPartialItemsAction = defineAction(
	'getPartialItems',
	z.object({
		keys: z.array(z.string()),
	}),
	z.array(z.string().nullable()),
);

const saveItemsAction = defineAction(
	'saveItems',
	z.object({
		items: z.array(z.tuple([z.string(), z.string()])),
		ttlMs: z.number(),
	}),
	z.void(),
);

const saveItemsWithDiffAction = defineAction(
	'saveItemsWithDiff',
	z.object({
		items: z.array(z.tuple([z.string(), z.string()])),
		ttlMs: z.number(),
	}),
	z.array(z.string().nullable()),
);

const deleteItemsAction = defineAction(
	'deleteItems',
	z.object({
		keys: z.array(z.string()),
	}),
	z.void(),
);

const deleteItemsWithDiffAction = defineAction(
	'deleteItemsWithDiff',
	z.object({
		keys: z.array(z.string()),
	}),
	z.array(z.string().nullable()),
);

const getQueryAction = defineAction(
	'getQuery',
	z.object({
		key: z.string(),
	}),
	z.string().nullable(),
);

const saveQueryAction = defineAction(
	'saveQuery',
	z.object({
		key: z.string(),
		indexes: z.array(z.string()),
		metadata: z.string(),
		ttlMs: z.number(),
	}),
	z.void(),
);

const deleteQueriesAction = defineAction(
	'deleteQueries',
	z.object({
		indexes: z.array(z.string()),
	}),
	z.void(),
);

export const actions = [
	getPartialItemsAction,
	saveItemsAction,
	saveItemsWithDiffAction,
	deleteItemsAction,
	deleteItemsWithDiffAction,
	getQueryAction,
	saveQueryAction,
	deleteQueriesAction,
] as const;
