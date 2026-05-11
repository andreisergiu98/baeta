import { SidebarsConfig } from "@docusaurus/plugin-content-docs";
const typedocSidebar: SidebarsConfig = {
  items: [
    {
      type: "category",
      label: "@baeta/auth",
      items: [
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/auth/interfaces/AuthMiddlewareOptions",
              label: "AuthMiddlewareOptions"
            },
            {
              type: "doc",
              id: "api/auth/interfaces/AuthMiddlewareSubscribeOptions",
              label: "AuthMiddlewareSubscribeOptions"
            },
            {
              type: "doc",
              id: "api/auth/interfaces/AuthOptions",
              label: "AuthOptions"
            }
          ]
        },
        {
          type: "category",
          label: "Type Aliases",
          items: [
            {
              type: "doc",
              id: "api/auth/type-aliases/DefaultScopes",
              label: "DefaultScopes"
            },
            {
              type: "doc",
              id: "api/auth/type-aliases/GetGrant",
              label: "GetGrant"
            },
            {
              type: "doc",
              id: "api/auth/type-aliases/GetGrantFn",
              label: "GetGrantFn"
            },
            {
              type: "doc",
              id: "api/auth/type-aliases/GetGrantResult",
              label: "GetGrantResult"
            },
            {
              type: "doc",
              id: "api/auth/type-aliases/GetPostScopeRules",
              label: "GetPostScopeRules"
            },
            {
              type: "doc",
              id: "api/auth/type-aliases/GetScopeLoader",
              label: "GetScopeLoader"
            },
            {
              type: "doc",
              id: "api/auth/type-aliases/GetScopeRules",
              label: "GetScopeRules"
            },
            {
              type: "doc",
              id: "api/auth/type-aliases/LogicRule",
              label: "LogicRule"
            },
            {
              type: "doc",
              id: "api/auth/type-aliases/ScopeErrorResolver",
              label: "ScopeErrorResolver"
            },
            {
              type: "doc",
              id: "api/auth/type-aliases/ScopeLoader",
              label: "ScopeLoader"
            },
            {
              type: "doc",
              id: "api/auth/type-aliases/ScopeLoaderMap",
              label: "ScopeLoaderMap"
            },
            {
              type: "doc",
              id: "api/auth/type-aliases/ScopeRule",
              label: "ScopeRule"
            },
            {
              type: "doc",
              id: "api/auth/type-aliases/ScopeRules",
              label: "ScopeRules"
            },
            {
              type: "doc",
              id: "api/auth/type-aliases/ScopesShape",
              label: "ScopesShape"
            }
          ]
        },
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/auth/functions/aggregateErrorResolver",
              label: "aggregateErrorResolver"
            },
            {
              type: "doc",
              id: "api/auth/functions/createAuth",
              label: "createAuth"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/auth/index"
      }
    },
    {
      type: "category",
      label: "@baeta/cache",
      items: [
        {
          type: "category",
          label: "index",
          items: [
            {
              type: "category",
              label: "Classes",
              items: [
                {
                  type: "doc",
                  id: "api/cache/index/classes/CacheClient",
                  label: "CacheClient"
                }
              ]
            },
            {
              type: "category",
              label: "Interfaces",
              items: [
                {
                  type: "doc",
                  id: "api/cache/index/interfaces/CacheClientArgs",
                  label: "CacheClientArgs"
                },
                {
                  type: "doc",
                  id: "api/cache/index/interfaces/CacheClientOptions",
                  label: "CacheClientOptions"
                },
                {
                  type: "doc",
                  id: "api/cache/index/interfaces/CacheClientSaveOptions",
                  label: "CacheClientSaveOptions"
                }
              ]
            },
            {
              type: "category",
              label: "Type Aliases",
              items: [
                {
                  type: "doc",
                  id: "api/cache/index/type-aliases/Cache",
                  label: "Cache"
                },
                {
                  type: "doc",
                  id: "api/cache/index/type-aliases/CacheHooksOptions",
                  label: "CacheHooksOptions"
                },
                {
                  type: "doc",
                  id: "api/cache/index/type-aliases/CacheOptions",
                  label: "CacheOptions"
                },
                {
                  type: "doc",
                  id: "api/cache/index/type-aliases/CacheWithQueries",
                  label: "CacheWithQueries"
                },
                {
                  type: "doc",
                  id: "api/cache/index/type-aliases/CreateCacheFactory",
                  label: "CreateCacheFactory"
                },
                {
                  type: "doc",
                  id: "api/cache/index/type-aliases/ItemCacheKey",
                  label: "ItemCacheKey"
                },
                {
                  type: "doc",
                  id: "api/cache/index/type-aliases/ItemRef",
                  label: "ItemRef"
                },
                {
                  type: "doc",
                  id: "api/cache/index/type-aliases/OptionalGetRef",
                  label: "OptionalGetRef"
                },
                {
                  type: "doc",
                  id: "api/cache/index/type-aliases/QueryArgs",
                  label: "QueryArgs"
                },
                {
                  type: "doc",
                  id: "api/cache/index/type-aliases/QueryArgsIndexes",
                  label: "QueryArgsIndexes"
                },
                {
                  type: "doc",
                  id: "api/cache/index/type-aliases/QueryCacheIndexKey",
                  label: "QueryCacheIndexKey"
                },
                {
                  type: "doc",
                  id: "api/cache/index/type-aliases/QueryCacheKey",
                  label: "QueryCacheKey"
                },
                {
                  type: "doc",
                  id: "api/cache/index/type-aliases/QueryIndexValue",
                  label: "QueryIndexValue"
                },
                {
                  type: "doc",
                  id: "api/cache/index/type-aliases/QueryOptions",
                  label: "QueryOptions"
                },
                {
                  type: "doc",
                  id: "api/cache/index/type-aliases/RefCompatibleItem",
                  label: "RefCompatibleItem"
                },
                {
                  type: "doc",
                  id: "api/cache/index/type-aliases/RequiredGetRef",
                  label: "RequiredGetRef"
                }
              ]
            },
            {
              type: "category",
              label: "Functions",
              items: [
                {
                  type: "doc",
                  id: "api/cache/index/functions/createCache",
                  label: "createCache"
                },
                {
                  type: "doc",
                  id: "api/cache/index/functions/defineQuery",
                  label: "defineQuery"
                }
              ]
            }
          ],
          link: {
            type: "doc",
            id: "api/cache/index/index"
          }
        },
        {
          type: "category",
          label: "sdk",
          items: [
            {
              type: "category",
              label: "Functions",
              items: [
                {
                  type: "doc",
                  id: "api/cache/sdk/functions/doBatched",
                  label: "doBatched"
                }
              ]
            }
          ],
          link: {
            type: "doc",
            id: "api/cache/sdk/index"
          }
        }
      ],
      link: {
        type: "doc",
        id: "api/cache/index"
      }
    },
    {
      type: "category",
      label: "@baeta/cache-cloudflare",
      items: [
        {
          type: "category",
          label: "index",
          items: [
            {
              type: "category",
              label: "Classes",
              items: [
                {
                  type: "doc",
                  id: "api/cache-cloudflare/index/classes/BaetaCache",
                  label: "BaetaCache"
                },
                {
                  type: "doc",
                  id: "api/cache-cloudflare/index/classes/CloudflareCacheClient",
                  label: "CloudflareCacheClient"
                }
              ]
            }
          ],
          link: {
            type: "doc",
            id: "api/cache-cloudflare/index/index"
          }
        },
        {
          type: "category",
          label: "sdk",
          items: [
            {
              type: "category",
              label: "Interfaces",
              items: [
                {
                  type: "doc",
                  id: "api/cache-cloudflare/sdk/interfaces/DurableObjectMigration",
                  label: "DurableObjectMigration"
                }
              ]
            },
            {
              type: "category",
              label: "Variables",
              items: [
                {
                  type: "doc",
                  id: "api/cache-cloudflare/sdk/variables/baetaCacheName",
                  label: "baetaCacheName"
                },
                {
                  type: "doc",
                  id: "api/cache-cloudflare/sdk/variables/durableObjectsMigrations",
                  label: "durableObjectsMigrations"
                }
              ]
            }
          ],
          link: {
            type: "doc",
            id: "api/cache-cloudflare/sdk/index"
          }
        }
      ],
      link: {
        type: "doc",
        id: "api/cache-cloudflare/index"
      }
    },
    {
      type: "category",
      label: "@baeta/cache-ioredis",
      items: [
        {
          type: "category",
          label: "Classes",
          items: [
            {
              type: "doc",
              id: "api/cache-ioredis/classes/RedisCacheClient",
              label: "RedisCacheClient"
            }
          ]
        },
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/cache-ioredis/interfaces/RedisCacheClientOptions",
              label: "RedisCacheClientOptions"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/cache-ioredis/index"
      }
    },
    {
      type: "category",
      label: "@baeta/cache-iovalkey",
      items: [
        {
          type: "category",
          label: "Classes",
          items: [
            {
              type: "doc",
              id: "api/cache-iovalkey/classes/ValkeyCacheClient",
              label: "ValkeyCacheClient"
            }
          ]
        },
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/cache-iovalkey/interfaces/ValkeyCacheClientOptions",
              label: "ValkeyCacheClientOptions"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/cache-iovalkey/index"
      }
    },
    {
      type: "category",
      label: "@baeta/cache-redis-common",
      items: [
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/cache-redis-common/interfaces/PipelineOptions",
              label: "PipelineOptions"
            }
          ]
        },
        {
          type: "category",
          label: "Type Aliases",
          items: [
            {
              type: "doc",
              id: "api/cache-redis-common/type-aliases/RedisScriptFunction",
              label: "RedisScriptFunction"
            },
            {
              type: "doc",
              id: "api/cache-redis-common/type-aliases/RedisScripts",
              label: "RedisScripts"
            }
          ]
        },
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/cache-redis-common/functions/assertNoPipelineErrors",
              label: "assertNoPipelineErrors"
            },
            {
              type: "doc",
              id: "api/cache-redis-common/functions/batchPipeline",
              label: "batchPipeline"
            },
            {
              type: "doc",
              id: "api/cache-redis-common/functions/createRedisScripts",
              label: "createRedisScripts"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/cache-redis-common/index"
      }
    },
    {
      type: "category",
      label: "@baeta/cache-upstash",
      items: [
        {
          type: "category",
          label: "Classes",
          items: [
            {
              type: "doc",
              id: "api/cache-upstash/classes/UpstashCacheClient",
              label: "UpstashCacheClient"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/cache-upstash/index"
      }
    },
    {
      type: "category",
      label: "@baeta/cli",
      items: [
        {
          type: "category",
          label: "index",
          items: [
            {
              type: "category",
              label: "Interfaces",
              items: [
                {
                  type: "doc",
                  id: "api/cli/index/interfaces/BaetaOptions",
                  label: "BaetaOptions"
                }
              ]
            },
            {
              type: "category",
              label: "Type Aliases",
              items: [
                {
                  type: "doc",
                  id: "api/cli/index/type-aliases/Plugin",
                  label: "Plugin"
                },
                {
                  type: "doc",
                  id: "api/cli/index/type-aliases/Plugins",
                  label: "Plugins"
                }
              ]
            },
            {
              type: "category",
              label: "Functions",
              items: [
                {
                  type: "doc",
                  id: "api/cli/index/functions/defineConfig",
                  label: "defineConfig"
                }
              ]
            }
          ],
          link: {
            type: "doc",
            id: "api/cli/index/index"
          }
        },
        {
          type: "category",
          label: "sdk",
          items: [
            {
              type: "category",
              label: "Interfaces",
              items: [
                {
                  type: "doc",
                  id: "api/cli/sdk/interfaces/ConfigProps",
                  label: "ConfigProps"
                },
                {
                  type: "doc",
                  id: "api/cli/sdk/interfaces/ErrorsProps",
                  label: "ErrorsProps"
                },
                {
                  type: "doc",
                  id: "api/cli/sdk/interfaces/LayoutProps",
                  label: "LayoutProps"
                },
                {
                  type: "doc",
                  id: "api/cli/sdk/interfaces/LoadedBaetaConfig",
                  label: "LoadedBaetaConfig"
                },
                {
                  type: "doc",
                  id: "api/cli/sdk/interfaces/TimeProps",
                  label: "TimeProps"
                }
              ]
            },
            {
              type: "category",
              label: "Type Aliases",
              items: [
                {
                  type: "doc",
                  id: "api/cli/sdk/type-aliases/ConfigEventMap",
                  label: "ConfigEventMap"
                },
                {
                  type: "doc",
                  id: "api/cli/sdk/type-aliases/TextOutput",
                  label: "TextOutput"
                }
              ]
            },
            {
              type: "category",
              label: "Variables",
              items: [
                {
                  type: "doc",
                  id: "api/cli/sdk/variables/ConfigProviderBase",
                  label: "ConfigProviderBase"
                },
                {
                  type: "doc",
                  id: "api/cli/sdk/variables/errorNamespace",
                  label: "errorNamespace"
                },
                {
                  type: "doc",
                  id: "api/cli/sdk/variables/useConfig",
                  label: "useConfig"
                }
              ]
            },
            {
              type: "category",
              label: "Functions",
              items: [
                {
                  type: "doc",
                  id: "api/cli/sdk/functions/ConfigProvider",
                  label: "ConfigProvider"
                },
                {
                  type: "doc",
                  id: "api/cli/sdk/functions/ConfigStatus",
                  label: "ConfigStatus"
                },
                {
                  type: "doc",
                  id: "api/cli/sdk/functions/createCommand",
                  label: "createCommand"
                },
                {
                  type: "doc",
                  id: "api/cli/sdk/functions/Errors",
                  label: "Errors"
                },
                {
                  type: "doc",
                  id: "api/cli/sdk/functions/Layout",
                  label: "Layout"
                },
                {
                  type: "doc",
                  id: "api/cli/sdk/functions/makeErrorMessage",
                  label: "makeErrorMessage"
                },
                {
                  type: "doc",
                  id: "api/cli/sdk/functions/makeErrorOutput",
                  label: "makeErrorOutput"
                },
                {
                  type: "doc",
                  id: "api/cli/sdk/functions/renderComponent",
                  label: "renderComponent"
                },
                {
                  type: "doc",
                  id: "api/cli/sdk/functions/Spinner",
                  label: "Spinner"
                },
                {
                  type: "doc",
                  id: "api/cli/sdk/functions/Time",
                  label: "Time"
                },
                {
                  type: "doc",
                  id: "api/cli/sdk/functions/useConfigStore",
                  label: "useConfigStore"
                },
                {
                  type: "doc",
                  id: "api/cli/sdk/functions/useRunCommand",
                  label: "useRunCommand"
                }
              ]
            }
          ],
          link: {
            type: "doc",
            id: "api/cli/sdk/index"
          }
        }
      ],
      link: {
        type: "doc",
        id: "api/cli/index"
      }
    },
    {
      type: "category",
      label: "@baeta/complexity",
      items: [
        {
          type: "category",
          label: "Classes",
          items: [
            {
              type: "doc",
              id: "api/complexity/classes/ComplexityError",
              label: "ComplexityError"
            }
          ]
        },
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/complexity/interfaces/ComplexityExtensionOptions",
              label: "ComplexityExtensionOptions"
            },
            {
              type: "doc",
              id: "api/complexity/interfaces/ComplexityLimit",
              label: "ComplexityLimit"
            }
          ]
        },
        {
          type: "category",
          label: "Type Aliases",
          items: [
            {
              type: "doc",
              id: "api/complexity/type-aliases/FieldSettings",
              label: "FieldSettings"
            },
            {
              type: "doc",
              id: "api/complexity/type-aliases/GetComplexityError",
              label: "GetComplexityError"
            },
            {
              type: "doc",
              id: "api/complexity/type-aliases/GetComplexityLimit",
              label: "GetComplexityLimit"
            },
            {
              type: "doc",
              id: "api/complexity/type-aliases/GetFieldSettings",
              label: "GetFieldSettings"
            },
            {
              type: "doc",
              id: "api/complexity/type-aliases/GetFieldSettingsArgs",
              label: "GetFieldSettingsArgs"
            }
          ]
        },
        {
          type: "category",
          label: "Variables",
          items: [
            {
              type: "doc",
              id: "api/complexity/variables/ComplexityErrorCode",
              label: "ComplexityErrorCode"
            },
            {
              type: "doc",
              id: "api/complexity/variables/ComplexityErrorKind",
              label: "ComplexityErrorKind"
            }
          ]
        },
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/complexity/functions/createComplexity",
              label: "createComplexity"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/complexity/index"
      }
    },
    {
      type: "category",
      label: "@baeta/core",
      items: [
        {
          type: "category",
          label: "index",
          items: [
            {
              type: "category",
              label: "Interfaces",
              items: [
                {
                  type: "doc",
                  id: "api/core/index/interfaces/ContextStoreOptions",
                  label: "ContextStoreOptions"
                },
                {
                  type: "doc",
                  id: "api/core/index/interfaces/Options",
                  label: "Options"
                }
              ]
            },
            {
              type: "category",
              label: "Type Aliases",
              items: [
                {
                  type: "doc",
                  id: "api/core/index/type-aliases/ExecutableSchemaOptions",
                  label: "ExecutableSchemaOptions"
                },
                {
                  type: "doc",
                  id: "api/core/index/type-aliases/InputDirectiveOptions",
                  label: "InputDirectiveOptions"
                },
                {
                  type: "doc",
                  id: "api/core/index/type-aliases/Middleware",
                  label: "Middleware"
                },
                {
                  type: "doc",
                  id: "api/core/index/type-aliases/Resolver",
                  label: "Resolver"
                },
                {
                  type: "doc",
                  id: "api/core/index/type-aliases/ResolverParams",
                  label: "ResolverParams"
                },
                {
                  type: "doc",
                  id: "api/core/index/type-aliases/ValidateParams",
                  label: "ValidateParams"
                },
                {
                  type: "doc",
                  id: "api/core/index/type-aliases/ValidationDirectiveFn",
                  label: "ValidationDirectiveFn"
                },
                {
                  type: "doc",
                  id: "api/core/index/type-aliases/ValidationDirectiveFnParams",
                  label: "ValidationDirectiveFnParams"
                },
                {
                  type: "doc",
                  id: "api/core/index/type-aliases/ValidationTarget",
                  label: "ValidationTarget"
                }
              ]
            },
            {
              type: "category",
              label: "Functions",
              items: [
                {
                  type: "doc",
                  id: "api/core/index/functions/createApplication",
                  label: "createApplication"
                },
                {
                  type: "doc",
                  id: "api/core/index/functions/createContextStore",
                  label: "createContextStore"
                },
                {
                  type: "doc",
                  id: "api/core/index/functions/createInputDirective",
                  label: "createInputDirective"
                }
              ]
            }
          ],
          link: {
            type: "doc",
            id: "api/core/index/index"
          }
        },
        {
          type: "category",
          label: "sdk",
          items: [
            {
              type: "category",
              label: "Classes",
              items: [
                {
                  type: "doc",
                  id: "api/core/sdk/classes/FieldBuilder",
                  label: "FieldBuilder"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/classes/FieldCompiler",
                  label: "FieldCompiler"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/classes/ModuleBuilder",
                  label: "ModuleBuilder"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/classes/ModuleCompiler",
                  label: "ModuleCompiler"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/classes/SubscriptionBuilder",
                  label: "SubscriptionBuilder"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/classes/TypeBuilder",
                  label: "TypeBuilder"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/classes/TypeCompiler",
                  label: "TypeCompiler"
                }
              ]
            },
            {
              type: "category",
              label: "Interfaces",
              items: [
                {
                  type: "doc",
                  id: "api/core/sdk/interfaces/AppPlugin",
                  label: "AppPlugin"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/interfaces/FieldBuilderOptions",
                  label: "FieldBuilderOptions"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/interfaces/FieldCompilerOptions",
                  label: "FieldCompilerOptions"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/interfaces/ModuleBuilderOptions",
                  label: "ModuleBuilderOptions"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/interfaces/ModuleCompilerOptions",
                  label: "ModuleCompilerOptions"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/interfaces/SubscriptionBuilderOptions",
                  label: "SubscriptionBuilderOptions"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/interfaces/TypeBuilderOptions",
                  label: "TypeBuilderOptions"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/interfaces/TypeCompilerOptions",
                  label: "TypeCompilerOptions"
                }
              ]
            },
            {
              type: "category",
              label: "Type Aliases",
              items: [
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/Field",
                  label: "Field"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/FieldHelpers",
                  label: "FieldHelpers"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/FieldMethods",
                  label: "FieldMethods"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/FieldsBuildersMap",
                  label: "FieldsBuildersMap"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/FieldsResolversMap",
                  label: "FieldsResolversMap"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/FieldUseInput",
                  label: "FieldUseInput"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/FieldUsePlugin",
                  label: "FieldUsePlugin"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/FieldWithMake",
                  label: "FieldWithMake"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/ModuleCompilerFactory",
                  label: "ModuleCompilerFactory"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/ModuleMethods",
                  label: "ModuleMethods"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/ModuleUseInput",
                  label: "ModuleUseInput"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/ModuleUsePlugin",
                  label: "ModuleUsePlugin"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/Or",
                  label: "Or"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/PluginId",
                  label: "PluginId"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/SchemaTransformer",
                  label: "SchemaTransformer"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/Subscription",
                  label: "Subscription"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/SubscriptionField",
                  label: "SubscriptionField"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/SubscriptionFieldUseInput",
                  label: "SubscriptionFieldUseInput"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/SubscriptionFieldWithMake",
                  label: "SubscriptionFieldWithMake"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/SubscriptionMethods",
                  label: "SubscriptionMethods"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/SubscriptionResolveMethods",
                  label: "SubscriptionResolveMethods"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/SubscriptionUsePlugin",
                  label: "SubscriptionUsePlugin"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/TypeCompilerFactory",
                  label: "TypeCompilerFactory"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/TypeMethods",
                  label: "TypeMethods"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/TypesBuildersMap",
                  label: "TypesBuildersMap"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/TypesResolversMap",
                  label: "TypesResolversMap"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/TypeUseInput",
                  label: "TypeUseInput"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/type-aliases/TypeUsePlugin",
                  label: "TypeUsePlugin"
                }
              ]
            },
            {
              type: "category",
              label: "Functions",
              items: [
                {
                  type: "doc",
                  id: "api/core/sdk/functions/addValidationToSchema",
                  label: "addValidationToSchema"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/functions/composeMiddlewares",
                  label: "composeMiddlewares"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/functions/concatMiddlewares",
                  label: "concatMiddlewares"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/functions/createAppPluginId",
                  label: "createAppPluginId"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/functions/createFieldBuilder",
                  label: "createFieldBuilder"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/functions/createModuleBuilder",
                  label: "createModuleBuilder"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/functions/createObjectLens",
                  label: "createObjectLens"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/functions/createSubscriptionBuilder",
                  label: "createSubscriptionBuilder"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/functions/createTypeBuilder",
                  label: "createTypeBuilder"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/functions/isPromise",
                  label: "isPromise"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/functions/makeField",
                  label: "makeField"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/functions/mapMaybePromise",
                  label: "mapMaybePromise"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/functions/nameFunction",
                  label: "nameFunction"
                },
                {
                  type: "doc",
                  id: "api/core/sdk/functions/transformSchema",
                  label: "transformSchema"
                }
              ]
            }
          ],
          link: {
            type: "doc",
            id: "api/core/sdk/index"
          }
        }
      ],
      link: {
        type: "doc",
        id: "api/core/index"
      }
    },
    {
      type: "category",
      label: "@baeta/directives",
      items: [
        {
          type: "category",
          label: "Variables",
          items: [
            {
              type: "doc",
              id: "api/directives/variables/definitions",
              label: "definitions"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/directives/index"
      }
    },
    {
      type: "category",
      label: "@baeta/env",
      items: [
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/env/interfaces/EnvOptions",
              label: "EnvOptions"
            }
          ]
        },
        {
          type: "category",
          label: "Type Aliases",
          items: [
            {
              type: "doc",
              id: "api/env/type-aliases/EnvInferType",
              label: "EnvInferType"
            },
            {
              type: "doc",
              id: "api/env/type-aliases/EnvTypes",
              label: "EnvTypes"
            }
          ]
        },
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/env/functions/createEnvParser",
              label: "createEnvParser"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/env/index"
      }
    },
    {
      type: "category",
      label: "@baeta/errors",
      items: [
        {
          type: "category",
          label: "Classes",
          items: [
            {
              type: "doc",
              id: "api/errors/classes/AggregateGraphQLError",
              label: "AggregateGraphQLError"
            },
            {
              type: "doc",
              id: "api/errors/classes/BadUserInput",
              label: "BadUserInput"
            },
            {
              type: "doc",
              id: "api/errors/classes/ForbiddenError",
              label: "ForbiddenError"
            },
            {
              type: "doc",
              id: "api/errors/classes/InternalServerError",
              label: "InternalServerError"
            },
            {
              type: "doc",
              id: "api/errors/classes/UnauthenticatedError",
              label: "UnauthenticatedError"
            }
          ]
        },
        {
          type: "category",
          label: "Type Aliases",
          items: [
            {
              type: "doc",
              id: "api/errors/type-aliases/BaetaErrorCode",
              label: "BaetaErrorCode"
            }
          ]
        },
        {
          type: "category",
          label: "Variables",
          items: [
            {
              type: "doc",
              id: "api/errors/variables/BaetaErrorCode",
              label: "BaetaErrorCode"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/errors/index"
      }
    },
    {
      type: "category",
      label: "@baeta/federation",
      items: [
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/federation/functions/createFederationScalar",
              label: "createFederationScalar"
            },
            {
              type: "doc",
              id: "api/federation/functions/resolveEntities",
              label: "resolveEntities"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/federation/index"
      }
    },
    {
      type: "category",
      label: "@baeta/generator",
      items: [
        {
          type: "category",
          label: "Classes",
          items: [
            {
              type: "doc",
              id: "api/generator/classes/Watcher",
              label: "Watcher"
            }
          ]
        },
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/generator/interfaces/GeneratorHooks",
              label: "GeneratorHooks"
            },
            {
              type: "doc",
              id: "api/generator/interfaces/GeneratorOptions",
              label: "GeneratorOptions"
            },
            {
              type: "doc",
              id: "api/generator/interfaces/GeneratorPluginV1",
              label: "GeneratorPluginV1"
            },
            {
              type: "doc",
              id: "api/generator/interfaces/WatcherFile",
              label: "WatcherFile"
            }
          ]
        },
        {
          type: "category",
          label: "Type Aliases",
          items: [
            {
              type: "doc",
              id: "api/generator/type-aliases/WatcherListener",
              label: "WatcherListener"
            }
          ]
        },
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/generator/functions/generate",
              label: "generate"
            },
            {
              type: "doc",
              id: "api/generator/functions/generateAndWatch",
              label: "generateAndWatch"
            },
            {
              type: "doc",
              id: "api/generator/functions/getGeneratorPlugins",
              label: "getGeneratorPlugins"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/generator/index"
      }
    },
    {
      type: "category",
      label: "@baeta/generator-sdk",
      items: [
        {
          type: "category",
          label: "Namespaces",
          items: [
            {
              type: "category",
              label: "micromatch",
              items: [
                {
                  type: "category",
                  label: "Interfaces",
                  items: [
                    {
                      type: "doc",
                      id: "api/generator-sdk/namespaces/micromatch/interfaces/Item",
                      label: "Item"
                    },
                    {
                      type: "doc",
                      id: "api/generator-sdk/namespaces/micromatch/interfaces/Options",
                      label: "Options"
                    },
                    {
                      type: "doc",
                      id: "api/generator-sdk/namespaces/micromatch/interfaces/ScanInfo",
                      label: "ScanInfo"
                    },
                    {
                      type: "doc",
                      id: "api/generator-sdk/namespaces/micromatch/interfaces/ScanInfoToken",
                      label: "ScanInfoToken"
                    },
                    {
                      type: "doc",
                      id: "api/generator-sdk/namespaces/micromatch/interfaces/ScanInfoWithParts",
                      label: "ScanInfoWithParts"
                    },
                    {
                      type: "doc",
                      id: "api/generator-sdk/namespaces/micromatch/interfaces/ScanInfoWithTokens",
                      label: "ScanInfoWithTokens"
                    },
                    {
                      type: "doc",
                      id: "api/generator-sdk/namespaces/micromatch/interfaces/ScanOptions",
                      label: "ScanOptions"
                    }
                  ]
                }
              ],
              link: {
                type: "doc",
                id: "api/generator-sdk/namespaces/micromatch/index"
              }
            }
          ]
        },
        {
          type: "category",
          label: "Classes",
          items: [
            {
              type: "doc",
              id: "api/generator-sdk/classes/File",
              label: "File"
            },
            {
              type: "doc",
              id: "api/generator-sdk/classes/FileBlock",
              label: "FileBlock"
            },
            {
              type: "doc",
              id: "api/generator-sdk/classes/FileManager",
              label: "FileManager"
            },
            {
              type: "doc",
              id: "api/generator-sdk/classes/Watcher",
              label: "Watcher"
            },
            {
              type: "doc",
              id: "api/generator-sdk/classes/WatcherIgnore",
              label: "WatcherIgnore"
            }
          ]
        },
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/generator-sdk/interfaces/FileOptions",
              label: "FileOptions"
            },
            {
              type: "doc",
              id: "api/generator-sdk/interfaces/GeneratorOptions",
              label: "GeneratorOptions"
            },
            {
              type: "doc",
              id: "api/generator-sdk/interfaces/GeneratorPluginV1",
              label: "GeneratorPluginV1"
            },
            {
              type: "doc",
              id: "api/generator-sdk/interfaces/Loader",
              label: "Loader"
            },
            {
              type: "doc",
              id: "api/generator-sdk/interfaces/NormalizedGeneratorOptions",
              label: "NormalizedGeneratorOptions"
            },
            {
              type: "doc",
              id: "api/generator-sdk/interfaces/WatcherFile",
              label: "WatcherFile"
            }
          ]
        },
        {
          type: "category",
          label: "Type Aliases",
          items: [
            {
              type: "doc",
              id: "api/generator-sdk/type-aliases/Ctx",
              label: "Ctx"
            },
            {
              type: "doc",
              id: "api/generator-sdk/type-aliases/GeneratorPluginV1Factory",
              label: "GeneratorPluginV1Factory"
            },
            {
              type: "doc",
              id: "api/generator-sdk/type-aliases/GeneratorPluginV1Fn",
              label: "GeneratorPluginV1Fn"
            },
            {
              type: "doc",
              id: "api/generator-sdk/type-aliases/GeneratorPluginV1ReloadFn",
              label: "GeneratorPluginV1ReloadFn"
            },
            {
              type: "doc",
              id: "api/generator-sdk/type-aliases/GeneratorPluginV1WatchOptions",
              label: "GeneratorPluginV1WatchOptions"
            },
            {
              type: "doc",
              id: "api/generator-sdk/type-aliases/GeneratorPluginVersion",
              label: "GeneratorPluginVersion"
            },
            {
              type: "doc",
              id: "api/generator-sdk/type-aliases/MatchFn",
              label: "MatchFn"
            },
            {
              type: "doc",
              id: "api/generator-sdk/type-aliases/MatchPattern",
              label: "MatchPattern"
            },
            {
              type: "doc",
              id: "api/generator-sdk/type-aliases/WatcherListener",
              label: "WatcherListener"
            }
          ]
        },
        {
          type: "category",
          label: "Variables",
          items: [
            {
              type: "doc",
              id: "api/generator-sdk/variables/GeneratorPluginVersion",
              label: "GeneratorPluginVersion"
            },
            {
              type: "doc",
              id: "api/generator-sdk/variables/isMatch",
              label: "isMatch"
            },
            {
              type: "doc",
              id: "api/generator-sdk/variables/micromatch",
              label: "micromatch"
            }
          ]
        },
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/generator-sdk/functions/createPluginV1",
              label: "createPluginV1"
            },
            {
              type: "doc",
              id: "api/generator-sdk/functions/getGeneratorPlugins",
              label: "getGeneratorPlugins"
            },
            {
              type: "doc",
              id: "api/generator-sdk/functions/getModuleExportName",
              label: "getModuleExportName"
            },
            {
              type: "doc",
              id: "api/generator-sdk/functions/isGeneratorPlugin",
              label: "isGeneratorPlugin"
            },
            {
              type: "doc",
              id: "api/generator-sdk/functions/loadOptions",
              label: "loadOptions"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/generator-sdk/index"
      }
    },
    {
      type: "category",
      label: "@baeta/plugin",
      items: [
        {
          type: "category",
          label: "Type Aliases",
          items: [
            {
              type: "doc",
              id: "api/plugin/type-aliases/PluginType",
              label: "PluginType"
            }
          ]
        },
        {
          type: "category",
          label: "Variables",
          items: [
            {
              type: "doc",
              id: "api/plugin/variables/PluginType",
              label: "PluginType"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/plugin/index"
      }
    },
    {
      type: "category",
      label: "@baeta/plugin-cloudflare",
      items: [
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/plugin-cloudflare/interfaces/CloudflarePluginOptions",
              label: "CloudflarePluginOptions"
            }
          ]
        },
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/plugin-cloudflare/functions/cloudflarePlugin",
              label: "cloudflarePlugin"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/plugin-cloudflare/index"
      }
    },
    {
      type: "category",
      label: "@baeta/plugin-directives",
      items: [
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/plugin-directives/interfaces/DirectivesOptions",
              label: "DirectivesOptions"
            }
          ]
        },
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/plugin-directives/functions/directivesPlugin",
              label: "directivesPlugin"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/plugin-directives/index"
      }
    },
    {
      type: "category",
      label: "@baeta/plugin-exec",
      items: [
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/plugin-exec/interfaces/ExecPluginOptions",
              label: "ExecPluginOptions"
            }
          ]
        },
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/plugin-exec/functions/createExecPlugin",
              label: "createExecPlugin"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/plugin-exec/index"
      }
    },
    {
      type: "category",
      label: "@baeta/plugin-federation",
      items: [
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/plugin-federation/interfaces/FederationPluginOptions",
              label: "FederationPluginOptions"
            }
          ]
        },
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/plugin-federation/functions/federationPlugin",
              label: "federationPlugin"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/plugin-federation/index"
      }
    },
    {
      type: "category",
      label: "@baeta/plugin-gitignore",
      items: [
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/plugin-gitignore/interfaces/GitignoreOptions",
              label: "GitignoreOptions"
            }
          ]
        },
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/plugin-gitignore/functions/gitignorePlugin",
              label: "gitignorePlugin"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/plugin-gitignore/index"
      }
    },
    {
      type: "category",
      label: "@baeta/plugin-graphql",
      items: [
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/plugin-graphql/functions/graphqlPlugin",
              label: "graphqlPlugin"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/plugin-graphql/index"
      }
    },
    {
      type: "category",
      label: "@baeta/plugin-pagination",
      items: [
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/plugin-pagination/interfaces/PaginationOptions",
              label: "PaginationOptions"
            },
            {
              type: "doc",
              id: "api/plugin-pagination/interfaces/PaginationTypeOptions",
              label: "PaginationTypeOptions"
            }
          ]
        },
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/plugin-pagination/functions/paginationPlugin",
              label: "paginationPlugin"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/plugin-pagination/index"
      }
    },
    {
      type: "category",
      label: "@baeta/plugin-prisma",
      items: [
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/plugin-prisma/interfaces/PrismaPluginOptions",
              label: "PrismaPluginOptions"
            }
          ]
        },
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/plugin-prisma/functions/prismaPlugin",
              label: "prismaPlugin"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/plugin-prisma/index"
      }
    },
    {
      type: "category",
      label: "@baeta/subscriptions-cloudflare",
      items: [
        {
          type: "category",
          label: "index",
          items: [
            {
              type: "category",
              label: "Classes",
              items: [
                {
                  type: "doc",
                  id: "api/subscriptions-cloudflare/index/classes/SubscriptionDatabase",
                  label: "SubscriptionDatabase"
                },
                {
                  type: "doc",
                  id: "api/subscriptions-cloudflare/index/classes/SubscriptionDatabaseD1",
                  label: "SubscriptionDatabaseD1"
                }
              ]
            },
            {
              type: "category",
              label: "Interfaces",
              items: [
                {
                  type: "doc",
                  id: "api/subscriptions-cloudflare/index/interfaces/SubscriptionInfo",
                  label: "SubscriptionInfo"
                },
                {
                  type: "doc",
                  id: "api/subscriptions-cloudflare/index/interfaces/SubscriptionsContextLoader",
                  label: "SubscriptionsContextLoader"
                },
                {
                  type: "doc",
                  id: "api/subscriptions-cloudflare/index/interfaces/SubscriptionsOptions",
                  label: "SubscriptionsOptions"
                }
              ]
            },
            {
              type: "category",
              label: "Type Aliases",
              items: [
                {
                  type: "doc",
                  id: "api/subscriptions-cloudflare/index/type-aliases/PoolingType",
                  label: "PoolingType"
                },
                {
                  type: "doc",
                  id: "api/subscriptions-cloudflare/index/type-aliases/Publish",
                  label: "Publish"
                },
                {
                  type: "doc",
                  id: "api/subscriptions-cloudflare/index/type-aliases/Subscribe",
                  label: "Subscribe"
                }
              ]
            },
            {
              type: "category",
              label: "Functions",
              items: [
                {
                  type: "doc",
                  id: "api/subscriptions-cloudflare/index/functions/createCloudflareSubscription",
                  label: "createCloudflareSubscription"
                }
              ]
            }
          ],
          link: {
            type: "doc",
            id: "api/subscriptions-cloudflare/index/index"
          }
        },
        {
          type: "category",
          label: "sdk",
          items: [
            {
              type: "category",
              label: "Variables",
              items: [
                {
                  type: "doc",
                  id: "api/subscriptions-cloudflare/sdk/variables/databaseMigrations",
                  label: "databaseMigrations"
                },
                {
                  type: "doc",
                  id: "api/subscriptions-cloudflare/sdk/variables/durableObjectsMigrations",
                  label: "durableObjectsMigrations"
                },
                {
                  type: "doc",
                  id: "api/subscriptions-cloudflare/sdk/variables/wsConnectionClassName",
                  label: "wsConnectionClassName"
                }
              ]
            }
          ],
          link: {
            type: "doc",
            id: "api/subscriptions-cloudflare/sdk/index"
          }
        }
      ],
      link: {
        type: "doc",
        id: "api/subscriptions-cloudflare/index"
      }
    },
    {
      type: "category",
      label: "@baeta/subscriptions-pubsub",
      items: [
        {
          type: "category",
          label: "Classes",
          items: [
            {
              type: "doc",
              id: "api/subscriptions-pubsub/classes/TypedPubSub",
              label: "TypedPubSub"
            }
          ]
        },
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/subscriptions-pubsub/interfaces/TypedPubSubOptions",
              label: "TypedPubSubOptions"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/subscriptions-pubsub/index"
      }
    },
    {
      type: "category",
      label: "@baeta/util-encoding",
      items: [
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/util-encoding/functions/decodeBase64",
              label: "decodeBase64"
            },
            {
              type: "doc",
              id: "api/util-encoding/functions/decodeBase64Url",
              label: "decodeBase64Url"
            },
            {
              type: "doc",
              id: "api/util-encoding/functions/encodeBase64",
              label: "encodeBase64"
            },
            {
              type: "doc",
              id: "api/util-encoding/functions/encodeBase64Url",
              label: "encodeBase64Url"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/util-encoding/index"
      }
    },
    {
      type: "category",
      label: "@baeta/util-env",
      items: [
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/util-env/functions/getEnv",
              label: "getEnv"
            },
            {
              type: "doc",
              id: "api/util-env/functions/isDevelopmentMode",
              label: "isDevelopmentMode"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/util-env/index"
      }
    },
    {
      type: "category",
      label: "@baeta/util-graphql",
      items: [
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/util-graphql/interfaces/Source",
              label: "Source"
            }
          ]
        },
        {
          type: "category",
          label: "Type Aliases",
          items: [
            {
              type: "doc",
              id: "api/util-graphql/type-aliases/DefinitionsMap",
              label: "DefinitionsMap"
            },
            {
              type: "doc",
              id: "api/util-graphql/type-aliases/ModuleRegistry",
              label: "ModuleRegistry"
            },
            {
              type: "doc",
              id: "api/util-graphql/type-aliases/Picks",
              label: "Picks"
            },
            {
              type: "doc",
              id: "api/util-graphql/type-aliases/Registry",
              label: "Registry"
            },
            {
              type: "doc",
              id: "api/util-graphql/type-aliases/RegistryKeys",
              label: "RegistryKeys"
            }
          ]
        },
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/util-graphql/functions/createDefinitionsMapFromDocument",
              label: "createDefinitionsMapFromDocument"
            },
            {
              type: "doc",
              id: "api/util-graphql/functions/createDefinitionsMapFromSources",
              label: "createDefinitionsMapFromSources"
            },
            {
              type: "doc",
              id: "api/util-graphql/functions/createModuleRegistry",
              label: "createModuleRegistry"
            },
            {
              type: "doc",
              id: "api/util-graphql/functions/getSourcesFromSchema",
              label: "getSourcesFromSchema"
            },
            {
              type: "doc",
              id: "api/util-graphql/functions/groupSourcesByModule",
              label: "groupSourcesByModule"
            },
            {
              type: "doc",
              id: "api/util-graphql/functions/isScalarType",
              label: "isScalarType"
            },
            {
              type: "doc",
              id: "api/util-graphql/functions/loadSchema",
              label: "loadSchema"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/util-graphql/index"
      }
    },
    {
      type: "category",
      label: "@baeta/util-log",
      items: [
        {
          type: "category",
          label: "Type Aliases",
          items: [
            {
              type: "doc",
              id: "api/util-log/type-aliases/Logger",
              label: "Logger"
            }
          ]
        },
        {
          type: "category",
          label: "Variables",
          items: [
            {
              type: "doc",
              id: "api/util-log/variables/log",
              label: "log"
            }
          ]
        },
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/util-log/functions/createLogger",
              label: "createLogger"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/util-log/index"
      }
    },
    {
      type: "category",
      label: "@baeta/util-path",
      items: [
        {
          type: "category",
          label: "Variables",
          items: [
            {
              type: "doc",
              id: "api/util-path/variables/basename",
              label: "basename"
            },
            {
              type: "doc",
              id: "api/util-path/variables/default",
              label: "default"
            },
            {
              type: "doc",
              id: "api/util-path/variables/delimiter",
              label: "delimiter"
            },
            {
              type: "doc",
              id: "api/util-path/variables/dirname",
              label: "dirname"
            },
            {
              type: "doc",
              id: "api/util-path/variables/extname",
              label: "extname"
            },
            {
              type: "doc",
              id: "api/util-path/variables/format",
              label: "format"
            },
            {
              type: "doc",
              id: "api/util-path/variables/isAbsolute",
              label: "isAbsolute"
            },
            {
              type: "doc",
              id: "api/util-path/variables/join",
              label: "join"
            },
            {
              type: "doc",
              id: "api/util-path/variables/matchesGlob",
              label: "matchesGlob"
            },
            {
              type: "doc",
              id: "api/util-path/variables/normalize",
              label: "normalize"
            },
            {
              type: "doc",
              id: "api/util-path/variables/parse",
              label: "parse"
            },
            {
              type: "doc",
              id: "api/util-path/variables/posix",
              label: "posix"
            },
            {
              type: "doc",
              id: "api/util-path/variables/relative",
              label: "relative"
            },
            {
              type: "doc",
              id: "api/util-path/variables/resolve",
              label: "resolve"
            },
            {
              type: "doc",
              id: "api/util-path/variables/sep",
              label: "sep"
            },
            {
              type: "doc",
              id: "api/util-path/variables/toNamespacedPath",
              label: "toNamespacedPath"
            },
            {
              type: "doc",
              id: "api/util-path/variables/win32",
              label: "win32"
            }
          ]
        },
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/util-path/functions/normalizeString",
              label: "normalizeString"
            },
            {
              type: "doc",
              id: "api/util-path/functions/posixPath",
              label: "posixPath"
            },
            {
              type: "doc",
              id: "api/util-path/functions/winPath",
              label: "winPath"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/util-path/index"
      }
    },
    {
      type: "category",
      label: "create-baeta",
      items: [
        {
          type: "category",
          label: "Interfaces",
          items: [
            {
              type: "doc",
              id: "api/create-baeta/interfaces/Args",
              label: "Args"
            },
            {
              type: "doc",
              id: "api/create-baeta/interfaces/CliOptions",
              label: "CliOptions"
            }
          ]
        },
        {
          type: "category",
          label: "Type Aliases",
          items: [
            {
              type: "doc",
              id: "api/create-baeta/type-aliases/JavaScriptRuntime",
              label: "JavaScriptRuntime"
            },
            {
              type: "doc",
              id: "api/create-baeta/type-aliases/PackageManager",
              label: "PackageManager"
            },
            {
              type: "doc",
              id: "api/create-baeta/type-aliases/Template",
              label: "Template"
            },
            {
              type: "doc",
              id: "api/create-baeta/type-aliases/TemplateFile",
              label: "TemplateFile"
            }
          ]
        },
        {
          type: "category",
          label: "Variables",
          items: [
            {
              type: "doc",
              id: "api/create-baeta/variables/defaultJavaScriptRuntime",
              label: "defaultJavaScriptRuntime"
            },
            {
              type: "doc",
              id: "api/create-baeta/variables/defaultPackageManager",
              label: "defaultPackageManager"
            },
            {
              type: "doc",
              id: "api/create-baeta/variables/lockfileNames",
              label: "lockfileNames"
            },
            {
              type: "doc",
              id: "api/create-baeta/variables/packageManagers",
              label: "packageManagers"
            },
            {
              type: "doc",
              id: "api/create-baeta/variables/runtimes",
              label: "runtimes"
            },
            {
              type: "doc",
              id: "api/create-baeta/variables/templates",
              label: "templates"
            }
          ]
        },
        {
          type: "category",
          label: "Functions",
          items: [
            {
              type: "doc",
              id: "api/create-baeta/functions/copyTemplate",
              label: "copyTemplate"
            },
            {
              type: "doc",
              id: "api/create-baeta/functions/getAppName",
              label: "getAppName"
            },
            {
              type: "doc",
              id: "api/create-baeta/functions/getInstallCommand",
              label: "getInstallCommand"
            },
            {
              type: "doc",
              id: "api/create-baeta/functions/getPackageManager",
              label: "getPackageManager"
            },
            {
              type: "doc",
              id: "api/create-baeta/functions/getRuntime",
              label: "getRuntime"
            },
            {
              type: "doc",
              id: "api/create-baeta/functions/getTemplate",
              label: "getTemplate"
            },
            {
              type: "doc",
              id: "api/create-baeta/functions/handler",
              label: "handler"
            }
          ]
        }
      ],
      link: {
        type: "doc",
        id: "api/create-baeta/index"
      }
    }
  ]
};
export default typedocSidebar;