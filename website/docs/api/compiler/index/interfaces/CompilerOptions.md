# Interface: CompilerOptions

## Properties

### bundleDeps?

> `optional` **bundleDeps**: `boolean`

If true the bundle will also include all dependencies

#### Default

```ts
false
```

#### Defined in

[packages/compiler/lib/esbuild-config.ts:22](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/compiler/lib/esbuild-config.ts#L22)

***

### bundleWorkspaces?

> `optional` **bundleWorkspaces**: `boolean`

If true the bundle will also include all workspace dependencies.

#### Default

```ts
true // in watch mode
```

#### Default

```ts
false // in build mode
```

#### Defined in

[packages/compiler/lib/esbuild-config.ts:29](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/compiler/lib/esbuild-config.ts#L29)

***

### cjsGlobals?

> `optional` **cjsGlobals**: `boolean`

Adds CommonJS global variables within esm bundle like:
- `__dirname` - Corresponds to the directory of the generated bundle file
- `__filename` - Corresponds to the file path of the generated bundle file
- `require` - Corresponds to the Node.js synchronous function to import modules

#### Default

```ts
false
```

#### Defined in

[packages/compiler/lib/esbuild-config.ts:38](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/compiler/lib/esbuild-config.ts#L38)

***

### dist

> **dist**: `string`

The output directory

#### Example

```ts
dist: 'dist'
```

#### Defined in

[packages/compiler/lib/esbuild-config.ts:16](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/compiler/lib/esbuild-config.ts#L16)

***

### esbuild?

> `optional` **esbuild**: `Partial`\<`Omit`\<[`BuildOptions`](../../esbuild/interfaces/BuildOptions.md), `"outdir"` \| `"entryPoints"`\>\>

Options to pass to esbuild

#### Defined in

[packages/compiler/lib/esbuild-config.ts:43](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/compiler/lib/esbuild-config.ts#L43)

***

### src

> **src**: `string` \| `string`[]

The source file or files to compile

#### Example

```ts
src: 'src/index.ts'
```

#### Defined in

[packages/compiler/lib/esbuild-config.ts:10](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/compiler/lib/esbuild-config.ts#L10)
