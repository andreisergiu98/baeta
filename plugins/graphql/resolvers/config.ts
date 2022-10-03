import { RawResolversConfig } from '@graphql-codegen/visitor-plugin-common';

export interface TypeScriptResolversPluginConfig extends RawResolversConfig {
  useIndexSignature?: boolean;
  noSchemaStitching?: boolean;
  wrapFieldDefinitions?: boolean;
  customResolveInfo?: string;
  customResolverFn?: string;
  customSubscriptionResolver?: string;
  directiveResolverMappings?: Record<string, string>;
  allowParentTypeOverride?: boolean;
  optionalInfoArgument?: boolean;
  makeResolverTypeCallable?: boolean;
}
