# @baeta/plugin-prisma

## Interfaces

### PrismaPluginOptions

Configuration options for the Prisma plugin

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`generatedSchemaPath`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

Path to the generated schema file for comparison
Used to avoid unnecessary regeneration

**Example**

```ts
"node_modules/@prisma/client/schema.prisma";
```

</td>
</tr>
<tr>
<td>

`prismaSchema`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

Path to the Prisma schema file

**Example**

```ts
"prisma/schema.prisma";
```

</td>
</tr>
<tr>
<td>

`generateClient?`

</td>
<td>

`boolean`

</td>
<td>

```ts
true;
```

</td>
<td>

Whether to generate the Prisma client

</td>
</tr>
<tr>
<td>

`generateCommand?`

</td>
<td>

`string`

</td>
<td>

```ts
"prisma generate";
```

</td>
<td>

Custom command to generate Prisma client

</td>
</tr>
</tbody>
</table>

## Functions

### prismaPlugin()

> **prismaPlugin**(`options`): [`GeneratorPluginV1`](../generator/index.md#generatorpluginv1store)\<`unknown`\>[]

A plugin that manages Prisma client generation in your Baeta project.
See https://baeta.io/docs/plugins/prisma

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`PrismaPluginOptions`](index.md#prismapluginoptions)

</td>
<td>

Configuration options for the pagination plugin

</td>
</tr>
</tbody>
</table>

#### Returns

[`GeneratorPluginV1`](../generator/index.md#generatorpluginv1store)\<`unknown`\>[]

A Baeta generator plugin

## References

### default

Renames and re-exports [prismaPlugin](index.md#prismaplugin)