# index

## Interfaces

### CompilerOptions

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

<a id="dist"></a> `dist`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

The output directory

**Example**

```ts
dist: "dist";
```

</td>
</tr>
<tr>
<td>

<a id="src"></a> `src`

</td>
<td>

`string` \| `string`[]

</td>
<td>

`undefined`

</td>
<td>

The source file or files to compile

**Example**

```ts
src: "src/index.ts";
```

</td>
</tr>
<tr>
<td>

<a id="bundledeps"></a> `bundleDeps?`

</td>
<td>

`boolean`

</td>
<td>

```ts
false;
```

</td>
<td>

If true the bundle will also include all dependencies

</td>
</tr>
<tr>
<td>

<a id="bundleworkspaces"></a> `bundleWorkspaces?`

</td>
<td>

`boolean`

</td>
<td>

```ts
true; // in watch mode
```

</td>
<td>

If true the bundle will also include all workspace dependencies.

</td>
</tr>
<tr>
<td>

<a id="cjsglobals"></a> `cjsGlobals?`

</td>
<td>

`boolean`

</td>
<td>

```ts
false;
```

</td>
<td>

Adds CommonJS global variables within esm bundle like:

- `__dirname` - Corresponds to the directory of the generated bundle file
- `__filename` - Corresponds to the file path of the generated bundle file
- `require` - Corresponds to the Node.js synchronous function to import modules

</td>
</tr>
<tr>
<td>

<a id="esbuild"></a> `esbuild?`

</td>
<td>

`Partial`\<`Omit`\<[`BuildOptions`](esbuild.md#buildoptions), `"outdir"` \| `"entryPoints"`\>\>

</td>
<td>

`undefined`

</td>
<td>

Options to pass to esbuild

</td>
</tr>
</tbody>
</table>

---

### HooksOptions

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

<a id="onbuildend"></a> `onBuildEnd`

</td>
<td>

(`buildTime`: `number`, `warnings`: `string`[], `errors`: `string`[]) => `void` \| `Promise`\<`void`\>

</td>
</tr>
<tr>
<td>

<a id="onbuildstart"></a> `onBuildStart`

</td>
<td>

(`startTime`: `number`) => `void` \| `Promise`\<`void`\>

</td>
</tr>
</tbody>
</table>

## Functions

### build()

> **build**(`options`): `Promise`\<`void`\>

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

[`CompilerOptions`](module_index.md#compileroptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

---

### buildAndWatch()

> **buildAndWatch**(`options`): `Promise`\<[`BuildContext`](esbuild.md#buildcontextprovidedoptions)\<[`BuildOptions`](esbuild.md#buildoptions)\>\>

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

[`CompilerOptions`](module_index.md#compileroptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<[`BuildContext`](esbuild.md#buildcontextprovidedoptions)\<[`BuildOptions`](esbuild.md#buildoptions)\>\>

---

### bundleFile()

> **bundleFile**(`fileName`): `Promise`\<\{ `code`: `string`; `dependencies`: `string`[]; \}\>

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

`fileName`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<\{ `code`: `string`; `dependencies`: `string`[]; \}\>

---

### createEsbuildCliHooksPlugin()

> **createEsbuildCliHooksPlugin**(`options`): [`Plugin`](esbuild.md#plugin)

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

[`HooksOptions`](module_index.md#hooksoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Plugin`](esbuild.md#plugin)
