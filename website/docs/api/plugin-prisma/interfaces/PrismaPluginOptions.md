# Interface: PrismaPluginOptions

Configuration options for the Prisma plugin

## Properties

### generatedSchemaPath

> **generatedSchemaPath**: `string`

Path to the generated schema file for comparison
Used to avoid unnecessary regeneration

#### Example

```ts
"node_modules/@prisma/client/schema.prisma";
```

---

### prismaSchema

> **prismaSchema**: `string`

Path to the Prisma schema file

#### Example

```ts
"prisma/schema.prisma";
```

---

### generateClient?

> `optional` **generateClient**: `boolean`

Whether to generate the Prisma client

#### Default

```ts
true;
```

---

### generateCommand?

> `optional` **generateCommand**: `string`

Custom command to generate Prisma client

#### Default

```ts
"prisma generate";
```
