# Interface: BaetaOptions

## Properties

### compiler?

> `optional` **compiler**: [`CompilerOptions`](../../../compiler/index/interfaces/CompilerOptions.md)

Configuration for the TypeScript compiler.
It uses esbuild under the hood and creates an optimized bundle.

---

### graphql

> **graphql**: [`GeneratorOptions`](../../../generator/interfaces/GeneratorOptions.md)

Configuration for the GraphQL code generator.

---

### plugins?

> `optional` **plugins**: [`Plugins`](../type-aliases/Plugins.md)

Plugins to extend Baeta's functionality.
