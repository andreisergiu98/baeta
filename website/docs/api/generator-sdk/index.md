# @baeta/generator-sdk

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

`V1`

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

- [`FileBlock`](index.md#fileblock)

#### Constructors

##### new File()

> **new File**(`filename`, `content`, `tag`, `options`?): [`File`](index.md#file)

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

`options`?

</td>
<td>

[`FileOptions`](index.md#fileoptions-1)

</td>
</tr>
</tbody>
</table>

###### Returns

[`File`](index.md#file)

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

`content`

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

`filename`

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

`persisted`

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

`tag`

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

- [`File`](index.md#file)

#### Constructors

##### new FileBlock()

> **new FileBlock**(`filename`, `content`, `start`, `end`, `tag`, `options`?): [`FileBlock`](index.md#fileblock)

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

`options`?

</td>
<td>

[`FileOptions`](index.md#fileoptions-1)

</td>
</tr>
</tbody>
</table>

###### Returns

[`FileBlock`](index.md#fileblock)

###### Overrides

[`File`](index.md#file).[`constructor`](index.md#constructors)

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

`content`

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

[`File`](index.md#file).[`content`](index.md#content)

</td>
</tr>
<tr>
<td>

`end`

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

`filename`

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

[`File`](index.md#file).[`filename`](index.md#filename)

</td>
</tr>
<tr>
<td>

`persisted`

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

[`File`](index.md#file).[`persisted`](index.md#persisted)

</td>
</tr>
<tr>
<td>

`start`

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

`tag`

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

[`File`](index.md#file).[`tag`](index.md#tag)

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

[`File`](index.md#file).[`buildContent`](index.md#buildcontent)

##### buildHeader()

> `protected` **buildHeader**(): `string`

###### Returns

`string`

###### Inherited from

[`File`](index.md#file).[`buildHeader`](index.md#buildheader)

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

[`File`](index.md#file).[`createComment`](index.md#createcomment)

##### getExistingContent()

> `protected` **getExistingContent**(): `Promise`\<readonly [`string`, `FileHandle`] \| readonly [`""`, `null`]\>

###### Returns

`Promise`\<readonly [`string`, `FileHandle`] \| readonly [`""`, `null`]\>

##### getSlices()

> `protected` **getSlices**(`existingContent`): readonly [`string`, `""`, `false`] \| readonly [`string`, `string`, `true`]

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

readonly [`string`, `""`, `false`] \| readonly [`string`, `string`, `true`]

##### unlink()

> **unlink**(): `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

###### Overrides

[`File`](index.md#file).[`unlink`](index.md#unlink)

##### write()

> **write**(): `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

###### Overrides

[`File`](index.md#file).[`write`](index.md#write)

---

### FileManager

#### Constructors

##### new FileManager()

> **new FileManager**(`fileOptions`?): [`FileManager`](index.md#filemanager)

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

`fileOptions`?

</td>
<td>

[`FileOptions`](index.md#fileoptions-1)

</td>
</tr>
</tbody>
</table>

###### Returns

[`FileManager`](index.md#filemanager)

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

`files`

</td>
<td>

`public`

</td>
<td>

[`File`](index.md#file)[]

</td>
<td>

`[]`

</td>
</tr>
<tr>
<td>

`fileOptions?`

</td>
<td>

`public`

</td>
<td>

[`FileOptions`](index.md#fileoptions-1)

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

[`File`](index.md#file)[]

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### createAndAdd()

> **createAndAdd**(`filename`, `content`, `tag`): [`File`](index.md#file)

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

[`File`](index.md#file)

##### get()

> **get**(`filename`): `undefined` \| [`File`](index.md#file)

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

`undefined` \| [`File`](index.md#file)

##### getAll()

> **getAll**(): [`File`](index.md#file)[]

###### Returns

[`File`](index.md#file)[]

##### getByTag()

> **getByTag**(`tag`): [`File`](index.md#file)[]

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

[`File`](index.md#file)[]

##### getPersistedFiles()

> **getPersistedFiles**(): [`File`](index.md#file)[]

###### Returns

[`File`](index.md#file)[]

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

[`MatchPattern`](index.md#matchpattern)

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

[`MatchPattern`](index.md#matchpattern)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

---

### WatcherIgnore

#### Constructors

##### new WatcherIgnore()

> **new WatcherIgnore**(`cwd`): [`WatcherIgnore`](index.md#watcherignore)

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

[`WatcherIgnore`](index.md#watcherignore)

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

[`MatchPattern`](index.md#matchpattern)

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

[`MatchPattern`](index.md#matchpattern)

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

`addEslintDisableHeader?`

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

`addGenerationNoticeHeader?`

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

`addHeader?`

</td>
<td>

(`name`: `string`, `content`: `string`, `tag`: `string`) => `string`

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

`transformContent?`

</td>
<td>

(`name`: `string`, `content`: `string`, `tag`: `string`) => `string` \| `Promise`\<`string`\>

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

[`FileOptions`](index.md#fileoptions-1)

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

[`Loader`](index.md#loadertoptions)\<`any`\>[]

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

[`GeneratorPluginV1Fn`](index.md#generatorpluginv1fnstore)\<`Store`\>

</td>
</tr>
<tr>
<td>

`generate`

</td>
<td>

[`GeneratorPluginV1Fn`](index.md#generatorpluginv1fnstore)\<`Store`\>

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

[`GeneratorPluginV1Fn`](index.md#generatorpluginv1fnstore)\<`Store`\>

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

[`V1`](index.md#v1)

</td>
</tr>
<tr>
<td>

`watch`

</td>
<td>

[`GeneratorPluginV1WatchOptions`](index.md#generatorpluginv1watchoptions)

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

> **load**(`pointer`, `options`?): `Promise`\<`null` \| `any`[]\>

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

`options`?

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

> `optional` **loadSync**(`pointer`, `options`?): `null` \| `any`[]

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

`options`?

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

`baseTypesPath`

</td>
<td>

`string`

</td>
</tr>
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

`moduleDefinitionName`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`modulesDir`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`schemas`

</td>
<td>

`string`[]

</td>
</tr>
<tr>
<td>

`contextType?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`extensions?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`fileOptions?`

</td>
<td>

[`FileOptions`](index.md#fileoptions-1)

</td>
</tr>
<tr>
<td>

`importExtension?`

</td>
<td>

`".js"` \| `".ts"`

</td>
</tr>
<tr>
<td>

`loaders?`

</td>
<td>

[`Loader`](index.md#loadertoptions)\<`any`\>[]

</td>
</tr>
<tr>
<td>

`scalars?`

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

### Ctx\<T\>

> **Ctx**\<`T`\>: `object` & `T`

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

[`FileManager`](index.md#filemanager)

</td>
</tr>
<tr>
<td>

`generatorOptions`

</td>
<td>

[`NormalizedGeneratorOptions`](index.md#normalizedgeneratoroptions)

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

`changedFile`?

</td>
<td>

[`WatcherFile`](index.md#watcherfile)

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

> **GeneratorPluginV1Factory**\<`Store`\>: `object`

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

`actionName`

</td>
<td>

`string`

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

`end`?

</td>
<td>

[`GeneratorPluginV1Fn`](index.md#generatorpluginv1fnstore)\<`Store`\>

</td>
</tr>
<tr>
<td>

`generate`?

</td>
<td>

[`GeneratorPluginV1Fn`](index.md#generatorpluginv1fnstore)\<`Store`\>

</td>
</tr>
<tr>
<td>

`setup`?

</td>
<td>

[`GeneratorPluginV1Fn`](index.md#generatorpluginv1fnstore)\<`Store`\>

</td>
</tr>
<tr>
<td>

`watch`?

</td>
<td>

[`GeneratorPluginV1WatchOptions`](index.md#generatorpluginv1watchoptions)

</td>
</tr>
</tbody>
</table>

---

### GeneratorPluginV1Fn()\<Store\>

> **GeneratorPluginV1Fn**\<`Store`\>: (`ctx`, `next`) => `Promise`\<`void`\>

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

[`Ctx`](index.md#ctxt)\<`Store`\>

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

> **GeneratorPluginV1ReloadFn**: (`file`) => `void`

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

[`WatcherFile`](index.md#watcherfile)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### GeneratorPluginV1WatchOptions()

> **GeneratorPluginV1WatchOptions**: (`options`, `watcher`, `reload`) => `void`

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

[`NormalizedGeneratorOptions`](index.md#normalizedgeneratoroptions)

</td>
</tr>
<tr>
<td>

`watcher`

</td>
<td>

[`Watcher`](index.md#watcher)

</td>
</tr>
<tr>
<td>

`reload`

</td>
<td>

[`GeneratorPluginV1ReloadFn`](index.md#generatorpluginv1reloadfn)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### MatchFn()

> **MatchFn**: (`testString`) => `boolean`

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

> **MatchPattern**: `string` \| `RegExp` \| [`MatchFn`](index.md#matchfn)

---

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

### createPluginV1()

> **createPluginV1**\<`Store`\>(`options`): [`GeneratorPluginV1`](index.md#generatorpluginv1store)\<`Store`\>

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

[`GeneratorPluginV1Factory`](index.md#generatorpluginv1factorystore)\<`Store`\>

</td>
</tr>
</tbody>
</table>

#### Returns

[`GeneratorPluginV1`](index.md#generatorpluginv1store)\<`Store`\>

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

\{ `type`: [`PluginType`](../plugin/index.md#plugintype); \}

</td>
</tr>
<tr>
<td>

`plugin.type`

</td>
<td>

[`PluginType`](../plugin/index.md#plugintype)

</td>
</tr>
</tbody>
</table>

#### Returns

`plugin is GeneratorPluginV1<unknown>`

---

### isMatch()

> **isMatch**(`string`, `pattern`, `options`?): `boolean`

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

`options`?

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

### loadOptions()

> **loadOptions**(`options`): [`NormalizedGeneratorOptions`](index.md#normalizedgeneratoroptions)

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
</tbody>
</table>

#### Returns

[`NormalizedGeneratorOptions`](index.md#normalizedgeneratoroptions)

---

### micromatch()

> **micromatch**(`list`, `patterns`, `options`?): `string`[]

The main function takes a list of strings and one or more glob patterns to use for matching.

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

`list`

</td>
<td>

readonly `string`[]

</td>
<td>

A list of strings to match

</td>
</tr>
<tr>
<td>

`patterns`

</td>
<td>

`string` \| readonly `string`[]

</td>
<td>

One or more glob patterns to use for matching.

</td>
</tr>
<tr>
<td>

`options`?

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

`string`[]

Returns an array of matches

#### Example

```js
var mm = require('micromatch');
mm(list, patterns[, options]);

console.log(mm(['a.js', 'a.txt'], ['*.js']));
//=> [ 'a.js' ]
```

## Namespaces

- [micromatch](namespaces/micromatch.md)
