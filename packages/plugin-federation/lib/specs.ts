import type { FederationSpec } from './spec.ts';
import { federationSpecs } from './specs.generated.ts';

type FederationSpecs = (typeof federationSpecs)[number];

export type FederationVersion = FederationSpecs['version'];

export type FederationDirectiveNamesByVersion<V extends FederationVersion> = Extract<
	FederationSpecs,
	{ version: V }
>['directives'][number]['name'];

export function findSpecification(version: FederationVersion): FederationSpec {
	const spec = federationSpecs.find((s) => s.version === version);
	if (!spec) {
		throw new Error(`Unsupported federation version: ${version}`);
	}
	return spec;
}
