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

<a id="color"></a> `color?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

<a id="verbose"></a> `verbose?`

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

<a id="errors"></a> `errors`

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

<a id="message"></a> `message`

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

<a id="name"></a> `name`

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

<a id="warnings"></a> `warnings`

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

<a id="cause"></a> `cause?`

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

<a id="stack"></a> `stack?`

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

<a id="absworkingdir"></a> `absWorkingDir?`

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

<a id="alias"></a> `alias?`

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

<a id="allowoverwrite"></a> `allowOverwrite?`

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

<a id="assetnames"></a> `assetNames?`

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

<a id="banner"></a> `banner?`

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

<a id="bundle"></a> `bundle?`

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

<a id="charset"></a> `charset?`

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

<a id="chunknames"></a> `chunkNames?`

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

<a id="color-1"></a> `color?`

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

<a id="conditions"></a> `conditions?`

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

<a id="define"></a> `define?`

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

<a id="drop"></a> `drop?`

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

<a id="droplabels"></a> `dropLabels?`

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

<a id="entrynames"></a> `entryNames?`

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

<a id="entrypoints"></a> `entryPoints?`

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

<a id="external"></a> `external?`

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

<a id="footer"></a> `footer?`

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

<a id="format"></a> `format?`

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

<a id="globalname"></a> `globalName?`

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

<a id="ignoreannotations"></a> `ignoreAnnotations?`

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

<a id="inject"></a> `inject?`

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

<a id="jsx"></a> `jsx?`

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

<a id="jsxdev"></a> `jsxDev?`

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

<a id="jsxfactory"></a> `jsxFactory?`

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

<a id="jsxfragment"></a> `jsxFragment?`

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

<a id="jsximportsource"></a> `jsxImportSource?`

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

<a id="jsxsideeffects"></a> `jsxSideEffects?`

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

<a id="keepnames"></a> `keepNames?`

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

<a id="legalcomments"></a> `legalComments?`

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

<a id="linelimit"></a> `lineLimit?`

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

<a id="loader"></a> `loader?`

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

<a id="loglevel"></a> `logLevel?`

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

<a id="loglimit"></a> `logLimit?`

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

<a id="logoverride"></a> `logOverride?`

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

<a id="mainfields"></a> `mainFields?`

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

<a id="manglecache"></a> `mangleCache?`

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

<a id="mangleprops"></a> `mangleProps?`

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

<a id="manglequoted"></a> `mangleQuoted?`

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

<a id="metafile"></a> `metafile?`

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

<a id="minify"></a> `minify?`

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

<a id="minifyidentifiers"></a> `minifyIdentifiers?`

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

<a id="minifysyntax"></a> `minifySyntax?`

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

<a id="minifywhitespace"></a> `minifyWhitespace?`

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

<a id="nodepaths"></a> `nodePaths?`

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

<a id="outbase"></a> `outbase?`

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

<a id="outdir"></a> `outdir?`

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

<a id="outextension"></a> `outExtension?`

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

<a id="outfile"></a> `outfile?`

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

<a id="packages"></a> `packages?`

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

<a id="platform"></a> `platform?`

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

<a id="plugins"></a> `plugins?`

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

<a id="preservesymlinks"></a> `preserveSymlinks?`

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

<a id="publicpath"></a> `publicPath?`

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

<a id="pure"></a> `pure?`

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

<a id="reserveprops"></a> `reserveProps?`

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

<a id="resolveextensions"></a> `resolveExtensions?`

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

<a id="sourcemap"></a> `sourcemap?`

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

<a id="sourceroot"></a> `sourceRoot?`

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

<a id="sourcescontent"></a> `sourcesContent?`

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

<a id="splitting"></a> `splitting?`

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

<a id="stdin"></a> `stdin?`

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

<a id="supported"></a> `supported?`

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

<a id="target"></a> `target?`

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

<a id="treeshaking"></a> `treeShaking?`

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

<a id="tsconfig"></a> `tsconfig?`

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

<a id="tsconfigraw"></a> `tsconfigRaw?`

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

<a id="write"></a> `write?`

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

<a id="errors-1"></a> `errors`

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

<a id="manglecache-1"></a> `mangleCache`

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

<a id="metafile-1"></a> `metafile`

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

<a id="outputfiles"></a> `outputFiles`

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

<a id="warnings-1"></a> `warnings`

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

<a id="charset-1"></a> `charset?`

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

<a id="color-2"></a> `color?`

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

<a id="define-1"></a> `define?`

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

<a id="drop-1"></a> `drop?`

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

<a id="droplabels-1"></a> `dropLabels?`

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

<a id="format-1"></a> `format?`

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

<a id="globalname-1"></a> `globalName?`

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

<a id="ignoreannotations-1"></a> `ignoreAnnotations?`

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

<a id="jsx-1"></a> `jsx?`

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

<a id="jsxdev-1"></a> `jsxDev?`

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

<a id="jsxfactory-1"></a> `jsxFactory?`

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

<a id="jsxfragment-1"></a> `jsxFragment?`

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

<a id="jsximportsource-1"></a> `jsxImportSource?`

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

<a id="jsxsideeffects-1"></a> `jsxSideEffects?`

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

<a id="keepnames-1"></a> `keepNames?`

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

<a id="legalcomments-1"></a> `legalComments?`

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

<a id="linelimit-1"></a> `lineLimit?`

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

<a id="loglevel-1"></a> `logLevel?`

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

<a id="loglimit-1"></a> `logLimit?`

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

<a id="logoverride-1"></a> `logOverride?`

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

<a id="manglecache-2"></a> `mangleCache?`

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

<a id="mangleprops-1"></a> `mangleProps?`

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

<a id="manglequoted-1"></a> `mangleQuoted?`

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

<a id="minify-1"></a> `minify?`

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

<a id="minifyidentifiers-1"></a> `minifyIdentifiers?`

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

<a id="minifysyntax-1"></a> `minifySyntax?`

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

<a id="minifywhitespace-1"></a> `minifyWhitespace?`

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

<a id="platform-1"></a> `platform?`

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

<a id="pure-1"></a> `pure?`

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

<a id="reserveprops-1"></a> `reserveProps?`

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

<a id="sourcemap-1"></a> `sourcemap?`

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

<a id="sourceroot-1"></a> `sourceRoot?`

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

<a id="sourcescontent-1"></a> `sourcesContent?`

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

<a id="supported-1"></a> `supported?`

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

<a id="target-1"></a> `target?`

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

<a id="treeshaking-1"></a> `treeShaking?`

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

<a id="tsconfigraw-1"></a> `tsconfigRaw?`

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

<a id="kind"></a> `kind`

</td>
<td>

`"warning"` \| `"error"`

</td>
</tr>
<tr>
<td>

<a id="color-3"></a> `color?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

<a id="terminalwidth"></a> `terminalWidth?`

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

<a id="wasmmodule"></a> `wasmModule?`

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

<a id="wasmurl"></a> `wasmURL?`

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

<a id="worker"></a> `worker?`

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

<a id="column"></a> `column`

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

<a id="file"></a> `file`

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

<a id="length"></a> `length`

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

<a id="line"></a> `line`

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

<a id="linetext"></a> `lineText`

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

<a id="namespace"></a> `namespace`

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

<a id="suggestion"></a> `suggestion`

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

<a id="detail"></a> `detail`

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

<a id="id"></a> `id`

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

<a id="location-1"></a> `location`

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

<a id="notes"></a> `notes`

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

<a id="pluginname"></a> `pluginName`

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

<a id="text"></a> `text`

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

<a id="inputs"></a> `inputs`

</td>
<td>

`object`

</td>
</tr>
<tr>
<td>

<a id="outputs"></a> `outputs`

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

<a id="location-2"></a> `location`

</td>
<td>

`null` \| [`Location`](esbuild.md#location)

</td>
</tr>
<tr>
<td>

<a id="text-1"></a> `text`

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

<a id="errors-2"></a> `errors?`

</td>
<td>

[`PartialMessage`](esbuild.md#partialmessage)[]

</td>
</tr>
<tr>
<td>

<a id="warnings-2"></a> `warnings?`

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

<a id="namespace-1"></a> `namespace`

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

<a id="plugindata"></a> `pluginData`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

<a id="suffix"></a> `suffix`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="with"></a> `with`

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

<a id="filter"></a> `filter`

</td>
<td>

`RegExp`

</td>
</tr>
<tr>
<td>

<a id="namespace-2"></a> `namespace?`

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

<a id="contents"></a> `contents?`

</td>
<td>

`string` \| `Uint8Array`\<`ArrayBufferLike`\>

</td>
</tr>
<tr>
<td>

<a id="errors-3"></a> `errors?`

</td>
<td>

[`PartialMessage`](esbuild.md#partialmessage)[]

</td>
</tr>
<tr>
<td>

<a id="loader-1"></a> `loader?`

</td>
<td>

[`Loader`](esbuild.md#loader-4)

</td>
</tr>
<tr>
<td>

<a id="plugindata-1"></a> `pluginData?`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

<a id="pluginname-1"></a> `pluginName?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="resolvedir"></a> `resolveDir?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="warnings-3"></a> `warnings?`

</td>
<td>

[`PartialMessage`](esbuild.md#partialmessage)[]

</td>
</tr>
<tr>
<td>

<a id="watchdirs"></a> `watchDirs?`

</td>
<td>

`string`[]

</td>
</tr>
<tr>
<td>

<a id="watchfiles"></a> `watchFiles?`

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

<a id="importer"></a> `importer`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="kind-1"></a> `kind`

</td>
<td>

[`ImportKind`](esbuild.md#importkind)

</td>
</tr>
<tr>
<td>

<a id="namespace-3"></a> `namespace`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="path-1"></a> `path`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="plugindata-2"></a> `pluginData`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

<a id="resolvedir-1"></a> `resolveDir`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="with-1"></a> `with`

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

<a id="filter-1"></a> `filter`

</td>
<td>

`RegExp`

</td>
</tr>
<tr>
<td>

<a id="namespace-4"></a> `namespace?`

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

<a id="errors-4"></a> `errors?`

</td>
<td>

[`PartialMessage`](esbuild.md#partialmessage)[]

</td>
</tr>
<tr>
<td>

<a id="external-1"></a> `external?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

<a id="namespace-5"></a> `namespace?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="path-2"></a> `path?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="plugindata-3"></a> `pluginData?`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

<a id="pluginname-2"></a> `pluginName?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="sideeffects"></a> `sideEffects?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

<a id="suffix-1"></a> `suffix?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="warnings-4"></a> `warnings?`

</td>
<td>

[`PartialMessage`](esbuild.md#partialmessage)[]

</td>
</tr>
<tr>
<td>

<a id="watchdirs-1"></a> `watchDirs?`

</td>
<td>

`string`[]

</td>
</tr>
<tr>
<td>

<a id="watchfiles-1"></a> `watchFiles?`

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

<a id="errors-5"></a> `errors?`

</td>
<td>

[`PartialMessage`](esbuild.md#partialmessage)[]

</td>
</tr>
<tr>
<td>

<a id="warnings-5"></a> `warnings?`

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

<a id="contents-1"></a> `contents`

</td>
<td>

`public`

</td>
<td>

`Uint8Array`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="hash"></a> `hash`

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

<a id="path-3"></a> `path`

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

<a id="text-2"></a> `text`

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

<a id="detail-1"></a> `detail?`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

<a id="id-1"></a> `id?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="location-3"></a> `location?`

</td>
<td>

`null` \| `Partial`\<[`Location`](esbuild.md#location)\>

</td>
</tr>
<tr>
<td>

<a id="notes-1"></a> `notes?`

</td>
<td>

[`PartialNote`](esbuild.md#partialnote)[]

</td>
</tr>
<tr>
<td>

<a id="pluginname-3"></a> `pluginName?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="text-3"></a> `text?`

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

<a id="location-4"></a> `location?`

</td>
<td>

`null` \| `Partial`\<[`Location`](esbuild.md#location)\>

</td>
</tr>
<tr>
<td>

<a id="text-4"></a> `text?`

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

<a id="name-1"></a> `name`

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

<a id="esbuild"></a> `esbuild`

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

<a id="initialoptions"></a> `initialOptions`

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

<a id="importer-1"></a> `importer?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="kind-2"></a> `kind?`

</td>
<td>

[`ImportKind`](esbuild.md#importkind)

</td>
</tr>
<tr>
<td>

<a id="namespace-6"></a> `namespace?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="plugindata-4"></a> `pluginData?`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

<a id="pluginname-4"></a> `pluginName?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="resolvedir-2"></a> `resolveDir?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="with-2"></a> `with?`

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

<a id="errors-6"></a> `errors`

</td>
<td>

[`Message`](esbuild.md#message-1)[]

</td>
</tr>
<tr>
<td>

<a id="external-2"></a> `external`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

<a id="namespace-7"></a> `namespace`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="path-4"></a> `path`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="plugindata-5"></a> `pluginData`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

<a id="sideeffects-1"></a> `sideEffects`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

<a id="suffix-2"></a> `suffix`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="warnings-6"></a> `warnings`

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

<a id="method"></a> `method`

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

<a id="path-5"></a> `path`

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

<a id="remoteaddress"></a> `remoteAddress`

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

<a id="status"></a> `status`

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

<a id="timeinms"></a> `timeInMS`

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

<a id="certfile"></a> `certfile?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="fallback"></a> `fallback?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="host"></a> `host?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="keyfile"></a> `keyfile?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="onrequest"></a> `onRequest?`

</td>
<td>

(`args`: [`ServeOnRequestArgs`](esbuild.md#serveonrequestargs)) => `void`

</td>
</tr>
<tr>
<td>

<a id="port"></a> `port?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

<a id="servedir"></a> `servedir?`

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

<a id="host-1"></a> `host`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="port-1"></a> `port`

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

<a id="contents-2"></a> `contents`

</td>
<td>

`string` \| `Uint8Array`\<`ArrayBufferLike`\>

</td>
</tr>
<tr>
<td>

<a id="loader-2"></a> `loader?`

</td>
<td>

[`Loader`](esbuild.md#loader-4)

</td>
</tr>
<tr>
<td>

<a id="resolvedir-3"></a> `resolveDir?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="sourcefile"></a> `sourcefile?`

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

<a id="errors-7"></a> `errors`

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

<a id="message-2"></a> `message`

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

<a id="name-2"></a> `name`

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

<a id="warnings-7"></a> `warnings`

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

<a id="cause-1"></a> `cause?`

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

<a id="stack-1"></a> `stack?`

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

<a id="banner-1"></a> `banner?`

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

<a id="charset-2"></a> `charset?`

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

<a id="color-4"></a> `color?`

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

<a id="define-2"></a> `define?`

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

<a id="drop-2"></a> `drop?`

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

<a id="droplabels-2"></a> `dropLabels?`

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

<a id="footer-1"></a> `footer?`

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

<a id="format-2"></a> `format?`

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

<a id="globalname-2"></a> `globalName?`

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

<a id="ignoreannotations-2"></a> `ignoreAnnotations?`

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

<a id="jsx-2"></a> `jsx?`

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

<a id="jsxdev-2"></a> `jsxDev?`

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

<a id="jsxfactory-2"></a> `jsxFactory?`

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

<a id="jsxfragment-2"></a> `jsxFragment?`

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

<a id="jsximportsource-2"></a> `jsxImportSource?`

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

<a id="jsxsideeffects-2"></a> `jsxSideEffects?`

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

<a id="keepnames-2"></a> `keepNames?`

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

<a id="legalcomments-2"></a> `legalComments?`

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

<a id="linelimit-2"></a> `lineLimit?`

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

<a id="loader-3"></a> `loader?`

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

<a id="loglevel-2"></a> `logLevel?`

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

<a id="loglimit-2"></a> `logLimit?`

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

<a id="logoverride-2"></a> `logOverride?`

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

<a id="manglecache-3"></a> `mangleCache?`

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

<a id="mangleprops-2"></a> `mangleProps?`

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

<a id="manglequoted-2"></a> `mangleQuoted?`

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

<a id="minify-2"></a> `minify?`

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

<a id="minifyidentifiers-2"></a> `minifyIdentifiers?`

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

<a id="minifysyntax-2"></a> `minifySyntax?`

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

<a id="minifywhitespace-2"></a> `minifyWhitespace?`

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

<a id="platform-2"></a> `platform?`

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

<a id="pure-2"></a> `pure?`

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

<a id="reserveprops-2"></a> `reserveProps?`

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

<a id="sourcefile-1"></a> `sourcefile?`

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

<a id="sourcemap-2"></a> `sourcemap?`

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

<a id="sourceroot-2"></a> `sourceRoot?`

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

<a id="sourcescontent-2"></a> `sourcesContent?`

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

<a id="supported-2"></a> `supported?`

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

<a id="target-2"></a> `target?`

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

<a id="treeshaking-2"></a> `treeShaking?`

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

<a id="tsconfigraw-2"></a> `tsconfigRaw?`

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

<a id="code"></a> `code`

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

<a id="legalcomments-3"></a> `legalComments`

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

<a id="manglecache-4"></a> `mangleCache`

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

<a id="map"></a> `map`

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

<a id="warnings-8"></a> `warnings`

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

<a id="compileroptions"></a> `compilerOptions?`

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
