import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const typedocSidebar: SidebarsConfig = {
	items: [
		{
			type: 'category',
			label: '@baeta/cli',
			items: [
				{
					type: 'category',
					label: 'index',
					items: [
						{
							type: 'category',
							label: 'Interfaces',
							items: [
								{
									type: 'doc',
									id: 'api/cli/index/interfaces/BaetaOptions',
									label: 'BaetaOptions',
								},
							],
						},
						{
							type: 'category',
							label: 'Type Aliases',
							items: [
								{
									type: 'doc',
									id: 'api/cli/index/type-aliases/Plugin',
									label: 'Plugin',
								},
								{
									type: 'doc',
									id: 'api/cli/index/type-aliases/Plugins',
									label: 'Plugins',
								},
							],
						},
						{
							type: 'category',
							label: 'Functions',
							items: [
								{
									type: 'doc',
									id: 'api/cli/index/functions/defineConfig',
									label: 'defineConfig',
								},
							],
						},
					],
					link: {
						type: 'doc',
						id: 'api/cli/index/index',
					},
				},
				{
					type: 'category',
					label: 'ink',
					items: [
						{
							type: 'category',
							label: 'Type Aliases',
							items: [
								{
									type: 'doc',
									id: 'api/cli/ink/type-aliases/AppProps',
									label: 'AppProps',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/type-aliases/BoxProps',
									label: 'BoxProps',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/type-aliases/DOMElement',
									label: 'DOMElement',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/type-aliases/Instance',
									label: 'Instance',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/type-aliases/Key',
									label: 'Key',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/type-aliases/NewlineProps',
									label: 'NewlineProps',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/type-aliases/RenderOptions',
									label: 'RenderOptions',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/type-aliases/StaticProps',
									label: 'StaticProps',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/type-aliases/StderrProps',
									label: 'StderrProps',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/type-aliases/StdinProps',
									label: 'StdinProps',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/type-aliases/StdoutProps',
									label: 'StdoutProps',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/type-aliases/TextProps',
									label: 'TextProps',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/type-aliases/TransformProps',
									label: 'TransformProps',
								},
							],
						},
						{
							type: 'category',
							label: 'Variables',
							items: [
								{
									type: 'doc',
									id: 'api/cli/ink/variables/Box',
									label: 'Box',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/variables/measureElement',
									label: 'measureElement',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/variables/render',
									label: 'render',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/variables/useApp',
									label: 'useApp',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/variables/useFocus',
									label: 'useFocus',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/variables/useFocusManager',
									label: 'useFocusManager',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/variables/useInput',
									label: 'useInput',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/variables/useIsScreenReaderEnabled',
									label: 'useIsScreenReaderEnabled',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/variables/useStderr',
									label: 'useStderr',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/variables/useStdin',
									label: 'useStdin',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/variables/useStdout',
									label: 'useStdout',
								},
							],
						},
						{
							type: 'category',
							label: 'Functions',
							items: [
								{
									type: 'doc',
									id: 'api/cli/ink/functions/Newline',
									label: 'Newline',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/functions/Spacer',
									label: 'Spacer',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/functions/Static',
									label: 'Static',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/functions/Text',
									label: 'Text',
								},
								{
									type: 'doc',
									id: 'api/cli/ink/functions/Transform',
									label: 'Transform',
								},
							],
						},
					],
					link: {
						type: 'doc',
						id: 'api/cli/ink/index',
					},
				},
				{
					type: 'category',
					label: 'sdk',
					items: [
						{
							type: 'category',
							label: 'Interfaces',
							items: [
								{
									type: 'doc',
									id: 'api/cli/sdk/interfaces/ConfigProps',
									label: 'ConfigProps',
								},
								{
									type: 'doc',
									id: 'api/cli/sdk/interfaces/ErrorsProps',
									label: 'ErrorsProps',
								},
								{
									type: 'doc',
									id: 'api/cli/sdk/interfaces/LayoutProps',
									label: 'LayoutProps',
								},
								{
									type: 'doc',
									id: 'api/cli/sdk/interfaces/LoadedBaetaConfig',
									label: 'LoadedBaetaConfig',
								},
								{
									type: 'doc',
									id: 'api/cli/sdk/interfaces/TimeProps',
									label: 'TimeProps',
								},
							],
						},
						{
							type: 'category',
							label: 'Type Aliases',
							items: [
								{
									type: 'doc',
									id: 'api/cli/sdk/type-aliases/ConfigEventMap',
									label: 'ConfigEventMap',
								},
								{
									type: 'doc',
									id: 'api/cli/sdk/type-aliases/TextOutput',
									label: 'TextOutput',
								},
							],
						},
						{
							type: 'category',
							label: 'Variables',
							items: [
								{
									type: 'doc',
									id: 'api/cli/sdk/variables/ConfigProviderBase',
									label: 'ConfigProviderBase',
								},
								{
									type: 'doc',
									id: 'api/cli/sdk/variables/errorNamespace',
									label: 'errorNamespace',
								},
								{
									type: 'doc',
									id: 'api/cli/sdk/variables/useConfig',
									label: 'useConfig',
								},
							],
						},
						{
							type: 'category',
							label: 'Functions',
							items: [
								{
									type: 'doc',
									id: 'api/cli/sdk/functions/ConfigProvider',
									label: 'ConfigProvider',
								},
								{
									type: 'doc',
									id: 'api/cli/sdk/functions/ConfigStatus',
									label: 'ConfigStatus',
								},
								{
									type: 'doc',
									id: 'api/cli/sdk/functions/createCommand',
									label: 'createCommand',
								},
								{
									type: 'doc',
									id: 'api/cli/sdk/functions/Errors',
									label: 'Errors',
								},
								{
									type: 'doc',
									id: 'api/cli/sdk/functions/Layout',
									label: 'Layout',
								},
								{
									type: 'doc',
									id: 'api/cli/sdk/functions/makeErrorMessage',
									label: 'makeErrorMessage',
								},
								{
									type: 'doc',
									id: 'api/cli/sdk/functions/makeErrorOutput',
									label: 'makeErrorOutput',
								},
								{
									type: 'doc',
									id: 'api/cli/sdk/functions/renderComponent',
									label: 'renderComponent',
								},
								{
									type: 'doc',
									id: 'api/cli/sdk/functions/renderComponentWithoutConfig',
									label: 'renderComponentWithoutConfig',
								},
								{
									type: 'doc',
									id: 'api/cli/sdk/functions/Spinner',
									label: 'Spinner',
								},
								{
									type: 'doc',
									id: 'api/cli/sdk/functions/Time',
									label: 'Time',
								},
								{
									type: 'doc',
									id: 'api/cli/sdk/functions/useConfigStore',
									label: 'useConfigStore',
								},
							],
						},
					],
					link: {
						type: 'doc',
						id: 'api/cli/sdk/index',
					},
				},
			],
			link: {
				type: 'doc',
				id: 'api/cli/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/compiler',
			items: [
				{
					type: 'category',
					label: 'esbuild',
					items: [
						{
							type: 'category',
							label: 'Interfaces',
							items: [
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/AnalyzeMetafileOptions',
									label: 'AnalyzeMetafileOptions',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/BuildContext',
									label: 'BuildContext',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/BuildFailure',
									label: 'BuildFailure',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/BuildOptions',
									label: 'BuildOptions',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/BuildResult',
									label: 'BuildResult',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/CommonOptions',
									label: 'CommonOptions',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/CORSOptions',
									label: 'CORSOptions',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/FormatMessagesOptions',
									label: 'FormatMessagesOptions',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/InitializeOptions',
									label: 'InitializeOptions',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/Location',
									label: 'Location',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/Message',
									label: 'Message',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/Metafile',
									label: 'Metafile',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/Note',
									label: 'Note',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/OnEndResult',
									label: 'OnEndResult',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/OnLoadArgs',
									label: 'OnLoadArgs',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/OnLoadOptions',
									label: 'OnLoadOptions',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/OnLoadResult',
									label: 'OnLoadResult',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/OnResolveArgs',
									label: 'OnResolveArgs',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/OnResolveOptions',
									label: 'OnResolveOptions',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/OnResolveResult',
									label: 'OnResolveResult',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/OnStartResult',
									label: 'OnStartResult',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/OutputFile',
									label: 'OutputFile',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/PartialMessage',
									label: 'PartialMessage',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/PartialNote',
									label: 'PartialNote',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/Plugin',
									label: 'Plugin',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/PluginBuild',
									label: 'PluginBuild',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/ResolveOptions',
									label: 'ResolveOptions',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/ResolveResult',
									label: 'ResolveResult',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/ServeOnRequestArgs',
									label: 'ServeOnRequestArgs',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/ServeOptions',
									label: 'ServeOptions',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/ServeResult',
									label: 'ServeResult',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/StdinOptions',
									label: 'StdinOptions',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/TransformFailure',
									label: 'TransformFailure',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/TransformOptions',
									label: 'TransformOptions',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/TransformResult',
									label: 'TransformResult',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/TsconfigRaw',
									label: 'TsconfigRaw',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/interfaces/WatchOptions',
									label: 'WatchOptions',
								},
							],
						},
						{
							type: 'category',
							label: 'Type Aliases',
							items: [
								{
									type: 'doc',
									id: 'api/compiler/esbuild/type-aliases/AbsPaths',
									label: 'AbsPaths',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/type-aliases/Charset',
									label: 'Charset',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/type-aliases/Drop',
									label: 'Drop',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/type-aliases/Format',
									label: 'Format',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/type-aliases/ImportKind',
									label: 'ImportKind',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/type-aliases/Loader',
									label: 'Loader',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/type-aliases/LogLevel',
									label: 'LogLevel',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/type-aliases/Platform',
									label: 'Platform',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/type-aliases/SameShape',
									label: 'SameShape',
								},
							],
						},
						{
							type: 'category',
							label: 'Variables',
							items: [
								{
									type: 'doc',
									id: 'api/compiler/esbuild/variables/version',
									label: 'version',
								},
							],
						},
						{
							type: 'category',
							label: 'Functions',
							items: [
								{
									type: 'doc',
									id: 'api/compiler/esbuild/functions/analyzeMetafile',
									label: 'analyzeMetafile',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/functions/analyzeMetafileSync',
									label: 'analyzeMetafileSync',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/functions/build',
									label: 'build',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/functions/buildSync',
									label: 'buildSync',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/functions/context',
									label: 'context',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/functions/formatMessages',
									label: 'formatMessages',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/functions/formatMessagesSync',
									label: 'formatMessagesSync',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/functions/initialize',
									label: 'initialize',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/functions/stop',
									label: 'stop',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/functions/transform',
									label: 'transform',
								},
								{
									type: 'doc',
									id: 'api/compiler/esbuild/functions/transformSync',
									label: 'transformSync',
								},
							],
						},
					],
					link: {
						type: 'doc',
						id: 'api/compiler/esbuild/index',
					},
				},
				{
					type: 'category',
					label: 'index',
					items: [
						{
							type: 'category',
							label: 'Interfaces',
							items: [
								{
									type: 'doc',
									id: 'api/compiler/index/interfaces/CompilerOptions',
									label: 'CompilerOptions',
								},
								{
									type: 'doc',
									id: 'api/compiler/index/interfaces/HooksOptions',
									label: 'HooksOptions',
								},
							],
						},
						{
							type: 'category',
							label: 'Functions',
							items: [
								{
									type: 'doc',
									id: 'api/compiler/index/functions/build',
									label: 'build',
								},
								{
									type: 'doc',
									id: 'api/compiler/index/functions/buildAndWatch',
									label: 'buildAndWatch',
								},
								{
									type: 'doc',
									id: 'api/compiler/index/functions/bundleFile',
									label: 'bundleFile',
								},
								{
									type: 'doc',
									id: 'api/compiler/index/functions/createEsbuildCliHooksPlugin',
									label: 'createEsbuildCliHooksPlugin',
								},
							],
						},
					],
					link: {
						type: 'doc',
						id: 'api/compiler/index/index',
					},
				},
			],
			link: {
				type: 'doc',
				id: 'api/compiler/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/core',
			items: [
				{
					type: 'category',
					label: 'index',
					items: [
						{
							type: 'category',
							label: 'Interfaces',
							items: [
								{
									type: 'doc',
									id: 'api/core/index/interfaces/ContextStoreOptions',
									label: 'ContextStoreOptions',
								},
								{
									type: 'doc',
									id: 'api/core/index/interfaces/Options',
									label: 'Options',
								},
							],
						},
						{
							type: 'category',
							label: 'Type Aliases',
							items: [
								{
									type: 'doc',
									id: 'api/core/index/type-aliases/ExecutableSchemaOptions',
									label: 'ExecutableSchemaOptions',
								},
								{
									type: 'doc',
									id: 'api/core/index/type-aliases/InputDirectiveOptions',
									label: 'InputDirectiveOptions',
								},
								{
									type: 'doc',
									id: 'api/core/index/type-aliases/Middleware',
									label: 'Middleware',
								},
								{
									type: 'doc',
									id: 'api/core/index/type-aliases/Resolver',
									label: 'Resolver',
								},
								{
									type: 'doc',
									id: 'api/core/index/type-aliases/ResolverParams',
									label: 'ResolverParams',
								},
								{
									type: 'doc',
									id: 'api/core/index/type-aliases/ValidateParams',
									label: 'ValidateParams',
								},
								{
									type: 'doc',
									id: 'api/core/index/type-aliases/ValidationDirectiveFn',
									label: 'ValidationDirectiveFn',
								},
								{
									type: 'doc',
									id: 'api/core/index/type-aliases/ValidationDirectiveFnParams',
									label: 'ValidationDirectiveFnParams',
								},
								{
									type: 'doc',
									id: 'api/core/index/type-aliases/ValidationTarget',
									label: 'ValidationTarget',
								},
							],
						},
						{
							type: 'category',
							label: 'Functions',
							items: [
								{
									type: 'doc',
									id: 'api/core/index/functions/createApplication',
									label: 'createApplication',
								},
								{
									type: 'doc',
									id: 'api/core/index/functions/createContextStore',
									label: 'createContextStore',
								},
								{
									type: 'doc',
									id: 'api/core/index/functions/createExtensions',
									label: 'createExtensions',
								},
								{
									type: 'doc',
									id: 'api/core/index/functions/createInputDirective',
									label: 'createInputDirective',
								},
							],
						},
					],
					link: {
						type: 'doc',
						id: 'api/core/index/index',
					},
				},
				{
					type: 'category',
					label: 'sdk',
					items: [
						{
							type: 'category',
							label: 'Namespaces',
							items: [
								{
									type: 'category',
									label: 'BaetaExtensions',
									items: [
										{
											type: 'category',
											label: 'Interfaces',
											items: [
												{
													type: 'doc',
													id: 'api/core/sdk/namespaces/BaetaExtensions/interfaces/Extensions',
													label: 'Extensions',
												},
												{
													type: 'doc',
													id: 'api/core/sdk/namespaces/BaetaExtensions/interfaces/FieldExtensions',
													label: 'FieldExtensions',
												},
												{
													type: 'doc',
													id: 'api/core/sdk/namespaces/BaetaExtensions/interfaces/ModuleExtensions',
													label: 'ModuleExtensions',
												},
												{
													type: 'doc',
													id: 'api/core/sdk/namespaces/BaetaExtensions/interfaces/SubscriptionExtensions',
													label: 'SubscriptionExtensions',
												},
												{
													type: 'doc',
													id: 'api/core/sdk/namespaces/BaetaExtensions/interfaces/TypeExtensions',
													label: 'TypeExtensions',
												},
											],
										},
									],
									link: {
										type: 'doc',
										id: 'api/core/sdk/namespaces/BaetaExtensions/index',
									},
								},
							],
						},
						{
							type: 'category',
							label: 'Classes',
							items: [
								{
									type: 'doc',
									id: 'api/core/sdk/classes/Extension',
									label: 'Extension',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/classes/FieldBuilder',
									label: 'FieldBuilder',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/classes/FieldCompiler',
									label: 'FieldCompiler',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/classes/ModuleBuilder',
									label: 'ModuleBuilder',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/classes/ModuleCompiler',
									label: 'ModuleCompiler',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/classes/SubscriptionBuilder',
									label: 'SubscriptionBuilder',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/classes/TypeBuilder',
									label: 'TypeBuilder',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/classes/TypeCompiler',
									label: 'TypeCompiler',
								},
							],
						},
						{
							type: 'category',
							label: 'Type Aliases',
							items: [
								{
									type: 'doc',
									id: 'api/core/sdk/type-aliases/ExtensionFactory',
									label: 'ExtensionFactory',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/type-aliases/Field',
									label: 'Field',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/type-aliases/FieldHelpers',
									label: 'FieldHelpers',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/type-aliases/FieldMethods',
									label: 'FieldMethods',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/type-aliases/FieldsBuildersMap',
									label: 'FieldsBuildersMap',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/type-aliases/FieldsResolversMap',
									label: 'FieldsResolversMap',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/type-aliases/FieldWithMake',
									label: 'FieldWithMake',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/type-aliases/ModuleCompilerFactory',
									label: 'ModuleCompilerFactory',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/type-aliases/ModuleMethods',
									label: 'ModuleMethods',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/type-aliases/SchemaTransformer',
									label: 'SchemaTransformer',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/type-aliases/Subscription',
									label: 'Subscription',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/type-aliases/SubscriptionField',
									label: 'SubscriptionField',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/type-aliases/SubscriptionFieldWithMake',
									label: 'SubscriptionFieldWithMake',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/type-aliases/SubscriptionHelpers',
									label: 'SubscriptionHelpers',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/type-aliases/SubscriptionMethods',
									label: 'SubscriptionMethods',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/type-aliases/SubscriptionWrapper',
									label: 'SubscriptionWrapper',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/type-aliases/TypeCompilerFactory',
									label: 'TypeCompilerFactory',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/type-aliases/TypeMethods',
									label: 'TypeMethods',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/type-aliases/TypesBuildersMap',
									label: 'TypesBuildersMap',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/type-aliases/TypesResolversMap',
									label: 'TypesResolversMap',
								},
							],
						},
						{
							type: 'category',
							label: 'Functions',
							items: [
								{
									type: 'doc',
									id: 'api/core/sdk/functions/addValidationToSchema',
									label: 'addValidationToSchema',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/functions/composeMiddlewares',
									label: 'composeMiddlewares',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/functions/createFieldBuilder',
									label: 'createFieldBuilder',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/functions/createModuleBuilder',
									label: 'createModuleBuilder',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/functions/createObjectLens',
									label: 'createObjectLens',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/functions/createSubscriptionBuilder',
									label: 'createSubscriptionBuilder',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/functions/createTypeBuilder',
									label: 'createTypeBuilder',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/functions/makeField',
									label: 'makeField',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/functions/mergeExtensions',
									label: 'mergeExtensions',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/functions/nameFunction',
									label: 'nameFunction',
								},
								{
									type: 'doc',
									id: 'api/core/sdk/functions/transformSchema',
									label: 'transformSchema',
								},
							],
						},
					],
					link: {
						type: 'doc',
						id: 'api/core/sdk/index',
					},
				},
			],
			link: {
				type: 'doc',
				id: 'api/core/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/directives',
			items: [
				{
					type: 'category',
					label: 'Variables',
					items: [
						{
							type: 'doc',
							id: 'api/directives/variables/definitions',
							label: 'definitions',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/directives/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/env',
			items: [
				{
					type: 'category',
					label: 'Interfaces',
					items: [
						{
							type: 'doc',
							id: 'api/env/interfaces/EnvOptions',
							label: 'EnvOptions',
						},
					],
				},
				{
					type: 'category',
					label: 'Type Aliases',
					items: [
						{
							type: 'doc',
							id: 'api/env/type-aliases/EnvInferType',
							label: 'EnvInferType',
						},
						{
							type: 'doc',
							id: 'api/env/type-aliases/EnvTypes',
							label: 'EnvTypes',
						},
					],
				},
				{
					type: 'category',
					label: 'Functions',
					items: [
						{
							type: 'doc',
							id: 'api/env/functions/createEnvParser',
							label: 'createEnvParser',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/env/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/errors',
			items: [
				{
					type: 'category',
					label: 'Classes',
					items: [
						{
							type: 'doc',
							id: 'api/errors/classes/AggregateGraphQLError',
							label: 'AggregateGraphQLError',
						},
						{
							type: 'doc',
							id: 'api/errors/classes/BadUserInput',
							label: 'BadUserInput',
						},
						{
							type: 'doc',
							id: 'api/errors/classes/ForbiddenError',
							label: 'ForbiddenError',
						},
						{
							type: 'doc',
							id: 'api/errors/classes/InternalServerError',
							label: 'InternalServerError',
						},
						{
							type: 'doc',
							id: 'api/errors/classes/UnauthenticatedError',
							label: 'UnauthenticatedError',
						},
					],
				},
				{
					type: 'category',
					label: 'Type Aliases',
					items: [
						{
							type: 'doc',
							id: 'api/errors/type-aliases/BaetaErrorCode',
							label: 'BaetaErrorCode',
						},
						{
							type: 'doc',
							id: 'api/errors/type-aliases/BaetaErrorCodeKey',
							label: 'BaetaErrorCodeKey',
						},
					],
				},
				{
					type: 'category',
					label: 'Variables',
					items: [
						{
							type: 'doc',
							id: 'api/errors/variables/BaetaErrorCode',
							label: 'BaetaErrorCode',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/errors/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/extension-auth',
			items: [
				{
					type: 'category',
					label: 'Interfaces',
					items: [
						{
							type: 'doc',
							id: 'api/extension-auth/interfaces/AuthMiddlewareOptions',
							label: 'AuthMiddlewareOptions',
						},
						{
							type: 'doc',
							id: 'api/extension-auth/interfaces/AuthMiddlewareSubscribeOptions',
							label: 'AuthMiddlewareSubscribeOptions',
						},
						{
							type: 'doc',
							id: 'api/extension-auth/interfaces/AuthOptions',
							label: 'AuthOptions',
						},
					],
				},
				{
					type: 'category',
					label: 'Type Aliases',
					items: [
						{
							type: 'doc',
							id: 'api/extension-auth/type-aliases/DefaultScopes',
							label: 'DefaultScopes',
						},
						{
							type: 'doc',
							id: 'api/extension-auth/type-aliases/GetGrant',
							label: 'GetGrant',
						},
						{
							type: 'doc',
							id: 'api/extension-auth/type-aliases/GetGrantFn',
							label: 'GetGrantFn',
						},
						{
							type: 'doc',
							id: 'api/extension-auth/type-aliases/GetGrantResult',
							label: 'GetGrantResult',
						},
						{
							type: 'doc',
							id: 'api/extension-auth/type-aliases/GetPostScopeRules',
							label: 'GetPostScopeRules',
						},
						{
							type: 'doc',
							id: 'api/extension-auth/type-aliases/GetScopeLoader',
							label: 'GetScopeLoader',
						},
						{
							type: 'doc',
							id: 'api/extension-auth/type-aliases/GetScopeRules',
							label: 'GetScopeRules',
						},
						{
							type: 'doc',
							id: 'api/extension-auth/type-aliases/LogicRule',
							label: 'LogicRule',
						},
						{
							type: 'doc',
							id: 'api/extension-auth/type-aliases/ScopeErrorResolver',
							label: 'ScopeErrorResolver',
						},
						{
							type: 'doc',
							id: 'api/extension-auth/type-aliases/ScopeLoader',
							label: 'ScopeLoader',
						},
						{
							type: 'doc',
							id: 'api/extension-auth/type-aliases/ScopeLoaderMap',
							label: 'ScopeLoaderMap',
						},
						{
							type: 'doc',
							id: 'api/extension-auth/type-aliases/ScopeRule',
							label: 'ScopeRule',
						},
						{
							type: 'doc',
							id: 'api/extension-auth/type-aliases/ScopeRules',
							label: 'ScopeRules',
						},
						{
							type: 'doc',
							id: 'api/extension-auth/type-aliases/ScopesShape',
							label: 'ScopesShape',
						},
					],
				},
				{
					type: 'category',
					label: 'Functions',
					items: [
						{
							type: 'doc',
							id: 'api/extension-auth/functions/aggregateErrorResolver',
							label: 'aggregateErrorResolver',
						},
						{
							type: 'doc',
							id: 'api/extension-auth/functions/authExtension',
							label: 'authExtension',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/extension-auth/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/extension-cache',
			items: [
				{
					type: 'category',
					label: 'Classes',
					items: [
						{
							type: 'doc',
							id: 'api/extension-cache/classes/CacheRef',
							label: 'CacheRef',
						},
						{
							type: 'doc',
							id: 'api/extension-cache/classes/Store',
							label: 'Store',
						},
						{
							type: 'doc',
							id: 'api/extension-cache/classes/StoreAdapter',
							label: 'StoreAdapter',
						},
					],
				},
				{
					type: 'category',
					label: 'Interfaces',
					items: [
						{
							type: 'doc',
							id: 'api/extension-cache/interfaces/CacheMiddlewareOptions',
							label: 'CacheMiddlewareOptions',
						},
						{
							type: 'doc',
							id: 'api/extension-cache/interfaces/DefaultStoreOptions',
							label: 'DefaultStoreOptions',
						},
						{
							type: 'doc',
							id: 'api/extension-cache/interfaces/RequiredCacheMiddlewareOptions',
							label: 'RequiredCacheMiddlewareOptions',
						},
						{
							type: 'doc',
							id: 'api/extension-cache/interfaces/RequiredStoreOptions',
							label: 'RequiredStoreOptions',
						},
						{
							type: 'doc',
							id: 'api/extension-cache/interfaces/Serializer',
							label: 'Serializer',
						},
						{
							type: 'doc',
							id: 'api/extension-cache/interfaces/SerializerResult',
							label: 'SerializerResult',
						},
						{
							type: 'doc',
							id: 'api/extension-cache/interfaces/StoreOptions',
							label: 'StoreOptions',
						},
					],
				},
				{
					type: 'category',
					label: 'Type Aliases',
					items: [
						{
							type: 'doc',
							id: 'api/extension-cache/type-aliases/CacheArgs',
							label: 'CacheArgs',
						},
						{
							type: 'doc',
							id: 'api/extension-cache/type-aliases/CacheQueryMatching',
							label: 'CacheQueryMatching',
						},
						{
							type: 'doc',
							id: 'api/extension-cache/type-aliases/ClassTransformer',
							label: 'ClassTransformer',
						},
						{
							type: 'doc',
							id: 'api/extension-cache/type-aliases/CustomTransformer',
							label: 'CustomTransformer',
						},
						{
							type: 'doc',
							id: 'api/extension-cache/type-aliases/ItemRef',
							label: 'ItemRef',
						},
						{
							type: 'doc',
							id: 'api/extension-cache/type-aliases/ParentRef',
							label: 'ParentRef',
						},
						{
							type: 'doc',
							id: 'api/extension-cache/type-aliases/RefCompatibleRoot',
							label: 'RefCompatibleRoot',
						},
						{
							type: 'doc',
							id: 'api/extension-cache/type-aliases/SerializerAny',
							label: 'SerializerAny',
						},
						{
							type: 'doc',
							id: 'api/extension-cache/type-aliases/SerializerClass',
							label: 'SerializerClass',
						},
						{
							type: 'doc',
							id: 'api/extension-cache/type-aliases/SerializerTransformer',
							label: 'SerializerTransformer',
						},
						{
							type: 'doc',
							id: 'api/extension-cache/type-aliases/SerializerValue',
							label: 'SerializerValue',
						},
						{
							type: 'doc',
							id: 'api/extension-cache/type-aliases/SymbolTransformer',
							label: 'SymbolTransformer',
						},
					],
				},
				{
					type: 'category',
					label: 'Functions',
					items: [
						{
							type: 'doc',
							id: 'api/extension-cache/functions/cacheExtension',
							label: 'cacheExtension',
						},
						{
							type: 'doc',
							id: 'api/extension-cache/functions/createSerializer',
							label: 'createSerializer',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/extension-cache/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/extension-cache-cloudflare',
			items: [
				{
					type: 'category',
					label: 'index',
					items: [
						{
							type: 'category',
							label: 'Classes',
							items: [
								{
									type: 'doc',
									id: 'api/extension-cache-cloudflare/index/classes/BaetaCache',
									label: 'BaetaCache',
								},
								{
									type: 'doc',
									id: 'api/extension-cache-cloudflare/index/classes/CloudflareCacheClient',
									label: 'CloudflareCacheClient',
								},
								{
									type: 'doc',
									id: 'api/extension-cache-cloudflare/index/classes/CloudflareStoreAdapter',
									label: 'CloudflareStoreAdapter',
								},
							],
						},
					],
					link: {
						type: 'doc',
						id: 'api/extension-cache-cloudflare/index/index',
					},
				},
				{
					type: 'category',
					label: 'sdk',
					items: [
						{
							type: 'category',
							label: 'Interfaces',
							items: [
								{
									type: 'doc',
									id: 'api/extension-cache-cloudflare/sdk/interfaces/DurableObjectMigration',
									label: 'DurableObjectMigration',
								},
							],
						},
						{
							type: 'category',
							label: 'Variables',
							items: [
								{
									type: 'doc',
									id: 'api/extension-cache-cloudflare/sdk/variables/baetaCacheName',
									label: 'baetaCacheName',
								},
								{
									type: 'doc',
									id: 'api/extension-cache-cloudflare/sdk/variables/durableObjectsMigrations',
									label: 'durableObjectsMigrations',
								},
							],
						},
					],
					link: {
						type: 'doc',
						id: 'api/extension-cache-cloudflare/sdk/index',
					},
				},
			],
			link: {
				type: 'doc',
				id: 'api/extension-cache-cloudflare/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/extension-cache-keyv',
			items: [
				{
					type: 'category',
					label: 'Classes',
					items: [
						{
							type: 'doc',
							id: 'api/extension-cache-keyv/classes/KeyvStore',
							label: 'KeyvStore',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/extension-cache-keyv/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/extension-cache-redis',
			items: [
				{
					type: 'category',
					label: 'Classes',
					items: [
						{
							type: 'doc',
							id: 'api/extension-cache-redis/classes/RedisStore',
							label: 'RedisStore',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/extension-cache-redis/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/extension-cache-upstash',
			items: [
				{
					type: 'category',
					label: 'Classes',
					items: [
						{
							type: 'doc',
							id: 'api/extension-cache-upstash/classes/UpstashClient',
							label: 'UpstashClient',
						},
						{
							type: 'doc',
							id: 'api/extension-cache-upstash/classes/UpstashStore',
							label: 'UpstashStore',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/extension-cache-upstash/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/extension-complexity',
			items: [
				{
					type: 'category',
					label: 'Classes',
					items: [
						{
							type: 'doc',
							id: 'api/extension-complexity/classes/ComplexityError',
							label: 'ComplexityError',
						},
					],
				},
				{
					type: 'category',
					label: 'Interfaces',
					items: [
						{
							type: 'doc',
							id: 'api/extension-complexity/interfaces/ComplexityExtensionOptions',
							label: 'ComplexityExtensionOptions',
						},
						{
							type: 'doc',
							id: 'api/extension-complexity/interfaces/ComplexityLimit',
							label: 'ComplexityLimit',
						},
					],
				},
				{
					type: 'category',
					label: 'Type Aliases',
					items: [
						{
							type: 'doc',
							id: 'api/extension-complexity/type-aliases/FieldSettings',
							label: 'FieldSettings',
						},
						{
							type: 'doc',
							id: 'api/extension-complexity/type-aliases/GetComplexityError',
							label: 'GetComplexityError',
						},
						{
							type: 'doc',
							id: 'api/extension-complexity/type-aliases/GetComplexityLimit',
							label: 'GetComplexityLimit',
						},
						{
							type: 'doc',
							id: 'api/extension-complexity/type-aliases/GetFieldSettings',
							label: 'GetFieldSettings',
						},
						{
							type: 'doc',
							id: 'api/extension-complexity/type-aliases/GetFieldSettingsArgs',
							label: 'GetFieldSettingsArgs',
						},
					],
				},
				{
					type: 'category',
					label: 'Variables',
					items: [
						{
							type: 'doc',
							id: 'api/extension-complexity/variables/ComplexityErrorCode',
							label: 'ComplexityErrorCode',
						},
						{
							type: 'doc',
							id: 'api/extension-complexity/variables/ComplexityErrorKind',
							label: 'ComplexityErrorKind',
						},
					],
				},
				{
					type: 'category',
					label: 'Functions',
					items: [
						{
							type: 'doc',
							id: 'api/extension-complexity/functions/complexityExtension',
							label: 'complexityExtension',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/extension-complexity/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/generator',
			items: [
				{
					type: 'category',
					label: 'Classes',
					items: [
						{
							type: 'doc',
							id: 'api/generator/classes/Watcher',
							label: 'Watcher',
						},
					],
				},
				{
					type: 'category',
					label: 'Interfaces',
					items: [
						{
							type: 'doc',
							id: 'api/generator/interfaces/GeneratorHooks',
							label: 'GeneratorHooks',
						},
						{
							type: 'doc',
							id: 'api/generator/interfaces/GeneratorOptions',
							label: 'GeneratorOptions',
						},
						{
							type: 'doc',
							id: 'api/generator/interfaces/GeneratorPluginV1',
							label: 'GeneratorPluginV1',
						},
						{
							type: 'doc',
							id: 'api/generator/interfaces/WatcherFile',
							label: 'WatcherFile',
						},
					],
				},
				{
					type: 'category',
					label: 'Type Aliases',
					items: [
						{
							type: 'doc',
							id: 'api/generator/type-aliases/WatcherListener',
							label: 'WatcherListener',
						},
					],
				},
				{
					type: 'category',
					label: 'Functions',
					items: [
						{
							type: 'doc',
							id: 'api/generator/functions/generate',
							label: 'generate',
						},
						{
							type: 'doc',
							id: 'api/generator/functions/generateAndWatch',
							label: 'generateAndWatch',
						},
						{
							type: 'doc',
							id: 'api/generator/functions/getGeneratorPlugins',
							label: 'getGeneratorPlugins',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/generator/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/generator-sdk',
			items: [
				{
					type: 'category',
					label: 'Namespaces',
					items: [
						{
							type: 'category',
							label: 'micromatch',
							items: [
								{
									type: 'category',
									label: 'Interfaces',
									items: [
										{
											type: 'doc',
											id: 'api/generator-sdk/namespaces/micromatch/interfaces/Item',
											label: 'Item',
										},
										{
											type: 'doc',
											id: 'api/generator-sdk/namespaces/micromatch/interfaces/Options',
											label: 'Options',
										},
										{
											type: 'doc',
											id: 'api/generator-sdk/namespaces/micromatch/interfaces/ScanInfo',
											label: 'ScanInfo',
										},
										{
											type: 'doc',
											id: 'api/generator-sdk/namespaces/micromatch/interfaces/ScanInfoToken',
											label: 'ScanInfoToken',
										},
										{
											type: 'doc',
											id: 'api/generator-sdk/namespaces/micromatch/interfaces/ScanInfoWithParts',
											label: 'ScanInfoWithParts',
										},
										{
											type: 'doc',
											id: 'api/generator-sdk/namespaces/micromatch/interfaces/ScanInfoWithTokens',
											label: 'ScanInfoWithTokens',
										},
										{
											type: 'doc',
											id: 'api/generator-sdk/namespaces/micromatch/interfaces/ScanOptions',
											label: 'ScanOptions',
										},
									],
								},
							],
							link: {
								type: 'doc',
								id: 'api/generator-sdk/namespaces/micromatch/index',
							},
						},
					],
				},
				{
					type: 'category',
					label: 'Classes',
					items: [
						{
							type: 'doc',
							id: 'api/generator-sdk/classes/File',
							label: 'File',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/classes/FileBlock',
							label: 'FileBlock',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/classes/FileManager',
							label: 'FileManager',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/classes/Watcher',
							label: 'Watcher',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/classes/WatcherIgnore',
							label: 'WatcherIgnore',
						},
					],
				},
				{
					type: 'category',
					label: 'Interfaces',
					items: [
						{
							type: 'doc',
							id: 'api/generator-sdk/interfaces/FileOptions',
							label: 'FileOptions',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/interfaces/GeneratorOptions',
							label: 'GeneratorOptions',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/interfaces/GeneratorPluginV1',
							label: 'GeneratorPluginV1',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/interfaces/Loader',
							label: 'Loader',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/interfaces/NormalizedGeneratorOptions',
							label: 'NormalizedGeneratorOptions',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/interfaces/WatcherFile',
							label: 'WatcherFile',
						},
					],
				},
				{
					type: 'category',
					label: 'Type Aliases',
					items: [
						{
							type: 'doc',
							id: 'api/generator-sdk/type-aliases/Ctx',
							label: 'Ctx',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/type-aliases/GeneratorPluginV1Factory',
							label: 'GeneratorPluginV1Factory',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/type-aliases/GeneratorPluginV1Fn',
							label: 'GeneratorPluginV1Fn',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/type-aliases/GeneratorPluginV1ReloadFn',
							label: 'GeneratorPluginV1ReloadFn',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/type-aliases/GeneratorPluginV1WatchOptions',
							label: 'GeneratorPluginV1WatchOptions',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/type-aliases/GeneratorPluginVersion',
							label: 'GeneratorPluginVersion',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/type-aliases/MatchFn',
							label: 'MatchFn',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/type-aliases/MatchPattern',
							label: 'MatchPattern',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/type-aliases/WatcherListener',
							label: 'WatcherListener',
						},
					],
				},
				{
					type: 'category',
					label: 'Variables',
					items: [
						{
							type: 'doc',
							id: 'api/generator-sdk/variables/GeneratorPluginVersion',
							label: 'GeneratorPluginVersion',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/variables/isMatch',
							label: 'isMatch',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/variables/micromatch',
							label: 'micromatch',
						},
					],
				},
				{
					type: 'category',
					label: 'Functions',
					items: [
						{
							type: 'doc',
							id: 'api/generator-sdk/functions/createPluginV1',
							label: 'createPluginV1',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/functions/getGeneratorPlugins',
							label: 'getGeneratorPlugins',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/functions/getModuleExportName',
							label: 'getModuleExportName',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/functions/isGeneratorPlugin',
							label: 'isGeneratorPlugin',
						},
						{
							type: 'doc',
							id: 'api/generator-sdk/functions/loadOptions',
							label: 'loadOptions',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/generator-sdk/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/plugin',
			items: [
				{
					type: 'category',
					label: 'Type Aliases',
					items: [
						{
							type: 'doc',
							id: 'api/plugin/type-aliases/PluginType',
							label: 'PluginType',
						},
					],
				},
				{
					type: 'category',
					label: 'Variables',
					items: [
						{
							type: 'doc',
							id: 'api/plugin/variables/PluginType',
							label: 'PluginType',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/plugin/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/plugin-cloudflare',
			items: [
				{
					type: 'category',
					label: 'Interfaces',
					items: [
						{
							type: 'doc',
							id: 'api/plugin-cloudflare/interfaces/CloudflarePluginOptions',
							label: 'CloudflarePluginOptions',
						},
					],
				},
				{
					type: 'category',
					label: 'Functions',
					items: [
						{
							type: 'doc',
							id: 'api/plugin-cloudflare/functions/cloudflarePlugin',
							label: 'cloudflarePlugin',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/plugin-cloudflare/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/plugin-directives',
			items: [
				{
					type: 'category',
					label: 'Interfaces',
					items: [
						{
							type: 'doc',
							id: 'api/plugin-directives/interfaces/DirectivesOptions',
							label: 'DirectivesOptions',
						},
					],
				},
				{
					type: 'category',
					label: 'Functions',
					items: [
						{
							type: 'doc',
							id: 'api/plugin-directives/functions/directivesPlugin',
							label: 'directivesPlugin',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/plugin-directives/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/plugin-exec',
			items: [
				{
					type: 'category',
					label: 'Interfaces',
					items: [
						{
							type: 'doc',
							id: 'api/plugin-exec/interfaces/ExecPluginOptions',
							label: 'ExecPluginOptions',
						},
					],
				},
				{
					type: 'category',
					label: 'Functions',
					items: [
						{
							type: 'doc',
							id: 'api/plugin-exec/functions/createExecPlugin',
							label: 'createExecPlugin',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/plugin-exec/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/plugin-gitignore',
			items: [
				{
					type: 'category',
					label: 'Interfaces',
					items: [
						{
							type: 'doc',
							id: 'api/plugin-gitignore/interfaces/GitignoreOptions',
							label: 'GitignoreOptions',
						},
					],
				},
				{
					type: 'category',
					label: 'Functions',
					items: [
						{
							type: 'doc',
							id: 'api/plugin-gitignore/functions/gitignorePlugin',
							label: 'gitignorePlugin',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/plugin-gitignore/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/plugin-graphql',
			items: [
				{
					type: 'category',
					label: 'Functions',
					items: [
						{
							type: 'doc',
							id: 'api/plugin-graphql/functions/graphqlPlugin',
							label: 'graphqlPlugin',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/plugin-graphql/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/plugin-pagination',
			items: [
				{
					type: 'category',
					label: 'Interfaces',
					items: [
						{
							type: 'doc',
							id: 'api/plugin-pagination/interfaces/PaginationOptions',
							label: 'PaginationOptions',
						},
						{
							type: 'doc',
							id: 'api/plugin-pagination/interfaces/PaginationTypeOptions',
							label: 'PaginationTypeOptions',
						},
					],
				},
				{
					type: 'category',
					label: 'Functions',
					items: [
						{
							type: 'doc',
							id: 'api/plugin-pagination/functions/paginationPlugin',
							label: 'paginationPlugin',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/plugin-pagination/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/plugin-prisma',
			items: [
				{
					type: 'category',
					label: 'Interfaces',
					items: [
						{
							type: 'doc',
							id: 'api/plugin-prisma/interfaces/PrismaPluginOptions',
							label: 'PrismaPluginOptions',
						},
					],
				},
				{
					type: 'category',
					label: 'Functions',
					items: [
						{
							type: 'doc',
							id: 'api/plugin-prisma/functions/prismaPlugin',
							label: 'prismaPlugin',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/plugin-prisma/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/subscriptions-cloudflare',
			items: [
				{
					type: 'category',
					label: 'index',
					items: [
						{
							type: 'category',
							label: 'Classes',
							items: [
								{
									type: 'doc',
									id: 'api/subscriptions-cloudflare/index/classes/SubscriptionDatabase',
									label: 'SubscriptionDatabase',
								},
								{
									type: 'doc',
									id: 'api/subscriptions-cloudflare/index/classes/SubscriptionDatabaseD1',
									label: 'SubscriptionDatabaseD1',
								},
							],
						},
						{
							type: 'category',
							label: 'Interfaces',
							items: [
								{
									type: 'doc',
									id: 'api/subscriptions-cloudflare/index/interfaces/SubscriptionInfo',
									label: 'SubscriptionInfo',
								},
								{
									type: 'doc',
									id: 'api/subscriptions-cloudflare/index/interfaces/SubscriptionsContextLoader',
									label: 'SubscriptionsContextLoader',
								},
								{
									type: 'doc',
									id: 'api/subscriptions-cloudflare/index/interfaces/SubscriptionsOptions',
									label: 'SubscriptionsOptions',
								},
							],
						},
						{
							type: 'category',
							label: 'Type Aliases',
							items: [
								{
									type: 'doc',
									id: 'api/subscriptions-cloudflare/index/type-aliases/PoolingType',
									label: 'PoolingType',
								},
								{
									type: 'doc',
									id: 'api/subscriptions-cloudflare/index/type-aliases/Publish',
									label: 'Publish',
								},
								{
									type: 'doc',
									id: 'api/subscriptions-cloudflare/index/type-aliases/Subscribe',
									label: 'Subscribe',
								},
							],
						},
						{
							type: 'category',
							label: 'Functions',
							items: [
								{
									type: 'doc',
									id: 'api/subscriptions-cloudflare/index/functions/createCloudflareSubscription',
									label: 'createCloudflareSubscription',
								},
							],
						},
					],
					link: {
						type: 'doc',
						id: 'api/subscriptions-cloudflare/index/index',
					},
				},
				{
					type: 'category',
					label: 'sdk',
					items: [
						{
							type: 'category',
							label: 'Variables',
							items: [
								{
									type: 'doc',
									id: 'api/subscriptions-cloudflare/sdk/variables/databaseMigrations',
									label: 'databaseMigrations',
								},
								{
									type: 'doc',
									id: 'api/subscriptions-cloudflare/sdk/variables/durableObjectsMigrations',
									label: 'durableObjectsMigrations',
								},
								{
									type: 'doc',
									id: 'api/subscriptions-cloudflare/sdk/variables/wsConnectionClassName',
									label: 'wsConnectionClassName',
								},
							],
						},
					],
					link: {
						type: 'doc',
						id: 'api/subscriptions-cloudflare/sdk/index',
					},
				},
			],
			link: {
				type: 'doc',
				id: 'api/subscriptions-cloudflare/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/subscriptions-pubsub',
			items: [
				{
					type: 'category',
					label: 'Interfaces',
					items: [
						{
							type: 'doc',
							id: 'api/subscriptions-pubsub/interfaces/TypedPubSub',
							label: 'TypedPubSub',
						},
						{
							type: 'doc',
							id: 'api/subscriptions-pubsub/interfaces/TypedPubSubOptions',
							label: 'TypedPubSubOptions',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/subscriptions-pubsub/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/util-encoding',
			items: [
				{
					type: 'category',
					label: 'Variables',
					items: [
						{
							type: 'doc',
							id: 'api/util-encoding/variables/decodeBase64',
							label: 'decodeBase64',
						},
						{
							type: 'doc',
							id: 'api/util-encoding/variables/decodeBase64Url',
							label: 'decodeBase64Url',
						},
						{
							type: 'doc',
							id: 'api/util-encoding/variables/encodeBase64',
							label: 'encodeBase64',
						},
						{
							type: 'doc',
							id: 'api/util-encoding/variables/encodeBase64Url',
							label: 'encodeBase64Url',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/util-encoding/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/util-env',
			items: [
				{
					type: 'category',
					label: 'Functions',
					items: [
						{
							type: 'doc',
							id: 'api/util-env/functions/getEnv',
							label: 'getEnv',
						},
						{
							type: 'doc',
							id: 'api/util-env/functions/isDevelopmentMode',
							label: 'isDevelopmentMode',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/util-env/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/util-log',
			items: [
				{
					type: 'category',
					label: 'Type Aliases',
					items: [
						{
							type: 'doc',
							id: 'api/util-log/type-aliases/ConsoleLogger',
							label: 'ConsoleLogger',
						},
						{
							type: 'doc',
							id: 'api/util-log/type-aliases/ConsolePayload',
							label: 'ConsolePayload',
						},
					],
				},
				{
					type: 'category',
					label: 'Variables',
					items: [
						{
							type: 'doc',
							id: 'api/util-log/variables/log',
							label: 'log',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/util-log/index',
			},
		},
		{
			type: 'category',
			label: '@baeta/util-path',
			items: [
				{
					type: 'category',
					label: 'Variables',
					items: [
						{
							type: 'doc',
							id: 'api/util-path/variables/addExt',
							label: 'addExt',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/basename',
							label: 'basename',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/changeExt',
							label: 'changeExt',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/default',
							label: 'default',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/defaultExt',
							label: 'defaultExt',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/delimiter',
							label: 'delimiter',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/dirname',
							label: 'dirname',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/extname',
							label: 'extname',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/format',
							label: 'format',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/isAbsolute',
							label: 'isAbsolute',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/join',
							label: 'join',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/joinSafe',
							label: 'joinSafe',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/normalize',
							label: 'normalize',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/normalizeSafe',
							label: 'normalizeSafe',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/normalizeTrim',
							label: 'normalizeTrim',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/parse',
							label: 'parse',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/posix',
							label: 'posix',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/relative',
							label: 'relative',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/removeExt',
							label: 'removeExt',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/resolve',
							label: 'resolve',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/sep',
							label: 'sep',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/toUnix',
							label: 'toUnix',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/trimExt',
							label: 'trimExt',
						},
						{
							type: 'doc',
							id: 'api/util-path/variables/win32',
							label: 'win32',
						},
					],
				},
				{
					type: 'category',
					label: 'Functions',
					items: [
						{
							type: 'doc',
							id: 'api/util-path/functions/posixPath',
							label: 'posixPath',
						},
						{
							type: 'doc',
							id: 'api/util-path/functions/winPath',
							label: 'winPath',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/util-path/index',
			},
		},
		{
			type: 'category',
			label: 'create-baeta',
			items: [
				{
					type: 'category',
					label: 'Interfaces',
					items: [
						{
							type: 'doc',
							id: 'api/create-baeta/interfaces/Args',
							label: 'Args',
						},
						{
							type: 'doc',
							id: 'api/create-baeta/interfaces/CliOptions',
							label: 'CliOptions',
						},
					],
				},
				{
					type: 'category',
					label: 'Type Aliases',
					items: [
						{
							type: 'doc',
							id: 'api/create-baeta/type-aliases/JavaScriptRuntime',
							label: 'JavaScriptRuntime',
						},
						{
							type: 'doc',
							id: 'api/create-baeta/type-aliases/PackageManager',
							label: 'PackageManager',
						},
						{
							type: 'doc',
							id: 'api/create-baeta/type-aliases/Template',
							label: 'Template',
						},
						{
							type: 'doc',
							id: 'api/create-baeta/type-aliases/TemplateFile',
							label: 'TemplateFile',
						},
					],
				},
				{
					type: 'category',
					label: 'Variables',
					items: [
						{
							type: 'doc',
							id: 'api/create-baeta/variables/defaultJavaScriptRuntime',
							label: 'defaultJavaScriptRuntime',
						},
						{
							type: 'doc',
							id: 'api/create-baeta/variables/defaultPackageManager',
							label: 'defaultPackageManager',
						},
						{
							type: 'doc',
							id: 'api/create-baeta/variables/lockfileNames',
							label: 'lockfileNames',
						},
						{
							type: 'doc',
							id: 'api/create-baeta/variables/packageManagers',
							label: 'packageManagers',
						},
						{
							type: 'doc',
							id: 'api/create-baeta/variables/runtimes',
							label: 'runtimes',
						},
						{
							type: 'doc',
							id: 'api/create-baeta/variables/templates',
							label: 'templates',
						},
					],
				},
				{
					type: 'category',
					label: 'Functions',
					items: [
						{
							type: 'doc',
							id: 'api/create-baeta/functions/copyTemplate',
							label: 'copyTemplate',
						},
						{
							type: 'doc',
							id: 'api/create-baeta/functions/getAppName',
							label: 'getAppName',
						},
						{
							type: 'doc',
							id: 'api/create-baeta/functions/getInstallCommand',
							label: 'getInstallCommand',
						},
						{
							type: 'doc',
							id: 'api/create-baeta/functions/getPackageManager',
							label: 'getPackageManager',
						},
						{
							type: 'doc',
							id: 'api/create-baeta/functions/getRuntime',
							label: 'getRuntime',
						},
						{
							type: 'doc',
							id: 'api/create-baeta/functions/getTemplate',
							label: 'getTemplate',
						},
						{
							type: 'doc',
							id: 'api/create-baeta/functions/handler',
							label: 'handler',
						},
					],
				},
			],
			link: {
				type: 'doc',
				id: 'api/create-baeta/index',
			},
		},
	],
};
export default typedocSidebar;
