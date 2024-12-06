# Interface: FileOptions

Options for generated files.

## Properties

### addEslintDisableHeader?

> `optional` **addEslintDisableHeader**: `boolean`

Add eslint-disable comment at the beginning of the file.

#### Default

```ts
true
```

#### Defined in

[packages/generator-sdk/lib/file.ts:18](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/file.ts#L18)

***

### addGenerationNoticeHeader?

> `optional` **addGenerationNoticeHeader**: `boolean`

Add generation notice at the beginning of the file.

#### Default

```ts
true
```

#### Defined in

[packages/generator-sdk/lib/file.ts:12](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/file.ts#L12)

***

### addHeader()?

> `optional` **addHeader**: (`name`, `content`, `tag`) => `string`

Add custom header at the beginning of the file.

#### Parameters

• **name**: `string`

• **content**: `string`

• **tag**: `string`

#### Returns

`string`

#### Defined in

[packages/generator-sdk/lib/file.ts:23](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/file.ts#L23)

***

### transformContent()?

> `optional` **transformContent**: (`name`, `content`, `tag`) => `string` \| `Promise`\<`string`\>

Edit the content of the file before writing it.

#### Parameters

• **name**: `string`

• **content**: `string`

• **tag**: `string`

#### Returns

`string` \| `Promise`\<`string`\>

#### Defined in

[packages/generator-sdk/lib/file.ts:28](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/file.ts#L28)
