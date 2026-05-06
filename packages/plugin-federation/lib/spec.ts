export interface FederationSpec {
	version: string;
	directives: Array<FederationDirective>;
}

export interface FederationDirective {
	name: FederationDirectiveName;
	args?: FederationDirectiveArg[];
	locations: string[];
	repeatable?: boolean;
	scalars?: FederationDirectiveScalar[];
}

export type FederationDirectiveName = `@${string}`;

export interface FederationDirectiveArg {
	name: string;
	type: string;
	defaultValue?: string | number | boolean;
}

export interface FederationDirectiveScalar {
	name: string;
	serialize: 'string' | 'json';
}
