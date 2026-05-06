import type {
	FederationDirective,
	FederationDirectiveArg,
	FederationDirectiveName,
	FederationDirectiveScalar,
	FederationSpec,
} from './spec.ts';

export function printSchemaSpec(spec: FederationSpec, include: Set<FederationDirectiveName>) {
	const directives = spec.directives.filter((d) => include.has(d.name));
	const scalars = pickUniqueScalars(directives);
	const header = `# Federation Specification ${spec.version}`;
	return [
		header,
		'',
		...directives.map(printDirective),
		'',
		...scalars.map(printScalar),
		scalars.length > 0 ? '' : null,
	]
		.filter((el) => el != null)
		.join('\n');
}

function printDirective(directive: FederationDirective): string {
	return [
		`directive ${directive.name}${printArgs(directive.args)}`,
		directive.locations.length > 0 && directive.repeatable ? 'repeatable' : null,
		directive.locations.length > 0 ? `on ${directive.locations.join(' | ')}` : null,
	]
		.filter((el) => el != null)
		.join(' ');
}

function printArgs(args?: FederationDirectiveArg[]): string {
	if (!args || args.length === 0) {
		return '';
	}
	return `(${args.map(printArg).join(', ')})`;
}

function printArg(arg: FederationDirectiveArg): string {
	return `${arg.name}: ${arg.type}${printArgDefaultValue(arg.defaultValue)}`;
}

function printArgDefaultValue(value?: string | number | boolean): string {
	if (value === undefined) {
		return '';
	}
	if (typeof value === 'string') {
		return ` = ${JSON.stringify(value)}`;
	}
	return ` = ${value}`;
}

function printScalar(scalar: FederationDirectiveScalar): string {
	return `scalar ${scalar.name}`;
}

function pickUniqueScalars(directives: FederationDirective[]): FederationDirectiveScalar[] {
	const seen = new Set<string>();
	const uniqueScalars: FederationDirectiveScalar[] = [];
	for (const directive of directives) {
		for (const scalar of directive.scalars ?? []) {
			if (!seen.has(scalar.name)) {
				seen.add(scalar.name);
				uniqueScalars.push(scalar);
			}
		}
	}
	return uniqueScalars;
}
