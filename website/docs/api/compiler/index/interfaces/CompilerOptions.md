# Interface: CompilerOptions

## Properties

### bundleDeps?

> `optional` **bundleDeps**: `boolean`

If true the bundle will also include all dependencies

#### Default

```ts
false;
```

---

### bundleWorkspaces?

> `optional` **bundleWorkspaces**: `boolean`

If true the bundle will also include all workspace dependencies.

#### Default

```ts
true; // in watch mode
```

#### Default

```ts
false; // in build mode
```

---

### cjsGlobals?

> `optional` **cjsGlobals**: `boolean`

Adds CommonJS global variables within esm bundle like:

- `__dirname` - Corresponds to the directory of the generated bundle file
- `__filename` - Corresponds to the file path of the generated bundle file
- `require` - Corresponds to the Node.js synchronous function to import modules

#### Default

```ts
false;
```

---

### dist

> **dist**: `string`

The output directory

#### Example

```ts
dist: "dist";
```

---

### esbuild?

> `optional` **esbuild**: `Partial`\<`Omit`\<[`BuildOptions`](../../esbuild/interfaces/BuildOptions.md), `"outdir"` \| `"entryPoints"`\>\>

Options to pass to esbuild

---

### src

> **src**: `string` \| `string`[]

The source file or files to compile

#### Example

```ts
src: "src/index.ts";
```
