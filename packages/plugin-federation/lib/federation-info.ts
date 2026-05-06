import type { Source } from '@baeta/util-graphql';
import type { ConstDirectiveNode, NamedTypeNode } from 'graphql';
import { Kind, visit } from 'graphql';
import type { FederationDirectiveName, FederationSpec } from './spec.ts';

export interface FederationInfo {
	usedDirectiveNames: Set<FederationDirectiveName>;
	resolvableEntitiesMap: Map<string, Set<string>>;
}

export function buildFederationInfo(spec: FederationSpec, sources: Source[]): FederationInfo {
	const specDirectiveNames = new Set(spec.directives.map((d) => d.name));
	const usedDirectiveNames = new Set<FederationDirectiveName>();
	const resolvableInterfacesMap = new Map<string, Set<string>>();
	const resolvableEntitiesMap = new Map<string, Set<string>>();

	for (const source of sources) {
		if (!source.document) continue;
		visit(source.document, {
			Directive(node) {
				const directiveName: FederationDirectiveName = `@${node.name.value}`;
				if (specDirectiveNames.has(directiveName)) {
					usedDirectiveNames.add(directiveName);
				}
			},
			InterfaceTypeDefinition(node) {
				addKeyDirectivesSelectionSetToMap(
					resolvableInterfacesMap,
					node.name.value,
					node.directives,
				);
			},
			InterfaceTypeExtension(node) {
				addKeyDirectivesSelectionSetToMap(
					resolvableInterfacesMap,
					node.name.value,
					node.directives,
				);
			},
		});
	}

	for (const source of sources) {
		if (!source.document) continue;
		visit(source.document, {
			ObjectTypeDefinition(node) {
				addKeyDirectivesSelectionSetToMap(resolvableEntitiesMap, node.name.value, node.directives);
				inheritInterfaceSelectionSets(
					resolvableInterfacesMap,
					resolvableEntitiesMap,
					node.name.value,
					node.interfaces,
				);
			},
			ObjectTypeExtension(node) {
				addKeyDirectivesSelectionSetToMap(resolvableEntitiesMap, node.name.value, node.directives);
				inheritInterfaceSelectionSets(
					resolvableInterfacesMap,
					resolvableEntitiesMap,
					node.name.value,
					node.interfaces,
				);
			},
		});
	}

	return {
		usedDirectiveNames,
		resolvableEntitiesMap,
	};
}

function inheritInterfaceSelectionSets(
	interfacesSelectionsMap: Map<string, Set<string>>,
	map: Map<string, Set<string>>,
	entityName: string,
	entityInterfaces: readonly NamedTypeNode[] = [],
) {
	for (const iface of entityInterfaces) {
		const ifaceName = iface.name.value;
		const ifaceSelections = interfacesSelectionsMap.get(ifaceName);
		if (!ifaceSelections) continue;
		const existing = map.get(entityName) ?? new Set<string>();
		for (const selectionSet of ifaceSelections) {
			existing.add(selectionSet);
		}
		map.set(entityName, existing);
	}
}

function addKeyDirectivesSelectionSetToMap(
	map: Map<string, Set<string>>,
	typeName: string,
	directives: readonly ConstDirectiveNode[] = [],
) {
	for (const directive of directives) {
		const selectionSet = getKeyDirectiveSelectionSet(directive);
		if (!selectionSet) continue;
		const existing = map.get(typeName) ?? new Set<string>();
		existing.add(selectionSet);
		map.set(typeName, existing);
	}
}

function getKeyDirectiveSelectionSet(directive: ConstDirectiveNode): string | null {
	if (directive.name.value !== 'key') {
		return null;
	}
	const fieldsArg = directive.arguments?.find((arg) => arg.name.value === 'fields');
	if (!fieldsArg) {
		return null;
	}
	if (fieldsArg.value.kind !== Kind.STRING) {
		return null;
	}
	const resolvableArg = directive.arguments?.find((arg) => arg.name.value === 'resolvable');
	if (
		resolvableArg &&
		resolvableArg.value.kind === Kind.BOOLEAN &&
		resolvableArg.value.value === false
	) {
		return null;
	}
	return fieldsArg.value.value.trim().replaceAll(/\s+/g, '');
}
