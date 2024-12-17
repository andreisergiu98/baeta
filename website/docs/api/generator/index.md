# @baeta/generator

## Classes

### Watcher

#### Constructors

##### new Watcher()

> **new Watcher**(`cwd`, `options`?): [`Watcher`](index.md#watcher)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`cwd`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

`Options`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Watcher`](index.md#watcher)

#### Methods

##### close()

> **close**(): `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

##### createSubscription()

> **createSubscription**(): `object`

###### Returns

`object`

| Name          | Type                      |
| ------------- | ------------------------- |
| `unsubscribe` | () => `Promise`\<`void`\> |

##### ignore()

> **ignore**(`pattern`): `void`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`pattern`

</td>
<td>

[`MatchPattern`](../generator-sdk/index.md#matchpattern)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### off()

> **off**(`event`, `listener`): `void`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`event`

</td>
<td>

`EventType`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

[`WatcherListener`](index.md#watcherlistener)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### on()

> **on**(`event`, `listener`): `void`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`event`

</td>
<td>

`EventType`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

[`WatcherListener`](index.md#watcherlistener)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### onEvents()

> **onEvents**(`err`, `events`): `void`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`err`

</td>
<td>

`null` \| `Error`

</td>
</tr>
<tr>
<td>

`events`

</td>
<td>

`Event`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### unignore()

> **unignore**(`pattern`): `void`

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`pattern`

</td>
<td>

[`MatchPattern`](../generator-sdk/index.md#matchpattern)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

## Interfaces

### GeneratorHooks

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`onEnd?`

</td>
<td>

() => `void` \| `Promise`\<`void`\>

</td>
</tr>
<tr>
<td>

`onError?`

</td>
<td>

(`error`: `unknown`) => `void` \| `Promise`\<`void`\>

</td>
</tr>
<tr>
<td>

`onPluginStepEnd?`

</td>
<td>

(`plugin`: [`GeneratorPluginV1`](index.md#generatorpluginv1store)\<`unknown`\>, `step`: `"end"` \| `"setup"` \| `"generate"`) => `void` \| `Promise`\<`void`\>

</td>
</tr>
<tr>
<td>

`onPluginStepStart?`

</td>
<td>

(`plugin`: [`GeneratorPluginV1`](index.md#generatorpluginv1store)\<`unknown`\>, `step`: `"end"` \| `"setup"` \| `"generate"`) => `void` \| `Promise`\<`void`\>

</td>
</tr>
<tr>
<td>

`onStart?`

</td>
<td>

() => `void` \| `Promise`\<`void`\>

</td>
</tr>
</tbody>
</table>

---

### GeneratorOptions

Options for the Baeta Generator.

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`schemas`

</td>
<td>

`string`[]

</td>
<td>

```ts
["src/∗∗/∗.gql", "src/∗∗/∗.graphql"];
```

</td>
<td>

Glob pattern(s) to locate GraphQL schema files.

</td>
</tr>
<tr>
<td>

`baseTypesPath?`

</td>
<td>

`string`

</td>
<td>

```ts
`${modulesDir}/../__generated__/types.ts`;
```

</td>
<td>

Output path for the generated base types file.

</td>
</tr>
<tr>
<td>

`contextType?`

</td>
<td>

`string`

</td>
<td>

```ts
undefined;
```

</td>
<td>

Path to the context type definition.
Supports both named and default exports.

**Examples**

```ts
contextType: "src/types/context.ts#Context"; // for named export
```

```ts
contextType: "src/types/context.ts"; // for default export
```

</td>
</tr>
<tr>
<td>

`cwd?`

</td>
<td>

`string`

</td>
<td>

```ts
process.cwd();
```

</td>
<td>

Current working directory for resolving relative paths.

</td>
</tr>
<tr>
<td>

`extensions?`

</td>
<td>

`string`

</td>
<td>

```ts
undefined;
```

</td>
<td>

Path to Baeta Extensions (ex. auth-extension).
Only default export is supported.

**Example**

```ts
extensions: "src/extensions.ts";
```

</td>
</tr>
<tr>
<td>

`fileOptions?`

</td>
<td>

[`FileOptions`](../generator-sdk/index.md#fileoptions-1)

</td>
<td>

`undefined`

</td>
<td>

Configuration options for generated files.

</td>
</tr>
<tr>
<td>

`importExtension?`

</td>
<td>

`false` \| `".js"` \| `".ts"`

</td>
<td>

```ts
".ts";
```

</td>
<td>

File extension to use in generated import statements.
Set to false to omit extensions.

</td>
</tr>
<tr>
<td>

`loaders?`

</td>
<td>

[`Loader`](../generator-sdk/index.md#loadertoptions)\<`any`\>[]

</td>
<td>

`undefined`

</td>
<td>

Custom schema loaders for processing schema files.

</td>
</tr>
<tr>
<td>

`moduleDefinitionName?`

</td>
<td>

`string`

</td>
<td>

```ts
"typedef.ts";
```

</td>
<td>

Filename for the generated module definition file.
Contains type definitions and the GraphQL AST.

</td>
</tr>
<tr>
<td>

`modulesDir?`

</td>
<td>

`string`

</td>
<td>

```ts
"src/modules";
```

</td>
<td>

Root directory where GraphQL modules are defined.

</td>
</tr>
<tr>
<td>

`scalars?`

</td>
<td>

`Record`\<`string`, `string`\>

</td>
<td>

```ts
undefined;
```

</td>
<td>

Custom scalar type mappings.
Maps GraphQL scalar types to TypeScript types.
Supports global types and imports.

**Example**

```ts
{ DateTime: 'Date', JSON: 'Record<string, unknown>' }	 *
```

</td>
</tr>
</tbody>
</table>

---

### GeneratorPluginV1\<Store\>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Store`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`actionName`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`end`

</td>
<td>

[`GeneratorPluginV1Fn`](../generator-sdk/index.md#generatorpluginv1fnstore)\<`Store`\>

</td>
</tr>
<tr>
<td>

`generate`

</td>
<td>

[`GeneratorPluginV1Fn`](../generator-sdk/index.md#generatorpluginv1fnstore)\<`Store`\>

</td>
</tr>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`setup`

</td>
<td>

[`GeneratorPluginV1Fn`](../generator-sdk/index.md#generatorpluginv1fnstore)\<`Store`\>

</td>
</tr>
<tr>
<td>

`type`

</td>
<td>

[`Generator`](../plugin/index.md#generator)

</td>
</tr>
<tr>
<td>

`version`

</td>
<td>

[`V1`](../generator-sdk/index.md#v1)

</td>
</tr>
<tr>
<td>

`watch`

</td>
<td>

[`GeneratorPluginV1WatchOptions`](../generator-sdk/index.md#generatorpluginv1watchoptions)

</td>
</tr>
</tbody>
</table>

---

### WatcherFile

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`path`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`relativePath`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`type`

</td>
<td>

`EventType`

</td>
</tr>
</tbody>
</table>

## Type Aliases

### WatcherListener()

> **WatcherListener**: (`path`) => `void`

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`path`

</td>
<td>

[`WatcherFile`](index.md#watcherfile)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

## Functions

### generate()

> **generate**(`options`, `plugins`, `hooks`?): `Promise`\<`undefined` \| \{ `didEnd`: `string`[]; `didGenerate`: `string`[]; `didSetup`: `string`[]; `fileManager`: [`FileManager`](../generator-sdk/index.md#filemanager); `generatorOptions`: [`NormalizedGeneratorOptions`](../generator-sdk/index.md#normalizedgeneratoroptions); `pluginNames`: `string`[]; `watching`: `boolean`; `changedFile`: [`WatcherFile`](index.md#watcherfile); \}\>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`GeneratorOptions`](index.md#generatoroptions)

</td>
</tr>
<tr>
<td>

`plugins`

</td>
<td>

[`GeneratorPluginV1`](index.md#generatorpluginv1store)\<`unknown`\>[]

</td>
</tr>
<tr>
<td>

`hooks`?

</td>
<td>

[`GeneratorHooks`](index.md#generatorhooks)

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`undefined` \| \{ `didEnd`: `string`[]; `didGenerate`: `string`[]; `didSetup`: `string`[]; `fileManager`: [`FileManager`](../generator-sdk/index.md#filemanager); `generatorOptions`: [`NormalizedGeneratorOptions`](../generator-sdk/index.md#normalizedgeneratoroptions); `pluginNames`: `string`[]; `watching`: `boolean`; `changedFile`: [`WatcherFile`](index.md#watcherfile); \}\>

---

### generateAndWatch()

> **generateAndWatch**(`options`, `plugins`, `hooks`?): [`Watcher`](index.md#watcher)

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`GeneratorOptions`](index.md#generatoroptions)

</td>
</tr>
<tr>
<td>

`plugins`

</td>
<td>

[`GeneratorPluginV1`](index.md#generatorpluginv1store)\<`unknown`\>[]

</td>
</tr>
<tr>
<td>

`hooks`?

</td>
<td>

[`GeneratorHooks`](index.md#generatorhooks)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Watcher`](index.md#watcher)

---

### getGeneratorPlugins()

> **getGeneratorPlugins**(`plugins`?): [`GeneratorPluginV1`](index.md#generatorpluginv1store)\<`unknown`\>[]

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`plugins`?

</td>
<td>

`object`[]

</td>
</tr>
</tbody>
</table>

#### Returns

[`GeneratorPluginV1`](index.md#generatorpluginv1store)\<`unknown`\>[]
