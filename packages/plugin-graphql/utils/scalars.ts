import { dirname, isAbsolute, joinSafe, relative } from '@baeta/util-path';
import { parseMapper } from '@graphql-codegen/visitor-plugin-common';

export function buildScalarMap(
	map: Record<string, string> | undefined,
	cwd: string,
	typesPath: string,
) {
	if (!map) {
		return {};
	}

	const fixedMap: Record<string, string> = {};

	for (const key in map) {
		const mapped = parseMapper(map[key]);

		if (!mapped.isExternal) {
			fixedMap[key] = map[key];
			continue;
		}

		if (isAbsolute(mapped.source)) {
			fixedMap[key] = map[key];
			continue;
		}

		const scalarPath = joinSafe(cwd, mapped.source);
		const relativePath = relative(dirname(typesPath), scalarPath);

		if (mapped.default) {
			fixedMap[key] = `${relativePath}#default`;
			continue;
		}

		fixedMap[key] = `${relativePath}#${mapped.import}`;
	}

	return fixedMap;
}
