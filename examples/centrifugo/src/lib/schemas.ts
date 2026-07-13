import z from 'zod';

export const GraphQLOperationSchema = z.object({
	query: z.string(),
	variables: z.record(z.string(), z.any()).optional().nullable(),
	operationName: z.string().optional().nullable(),
});
