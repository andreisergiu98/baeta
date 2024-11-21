# Class: Watcher

## Constructors

### new Watcher()

> **new Watcher**(`cwd`, `options`?): [`Watcher`](Watcher.md)

#### Parameters

• **cwd**: `string`

• **options?**: `Options`

#### Returns

[`Watcher`](Watcher.md)

#### Defined in

[generator-sdk/lib/watcher.ts:33](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/watcher.ts#L33)

## Methods

### close()

> **close**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[generator-sdk/lib/watcher.ts:91](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/watcher.ts#L91)

***

### createSubscription()

> **createSubscription**(): `object`

#### Returns

`object`

##### unsubscribe()

> **unsubscribe**: () => `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

#### Defined in

[generator-sdk/lib/watcher.ts:78](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/watcher.ts#L78)

***

### ignore()

> **ignore**(`pattern`): `void`

#### Parameters

• **pattern**: `MatchPattern`

#### Returns

`void`

#### Defined in

[generator-sdk/lib/watcher.ts:70](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/watcher.ts#L70)

***

### off()

> **off**(`event`, `listener`): `void`

#### Parameters

• **event**: `EventType`

• **listener**: [`WatcherListener`](../type-aliases/WatcherListener.md)

#### Returns

`void`

#### Defined in

[generator-sdk/lib/watcher.ts:66](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/watcher.ts#L66)

***

### on()

> **on**(`event`, `listener`): `void`

#### Parameters

• **event**: `EventType`

• **listener**: [`WatcherListener`](../type-aliases/WatcherListener.md)

#### Returns

`void`

#### Defined in

[generator-sdk/lib/watcher.ts:62](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/watcher.ts#L62)

***

### onEvents()

> **onEvents**(`err`, `events`): `void`

#### Parameters

• **err**: `null` \| `Error`

• **events**: `Event`[]

#### Returns

`void`

#### Defined in

[generator-sdk/lib/watcher.ts:41](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/watcher.ts#L41)

***

### unignore()

> **unignore**(`pattern`): `void`

#### Parameters

• **pattern**: `MatchPattern`

#### Returns

`void`

#### Defined in

[generator-sdk/lib/watcher.ts:74](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/watcher.ts#L74)
