# Interface: BuildOptions

## Extends

- [`CommonOptions`](CommonOptions.md)

## Properties

### absWorkingDir?

> `optional` **absWorkingDir**: `string`

Documentation: https://esbuild.github.io/api/#working-directory

***

### alias?

> `optional` **alias**: `Record`\<`string`, `string`\>

Documentation: https://esbuild.github.io/api/#alias

***

### allowOverwrite?

> `optional` **allowOverwrite**: `boolean`

Documentation: https://esbuild.github.io/api/#allow-overwrite

***

### assetNames?

> `optional` **assetNames**: `string`

Documentation: https://esbuild.github.io/api/#asset-names

***

### banner?

> `optional` **banner**: `object`

Documentation: https://esbuild.github.io/api/#banner

#### Index Signature

 \[`type`: `string`\]: `string`

***

### bundle?

> `optional` **bundle**: `boolean`

Documentation: https://esbuild.github.io/api/#bundle

***

### charset?

> `optional` **charset**: [`Charset`](../type-aliases/Charset.md)

Documentation: https://esbuild.github.io/api/#charset

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`charset`](CommonOptions.md#charset)

***

### chunkNames?

> `optional` **chunkNames**: `string`

Documentation: https://esbuild.github.io/api/#chunk-names

***

### color?

> `optional` **color**: `boolean`

Documentation: https://esbuild.github.io/api/#color

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`color`](CommonOptions.md#color)

***

### conditions?

> `optional` **conditions**: `string`[]

Documentation: https://esbuild.github.io/api/#conditions

***

### define?

> `optional` **define**: `object`

Documentation: https://esbuild.github.io/api/#define

#### Index Signature

 \[`key`: `string`\]: `string`

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`define`](CommonOptions.md#define)

***

### drop?

> `optional` **drop**: [`Drop`](../type-aliases/Drop.md)[]

Documentation: https://esbuild.github.io/api/#drop

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`drop`](CommonOptions.md#drop)

***

### dropLabels?

> `optional` **dropLabels**: `string`[]

Documentation: https://esbuild.github.io/api/#drop-labels

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`dropLabels`](CommonOptions.md#droplabels)

***

### entryNames?

> `optional` **entryNames**: `string`

Documentation: https://esbuild.github.io/api/#entry-names

***

### entryPoints?

> `optional` **entryPoints**: `string`[] \| `Record`\<`string`, `string`\> \| `object`[]

Documentation: https://esbuild.github.io/api/#entry-points

***

### external?

> `optional` **external**: `string`[]

Documentation: https://esbuild.github.io/api/#external

***

### footer?

> `optional` **footer**: `object`

Documentation: https://esbuild.github.io/api/#footer

#### Index Signature

 \[`type`: `string`\]: `string`

***

### format?

> `optional` **format**: [`Format`](../type-aliases/Format.md)

Documentation: https://esbuild.github.io/api/#format

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`format`](CommonOptions.md#format)

***

### globalName?

> `optional` **globalName**: `string`

Documentation: https://esbuild.github.io/api/#global-name

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`globalName`](CommonOptions.md#globalname)

***

### ignoreAnnotations?

> `optional` **ignoreAnnotations**: `boolean`

Documentation: https://esbuild.github.io/api/#ignore-annotations

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`ignoreAnnotations`](CommonOptions.md#ignoreannotations)

***

### inject?

> `optional` **inject**: `string`[]

Documentation: https://esbuild.github.io/api/#inject

***

### jsx?

> `optional` **jsx**: `"transform"` \| `"preserve"` \| `"automatic"`

Documentation: https://esbuild.github.io/api/#jsx

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`jsx`](CommonOptions.md#jsx)

***

### jsxDev?

> `optional` **jsxDev**: `boolean`

Documentation: https://esbuild.github.io/api/#jsx-development

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`jsxDev`](CommonOptions.md#jsxdev)

***

### jsxFactory?

> `optional` **jsxFactory**: `string`

Documentation: https://esbuild.github.io/api/#jsx-factory

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`jsxFactory`](CommonOptions.md#jsxfactory)

***

### jsxFragment?

> `optional` **jsxFragment**: `string`

Documentation: https://esbuild.github.io/api/#jsx-fragment

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`jsxFragment`](CommonOptions.md#jsxfragment)

***

### jsxImportSource?

> `optional` **jsxImportSource**: `string`

Documentation: https://esbuild.github.io/api/#jsx-import-source

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`jsxImportSource`](CommonOptions.md#jsximportsource)

***

### jsxSideEffects?

> `optional` **jsxSideEffects**: `boolean`

Documentation: https://esbuild.github.io/api/#jsx-side-effects

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`jsxSideEffects`](CommonOptions.md#jsxsideeffects)

***

### keepNames?

> `optional` **keepNames**: `boolean`

Documentation: https://esbuild.github.io/api/#keep-names

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`keepNames`](CommonOptions.md#keepnames)

***

### legalComments?

> `optional` **legalComments**: `"external"` \| `"linked"` \| `"inline"` \| `"none"` \| `"eof"`

Documentation: https://esbuild.github.io/api/#legal-comments

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`legalComments`](CommonOptions.md#legalcomments)

***

### lineLimit?

> `optional` **lineLimit**: `number`

Documentation: https://esbuild.github.io/api/#line-limit

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`lineLimit`](CommonOptions.md#linelimit)

***

### loader?

> `optional` **loader**: `object`

Documentation: https://esbuild.github.io/api/#loader

#### Index Signature

 \[`ext`: `string`\]: [`Loader`](../type-aliases/Loader.md)

***

### logLevel?

> `optional` **logLevel**: [`LogLevel`](../type-aliases/LogLevel.md)

Documentation: https://esbuild.github.io/api/#log-level

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`logLevel`](CommonOptions.md#loglevel)

***

### logLimit?

> `optional` **logLimit**: `number`

Documentation: https://esbuild.github.io/api/#log-limit

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`logLimit`](CommonOptions.md#loglimit)

***

### logOverride?

> `optional` **logOverride**: `Record`\<`string`, [`LogLevel`](../type-aliases/LogLevel.md)\>

Documentation: https://esbuild.github.io/api/#log-override

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`logOverride`](CommonOptions.md#logoverride)

***

### mainFields?

> `optional` **mainFields**: `string`[]

Documentation: https://esbuild.github.io/api/#main-fields

***

### mangleCache?

> `optional` **mangleCache**: `Record`\<`string`, `string` \| `false`\>

Documentation: https://esbuild.github.io/api/#mangle-props

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`mangleCache`](CommonOptions.md#manglecache)

***

### mangleProps?

> `optional` **mangleProps**: `RegExp`

Documentation: https://esbuild.github.io/api/#mangle-props

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`mangleProps`](CommonOptions.md#mangleprops)

***

### mangleQuoted?

> `optional` **mangleQuoted**: `boolean`

Documentation: https://esbuild.github.io/api/#mangle-props

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`mangleQuoted`](CommonOptions.md#manglequoted)

***

### metafile?

> `optional` **metafile**: `boolean`

Documentation: https://esbuild.github.io/api/#metafile

***

### minify?

> `optional` **minify**: `boolean`

Documentation: https://esbuild.github.io/api/#minify

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`minify`](CommonOptions.md#minify)

***

### minifyIdentifiers?

> `optional` **minifyIdentifiers**: `boolean`

Documentation: https://esbuild.github.io/api/#minify

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`minifyIdentifiers`](CommonOptions.md#minifyidentifiers)

***

### minifySyntax?

> `optional` **minifySyntax**: `boolean`

Documentation: https://esbuild.github.io/api/#minify

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`minifySyntax`](CommonOptions.md#minifysyntax)

***

### minifyWhitespace?

> `optional` **minifyWhitespace**: `boolean`

Documentation: https://esbuild.github.io/api/#minify

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`minifyWhitespace`](CommonOptions.md#minifywhitespace)

***

### nodePaths?

> `optional` **nodePaths**: `string`[]

Documentation: https://esbuild.github.io/api/#node-paths

***

### outbase?

> `optional` **outbase**: `string`

Documentation: https://esbuild.github.io/api/#outbase

***

### outdir?

> `optional` **outdir**: `string`

Documentation: https://esbuild.github.io/api/#outdir

***

### outExtension?

> `optional` **outExtension**: `object`

Documentation: https://esbuild.github.io/api/#out-extension

#### Index Signature

 \[`ext`: `string`\]: `string`

***

### outfile?

> `optional` **outfile**: `string`

Documentation: https://esbuild.github.io/api/#outfile

***

### packages?

> `optional` **packages**: `"bundle"` \| `"external"`

Documentation: https://esbuild.github.io/api/#packages

***

### platform?

> `optional` **platform**: [`Platform`](../type-aliases/Platform.md)

Documentation: https://esbuild.github.io/api/#platform

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`platform`](CommonOptions.md#platform)

***

### plugins?

> `optional` **plugins**: [`Plugin`](Plugin.md)[]

Documentation: https://esbuild.github.io/plugins/

***

### preserveSymlinks?

> `optional` **preserveSymlinks**: `boolean`

Documentation: https://esbuild.github.io/api/#preserve-symlinks

***

### publicPath?

> `optional` **publicPath**: `string`

Documentation: https://esbuild.github.io/api/#public-path

***

### pure?

> `optional` **pure**: `string`[]

Documentation: https://esbuild.github.io/api/#pure

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`pure`](CommonOptions.md#pure)

***

### reserveProps?

> `optional` **reserveProps**: `RegExp`

Documentation: https://esbuild.github.io/api/#mangle-props

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`reserveProps`](CommonOptions.md#reserveprops)

***

### resolveExtensions?

> `optional` **resolveExtensions**: `string`[]

Documentation: https://esbuild.github.io/api/#resolve-extensions

***

### sourcemap?

> `optional` **sourcemap**: `boolean` \| `"external"` \| `"linked"` \| `"inline"` \| `"both"`

Documentation: https://esbuild.github.io/api/#sourcemap

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`sourcemap`](CommonOptions.md#sourcemap)

***

### sourceRoot?

> `optional` **sourceRoot**: `string`

Documentation: https://esbuild.github.io/api/#source-root

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`sourceRoot`](CommonOptions.md#sourceroot)

***

### sourcesContent?

> `optional` **sourcesContent**: `boolean`

Documentation: https://esbuild.github.io/api/#sources-content

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`sourcesContent`](CommonOptions.md#sourcescontent)

***

### splitting?

> `optional` **splitting**: `boolean`

Documentation: https://esbuild.github.io/api/#splitting

***

### stdin?

> `optional` **stdin**: [`StdinOptions`](StdinOptions.md)

Documentation: https://esbuild.github.io/api/#stdin

***

### supported?

> `optional` **supported**: `Record`\<`string`, `boolean`\>

Documentation: https://esbuild.github.io/api/#supported

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`supported`](CommonOptions.md#supported)

***

### target?

> `optional` **target**: `string` \| `string`[]

Documentation: https://esbuild.github.io/api/#target

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`target`](CommonOptions.md#target)

***

### treeShaking?

> `optional` **treeShaking**: `boolean`

Documentation: https://esbuild.github.io/api/#tree-shaking

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`treeShaking`](CommonOptions.md#treeshaking)

***

### tsconfig?

> `optional` **tsconfig**: `string`

Documentation: https://esbuild.github.io/api/#tsconfig

***

### tsconfigRaw?

> `optional` **tsconfigRaw**: `string` \| [`TsconfigRaw`](TsconfigRaw.md)

Documentation: https://esbuild.github.io/api/#tsconfig-raw

#### Inherited from

[`CommonOptions`](CommonOptions.md).[`tsconfigRaw`](CommonOptions.md#tsconfigraw)

***

### write?

> `optional` **write**: `boolean`

Documentation: https://esbuild.github.io/api/#write
