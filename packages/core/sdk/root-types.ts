/**
 * Names of the schema's root operation types, as declared by `schema { query mutation subscription }`
 * or by the default names `Query`, `Mutation` and `Subscription`.
 */
export interface RootTypes {
	/** The query root type. */
	query: string;
	/** The mutation root type, when the schema has one. */
	mutation?: string;
	/** The subscription root type, when the schema has one. */
	subscription?: string;
}
