# Class: WatcherIgnore

## Constructors

### new WatcherIgnore()

> **new WatcherIgnore**(`cwd`): [`WatcherIgnore`](WatcherIgnore.md)

#### Parameters

##### cwd

`string`

#### Returns

[`WatcherIgnore`](WatcherIgnore.md)

## Methods

### ignore()

> **ignore**(`pattern`): `void`

#### Parameters

##### pattern

[`MatchPattern`](../type-aliases/MatchPattern.md)

#### Returns

`void`

---

### isIgnored()

> **isIgnored**(`path`): `boolean`

#### Parameters

##### path

`string`

#### Returns

`boolean`

---

### isMicromatch()

> **isMicromatch**(`pattern`): `boolean`

#### Parameters

##### pattern

`string`

#### Returns

`boolean`

---

### resolveFile()

> **resolveFile**(`file`): `string`

#### Parameters

##### file

`string`

#### Returns

`string`

---

### unignore()

> **unignore**(`pattern`): `void`

#### Parameters

##### pattern

[`MatchPattern`](../type-aliases/MatchPattern.md)

#### Returns

`void`
