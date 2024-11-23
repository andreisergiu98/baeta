export interface ComplexityLimit {
	depth?: number;
	breadth?: number;
	complexity?: number;
}

export type GetComplexityLimit<Context> =
	| ComplexityLimit
	| ((ctx: Context) => ComplexityLimit | Promise<ComplexityLimit>);
