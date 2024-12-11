# Interface: AutoloadPluginOptions

## Properties

### modules?

> `optional` **modules**: `boolean` \| [`AutoloadModuleOptions`](AutoloadModuleOptions.md)

Configuration for module autoloading. Set to false to disable

---

### output?

> `optional` **output**: `string`

Output path for the generated autoload file

#### Default

```ts
`${modulesDir}/autoload.ts`;
```

---

### resolvers?

> `optional` **resolvers**: `boolean` \| [`AutoloadResolverOptions`](AutoloadResolverOptions.md)

Configuration for resolver autoloading. Set to false to disable
