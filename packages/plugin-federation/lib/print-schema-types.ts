import type { FederationInfo } from './federation-info.ts';

export function printSchemaTypes(federationInfo: FederationInfo): string {
	const entities = [...federationInfo.resolvableEntitiesMap.keys()];
	const queryType = [
		'type Query {',
		'  _service: _Service!',
		entities.length > 0 ? '  _entities(representations: [_Any!]!): [_Entity]!' : null,
		'}',
	]
		.filter((el) => el != null)
		.join('\n');
	const serviceType = 'type _Service { sdl: String! }';
	const anyScalar = 'scalar _Any';
	const unionType = entities.length > 0 ? `union _Entity = ${entities.join(' | ')}` : '';
	return [anyScalar, unionType, serviceType, queryType].filter((s) => s).join('\n\n');
}
