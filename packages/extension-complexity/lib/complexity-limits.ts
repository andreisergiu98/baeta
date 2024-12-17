/**
 * Configuration for query complexity limits.
 */
export interface ComplexityLimit {
	/** Maximum allowed query depth */
	depth?: number;
	/** Maximum allowed fields per level */
	breadth?: number;
	/** Maximum allowed total complexity score */
	complexity?: number;
}

/**
 * Function to determine complexity limits, can be static or context-based.
 */
export type GetComplexityLimit<Context> =
	| ComplexityLimit
	| ((ctx: Context) => ComplexityLimit | Promise<ComplexityLimit>);
