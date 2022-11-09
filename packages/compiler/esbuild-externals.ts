import fs from 'fs';

type DependencyMap = Record<string, string>;

function getDependencyMap(): DependencyMap {
  try {
    const packageContent = fs.readFileSync(`${process.cwd()}/package.json`, 'utf-8');
    const packageConfig = JSON.parse(packageContent);
    return packageConfig.dependencies ?? {};
  } catch (e) {
    return {};
  }
}

function getDependencyList(dependencyMap: DependencyMap): string[] {
  return Object.keys(dependencyMap);
}

function getWorkspaces(map: DependencyMap, list: string[]) {
  return list.filter((key) => map[key]?.startsWith('workspace:'));
}

function getExternalDependencies(bundleDeps: boolean, bundleWorkspaces: boolean) {
  if (bundleDeps && bundleWorkspaces) {
    return [];
  }

  const dependencyMap = getDependencyMap();
  const dependencies = getDependencyList(dependencyMap);
  const workspaces = getWorkspaces(dependencyMap, dependencies);

  if (!(bundleDeps || bundleWorkspaces)) {
    return dependencies;
  }

  if (bundleDeps && !bundleWorkspaces) {
    return workspaces;
  }

  if (!bundleDeps && bundleWorkspaces) {
    return dependencies.filter((dependency) => !workspaces.includes(dependency));
  }

  return [];
}

export function getExternals(bundleDeps = false, bundleWorkspaces = false) {
  const builders = [
    'esbuild-register',
    '@esbuild-kit/cjs-loader',
    '@esbuild-kit/esm-loader',
  ];
  const externals = getExternalDependencies(bundleDeps, bundleWorkspaces);
  return builders.concat(externals);
}
