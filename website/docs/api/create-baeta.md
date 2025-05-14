# create-baeta

## Interfaces

### Args

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

<a id="rootdir"></a> `rootDir`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="appname"></a> `appName?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="packagemanager"></a> `packageManager?`

</td>
<td>

`"npm"` \| `"yarn"` \| `"pnpm"` \| `"bun"`

</td>
</tr>
<tr>
<td>

<a id="skipinstall"></a> `skipInstall?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

<a id="template"></a> `template?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

---

### CliOptions

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

<a id="packagemanager-1"></a> `packageManager?`

</td>
<td>

`"npm"` \| `"yarn"` \| `"pnpm"` \| `"bun"`

</td>
</tr>
<tr>
<td>

<a id="skipinstall-1"></a> `skipInstall?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

## Type Aliases

### JavaScriptRuntime

> **JavaScriptRuntime** = _typeof_ [`runtimes`](#runtimes)\[`number`\]

---

### PackageManager

> **PackageManager** = keyof _typeof_ [`lockfileNames`](#lockfilenames)

---

### Template

> **Template** = `object`

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

<a id="name"></a> `name`

</td>
<td>

`string`

</td>
</tr>
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

<a id="packagejsn"></a> `packageJsn?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

## Variables

### defaultJavaScriptRuntime

> `const` **defaultJavaScriptRuntime**: `"node"` = `'node'`

---

### defaultPackageManager

> `const` **defaultPackageManager**: `"npm"` = `'npm'`

---

### gitignoreUrl

> `const` **gitignoreUrl**: `"https://raw.githubusercontent.com/github/gitignore/refs/heads/main/Node.gitignore"` = `'https://raw.githubusercontent.com/github/gitignore/refs/heads/main/Node.gitignore'`

---

### lockfileNames

> `const` **lockfileNames**: `object`

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="bun"></a> `bun`

</td>
<td>

`string`

</td>
<td>

`'bun.lockb'`

</td>
</tr>
<tr>
<td>

<a id="npm"></a> `npm`

</td>
<td>

`string`

</td>
<td>

`'package-lock.json'`

</td>
</tr>
<tr>
<td>

<a id="pnpm"></a> `pnpm`

</td>
<td>

`string`

</td>
<td>

`'pnpm-lock.yaml'`

</td>
</tr>
<tr>
<td>

<a id="yarn"></a> `yarn`

</td>
<td>

`string`

</td>
<td>

`'yarn.lock'`

</td>
</tr>
</tbody>
</table>

---

### packageManagers

> `const` **packageManagers**: (`"npm"` \| `"yarn"` \| `"pnpm"` \| `"bun"`)[]

---

### runtimes

> `const` **runtimes**: readonly \[`"node"`, `"deno"`, `"bun"`\]

## Functions

### copyTemplate()

> **copyTemplate**(`appName`, `runtime`, `template`, `dest`): `Promise`\<`void`\>

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

`appName`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`runtime`

</td>
<td>

`"bun"` \| `"node"` \| `"deno"`

</td>
</tr>
<tr>
<td>

`template`

</td>
<td>

[`Template`](#template-1)

</td>
</tr>
<tr>
<td>

`dest`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

---

### createTsconfig()

> **createTsconfig**(): `object`

#### Returns

`object`

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`$schema`

</td>
<td>

`string`

</td>
<td>

`"https://json.schemastore.org/tsconfig"`

</td>
</tr>
<tr>
<td>

`compilerOptions`

</td>
<td>

`object`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`compilerOptions.allowImportingTsExtensions`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
<tr>
<td>

`compilerOptions.allowSyntheticDefaultImports`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
<tr>
<td>

`compilerOptions.emitDeclarationOnly`

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

`compilerOptions.esModuleInterop`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
<tr>
<td>

`compilerOptions.forceConsistentCasingInFileNames`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
<tr>
<td>

`compilerOptions.isolatedModules`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
<tr>
<td>

`compilerOptions.lib`

</td>
<td>

`string`[]

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`compilerOptions.module`

</td>
<td>

`string`

</td>
<td>

`"esnext"`

</td>
</tr>
<tr>
<td>

`compilerOptions.moduleResolution`

</td>
<td>

`string`

</td>
<td>

`"bundler"`

</td>
</tr>
<tr>
<td>

`compilerOptions.noEmit`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
<tr>
<td>

`compilerOptions.noImplicitAny`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
<tr>
<td>

`compilerOptions.outDir`

</td>
<td>

`string`

</td>
<td>

`'dist'`

</td>
</tr>
<tr>
<td>

`compilerOptions.rootDir`

</td>
<td>

`string`

</td>
<td>

`'src'`

</td>
</tr>
<tr>
<td>

`compilerOptions.skipLibCheck`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
<tr>
<td>

`compilerOptions.strict`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
<tr>
<td>

`compilerOptions.target`

</td>
<td>

`string`

</td>
<td>

`"es2024"`

</td>
</tr>
<tr>
<td>

`compilerOptions.verbatimModuleSyntax`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
<tr>
<td>

`exclude`

</td>
<td>

`string`[]

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

---

### getAppName()

> **getAppName**(`reqName`, `rootDir`): `Promise`\<`string`\>

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

`reqName`

</td>
<td>

`undefined` \| `string`

</td>
</tr>
<tr>
<td>

`rootDir`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`string`\>

---

### getInstallCommand()

> **getInstallCommand**(`pkgManager`): `string`

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

`pkgManager`

</td>
<td>

`"npm"` \| `"yarn"` \| `"pnpm"` \| `"bun"`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### getPackageJson()

> **getPackageJson**(`appName`, `runtime`, `templateName`): `undefined` \| `string`

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

`appName`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`runtime`

</td>
<td>

`"bun"` \| `"node"` \| `"deno"`

</td>
</tr>
<tr>
<td>

`templateName`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`undefined` \| `string`

---

### getPackageManager()

> **getPackageManager**(`dest`, `__namedParameters`): `Promise`\<`"npm"` \| `"yarn"` \| `"pnpm"` \| `"bun"`\>

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

`dest`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`__namedParameters`

</td>
<td>

[`CliOptions`](#clioptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`"npm"` \| `"yarn"` \| `"pnpm"` \| `"bun"`\>

---

### getRuntime()

> **getRuntime**(): `Promise`\<`"bun"` \| `"node"` \| `"deno"`\>

#### Returns

`Promise`\<`"bun"` \| `"node"` \| `"deno"`\>

---

### getTemplate()

> **getTemplate**(`reqTemplate`): `Promise`\<[`Template`](#template-1)\>

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

`reqTemplate`

</td>
<td>

`undefined` \| `string`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<[`Template`](#template-1)\>

---

### handler()

> **handler**(`args`): `Promise`\<`void`\>

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

`args`

</td>
<td>

[`Args`](#args)

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>
