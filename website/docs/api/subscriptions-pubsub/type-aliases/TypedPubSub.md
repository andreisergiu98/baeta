# Type Alias: TypedPubSub\<Engine, Map\>

> **TypedPubSub**\<`Engine`, `Map`\>: `Engine` *extends* `PubSubEngineV3` ? `TypedPubSubV3`\<`Engine`, `Map`\> : `Engine` *extends* `PubSubEngineV2` ? `TypedPubSubV2`\<`Engine`, `Map`\> : `never`

## Type Parameters

• **Engine** *extends* `PubSubEngineV2` \| `PubSubEngineV3`

• **Map** *extends* `PubSubMap`

## Defined in

[typed-pubsub.ts:125](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/subscriptions-pubsub/lib/typed-pubsub.ts#L125)
