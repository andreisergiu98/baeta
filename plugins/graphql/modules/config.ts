export type ModulesConfig = {
  baseTypesPath: string;
  importBaseTypesFrom?: string;
  cwd?: string;
  importTypesNamespace?: string;
  filename: string;
  encapsulateModuleTypes: 'prefix' | 'namespace' | 'none';
  requireRootResolvers?: boolean;
};
