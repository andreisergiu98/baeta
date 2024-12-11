# Class: FileManager

## Constructors

### new FileManager()

> **new FileManager**(`fileOptions`?): [`FileManager`](FileManager.md)

#### Parameters

##### fileOptions?

[`FileOptions`](../interfaces/FileOptions.md)

#### Returns

[`FileManager`](FileManager.md)

## Properties

### files

> **files**: [`File`](File.md)[] = `[]`

---

### fileOptions?

> `optional` **fileOptions**: [`FileOptions`](../interfaces/FileOptions.md)

## Methods

### add()

> **add**(...`file`): `void`

#### Parameters

##### file

...[`File`](File.md)[]

#### Returns

`void`

---

### createAndAdd()

> **createAndAdd**(`filename`, `content`, `tag`): [`File`](File.md)

#### Parameters

##### filename

`string`

##### content

`string`

##### tag

`string`

#### Returns

[`File`](File.md)

---

### get()

> **get**(`filename`): `undefined` \| [`File`](File.md)

#### Parameters

##### filename

`string`

#### Returns

`undefined` \| [`File`](File.md)

---

### getAll()

> **getAll**(): [`File`](File.md)[]

#### Returns

[`File`](File.md)[]

---

### getByTag()

> **getByTag**(`tag`): [`File`](File.md)[]

#### Parameters

##### tag

`string`

#### Returns

[`File`](File.md)[]

---

### getPersistedFiles()

> **getPersistedFiles**(): [`File`](File.md)[]

#### Returns

[`File`](File.md)[]

---

### remove()

> **remove**(`filename`): `void`

#### Parameters

##### filename

`string`

#### Returns

`void`

---

### removeAll()

> **removeAll**(): `void`

#### Returns

`void`

---

### removeByTag()

> **removeByTag**(`tag`): `void`

#### Parameters

##### tag

`string`

#### Returns

`void`

---

### unlinkAll()

> **unlinkAll**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

---

### writeAll()

> **writeAll**(): `Promise`\<`void`[]\>

#### Returns

`Promise`\<`void`[]\>

---

### writeByTag()

> **writeByTag**(`tag`): `Promise`\<`void`[]\>

#### Parameters

##### tag

`string`

#### Returns

`Promise`\<`void`[]\>
