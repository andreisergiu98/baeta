# Type Alias: TypedPubSub\<Engine, Map\>

> **TypedPubSub**\<`Engine`, `Map`\>: `Engine` *extends* `PubSubEngineV3` ? `TypedPubSubV3`\<`Engine`, `Map`\> : `Engine` *extends* `PubSubEngineV2` ? `TypedPubSubV2`\<`Engine`, `Map`\> : `never`

## Type Parameters

• **Engine** *extends* `PubSubEngineV2` \| `PubSubEngineV3`

• **Map** *extends* `PubSubMap`

## Defined in

[typed-pubsub.ts:125](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/subscriptions-pubsub/lib/typed-pubsub.ts#L125)
