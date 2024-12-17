# esbuild

## Interfaces

### AnalyzeMetafileOptions

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

`color?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`verbose?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

---

### BuildContext\<ProvidedOptions\>

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

`ProvidedOptions` _extends_ [`BuildOptions`](esbuild.md#buildoptions)

</td>
<td>

[`BuildOptions`](esbuild.md#buildoptions)

</td>
</tr>
</tbody>
</table>

#### Methods

##### cancel()

> **cancel**(): `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

##### dispose()

> **dispose**(): `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

##### rebuild()

> **rebuild**(): `Promise`\<[`BuildResult`](esbuild.md#buildresultprovidedoptions)\<`ProvidedOptions`\>\>

Documentation: https://esbuild.github.io/api/#rebuild

###### Returns

`Promise`\<[`BuildResult`](esbuild.md#buildresultprovidedoptions)\<`ProvidedOptions`\>\>

##### serve()

> **serve**(`options`?): `Promise`\<[`ServeResult`](esbuild.md#serveresult)\>

Documentation: https://esbuild.github.io/api/#serve

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

`options`?

</td>
<td>

[`ServeOptions`](esbuild.md#serveoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<[`ServeResult`](esbuild.md#serveresult)\>

##### watch()

> **watch**(`options`?): `Promise`\<`void`\>

Documentation: https://esbuild.github.io/api/#watch

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

`options`?

</td>
<td>

[`WatchOptions`](esbuild.md#watchoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

---

### BuildFailure

#### Extends

- `Error`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`errors`

</td>
<td>

[`Message`](esbuild.md#message-1)[]

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`message`

</td>
<td>

`string`

</td>
<td>

`Error.message`

</td>
</tr>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
<td>

`Error.name`

</td>
</tr>
<tr>
<td>

`warnings`

</td>
<td>

[`Message`](esbuild.md#message-1)[]

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`cause?`

</td>
<td>

`unknown`

</td>
<td>

`Error.cause`

</td>
</tr>
<tr>
<td>

`stack?`

</td>
<td>

`string`

</td>
<td>

`Error.stack`

</td>
</tr>
</tbody>
</table>

---

### BuildOptions

#### Extends

- [`CommonOptions`](esbuild.md#commonoptions)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`absWorkingDir?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#working-directory

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`alias?`

</td>
<td>

`Record`\<`string`, `string`\>

</td>
<td>

Documentation: https://esbuild.github.io/api/#alias

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`allowOverwrite?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#allow-overwrite

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`assetNames?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#asset-names

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`banner?`

</td>
<td>

`object`

</td>
<td>

Documentation: https://esbuild.github.io/api/#banner

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`bundle?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#bundle

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`charset?`

</td>
<td>

[`Charset`](esbuild.md#charset-3)

</td>
<td>

Documentation: https://esbuild.github.io/api/#charset

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`charset`](esbuild.md#charset-1)

</td>
</tr>
<tr>
<td>

`chunkNames?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#chunk-names

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`color?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#color

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`color`](esbuild.md#color-2)

</td>
</tr>
<tr>
<td>

`conditions?`

</td>
<td>

`string`[]

</td>
<td>

Documentation: https://esbuild.github.io/api/#conditions

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`define?`

</td>
<td>

`object`

</td>
<td>

Documentation: https://esbuild.github.io/api/#define

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`define`](esbuild.md#define-1)

</td>
</tr>
<tr>
<td>

`drop?`

</td>
<td>

[`Drop`](esbuild.md#drop-3)[]

</td>
<td>

Documentation: https://esbuild.github.io/api/#drop

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`drop`](esbuild.md#drop-1)

</td>
</tr>
<tr>
<td>

`dropLabels?`

</td>
<td>

`string`[]

</td>
<td>

Documentation: https://esbuild.github.io/api/#drop-labels

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`dropLabels`](esbuild.md#droplabels-1)

</td>
</tr>
<tr>
<td>

`entryNames?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#entry-names

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`entryPoints?`

</td>
<td>

`string`[] \| `Record`\<`string`, `string`\> \| `object`[]

</td>
<td>

Documentation: https://esbuild.github.io/api/#entry-points

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`external?`

</td>
<td>

`string`[]

</td>
<td>

Documentation: https://esbuild.github.io/api/#external

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`footer?`

</td>
<td>

`object`

</td>
<td>

Documentation: https://esbuild.github.io/api/#footer

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`format?`

</td>
<td>

[`Format`](esbuild.md#format-3)

</td>
<td>

Documentation: https://esbuild.github.io/api/#format

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`format`](esbuild.md#format-1)

</td>
</tr>
<tr>
<td>

`globalName?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#global-name

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`globalName`](esbuild.md#globalname-1)

</td>
</tr>
<tr>
<td>

`ignoreAnnotations?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#ignore-annotations

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`ignoreAnnotations`](esbuild.md#ignoreannotations-1)

</td>
</tr>
<tr>
<td>

`inject?`

</td>
<td>

`string`[]

</td>
<td>

Documentation: https://esbuild.github.io/api/#inject

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`jsx?`

</td>
<td>

`"transform"` \| `"preserve"` \| `"automatic"`

</td>
<td>

Documentation: https://esbuild.github.io/api/#jsx

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`jsx`](esbuild.md#jsx-1)

</td>
</tr>
<tr>
<td>

`jsxDev?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#jsx-development

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`jsxDev`](esbuild.md#jsxdev-1)

</td>
</tr>
<tr>
<td>

`jsxFactory?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#jsx-factory

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`jsxFactory`](esbuild.md#jsxfactory-1)

</td>
</tr>
<tr>
<td>

`jsxFragment?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#jsx-fragment

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`jsxFragment`](esbuild.md#jsxfragment-1)

</td>
</tr>
<tr>
<td>

`jsxImportSource?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#jsx-import-source

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`jsxImportSource`](esbuild.md#jsximportsource-1)

</td>
</tr>
<tr>
<td>

`jsxSideEffects?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#jsx-side-effects

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`jsxSideEffects`](esbuild.md#jsxsideeffects-1)

</td>
</tr>
<tr>
<td>

`keepNames?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#keep-names

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`keepNames`](esbuild.md#keepnames-1)

</td>
</tr>
<tr>
<td>

`legalComments?`

</td>
<td>

`"external"` \| `"linked"` \| `"inline"` \| `"none"` \| `"eof"`

</td>
<td>

Documentation: https://esbuild.github.io/api/#legal-comments

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`legalComments`](esbuild.md#legalcomments-1)

</td>
</tr>
<tr>
<td>

`lineLimit?`

</td>
<td>

`number`

</td>
<td>

Documentation: https://esbuild.github.io/api/#line-limit

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`lineLimit`](esbuild.md#linelimit-1)

</td>
</tr>
<tr>
<td>

`loader?`

</td>
<td>

`object`

</td>
<td>

Documentation: https://esbuild.github.io/api/#loader

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`logLevel?`

</td>
<td>

[`LogLevel`](esbuild.md#loglevel-3)

</td>
<td>

Documentation: https://esbuild.github.io/api/#log-level

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`logLevel`](esbuild.md#loglevel-1)

</td>
</tr>
<tr>
<td>

`logLimit?`

</td>
<td>

`number`

</td>
<td>

Documentation: https://esbuild.github.io/api/#log-limit

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`logLimit`](esbuild.md#loglimit-1)

</td>
</tr>
<tr>
<td>

`logOverride?`

</td>
<td>

`Record`\<`string`, [`LogLevel`](esbuild.md#loglevel-3)\>

</td>
<td>

Documentation: https://esbuild.github.io/api/#log-override

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`logOverride`](esbuild.md#logoverride-1)

</td>
</tr>
<tr>
<td>

`mainFields?`

</td>
<td>

`string`[]

</td>
<td>

Documentation: https://esbuild.github.io/api/#main-fields

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`mangleCache?`

</td>
<td>

`Record`\<`string`, `string` \| `false`\>

</td>
<td>

Documentation: https://esbuild.github.io/api/#mangle-props

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`mangleCache`](esbuild.md#manglecache-2)

</td>
</tr>
<tr>
<td>

`mangleProps?`

</td>
<td>

`RegExp`

</td>
<td>

Documentation: https://esbuild.github.io/api/#mangle-props

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`mangleProps`](esbuild.md#mangleprops-1)

</td>
</tr>
<tr>
<td>

`mangleQuoted?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#mangle-props

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`mangleQuoted`](esbuild.md#manglequoted-1)

</td>
</tr>
<tr>
<td>

`metafile?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#metafile

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`minify?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#minify

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`minify`](esbuild.md#minify-1)

</td>
</tr>
<tr>
<td>

`minifyIdentifiers?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#minify

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`minifyIdentifiers`](esbuild.md#minifyidentifiers-1)

</td>
</tr>
<tr>
<td>

`minifySyntax?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#minify

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`minifySyntax`](esbuild.md#minifysyntax-1)

</td>
</tr>
<tr>
<td>

`minifyWhitespace?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#minify

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`minifyWhitespace`](esbuild.md#minifywhitespace-1)

</td>
</tr>
<tr>
<td>

`nodePaths?`

</td>
<td>

`string`[]

</td>
<td>

Documentation: https://esbuild.github.io/api/#node-paths

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`outbase?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#outbase

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`outdir?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#outdir

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`outExtension?`

</td>
<td>

`object`

</td>
<td>

Documentation: https://esbuild.github.io/api/#out-extension

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`outfile?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#outfile

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`packages?`

</td>
<td>

`"bundle"` \| `"external"`

</td>
<td>

Documentation: https://esbuild.github.io/api/#packages

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`platform?`

</td>
<td>

[`Platform`](esbuild.md#platform-3)

</td>
<td>

Documentation: https://esbuild.github.io/api/#platform

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`platform`](esbuild.md#platform-1)

</td>
</tr>
<tr>
<td>

`plugins?`

</td>
<td>

[`Plugin`](esbuild.md#plugin)[]

</td>
<td>

Documentation: https://esbuild.github.io/plugins/

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`preserveSymlinks?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#preserve-symlinks

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`publicPath?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#public-path

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`pure?`

</td>
<td>

`string`[]

</td>
<td>

Documentation: https://esbuild.github.io/api/#pure

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`pure`](esbuild.md#pure-1)

</td>
</tr>
<tr>
<td>

`reserveProps?`

</td>
<td>

`RegExp`

</td>
<td>

Documentation: https://esbuild.github.io/api/#mangle-props

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`reserveProps`](esbuild.md#reserveprops-1)

</td>
</tr>
<tr>
<td>

`resolveExtensions?`

</td>
<td>

`string`[]

</td>
<td>

Documentation: https://esbuild.github.io/api/#resolve-extensions

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`sourcemap?`

</td>
<td>

`boolean` \| `"external"` \| `"linked"` \| `"inline"` \| `"both"`

</td>
<td>

Documentation: https://esbuild.github.io/api/#sourcemap

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`sourcemap`](esbuild.md#sourcemap-1)

</td>
</tr>
<tr>
<td>

`sourceRoot?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#source-root

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`sourceRoot`](esbuild.md#sourceroot-1)

</td>
</tr>
<tr>
<td>

`sourcesContent?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#sources-content

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`sourcesContent`](esbuild.md#sourcescontent-1)

</td>
</tr>
<tr>
<td>

`splitting?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#splitting

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`stdin?`

</td>
<td>

[`StdinOptions`](esbuild.md#stdinoptions)

</td>
<td>

Documentation: https://esbuild.github.io/api/#stdin

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`supported?`

</td>
<td>

`Record`\<`string`, `boolean`\>

</td>
<td>

Documentation: https://esbuild.github.io/api/#supported

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`supported`](esbuild.md#supported-1)

</td>
</tr>
<tr>
<td>

`target?`

</td>
<td>

`string` \| `string`[]

</td>
<td>

Documentation: https://esbuild.github.io/api/#target

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`target`](esbuild.md#target-1)

</td>
</tr>
<tr>
<td>

`treeShaking?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#tree-shaking

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`treeShaking`](esbuild.md#treeshaking-1)

</td>
</tr>
<tr>
<td>

`tsconfig?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#tsconfig

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`tsconfigRaw?`

</td>
<td>

`string` \| [`TsconfigRaw`](esbuild.md#tsconfigraw-3)

</td>
<td>

Documentation: https://esbuild.github.io/api/#tsconfig-raw

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`tsconfigRaw`](esbuild.md#tsconfigraw-1)

</td>
</tr>
<tr>
<td>

`write?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#write

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

---

### BuildResult\<ProvidedOptions\>

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

`ProvidedOptions` _extends_ [`BuildOptions`](esbuild.md#buildoptions)

</td>
<td>

[`BuildOptions`](esbuild.md#buildoptions)

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
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`errors`

</td>
<td>

[`Message`](esbuild.md#message-1)[]

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`mangleCache`

</td>
<td>

`Record`\<`string`, `string` \| `false`\> \| `ProvidedOptions`\[`"mangleCache"`\] _extends_ `Object` ? `never` : `undefined`

</td>
<td>

Only when "mangleCache" is present

</td>
</tr>
<tr>
<td>

`metafile`

</td>
<td>

[`Metafile`](esbuild.md#metafile-2) \| `ProvidedOptions`\[`"metafile"`\] _extends_ `true` ? `never` : `undefined`

</td>
<td>

Only when "metafile: true"

</td>
</tr>
<tr>
<td>

`outputFiles`

</td>
<td>

[`OutputFile`](esbuild.md#outputfile)[] \| `ProvidedOptions`\[`"write"`\] _extends_ `false` ? `never` : `undefined`

</td>
<td>

Only when "write: false"

</td>
</tr>
<tr>
<td>

`warnings`

</td>
<td>

[`Message`](esbuild.md#message-1)[]

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

---

### CommonOptions

#### Extended by

- [`BuildOptions`](esbuild.md#buildoptions)
- [`TransformOptions`](esbuild.md#transformoptions)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`charset?`

</td>
<td>

[`Charset`](esbuild.md#charset-3)

</td>
<td>

Documentation: https://esbuild.github.io/api/#charset

</td>
</tr>
<tr>
<td>

`color?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#color

</td>
</tr>
<tr>
<td>

`define?`

</td>
<td>

`object`

</td>
<td>

Documentation: https://esbuild.github.io/api/#define

</td>
</tr>
<tr>
<td>

`drop?`

</td>
<td>

[`Drop`](esbuild.md#drop-3)[]

</td>
<td>

Documentation: https://esbuild.github.io/api/#drop

</td>
</tr>
<tr>
<td>

`dropLabels?`

</td>
<td>

`string`[]

</td>
<td>

Documentation: https://esbuild.github.io/api/#drop-labels

</td>
</tr>
<tr>
<td>

`format?`

</td>
<td>

[`Format`](esbuild.md#format-3)

</td>
<td>

Documentation: https://esbuild.github.io/api/#format

</td>
</tr>
<tr>
<td>

`globalName?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#global-name

</td>
</tr>
<tr>
<td>

`ignoreAnnotations?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#ignore-annotations

</td>
</tr>
<tr>
<td>

`jsx?`

</td>
<td>

`"transform"` \| `"preserve"` \| `"automatic"`

</td>
<td>

Documentation: https://esbuild.github.io/api/#jsx

</td>
</tr>
<tr>
<td>

`jsxDev?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#jsx-development

</td>
</tr>
<tr>
<td>

`jsxFactory?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#jsx-factory

</td>
</tr>
<tr>
<td>

`jsxFragment?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#jsx-fragment

</td>
</tr>
<tr>
<td>

`jsxImportSource?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#jsx-import-source

</td>
</tr>
<tr>
<td>

`jsxSideEffects?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#jsx-side-effects

</td>
</tr>
<tr>
<td>

`keepNames?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#keep-names

</td>
</tr>
<tr>
<td>

`legalComments?`

</td>
<td>

`"external"` \| `"linked"` \| `"inline"` \| `"none"` \| `"eof"`

</td>
<td>

Documentation: https://esbuild.github.io/api/#legal-comments

</td>
</tr>
<tr>
<td>

`lineLimit?`

</td>
<td>

`number`

</td>
<td>

Documentation: https://esbuild.github.io/api/#line-limit

</td>
</tr>
<tr>
<td>

`logLevel?`

</td>
<td>

[`LogLevel`](esbuild.md#loglevel-3)

</td>
<td>

Documentation: https://esbuild.github.io/api/#log-level

</td>
</tr>
<tr>
<td>

`logLimit?`

</td>
<td>

`number`

</td>
<td>

Documentation: https://esbuild.github.io/api/#log-limit

</td>
</tr>
<tr>
<td>

`logOverride?`

</td>
<td>

`Record`\<`string`, [`LogLevel`](esbuild.md#loglevel-3)\>

</td>
<td>

Documentation: https://esbuild.github.io/api/#log-override

</td>
</tr>
<tr>
<td>

`mangleCache?`

</td>
<td>

`Record`\<`string`, `string` \| `false`\>

</td>
<td>

Documentation: https://esbuild.github.io/api/#mangle-props

</td>
</tr>
<tr>
<td>

`mangleProps?`

</td>
<td>

`RegExp`

</td>
<td>

Documentation: https://esbuild.github.io/api/#mangle-props

</td>
</tr>
<tr>
<td>

`mangleQuoted?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#mangle-props

</td>
</tr>
<tr>
<td>

`minify?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#minify

</td>
</tr>
<tr>
<td>

`minifyIdentifiers?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#minify

</td>
</tr>
<tr>
<td>

`minifySyntax?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#minify

</td>
</tr>
<tr>
<td>

`minifyWhitespace?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#minify

</td>
</tr>
<tr>
<td>

`platform?`

</td>
<td>

[`Platform`](esbuild.md#platform-3)

</td>
<td>

Documentation: https://esbuild.github.io/api/#platform

</td>
</tr>
<tr>
<td>

`pure?`

</td>
<td>

`string`[]

</td>
<td>

Documentation: https://esbuild.github.io/api/#pure

</td>
</tr>
<tr>
<td>

`reserveProps?`

</td>
<td>

`RegExp`

</td>
<td>

Documentation: https://esbuild.github.io/api/#mangle-props

</td>
</tr>
<tr>
<td>

`sourcemap?`

</td>
<td>

`boolean` \| `"external"` \| `"linked"` \| `"inline"` \| `"both"`

</td>
<td>

Documentation: https://esbuild.github.io/api/#sourcemap

</td>
</tr>
<tr>
<td>

`sourceRoot?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#source-root

</td>
</tr>
<tr>
<td>

`sourcesContent?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#sources-content

</td>
</tr>
<tr>
<td>

`supported?`

</td>
<td>

`Record`\<`string`, `boolean`\>

</td>
<td>

Documentation: https://esbuild.github.io/api/#supported

</td>
</tr>
<tr>
<td>

`target?`

</td>
<td>

`string` \| `string`[]

</td>
<td>

Documentation: https://esbuild.github.io/api/#target

</td>
</tr>
<tr>
<td>

`treeShaking?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#tree-shaking

</td>
</tr>
<tr>
<td>

`tsconfigRaw?`

</td>
<td>

`string` \| [`TsconfigRaw`](esbuild.md#tsconfigraw-3)

</td>
<td>

Documentation: https://esbuild.github.io/api/#tsconfig-raw

</td>
</tr>
</tbody>
</table>

---

### FormatMessagesOptions

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

`kind`

</td>
<td>

`"warning"` \| `"error"`

</td>
</tr>
<tr>
<td>

`color?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`terminalWidth?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

---

### InitializeOptions

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`wasmModule?`

</td>
<td>

`Module`

</td>
<td>

The result of calling "new WebAssembly.Module(buffer)" where "buffer"
is a typed array or ArrayBuffer containing the binary code of the
"esbuild.wasm" file.

You can use this as an alternative to "wasmURL" for environments where it's
not possible to download the WebAssembly module.

</td>
</tr>
<tr>
<td>

`wasmURL?`

</td>
<td>

`string` \| `URL`

</td>
<td>

The URL of the "esbuild.wasm" file. This must be provided when running
esbuild in the browser.

</td>
</tr>
<tr>
<td>

`worker?`

</td>
<td>

`boolean`

</td>
<td>

By default esbuild runs the WebAssembly-based browser API in a web worker
to avoid blocking the UI thread. This can be disabled by setting "worker"
to false.

</td>
</tr>
</tbody>
</table>

---

### Location

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`column`

</td>
<td>

`number`

</td>
<td>

0-based, in bytes

</td>
</tr>
<tr>
<td>

`file`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`length`

</td>
<td>

`number`

</td>
<td>

in bytes

</td>
</tr>
<tr>
<td>

`line`

</td>
<td>

`number`

</td>
<td>

1-based

</td>
</tr>
<tr>
<td>

`lineText`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`namespace`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`suggestion`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

---

### Message

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`detail`

</td>
<td>

`any`

</td>
<td>

Optional user-specified data that is passed through unmodified. You can
use this to stash the original error, for example.

</td>
</tr>
<tr>
<td>

`id`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`location`

</td>
<td>

`null` \| [`Location`](esbuild.md#location)

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`notes`

</td>
<td>

[`Note`](esbuild.md#note)[]

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`pluginName`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`text`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

---

### Metafile

Documentation: https://esbuild.github.io/api/#metafile

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

`inputs`

</td>
<td>

`object`

</td>
</tr>
<tr>
<td>

`outputs`

</td>
<td>

`object`

</td>
</tr>
</tbody>
</table>

---

### Note

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

`location`

</td>
<td>

`null` \| [`Location`](esbuild.md#location)

</td>
</tr>
<tr>
<td>

`text`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

---

### OnEndResult

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

`errors?`

</td>
<td>

[`PartialMessage`](esbuild.md#partialmessage)[]

</td>
</tr>
<tr>
<td>

`warnings?`

</td>
<td>

[`PartialMessage`](esbuild.md#partialmessage)[]

</td>
</tr>
</tbody>
</table>

---

### OnLoadArgs

Documentation: https://esbuild.github.io/plugins/#on-load-arguments

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

`namespace`

</td>
<td>

`string`

</td>
</tr>
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

`pluginData`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`suffix`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`with`

</td>
<td>

`Record`\<`string`, `string`\>

</td>
</tr>
</tbody>
</table>

---

### OnLoadOptions

Documentation: https://esbuild.github.io/plugins/#on-load-options

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

`filter`

</td>
<td>

`RegExp`

</td>
</tr>
<tr>
<td>

`namespace?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

---

### OnLoadResult

Documentation: https://esbuild.github.io/plugins/#on-load-results

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

`contents?`

</td>
<td>

`string` \| `Uint8Array`\<`ArrayBufferLike`\>

</td>
</tr>
<tr>
<td>

`errors?`

</td>
<td>

[`PartialMessage`](esbuild.md#partialmessage)[]

</td>
</tr>
<tr>
<td>

`loader?`

</td>
<td>

[`Loader`](esbuild.md#loader-4)

</td>
</tr>
<tr>
<td>

`pluginData?`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`pluginName?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`resolveDir?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`warnings?`

</td>
<td>

[`PartialMessage`](esbuild.md#partialmessage)[]

</td>
</tr>
<tr>
<td>

`watchDirs?`

</td>
<td>

`string`[]

</td>
</tr>
<tr>
<td>

`watchFiles?`

</td>
<td>

`string`[]

</td>
</tr>
</tbody>
</table>

---

### OnResolveArgs

Documentation: https://esbuild.github.io/plugins/#on-resolve-arguments

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

`importer`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`kind`

</td>
<td>

[`ImportKind`](esbuild.md#importkind)

</td>
</tr>
<tr>
<td>

`namespace`

</td>
<td>

`string`

</td>
</tr>
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

`pluginData`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`resolveDir`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`with`

</td>
<td>

`Record`\<`string`, `string`\>

</td>
</tr>
</tbody>
</table>

---

### OnResolveOptions

Documentation: https://esbuild.github.io/plugins/#on-resolve-options

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

`filter`

</td>
<td>

`RegExp`

</td>
</tr>
<tr>
<td>

`namespace?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

---

### OnResolveResult

Documentation: https://esbuild.github.io/plugins/#on-resolve-results

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

`errors?`

</td>
<td>

[`PartialMessage`](esbuild.md#partialmessage)[]

</td>
</tr>
<tr>
<td>

`external?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`namespace?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`path?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`pluginData?`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`pluginName?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`sideEffects?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`suffix?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`warnings?`

</td>
<td>

[`PartialMessage`](esbuild.md#partialmessage)[]

</td>
</tr>
<tr>
<td>

`watchDirs?`

</td>
<td>

`string`[]

</td>
</tr>
<tr>
<td>

`watchFiles?`

</td>
<td>

`string`[]

</td>
</tr>
</tbody>
</table>

---

### OnStartResult

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

`errors?`

</td>
<td>

[`PartialMessage`](esbuild.md#partialmessage)[]

</td>
</tr>
<tr>
<td>

`warnings?`

</td>
<td>

[`PartialMessage`](esbuild.md#partialmessage)[]

</td>
</tr>
</tbody>
</table>

---

### OutputFile

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`contents`

</td>
<td>

`public`

</td>
<td>

`Uint8Array`\<`ArrayBufferLike`\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`hash`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`path`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`text`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

"contents" as text (changes automatically with "contents")

</td>
</tr>
</tbody>
</table>

---

### PartialMessage

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

`detail?`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`id?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`location?`

</td>
<td>

`null` \| `Partial`\<[`Location`](esbuild.md#location)\>

</td>
</tr>
<tr>
<td>

`notes?`

</td>
<td>

[`PartialNote`](esbuild.md#partialnote)[]

</td>
</tr>
<tr>
<td>

`pluginName?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`text?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

---

### PartialNote

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

`location?`

</td>
<td>

`null` \| `Partial`\<[`Location`](esbuild.md#location)\>

</td>
</tr>
<tr>
<td>

`text?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

---

### Plugin

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

(`build`: [`PluginBuild`](esbuild.md#pluginbuild)) => `void` \| `Promise`\<`void`\>

</td>
</tr>
</tbody>
</table>

---

### PluginBuild

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`esbuild`

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

`esbuild.analyzeMetafile`

</td>
<td>

(`metafile`: `string` \| [`Metafile`](esbuild.md#metafile-2), `options`?: [`AnalyzeMetafileOptions`](esbuild.md#analyzemetafileoptions)) => `Promise`\<`string`\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`esbuild.analyzeMetafileSync`

</td>
<td>

(`metafile`: `string` \| [`Metafile`](esbuild.md#metafile-2), `options`?: [`AnalyzeMetafileOptions`](esbuild.md#analyzemetafileoptions)) => `string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`esbuild.build`

</td>
<td>

\<`T`\>(`options`: [`SameShape`](esbuild.md#sameshapeout-in)\<[`BuildOptions`](esbuild.md#buildoptions), `T`\>) => `Promise`\<[`BuildResult`](esbuild.md#buildresultprovidedoptions)\<`T`\>\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`esbuild.buildSync`

</td>
<td>

\<`T`\>(`options`: [`SameShape`](esbuild.md#sameshapeout-in)\<[`BuildOptions`](esbuild.md#buildoptions), `T`\>) => [`BuildResult`](esbuild.md#buildresultprovidedoptions)\<`T`\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`esbuild.context`

</td>
<td>

\<`T`\>(`options`: [`SameShape`](esbuild.md#sameshapeout-in)\<[`BuildOptions`](esbuild.md#buildoptions), `T`\>) => `Promise`\<[`BuildContext`](esbuild.md#buildcontextprovidedoptions)\<`T`\>\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`esbuild.formatMessages`

</td>
<td>

(`messages`: [`PartialMessage`](esbuild.md#partialmessage)[], `options`: [`FormatMessagesOptions`](esbuild.md#formatmessagesoptions)) => `Promise`\<`string`[]\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`esbuild.formatMessagesSync`

</td>
<td>

(`messages`: [`PartialMessage`](esbuild.md#partialmessage)[], `options`: [`FormatMessagesOptions`](esbuild.md#formatmessagesoptions)) => `string`[]

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`esbuild.initialize`

</td>
<td>

(`options`: [`InitializeOptions`](esbuild.md#initializeoptions)) => `Promise`\<`void`\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`esbuild.transform`

</td>
<td>

\<`T`\>(`input`: `string` \| `Uint8Array`\<`ArrayBufferLike`\>, `options`?: [`SameShape`](esbuild.md#sameshapeout-in)\<[`TransformOptions`](esbuild.md#transformoptions), `T`\>) => `Promise`\<[`TransformResult`](esbuild.md#transformresultprovidedoptions)\<`T`\>\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`esbuild.transformSync`

</td>
<td>

\<`T`\>(`input`: `string` \| `Uint8Array`\<`ArrayBufferLike`\>, `options`?: [`SameShape`](esbuild.md#sameshapeout-in)\<[`TransformOptions`](esbuild.md#transformoptions), `T`\>) => [`TransformResult`](esbuild.md#transformresultprovidedoptions)\<`T`\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`esbuild.version`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`initialOptions`

</td>
<td>

[`BuildOptions`](esbuild.md#buildoptions)

</td>
<td>

Documentation: https://esbuild.github.io/plugins/#build-options

</td>
</tr>
</tbody>
</table>

#### Methods

##### onDispose()

> **onDispose**(`callback`): `void`

Documentation: https://esbuild.github.io/plugins/#on-dispose

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

`callback`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### onEnd()

> **onEnd**(`callback`): `void`

Documentation: https://esbuild.github.io/plugins/#on-end

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

`callback`

</td>
<td>

(`result`) => `null` \| `void` \| [`OnEndResult`](esbuild.md#onendresult) \| `Promise`\<`null` \| `void` \| [`OnEndResult`](esbuild.md#onendresult)\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### onLoad()

> **onLoad**(`options`, `callback`): `void`

Documentation: https://esbuild.github.io/plugins/#on-load

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

`options`

</td>
<td>

[`OnLoadOptions`](esbuild.md#onloadoptions)

</td>
</tr>
<tr>
<td>

`callback`

</td>
<td>

(`args`) => `undefined` \| `null` \| [`OnLoadResult`](esbuild.md#onloadresult) \| `Promise`\<`undefined` \| `null` \| [`OnLoadResult`](esbuild.md#onloadresult)\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### onResolve()

> **onResolve**(`options`, `callback`): `void`

Documentation: https://esbuild.github.io/plugins/#on-resolve

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

`options`

</td>
<td>

[`OnResolveOptions`](esbuild.md#onresolveoptions)

</td>
</tr>
<tr>
<td>

`callback`

</td>
<td>

(`args`) => `undefined` \| `null` \| [`OnResolveResult`](esbuild.md#onresolveresult) \| `Promise`\<`undefined` \| `null` \| [`OnResolveResult`](esbuild.md#onresolveresult)\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### onStart()

> **onStart**(`callback`): `void`

Documentation: https://esbuild.github.io/plugins/#on-start

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

`callback`

</td>
<td>

() => `null` \| `void` \| [`OnStartResult`](esbuild.md#onstartresult) \| `Promise`\<`null` \| `void` \| [`OnStartResult`](esbuild.md#onstartresult)\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### resolve()

> **resolve**(`path`, `options`?): `Promise`\<[`ResolveResult`](esbuild.md#resolveresult)\>

Documentation: https://esbuild.github.io/plugins/#resolve

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
<tr>
<td>

`options`?

</td>
<td>

[`ResolveOptions`](esbuild.md#resolveoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<[`ResolveResult`](esbuild.md#resolveresult)\>

---

### ResolveOptions

Documentation: https://esbuild.github.io/plugins/#resolve-options

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

`importer?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`kind?`

</td>
<td>

[`ImportKind`](esbuild.md#importkind)

</td>
</tr>
<tr>
<td>

`namespace?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`pluginData?`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`pluginName?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`resolveDir?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`with?`

</td>
<td>

`Record`\<`string`, `string`\>

</td>
</tr>
</tbody>
</table>

---

### ResolveResult

Documentation: https://esbuild.github.io/plugins/#resolve-results

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

`errors`

</td>
<td>

[`Message`](esbuild.md#message-1)[]

</td>
</tr>
<tr>
<td>

`external`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`namespace`

</td>
<td>

`string`

</td>
</tr>
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

`pluginData`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`sideEffects`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`suffix`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`warnings`

</td>
<td>

[`Message`](esbuild.md#message-1)[]

</td>
</tr>
</tbody>
</table>

---

### ServeOnRequestArgs

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`method`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`path`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`remoteAddress`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`status`

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`timeInMS`

</td>
<td>

`number`

</td>
<td>

The time to generate the response, not to send it

</td>
</tr>
</tbody>
</table>

---

### ServeOptions

Documentation: https://esbuild.github.io/api/#serve-arguments

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

`certfile?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`fallback?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`host?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`keyfile?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`onRequest?`

</td>
<td>

(`args`: [`ServeOnRequestArgs`](esbuild.md#serveonrequestargs)) => `void`

</td>
</tr>
<tr>
<td>

`port?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`servedir?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

---

### ServeResult

Documentation: https://esbuild.github.io/api/#serve-return-values

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

`host`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`port`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

---

### StdinOptions

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

`contents`

</td>
<td>

`string` \| `Uint8Array`\<`ArrayBufferLike`\>

</td>
</tr>
<tr>
<td>

`loader?`

</td>
<td>

[`Loader`](esbuild.md#loader-4)

</td>
</tr>
<tr>
<td>

`resolveDir?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`sourcefile?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

---

### TransformFailure

#### Extends

- `Error`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`errors`

</td>
<td>

[`Message`](esbuild.md#message-1)[]

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`message`

</td>
<td>

`string`

</td>
<td>

`Error.message`

</td>
</tr>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
<td>

`Error.name`

</td>
</tr>
<tr>
<td>

`warnings`

</td>
<td>

[`Message`](esbuild.md#message-1)[]

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`cause?`

</td>
<td>

`unknown`

</td>
<td>

`Error.cause`

</td>
</tr>
<tr>
<td>

`stack?`

</td>
<td>

`string`

</td>
<td>

`Error.stack`

</td>
</tr>
</tbody>
</table>

---

### TransformOptions

#### Extends

- [`CommonOptions`](esbuild.md#commonoptions)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`banner?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#banner

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`charset?`

</td>
<td>

[`Charset`](esbuild.md#charset-3)

</td>
<td>

Documentation: https://esbuild.github.io/api/#charset

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`charset`](esbuild.md#charset-1)

</td>
</tr>
<tr>
<td>

`color?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#color

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`color`](esbuild.md#color-2)

</td>
</tr>
<tr>
<td>

`define?`

</td>
<td>

`object`

</td>
<td>

Documentation: https://esbuild.github.io/api/#define

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`define`](esbuild.md#define-1)

</td>
</tr>
<tr>
<td>

`drop?`

</td>
<td>

[`Drop`](esbuild.md#drop-3)[]

</td>
<td>

Documentation: https://esbuild.github.io/api/#drop

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`drop`](esbuild.md#drop-1)

</td>
</tr>
<tr>
<td>

`dropLabels?`

</td>
<td>

`string`[]

</td>
<td>

Documentation: https://esbuild.github.io/api/#drop-labels

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`dropLabels`](esbuild.md#droplabels-1)

</td>
</tr>
<tr>
<td>

`footer?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#footer

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`format?`

</td>
<td>

[`Format`](esbuild.md#format-3)

</td>
<td>

Documentation: https://esbuild.github.io/api/#format

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`format`](esbuild.md#format-1)

</td>
</tr>
<tr>
<td>

`globalName?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#global-name

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`globalName`](esbuild.md#globalname-1)

</td>
</tr>
<tr>
<td>

`ignoreAnnotations?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#ignore-annotations

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`ignoreAnnotations`](esbuild.md#ignoreannotations-1)

</td>
</tr>
<tr>
<td>

`jsx?`

</td>
<td>

`"transform"` \| `"preserve"` \| `"automatic"`

</td>
<td>

Documentation: https://esbuild.github.io/api/#jsx

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`jsx`](esbuild.md#jsx-1)

</td>
</tr>
<tr>
<td>

`jsxDev?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#jsx-development

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`jsxDev`](esbuild.md#jsxdev-1)

</td>
</tr>
<tr>
<td>

`jsxFactory?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#jsx-factory

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`jsxFactory`](esbuild.md#jsxfactory-1)

</td>
</tr>
<tr>
<td>

`jsxFragment?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#jsx-fragment

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`jsxFragment`](esbuild.md#jsxfragment-1)

</td>
</tr>
<tr>
<td>

`jsxImportSource?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#jsx-import-source

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`jsxImportSource`](esbuild.md#jsximportsource-1)

</td>
</tr>
<tr>
<td>

`jsxSideEffects?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#jsx-side-effects

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`jsxSideEffects`](esbuild.md#jsxsideeffects-1)

</td>
</tr>
<tr>
<td>

`keepNames?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#keep-names

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`keepNames`](esbuild.md#keepnames-1)

</td>
</tr>
<tr>
<td>

`legalComments?`

</td>
<td>

`"external"` \| `"linked"` \| `"inline"` \| `"none"` \| `"eof"`

</td>
<td>

Documentation: https://esbuild.github.io/api/#legal-comments

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`legalComments`](esbuild.md#legalcomments-1)

</td>
</tr>
<tr>
<td>

`lineLimit?`

</td>
<td>

`number`

</td>
<td>

Documentation: https://esbuild.github.io/api/#line-limit

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`lineLimit`](esbuild.md#linelimit-1)

</td>
</tr>
<tr>
<td>

`loader?`

</td>
<td>

[`Loader`](esbuild.md#loader-4)

</td>
<td>

Documentation: https://esbuild.github.io/api/#loader

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`logLevel?`

</td>
<td>

[`LogLevel`](esbuild.md#loglevel-3)

</td>
<td>

Documentation: https://esbuild.github.io/api/#log-level

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`logLevel`](esbuild.md#loglevel-1)

</td>
</tr>
<tr>
<td>

`logLimit?`

</td>
<td>

`number`

</td>
<td>

Documentation: https://esbuild.github.io/api/#log-limit

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`logLimit`](esbuild.md#loglimit-1)

</td>
</tr>
<tr>
<td>

`logOverride?`

</td>
<td>

`Record`\<`string`, [`LogLevel`](esbuild.md#loglevel-3)\>

</td>
<td>

Documentation: https://esbuild.github.io/api/#log-override

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`logOverride`](esbuild.md#logoverride-1)

</td>
</tr>
<tr>
<td>

`mangleCache?`

</td>
<td>

`Record`\<`string`, `string` \| `false`\>

</td>
<td>

Documentation: https://esbuild.github.io/api/#mangle-props

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`mangleCache`](esbuild.md#manglecache-2)

</td>
</tr>
<tr>
<td>

`mangleProps?`

</td>
<td>

`RegExp`

</td>
<td>

Documentation: https://esbuild.github.io/api/#mangle-props

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`mangleProps`](esbuild.md#mangleprops-1)

</td>
</tr>
<tr>
<td>

`mangleQuoted?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#mangle-props

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`mangleQuoted`](esbuild.md#manglequoted-1)

</td>
</tr>
<tr>
<td>

`minify?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#minify

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`minify`](esbuild.md#minify-1)

</td>
</tr>
<tr>
<td>

`minifyIdentifiers?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#minify

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`minifyIdentifiers`](esbuild.md#minifyidentifiers-1)

</td>
</tr>
<tr>
<td>

`minifySyntax?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#minify

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`minifySyntax`](esbuild.md#minifysyntax-1)

</td>
</tr>
<tr>
<td>

`minifyWhitespace?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#minify

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`minifyWhitespace`](esbuild.md#minifywhitespace-1)

</td>
</tr>
<tr>
<td>

`platform?`

</td>
<td>

[`Platform`](esbuild.md#platform-3)

</td>
<td>

Documentation: https://esbuild.github.io/api/#platform

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`platform`](esbuild.md#platform-1)

</td>
</tr>
<tr>
<td>

`pure?`

</td>
<td>

`string`[]

</td>
<td>

Documentation: https://esbuild.github.io/api/#pure

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`pure`](esbuild.md#pure-1)

</td>
</tr>
<tr>
<td>

`reserveProps?`

</td>
<td>

`RegExp`

</td>
<td>

Documentation: https://esbuild.github.io/api/#mangle-props

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`reserveProps`](esbuild.md#reserveprops-1)

</td>
</tr>
<tr>
<td>

`sourcefile?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#sourcefile

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`sourcemap?`

</td>
<td>

`boolean` \| `"external"` \| `"linked"` \| `"inline"` \| `"both"`

</td>
<td>

Documentation: https://esbuild.github.io/api/#sourcemap

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`sourcemap`](esbuild.md#sourcemap-1)

</td>
</tr>
<tr>
<td>

`sourceRoot?`

</td>
<td>

`string`

</td>
<td>

Documentation: https://esbuild.github.io/api/#source-root

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`sourceRoot`](esbuild.md#sourceroot-1)

</td>
</tr>
<tr>
<td>

`sourcesContent?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#sources-content

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`sourcesContent`](esbuild.md#sourcescontent-1)

</td>
</tr>
<tr>
<td>

`supported?`

</td>
<td>

`Record`\<`string`, `boolean`\>

</td>
<td>

Documentation: https://esbuild.github.io/api/#supported

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`supported`](esbuild.md#supported-1)

</td>
</tr>
<tr>
<td>

`target?`

</td>
<td>

`string` \| `string`[]

</td>
<td>

Documentation: https://esbuild.github.io/api/#target

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`target`](esbuild.md#target-1)

</td>
</tr>
<tr>
<td>

`treeShaking?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#tree-shaking

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`treeShaking`](esbuild.md#treeshaking-1)

</td>
</tr>
<tr>
<td>

`tsconfigRaw?`

</td>
<td>

`string` \| [`TsconfigRaw`](esbuild.md#tsconfigraw-3)

</td>
<td>

Documentation: https://esbuild.github.io/api/#tsconfig-raw

</td>
<td>

[`CommonOptions`](esbuild.md#commonoptions).[`tsconfigRaw`](esbuild.md#tsconfigraw-1)

</td>
</tr>
</tbody>
</table>

---

### TransformResult\<ProvidedOptions\>

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

`ProvidedOptions` _extends_ [`TransformOptions`](esbuild.md#transformoptions)

</td>
<td>

[`TransformOptions`](esbuild.md#transformoptions)

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
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`code`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`legalComments`

</td>
<td>

`string` \| `ProvidedOptions`\[`"legalComments"`\] _extends_ `"external"` ? `never` : `undefined`

</td>
<td>

Only when "legalComments" is "external"

</td>
</tr>
<tr>
<td>

`mangleCache`

</td>
<td>

`Record`\<`string`, `string` \| `false`\> \| `ProvidedOptions`\[`"mangleCache"`\] _extends_ `Object` ? `never` : `undefined`

</td>
<td>

Only when "mangleCache" is present

</td>
</tr>
<tr>
<td>

`map`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`warnings`

</td>
<td>

[`Message`](esbuild.md#message-1)[]

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

---

### TsconfigRaw

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

`compilerOptions?`

</td>
<td>

`object`

</td>
</tr>
<tr>
<td>

`compilerOptions.alwaysStrict?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`compilerOptions.baseUrl?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`compilerOptions.experimentalDecorators?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`compilerOptions.importsNotUsedAsValues?`

</td>
<td>

`"error"` \| `"preserve"` \| `"remove"`

</td>
</tr>
<tr>
<td>

`compilerOptions.jsx?`

</td>
<td>

`"preserve"` \| `"react-native"` \| `"react"` \| `"react-jsx"` \| `"react-jsxdev"`

</td>
</tr>
<tr>
<td>

`compilerOptions.jsxFactory?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`compilerOptions.jsxFragmentFactory?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`compilerOptions.jsxImportSource?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`compilerOptions.paths?`

</td>
<td>

`Record`\<`string`, `string`[]\>

</td>
</tr>
<tr>
<td>

`compilerOptions.preserveValueImports?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`compilerOptions.strict?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`compilerOptions.target?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`compilerOptions.useDefineForClassFields?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`compilerOptions.verbatimModuleSyntax?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

---

### WatchOptions

## Type Aliases

### Charset

> **Charset**: `"ascii"` \| `"utf8"`

---

### Drop

> **Drop**: `"console"` \| `"debugger"`

---

### Format

> **Format**: `"iife"` \| `"cjs"` \| `"esm"`

---

### ImportKind

> **ImportKind**: `"entry-point"` \| `"import-statement"` \| `"require-call"` \| `"dynamic-import"` \| `"require-resolve"` \| `"import-rule"` \| `"composes-from"` \| `"url-token"`

---

### Loader

> **Loader**: `"base64"` \| `"binary"` \| `"copy"` \| `"css"` \| `"dataurl"` \| `"default"` \| `"empty"` \| `"file"` \| `"js"` \| `"json"` \| `"jsx"` \| `"local-css"` \| `"text"` \| `"ts"` \| `"tsx"`

---

### LogLevel

> **LogLevel**: `"verbose"` \| `"debug"` \| `"info"` \| `"warning"` \| `"error"` \| `"silent"`

---

### Platform

> **Platform**: `"browser"` \| `"node"` \| `"neutral"`

---

### SameShape\<Out, In\>

> **SameShape**\<`Out`, `In`\>: `In` & `{ [Key in Exclude<keyof In, keyof Out>]: never }`

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Out`

</td>
</tr>
<tr>
<td>

`In` _extends_ `Out`

</td>
</tr>
</tbody>
</table>

## Variables

### version

> **version**: `string`

## Functions

### analyzeMetafile()

> **analyzeMetafile**(`metafile`, `options`?): `Promise`\<`string`\>

Pretty-prints an analysis of the metafile JSON to a string. This is just for
convenience to be able to match esbuild's pretty-printing exactly. If you want
to customize it, you can just inspect the data in the metafile yourself.

- Works in node: yes
- Works in browser: yes

Documentation: https://esbuild.github.io/api/#analyze

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

`metafile`

</td>
<td>

`string` \| [`Metafile`](esbuild.md#metafile-2)

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

[`AnalyzeMetafileOptions`](esbuild.md#analyzemetafileoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`string`\>

---

### analyzeMetafileSync()

> **analyzeMetafileSync**(`metafile`, `options`?): `string`

A synchronous version of "analyzeMetafile".

- Works in node: yes
- Works in browser: no

Documentation: https://esbuild.github.io/api/#analyze

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

`metafile`

</td>
<td>

`string` \| [`Metafile`](esbuild.md#metafile-2)

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

[`AnalyzeMetafileOptions`](esbuild.md#analyzemetafileoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### build()

> **build**\<`T`\>(`options`): `Promise`\<[`BuildResult`](esbuild.md#buildresultprovidedoptions)\<`T`\>\>

This function invokes the "esbuild" command-line tool for you. It returns a
promise that either resolves with a "BuildResult" object or rejects with a
"BuildFailure" object.

- Works in node: yes
- Works in browser: yes

Documentation: https://esbuild.github.io/api/#build

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` _extends_ [`BuildOptions`](esbuild.md#buildoptions)

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

[`SameShape`](esbuild.md#sameshapeout-in)\<[`BuildOptions`](esbuild.md#buildoptions), `T`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<[`BuildResult`](esbuild.md#buildresultprovidedoptions)\<`T`\>\>

---

### buildSync()

> **buildSync**\<`T`\>(`options`): [`BuildResult`](esbuild.md#buildresultprovidedoptions)\<`T`\>

A synchronous version of "build".

- Works in node: yes
- Works in browser: no

Documentation: https://esbuild.github.io/api/#build

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` _extends_ [`BuildOptions`](esbuild.md#buildoptions)

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

[`SameShape`](esbuild.md#sameshapeout-in)\<[`BuildOptions`](esbuild.md#buildoptions), `T`\>

</td>
</tr>
</tbody>
</table>

#### Returns

[`BuildResult`](esbuild.md#buildresultprovidedoptions)\<`T`\>

---

### context()

> **context**\<`T`\>(`options`): `Promise`\<[`BuildContext`](esbuild.md#buildcontextprovidedoptions)\<`T`\>\>

This is the advanced long-running form of "build" that supports additional
features such as watch mode and a local development server.

- Works in node: yes
- Works in browser: no

Documentation: https://esbuild.github.io/api/#build

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` _extends_ [`BuildOptions`](esbuild.md#buildoptions)

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

[`SameShape`](esbuild.md#sameshapeout-in)\<[`BuildOptions`](esbuild.md#buildoptions), `T`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<[`BuildContext`](esbuild.md#buildcontextprovidedoptions)\<`T`\>\>

---

### formatMessages()

> **formatMessages**(`messages`, `options`): `Promise`\<`string`[]\>

Converts log messages to formatted message strings suitable for printing in
the terminal. This allows you to reuse the built-in behavior of esbuild's
log message formatter. This is a batch-oriented API for efficiency.

- Works in node: yes
- Works in browser: yes

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

`messages`

</td>
<td>

[`PartialMessage`](esbuild.md#partialmessage)[]

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`FormatMessagesOptions`](esbuild.md#formatmessagesoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`string`[]\>

---

### formatMessagesSync()

> **formatMessagesSync**(`messages`, `options`): `string`[]

A synchronous version of "formatMessages".

- Works in node: yes
- Works in browser: no

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

`messages`

</td>
<td>

[`PartialMessage`](esbuild.md#partialmessage)[]

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`FormatMessagesOptions`](esbuild.md#formatmessagesoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`string`[]

---

### initialize()

> **initialize**(`options`): `Promise`\<`void`\>

This configures the browser-based version of esbuild. It is necessary to
call this first and wait for the returned promise to be resolved before
making other API calls when using esbuild in the browser.

- Works in node: yes
- Works in browser: yes ("options" is required)

Documentation: https://esbuild.github.io/api/#browser

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

[`InitializeOptions`](esbuild.md#initializeoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

---

### stop()

> **stop**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

---

### transform()

> **transform**\<`T`\>(`input`, `options`?): `Promise`\<[`TransformResult`](esbuild.md#transformresultprovidedoptions)\<`T`\>\>

This function transforms a single JavaScript file. It can be used to minify
JavaScript, convert TypeScript/JSX to JavaScript, or convert newer JavaScript
to older JavaScript. It returns a promise that is either resolved with a
"TransformResult" object or rejected with a "TransformFailure" object.

- Works in node: yes
- Works in browser: yes

Documentation: https://esbuild.github.io/api/#transform

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` _extends_ [`TransformOptions`](esbuild.md#transformoptions)

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

`input`

</td>
<td>

`string` \| `Uint8Array`\<`ArrayBufferLike`\>

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

[`SameShape`](esbuild.md#sameshapeout-in)\<[`TransformOptions`](esbuild.md#transformoptions), `T`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<[`TransformResult`](esbuild.md#transformresultprovidedoptions)\<`T`\>\>

---

### transformSync()

> **transformSync**\<`T`\>(`input`, `options`?): [`TransformResult`](esbuild.md#transformresultprovidedoptions)\<`T`\>

A synchronous version of "transform".

- Works in node: yes
- Works in browser: no

Documentation: https://esbuild.github.io/api/#transform

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` _extends_ [`TransformOptions`](esbuild.md#transformoptions)

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

`input`

</td>
<td>

`string` \| `Uint8Array`\<`ArrayBufferLike`\>

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

[`SameShape`](esbuild.md#sameshapeout-in)\<[`TransformOptions`](esbuild.md#transformoptions), `T`\>

</td>
</tr>
</tbody>
</table>

#### Returns

[`TransformResult`](esbuild.md#transformresultprovidedoptions)\<`T`\>
