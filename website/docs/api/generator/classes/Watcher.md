# Class: Watcher

## Constructors

### new Watcher()

> **new Watcher**(`cwd`, `options`?): [`Watcher`](Watcher.md)

#### Parameters

##### cwd

`string`

##### options?

`Options`

#### Returns

[`Watcher`](Watcher.md)

## Methods

### close()

> **close**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

---

### createSubscription()

> **createSubscription**(): `object`

#### Returns

`object`

##### unsubscribe()

> **unsubscribe**: () => `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

---

### ignore()

> **ignore**(`pattern`): `void`

#### Parameters

##### pattern

[`MatchPattern`](../../generator-sdk/type-aliases/MatchPattern.md)

#### Returns

`void`

---

### off()

> **off**(`event`, `listener`): `void`

#### Parameters

##### event

`EventType`

##### listener

[`WatcherListener`](../type-aliases/WatcherListener.md)

#### Returns

`void`

---

### on()

> **on**(`event`, `listener`): `void`

#### Parameters

##### event

`EventType`

##### listener

[`WatcherListener`](../type-aliases/WatcherListener.md)

#### Returns

`void`

---

### onEvents()

> **onEvents**(`err`, `events`): `void`

#### Parameters

##### err

`null` | `Error`

##### events

`Event`[]

#### Returns

`void`

---

### unignore()

> **unignore**(`pattern`): `void`

#### Parameters

##### pattern

[`MatchPattern`](../../generator-sdk/type-aliases/MatchPattern.md)

#### Returns

`void`
