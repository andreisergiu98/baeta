# @baeta/generator-sdk

## Namespaces

- [micromatch](namespaces/micromatch.md)

## Enumerations

### GeneratorPluginVersion

#### Enumeration Members

<table>
<thead>
<tr>
<th>Enumeration Member</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="v1"></a> `V1`

</td>
<td>

`"v1"`

</td>
</tr>
</tbody>
</table>

## Classes

### File

#### Extended by

- [`FileBlock`](#fileblock)

#### Constructors

##### Constructor

> **new File**(`filename`, `content`, `tag`, `options?`): [`File`](#file)

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

`filename`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`content`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`tag`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`FileOptions`](#fileoptions-1)

</td>
</tr>
</tbody>
</table>

###### Returns

[`File`](#file)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="content"></a> `content`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

<a id="filename"></a> `filename`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

<a id="persisted"></a> `persisted`

</td>
<td>

`public`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

<a id="tag"></a> `tag`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
</tr>
</tbody>
</table>

#### Methods

##### buildContent()

> `protected` **buildContent**(): `Promise`\<`string`\>

###### Returns

`Promise`\<`string`\>

##### buildHeader()

> `protected` **buildHeader**(): `string`

###### Returns

`string`

##### createComment()

> `protected` **createComment**(`comment`): `string`

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

`comment`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

##### unlink()

> **unlink**(): `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

##### write()

> **write**(): `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

---

### FileBlock

#### Extends

- [`File`](#file)

#### Constructors

##### Constructor

> **new FileBlock**(`filename`, `content`, `start`, `end`, `tag`, `options?`): [`FileBlock`](#fileblock)

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

`filename`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`content`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`start`

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

`string`

</td>
</tr>
<tr>
<td>

`tag`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`FileOptions`](#fileoptions-1)

</td>
</tr>
</tbody>
</table>

###### Returns

[`FileBlock`](#fileblock)

###### Overrides

[`File`](#file).[`constructor`](#constructor)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="content-1"></a> `content`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`File`](#file).[`content`](#content)

</td>
</tr>
<tr>
<td>

<a id="end"></a> `end`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="filename-1"></a> `filename`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`File`](#file).[`filename`](#filename)

</td>
</tr>
<tr>
<td>

<a id="persisted-1"></a> `persisted`

</td>
<td>

`public`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

[`File`](#file).[`persisted`](#persisted)

</td>
</tr>
<tr>
<td>

<a id="start"></a> `start`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="tag-1"></a> `tag`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

[`File`](#file).[`tag`](#tag)

</td>
</tr>
</tbody>
</table>

#### Methods

##### addBlockToContent()

> `protected` **addBlockToContent**(`existingContent`): `string`

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

`existingContent`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

##### buildContent()

> `protected` **buildContent**(): `Promise`\<`string`\>

###### Returns

`Promise`\<`string`\>

###### Inherited from

[`File`](#file).[`buildContent`](#buildcontent)

##### buildHeader()

> `protected` **buildHeader**(): `string`

###### Returns

`string`

###### Inherited from

[`File`](#file).[`buildHeader`](#buildheader)

##### buildPadding()

> `protected` **buildPadding**(`existingContent`): `""` \| "\n" \| "\n\n"

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

`existingContent`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`""` \| "\n" \| "\n\n"

##### createComment()

> `protected` **createComment**(`comment`): `string`

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

`comment`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

###### Inherited from

[`File`](#file).[`createComment`](#createcomment)

##### getExistingContent()

> `protected` **getExistingContent**(): `Promise`\<readonly \[`string`, `FileHandle`\] \| readonly \[`""`, `null`\]\>

###### Returns

`Promise`\<readonly \[`string`, `FileHandle`\] \| readonly \[`""`, `null`\]\>

##### getSlices()

> `protected` **getSlices**(`existingContent`): readonly \[`string`, `""`, `false`\] \| readonly \[`string`, `string`, `true`\]

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

`existingContent`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

readonly \[`string`, `""`, `false`\] \| readonly \[`string`, `string`, `true`\]

##### unlink()

> **unlink**(): `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

###### Overrides

[`File`](#file).[`unlink`](#unlink)

##### write()

> **write**(): `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

###### Overrides

[`File`](#file).[`write`](#write)

---

### FileManager

#### Constructors

##### Constructor

> **new FileManager**(`fileOptions?`): [`FileManager`](#filemanager)

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

`fileOptions?`

</td>
<td>

[`FileOptions`](#fileoptions-1)

</td>
</tr>
</tbody>
</table>

###### Returns

[`FileManager`](#filemanager)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="files"></a> `files`

</td>
<td>

`public`

</td>
<td>

[`File`](#file)[]

</td>
<td>

`[]`

</td>
</tr>
<tr>
<td>

<a id="fileoptions"></a> `fileOptions?`

</td>
<td>

`public`

</td>
<td>

[`FileOptions`](#fileoptions-1)

</td>
<td>

`undefined`

</td>
</tr>
</tbody>
</table>

#### Methods

##### add()

> **add**(...`file`): `void`

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

...`file`

</td>
<td>

[`File`](#file)[]

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### createAndAdd()

> **createAndAdd**(`filename`, `content`, `tag`): [`File`](#file)

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

`filename`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`content`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`tag`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

[`File`](#file)

##### get()

> **get**(`filename`): `undefined` \| [`File`](#file)

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

`filename`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| [`File`](#file)

##### getAll()

> **getAll**(): [`File`](#file)[]

###### Returns

[`File`](#file)[]

##### getByTag()

> **getByTag**(`tag`): [`File`](#file)[]

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

`tag`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

[`File`](#file)[]

##### getPersistedFiles()

> **getPersistedFiles**(): [`File`](#file)[]

###### Returns

[`File`](#file)[]

##### remove()

> **remove**(`filename`): `void`

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

`filename`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### removeAll()

> **removeAll**(): `void`

###### Returns

`void`

##### removeByTag()

> **removeByTag**(`tag`): `void`

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

`tag`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### unlinkAll()

> **unlinkAll**(): `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

##### writeAll()

> **writeAll**(): `Promise`\<`void`[]\>

###### Returns

`Promise`\<`void`[]\>

##### writeByTag()

> **writeByTag**(`tag`): `Promise`\<`void`[]\>

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

`tag`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`[]\>

---

### Watcher

#### Constructors

##### Constructor

> **new Watcher**(`cwd`, `options?`): [`Watcher`](#watcher)

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

`options?`

</td>
<td>

`Options`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Watcher`](#watcher)

#### Methods

##### close()

> **close**(): `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

##### createSubscription()

> **createSubscription**(): `object`

###### Returns

`object`

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`unsubscribe()`

</td>
<td>

() => `Promise`\<`void`\>

</td>
</tr>
</tbody>
</table>

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

[`MatchPattern`](#matchpattern)

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

[`WatcherListener`](#watcherlistener)

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

[`WatcherListener`](#watcherlistener)

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

[`MatchPattern`](#matchpattern)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

---

### WatcherIgnore

#### Constructors

##### Constructor

> **new WatcherIgnore**(`cwd`): [`WatcherIgnore`](#watcherignore-2)

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
</tbody>
</table>

###### Returns

[`WatcherIgnore`](#watcherignore-2)

#### Methods

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

[`MatchPattern`](#matchpattern)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### isIgnored()

> **isIgnored**(`path`): `boolean`

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

`path`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### isMicromatch()

> **isMicromatch**(`pattern`): `boolean`

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

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### resolveFile()

> **resolveFile**(`file`): `string`

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

`file`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

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

[`MatchPattern`](#matchpattern)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

## Interfaces

### FileOptions

Options for generated files.

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

<a id="addeslintdisableheader"></a> `addEslintDisableHeader?`

</td>
<td>

`boolean`

</td>
<td>

```ts
true;
```

</td>
<td>

Add eslint-disable comment at the beginning of the file.

</td>
</tr>
<tr>
<td>

<a id="addgenerationnoticeheader"></a> `addGenerationNoticeHeader?`

</td>
<td>

`boolean`

</td>
<td>

```ts
true;
```

</td>
<td>

Add generation notice at the beginning of the file.

</td>
</tr>
<tr>
<td>

<a id="addheader"></a> `addHeader?`

</td>
<td>

(`name`, `content`, `tag`) => `string`

</td>
<td>

`undefined`

</td>
<td>

Add custom header at the beginning of the file.

</td>
</tr>
<tr>
<td>

<a id="transformcontent"></a> `transformContent?`

</td>
<td>

(`name`, `content`, `tag`) => `string` \| `Promise`\<`string`\>

</td>
<td>

`undefined`

</td>
<td>

Edit the content of the file before writing it.

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

<a id="schemas"></a> `schemas`

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

<a id="basetypespath"></a> `baseTypesPath?`

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

<a id="contexttype"></a> `contextType?`

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

<a id="cwd"></a> `cwd?`

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

<a id="extensions"></a> `extensions?`

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

<a id="fileoptions-2"></a> `fileOptions?`

</td>
<td>

[`FileOptions`](#fileoptions-1)

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

<a id="importextension"></a> `importExtension?`

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

<a id="loaders"></a> `loaders?`

</td>
<td>

[`Loader`](#loader)\<`any`\>[]

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

<a id="moduledefinitionname"></a> `moduleDefinitionName?`

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

<a id="modulesdir"></a> `modulesDir?`

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

<a id="scalars"></a> `scalars?`

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

<a id="actionname"></a> `actionName`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="end-1"></a> `end`

</td>
<td>

[`GeneratorPluginV1Fn`](#generatorpluginv1fn)\<`Store`\>

</td>
</tr>
<tr>
<td>

<a id="generate"></a> `generate`

</td>
<td>

[`GeneratorPluginV1Fn`](#generatorpluginv1fn)\<`Store`\>

</td>
</tr>
<tr>
<td>

<a id="name"></a> `name`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="setup"></a> `setup`

</td>
<td>

[`GeneratorPluginV1Fn`](#generatorpluginv1fn)\<`Store`\>

</td>
</tr>
<tr>
<td>

<a id="type"></a> `type`

</td>
<td>

[`Generator`](../plugin.md#plugintype#generator)

</td>
</tr>
<tr>
<td>

<a id="version"></a> `version`

</td>
<td>

[`V1`](#v1)

</td>
</tr>
<tr>
<td>

<a id="watch"></a> `watch`

</td>
<td>

[`GeneratorPluginV1WatchOptions`](#generatorpluginv1watchoptions)

</td>
</tr>
</tbody>
</table>

---

### Loader\<TOptions\>

Interface for custom schema loaders.

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

`TOptions`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Methods

##### load()

> **load**(`pointer`, `options?`): `Promise`\<`null` \| `any`[]\>

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

`pointer`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`TOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `any`[]\>

##### loadSync()?

> `optional` **loadSync**(`pointer`, `options?`): `null` \| `any`[]

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

`pointer`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`TOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| `any`[]

---

### NormalizedGeneratorOptions

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

<a id="basetypespath-1"></a> `baseTypesPath`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="cwd-1"></a> `cwd`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="moduledefinitionname-1"></a> `moduleDefinitionName`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="modulesdir-1"></a> `modulesDir`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="schemas-1"></a> `schemas`

</td>
<td>

`string`[]

</td>
</tr>
<tr>
<td>

<a id="contexttype-1"></a> `contextType?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="extensions-1"></a> `extensions?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="fileoptions-3"></a> `fileOptions?`

</td>
<td>

[`FileOptions`](#fileoptions-1)

</td>
</tr>
<tr>
<td>

<a id="importextension-1"></a> `importExtension?`

</td>
<td>

`".js"` \| `".ts"`

</td>
</tr>
<tr>
<td>

<a id="loaders-1"></a> `loaders?`

</td>
<td>

[`Loader`](#loader)\<`any`\>[]

</td>
</tr>
<tr>
<td>

<a id="scalars-1"></a> `scalars?`

</td>
<td>

`Record`\<`string`, `string`\>

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

<a id="path"></a> `path`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="relativepath"></a> `relativePath`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="type-1"></a> `type`

</td>
<td>

`EventType`

</td>
</tr>
</tbody>
</table>

## Type Aliases

### Ctx\<T\>

> **Ctx**\<`T`\> = `object` & `T`

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`didEnd`

</td>
<td>

`string`[]

</td>
</tr>
<tr>
<td>

`didGenerate`

</td>
<td>

`string`[]

</td>
</tr>
<tr>
<td>

`didSetup`

</td>
<td>

`string`[]

</td>
</tr>
<tr>
<td>

`fileManager`

</td>
<td>

[`FileManager`](#filemanager)

</td>
</tr>
<tr>
<td>

`generatorOptions`

</td>
<td>

[`NormalizedGeneratorOptions`](#normalizedgeneratoroptions)

</td>
</tr>
<tr>
<td>

`pluginNames`

</td>
<td>

`string`[]

</td>
</tr>
<tr>
<td>

`watching`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`changedFile?`

</td>
<td>

[`WatcherFile`](#watcherfile)

</td>
</tr>
</tbody>
</table>

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

`T`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

---

### GeneratorPluginV1Factory\<Store\>

> **GeneratorPluginV1Factory**\<`Store`\> = `object`

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

<a id="actionname-1"></a> `actionName`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="name-1"></a> `name`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="end-2"></a> `end?`

</td>
<td>

[`GeneratorPluginV1Fn`](#generatorpluginv1fn)\<`Store`\>

</td>
</tr>
<tr>
<td>

<a id="generate-1"></a> `generate?`

</td>
<td>

[`GeneratorPluginV1Fn`](#generatorpluginv1fn)\<`Store`\>

</td>
</tr>
<tr>
<td>

<a id="setup-1"></a> `setup?`

</td>
<td>

[`GeneratorPluginV1Fn`](#generatorpluginv1fn)\<`Store`\>

</td>
</tr>
<tr>
<td>

<a id="watch-1"></a> `watch?`

</td>
<td>

[`GeneratorPluginV1WatchOptions`](#generatorpluginv1watchoptions)

</td>
</tr>
</tbody>
</table>

---

### GeneratorPluginV1Fn()\<Store\>

> **GeneratorPluginV1Fn**\<`Store`\> = (`ctx`, `next`) => `Promise`\<`void`\>

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

`ctx`

</td>
<td>

[`Ctx`](#ctx)\<`Store`\>

</td>
</tr>
<tr>
<td>

`next`

</td>
<td>

() => `Promise`\<`void`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

---

### GeneratorPluginV1ReloadFn()

> **GeneratorPluginV1ReloadFn** = (`file`) => `void`

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

`file`

</td>
<td>

[`WatcherFile`](#watcherfile)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### GeneratorPluginV1WatchOptions()

> **GeneratorPluginV1WatchOptions** = (`options`, `watcher`, `reload`) => `void`

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

[`NormalizedGeneratorOptions`](#normalizedgeneratoroptions)

</td>
</tr>
<tr>
<td>

`watcher`

</td>
<td>

[`Watcher`](#watcher)

</td>
</tr>
<tr>
<td>

`reload`

</td>
<td>

[`GeneratorPluginV1ReloadFn`](#generatorpluginv1reloadfn)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### MatchFn()

> **MatchFn** = (`testString`) => `boolean`

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

`testString`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

---

### MatchPattern

> **MatchPattern** = `string` \| `RegExp` \| [`MatchFn`](#matchfn)

---

### WatcherListener()

> **WatcherListener** = (`path`) => `void`

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

[`WatcherFile`](#watcherfile)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

## Variables

### isMatch()

> `const` **isMatch**: (`string`, `pattern`, `options?`) => `boolean` = `micromatch.isMatch`

Returns true if the specified `string` matches the given glob `pattern`.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`string`

</td>
<td>

`string`

</td>
<td>

String to match

</td>
</tr>
<tr>
<td>

`pattern`

</td>
<td>

`string` \| readonly `string`[]

</td>
<td>

Glob pattern to use for matching.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`Options`](namespaces/micromatch.md#options)

</td>
<td>

See available options for changing how matches are performed

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

Returns true if the string matches the glob pattern.

#### Example

```js
var mm = require('micromatch');
mm.isMatch(string, pattern[, options]);

console.log(mm.isMatch('a.a', '*.a'));
//=> true
console.log(mm.isMatch('a.b', '*.a'));
//=> false
```

---

### micromatch

> **micromatch**: `Micromatch`

## Functions

### createPluginV1()

> **createPluginV1**\<`Store`\>(`options`): [`GeneratorPluginV1`](#generatorpluginv1)\<`Store`\>

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

[`GeneratorPluginV1Factory`](#generatorpluginv1factory)\<`Store`\>

</td>
</tr>
</tbody>
</table>

#### Returns

[`GeneratorPluginV1`](#generatorpluginv1)\<`Store`\>

---

### getGeneratorPlugins()

> **getGeneratorPlugins**(`plugins?`): [`GeneratorPluginV1`](#generatorpluginv1)\<`unknown`\>[]

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

`plugins?`

</td>
<td>

`object`[]

</td>
</tr>
</tbody>
</table>

#### Returns

[`GeneratorPluginV1`](#generatorpluginv1)\<`unknown`\>[]

---

### getModuleCreateName()

> **getModuleCreateName**(`name`): `string`

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

`name`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### getModuleGetName()

> **getModuleGetName**(`name`): `string`

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

`name`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### getModuleVariableName()

> **getModuleVariableName**(`name`): `string`

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

`name`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### isGeneratorPlugin()

> **isGeneratorPlugin**(`plugin`): `plugin is GeneratorPluginV1<unknown>`

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

`plugin`

</td>
<td>

\{ `type`: [`PluginType`](../plugin.md#plugintype); \}

</td>
</tr>
<tr>
<td>

`plugin.type`

</td>
<td>

[`PluginType`](../plugin.md#plugintype)

</td>
</tr>
</tbody>
</table>

#### Returns

`plugin is GeneratorPluginV1<unknown>`

---

### loadOptions()

> **loadOptions**(`options`): [`NormalizedGeneratorOptions`](#normalizedgeneratoroptions)

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

[`GeneratorOptions`](#generatoroptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`NormalizedGeneratorOptions`](#normalizedgeneratoroptions)
