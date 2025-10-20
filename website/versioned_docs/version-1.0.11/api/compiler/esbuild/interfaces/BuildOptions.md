# BuildOptions

## Extends

- [`CommonOptions`](CommonOptions.md)

## Properties

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

[`Charset`](../type-aliases/Charset.md)

</td>
<td>

Documentation: https://esbuild.github.io/api/#charset

</td>
<td>

[`CommonOptions`](CommonOptions.md).[`charset`](CommonOptions.md#charset)

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

<a id="color"></a> `color?`

</td>
<td>

`boolean`

</td>
<td>

Documentation: https://esbuild.github.io/api/#color

</td>
<td>

[`CommonOptions`](CommonOptions.md).[`color`](CommonOptions.md#color)

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

[`CommonOptions`](CommonOptions.md).[`define`](CommonOptions.md#define)

</td>
</tr>
<tr>
<td>

<a id="drop"></a> `drop?`

</td>
<td>

[`Drop`](../type-aliases/Drop.md)[]

</td>
<td>

Documentation: https://esbuild.github.io/api/#drop

</td>
<td>

[`CommonOptions`](CommonOptions.md).[`drop`](CommonOptions.md#drop)

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

[`CommonOptions`](CommonOptions.md).[`dropLabels`](CommonOptions.md#droplabels)

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

[`Format`](../type-aliases/Format.md)

</td>
<td>

Documentation: https://esbuild.github.io/api/#format

</td>
<td>

[`CommonOptions`](CommonOptions.md).[`format`](CommonOptions.md#format)

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

[`CommonOptions`](CommonOptions.md).[`globalName`](CommonOptions.md#globalname)

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

[`CommonOptions`](CommonOptions.md).[`ignoreAnnotations`](CommonOptions.md#ignoreannotations)

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

[`CommonOptions`](CommonOptions.md).[`jsx`](CommonOptions.md#jsx)

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

[`CommonOptions`](CommonOptions.md).[`jsxDev`](CommonOptions.md#jsxdev)

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

[`CommonOptions`](CommonOptions.md).[`jsxFactory`](CommonOptions.md#jsxfactory)

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

[`CommonOptions`](CommonOptions.md).[`jsxFragment`](CommonOptions.md#jsxfragment)

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

[`CommonOptions`](CommonOptions.md).[`jsxImportSource`](CommonOptions.md#jsximportsource)

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

[`CommonOptions`](CommonOptions.md).[`jsxSideEffects`](CommonOptions.md#jsxsideeffects)

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

[`CommonOptions`](CommonOptions.md).[`keepNames`](CommonOptions.md#keepnames)

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

[`CommonOptions`](CommonOptions.md).[`legalComments`](CommonOptions.md#legalcomments)

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

[`CommonOptions`](CommonOptions.md).[`lineLimit`](CommonOptions.md#linelimit)

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

[`LogLevel`](../type-aliases/LogLevel.md)

</td>
<td>

Documentation: https://esbuild.github.io/api/#log-level

</td>
<td>

[`CommonOptions`](CommonOptions.md).[`logLevel`](CommonOptions.md#loglevel)

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

[`CommonOptions`](CommonOptions.md).[`logLimit`](CommonOptions.md#loglimit)

</td>
</tr>
<tr>
<td>

<a id="logoverride"></a> `logOverride?`

</td>
<td>

`Record`\<`string`, [`LogLevel`](../type-aliases/LogLevel.md)\>

</td>
<td>

Documentation: https://esbuild.github.io/api/#log-override

</td>
<td>

[`CommonOptions`](CommonOptions.md).[`logOverride`](CommonOptions.md#logoverride)

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

[`CommonOptions`](CommonOptions.md).[`mangleCache`](CommonOptions.md#manglecache)

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

[`CommonOptions`](CommonOptions.md).[`mangleProps`](CommonOptions.md#mangleprops)

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

[`CommonOptions`](CommonOptions.md).[`mangleQuoted`](CommonOptions.md#manglequoted)

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

[`CommonOptions`](CommonOptions.md).[`minify`](CommonOptions.md#minify)

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

[`CommonOptions`](CommonOptions.md).[`minifyIdentifiers`](CommonOptions.md#minifyidentifiers)

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

[`CommonOptions`](CommonOptions.md).[`minifySyntax`](CommonOptions.md#minifysyntax)

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

[`CommonOptions`](CommonOptions.md).[`minifyWhitespace`](CommonOptions.md#minifywhitespace)

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

[`Platform`](../type-aliases/Platform.md)

</td>
<td>

Documentation: https://esbuild.github.io/api/#platform

</td>
<td>

[`CommonOptions`](CommonOptions.md).[`platform`](CommonOptions.md#platform)

</td>
</tr>
<tr>
<td>

<a id="plugins"></a> `plugins?`

</td>
<td>

[`Plugin`](Plugin.md)[]

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

[`CommonOptions`](CommonOptions.md).[`pure`](CommonOptions.md#pure)

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

[`CommonOptions`](CommonOptions.md).[`reserveProps`](CommonOptions.md#reserveprops)

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

[`CommonOptions`](CommonOptions.md).[`sourcemap`](CommonOptions.md#sourcemap)

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

[`CommonOptions`](CommonOptions.md).[`sourceRoot`](CommonOptions.md#sourceroot)

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

[`CommonOptions`](CommonOptions.md).[`sourcesContent`](CommonOptions.md#sourcescontent)

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

[`StdinOptions`](StdinOptions.md)

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

[`CommonOptions`](CommonOptions.md).[`supported`](CommonOptions.md#supported)

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

[`CommonOptions`](CommonOptions.md).[`target`](CommonOptions.md#target)

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

[`CommonOptions`](CommonOptions.md).[`treeShaking`](CommonOptions.md#treeshaking)

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

`string` \| [`TsconfigRaw`](TsconfigRaw.md)

</td>
<td>

Documentation: https://esbuild.github.io/api/#tsconfig-raw

</td>
<td>

[`CommonOptions`](CommonOptions.md).[`tsconfigRaw`](CommonOptions.md#tsconfigraw)

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
