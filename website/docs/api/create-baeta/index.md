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

> **JavaScriptRuntime**: _typeof_ [`runtimes`](index.md#runtimes)\[`number`\]

---

### PackageManager

> **PackageManager**: keyof _typeof_ [`lockfileNames`](index.md#lockfilenames)

---

### Template

> **Template**: `object`

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

<a id="packagejsn"></a> `packageJsn`?

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

'bun.lockb'

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

'package-lock.json'

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

'pnpm-lock.yaml'

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

'yarn.lock'

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

[`Template`](index.md#template-1)

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

| Name                                               | Type       | Default value                           |
| -------------------------------------------------- | ---------- | --------------------------------------- |
| `$schema`                                          | `string`   | "https://json.schemastore.org/tsconfig" |
| `compilerOptions`                                  | `object`   | -                                       |
| `compilerOptions.allowImportingTsExtensions`       | `boolean`  | true                                    |
| `compilerOptions.allowSyntheticDefaultImports`     | `boolean`  | true                                    |
| `compilerOptions.emitDeclarationOnly`              | `boolean`  | false                                   |
| `compilerOptions.esModuleInterop`                  | `boolean`  | true                                    |
| `compilerOptions.forceConsistentCasingInFileNames` | `boolean`  | true                                    |
| `compilerOptions.isolatedModules`                  | `boolean`  | true                                    |
| `compilerOptions.lib`                              | `string`[] | -                                       |
| `compilerOptions.module`                           | `string`   | "esnext"                                |
| `compilerOptions.moduleResolution`                 | `string`   | "bundler"                               |
| `compilerOptions.noEmit`                           | `boolean`  | true                                    |
| `compilerOptions.noImplicitAny`                    | `boolean`  | true                                    |
| `compilerOptions.outDir`                           | `string`   | 'dist'                                  |
| `compilerOptions.rootDir`                          | `string`   | 'src'                                   |
| `compilerOptions.skipLibCheck`                     | `boolean`  | true                                    |
| `compilerOptions.strict`                           | `boolean`  | true                                    |
| `compilerOptions.target`                           | `string`   | "es2024"                                |
| `compilerOptions.verbatimModuleSyntax`             | `boolean`  | true                                    |
| `exclude`                                          | `string`[] | -                                       |

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

[`CliOptions`](index.md#clioptions)

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

> **getTemplate**(`reqTemplate`): `Promise`\<[`Template`](index.md#template-1)\>

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

`Promise`\<[`Template`](index.md#template-1)\>

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

[`Args`](index.md#args)

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>
