import { GeneratorOptions, NormalizedGeneratorOptions } from '@baeta/generator-sdk';
import { posixPath, isAbsolute, join, relative, resolve } from '@baeta/util-path';

export function loadOptions(options: GeneratorOptions): NormalizedGeneratorOptions {
  const root = options.cwd ?? process.cwd();
  const modulesDir = resolve(root, options.modulesDir || 'src/modules');
  const moduleDefinitionName = options.moduleDefinitionName || 'typedef.ts';

  const defaultBaseTypesRoot = resolve(modulesDir, '../__generated__/types.ts');
  const baseTypesRoot = resolve(root, options.baseTypesPath || defaultBaseTypesRoot);
  const baseTypesPath = relative(modulesDir, baseTypesRoot);

  return {
    ...options,
    cwd: posixPath(root),
    modulesDir: posixPath(modulesDir),
    moduleDefinitionName: posixPath(moduleDefinitionName),
    baseTypesPath: posixPath(baseTypesPath),
    contextType: resolveContextType(root, baseTypesRoot, options.contextType),
    extensions: resolveExtensionPath(modulesDir, moduleDefinitionName, options.extensions),
  };
}

function resolveContextType(root: string, baseTypesRoot: string, contextType?: string) {
  if (!contextType) {
    return;
  }

  if (isAbsolute(contextType)) {
    return contextType;
  }

  if (contextType[0] === '!') {
    return contextType.slice(1);
  }

  const contextTypeRoot = resolve(root, contextType);

  return posixPath(relative(join(baseTypesRoot, '../'), contextTypeRoot));
}

function resolveExtensionPath(
  modulesDir: string,
  moduleDefinitionName: string,
  extensionsPath?: string,
) {
  if (!extensionsPath) {
    return;
  }

  if (isAbsolute(extensionsPath)) {
    return extensionsPath;
  }

  if (extensionsPath[0] === '!') {
    return extensionsPath.slice(1);
  }

  return posixPath(relative(join(modulesDir, moduleDefinitionName), extensionsPath));
}
