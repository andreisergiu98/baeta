# Interface: FileOptions

Options for generated files.

## Properties

### addEslintDisableHeader?

> `optional` **addEslintDisableHeader**: `boolean`

Add eslint-disable comment at the beginning of the file.

#### Default

```ts
true;
```

---

### addGenerationNoticeHeader?

> `optional` **addGenerationNoticeHeader**: `boolean`

Add generation notice at the beginning of the file.

#### Default

```ts
true;
```

---

### addHeader()?

> `optional` **addHeader**: (`name`, `content`, `tag`) => `string`

Add custom header at the beginning of the file.

#### Parameters

##### name

`string`

##### content

`string`

##### tag

`string`

#### Returns

`string`

---

### transformContent()?

> `optional` **transformContent**: (`name`, `content`, `tag`) => `string` \| `Promise`\<`string`\>

Edit the content of the file before writing it.

#### Parameters

##### name

`string`

##### content

`string`

##### tag

`string`

#### Returns

`string` \| `Promise`\<`string`\>
