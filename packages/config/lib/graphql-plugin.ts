export interface GraphqlPluginOptions {
  schemas: string[];
  modulesDir?: string;
  moduleDefinitionName?: string;
  baseTypesPath?: string;
  contextType?: string;
  scalars?: Record<string, string>;
}
