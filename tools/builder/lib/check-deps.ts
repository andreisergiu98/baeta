import fs, { glob } from 'node:fs/promises';
import { join } from 'node:path';
import { ALLOWED_UNUSED_DEV_DEPS, PACKAGE_DEPENDENCY_OVERRIDES } from '@baeta/workspace-config';
import * as ts from 'typescript';
import type { Pkg } from './package-json-schema.ts';

export interface CheckDepsIssue {
	type:
		| 'missing-dependency'
		| 'missing-dev-dependency'
		| 'unused-dependency'
		| 'unused-dev-dependency'
		| 'wrong-type-should-be-dev'
		| 'wrong-type-should-be-dep'
		| 'stale-override';
	package: string;
	message: string;
}

export function extractImports(filePath: string, content: string): string[] {
	const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);
	const imports: string[] = [];
	const visit = (node: ts.Node) => {
		if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
			imports.push(node.moduleSpecifier.text);
		}
		if (
			ts.isExportDeclaration(node) &&
			node.moduleSpecifier &&
			ts.isStringLiteral(node.moduleSpecifier)
		) {
			imports.push(node.moduleSpecifier.text);
		}
		if (
			ts.isCallExpression(node) &&
			node.expression.kind === ts.SyntaxKind.ImportKeyword &&
			node.arguments.length >= 1 &&
			ts.isStringLiteral(node.arguments[0])
		) {
			imports.push(node.arguments[0].text);
		}
		ts.forEachChild(node, visit);
	};
	visit(sourceFile);
	return imports;
}

export function getPackageName(specifier: string): string | null {
	if (specifier.startsWith('.') || specifier.startsWith('/')) {
		return null;
	}
	if (specifier.startsWith('node:')) {
		return null;
	}
	if (specifier.startsWith('@')) {
		const parts = specifier.split('/');
		if (parts.length < 2) {
			return null;
		}
		return `${parts[0]}/${parts[1]}`;
	}
	return specifier.split('/')[0];
}

export function isDevFile(filePath: string): boolean {
	return (
		/\.test\.tsx?$/.test(filePath) ||
		/(?:^|[/\\])__tests?__[/\\]/.test(filePath) ||
		/-dev\.tsx?$/.test(filePath)
	);
}

export async function scanPackageImports(dir: string): Promise<{
	sourceImports: Set<string>;
	testImports: Set<string>;
	hasNodeImport: boolean;
}> {
	const sourceImports = new Set<string>();
	const testImports = new Set<string>();
	let hasNodeImport = false;

	for await (const entry of glob('**/*.{ts,tsx}', {
		cwd: dir,
		exclude: (name) => name === 'node_modules' || name === 'dist',
	})) {
		if (entry.endsWith('.config.ts')) {
			continue;
		}
		const filePath = join(dir, entry);
		const content = await fs.readFile(filePath, 'utf-8');
		const imports = extractImports(filePath, content);
		const isTest = isDevFile(entry);
		for (const specifier of imports) {
			if (specifier.startsWith('node:')) {
				hasNodeImport = true;
				continue;
			}
			const pkgName = getPackageName(specifier);
			if (pkgName == null) {
				continue;
			}
			if (isTest) {
				testImports.add(pkgName);
			} else {
				sourceImports.add(pkgName);
			}
		}
	}

	return { sourceImports, testImports, hasNodeImport };
}

function isTypesPackageUsed(
	dep: string,
	allImports: Set<string>,
	allDeps: Set<string>,
	hasNodeImport: boolean,
): boolean {
	if (!dep.startsWith('@types/')) {
		return false;
	}
	const basePkg = dep.slice('@types/'.length);
	if (basePkg === 'node') {
		return hasNodeImport;
	}
	return allImports.has(basePkg) || allDeps.has(basePkg);
}

export function checkDependencies(
	pkg: Pkg,
	sourceImports: Set<string>,
	testImports: Set<string>,
	hasNodeImport: boolean,
): CheckDepsIssue[] {
	const issues: CheckDepsIssue[] = [];
	const deps = new Set(Object.keys(pkg.dependencies ?? {}));
	const devDeps = new Set(Object.keys(pkg.devDependencies ?? {}));
	const peerDeps = new Set(Object.keys(pkg.peerDependencies ?? {}));
	const allDeclaredDeps = new Set([...deps, ...devDeps, ...peerDeps]);
	const allImports = new Set([...sourceImports, ...testImports]);
	const overrides = PACKAGE_DEPENDENCY_OVERRIDES[pkg.name];
	const ignoredDeps = new Set([...(overrides?.ignoreDeps ?? [])]);
	const ignoredDevDeps = new Set([...ALLOWED_UNUSED_DEV_DEPS, ...(overrides?.ignoreDevDeps ?? [])]);

	if (overrides?.ignoreDeps) {
		for (const ignored of overrides.ignoreDeps) {
			if (!deps.has(ignored)) {
				issues.push({
					type: 'stale-override',
					package: ignored,
					message: `Stale override: '${ignored}' is listed in ignoreDeps for '${pkg.name}' but is not in its dependencies`,
				});
			}
		}
	}

	if (overrides?.ignoreDevDeps) {
		for (const ignored of overrides.ignoreDevDeps) {
			if (!devDeps.has(ignored)) {
				issues.push({
					type: 'stale-override',
					package: ignored,
					message: `Stale override: '${ignored}' is listed in ignoreDevDeps for '${pkg.name}' but is not in its devDependencies`,
				});
			}
		}
	}

	for (const imp of sourceImports) {
		if (!deps.has(imp) && !peerDeps.has(imp)) {
			if (devDeps.has(imp)) {
				issues.push({
					type: 'wrong-type-should-be-dep',
					package: imp,
					message: `'${imp}' is imported in source files but is only in devDependencies (should be in dependencies or peerDependencies)`,
				});
			} else if (!overrides?.ignoreMissingDeps?.includes(imp)) {
				issues.push({
					type: 'missing-dependency',
					package: imp,
					message: `'${imp}' is imported in source files but not listed in dependencies or peerDependencies`,
				});
			}
		}
	}

	for (const imp of testImports) {
		if (sourceImports.has(imp)) {
			continue;
		}
		if (!devDeps.has(imp) && !deps.has(imp) && !peerDeps.has(imp)) {
			if (!overrides?.ignoreMissingDeps?.includes(imp)) {
				issues.push({
					type: 'missing-dev-dependency',
					package: imp,
					message: `'${imp}' is imported in test/dev files but not listed in devDependencies`,
				});
			}
		}
	}

	for (const dep of deps) {
		if (ignoredDeps.has(dep)) {
			continue;
		}
		if (!sourceImports.has(dep)) {
			if (testImports.has(dep)) {
				issues.push({
					type: 'wrong-type-should-be-dev',
					package: dep,
					message: `'${dep}' is in dependencies but only imported in test/dev files (should be in devDependencies)`,
				});
			} else {
				issues.push({
					type: 'unused-dependency',
					package: dep,
					message: `'${dep}' is in dependencies but not imported in any source file`,
				});
			}
		}
	}

	for (const dep of devDeps) {
		if (ignoredDevDeps.has(dep)) {
			continue;
		}
		if (isTypesPackageUsed(dep, allImports, allDeclaredDeps, hasNodeImport)) {
			continue;
		}
		if (!testImports.has(dep) && !sourceImports.has(dep)) {
			issues.push({
				type: 'unused-dev-dependency',
				package: dep,
				message: `'${dep}' is in devDependencies but not imported in any file`,
			});
		}
	}

	return issues;
}
