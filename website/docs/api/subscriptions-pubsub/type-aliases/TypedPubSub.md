# Type Alias: TypedPubSub\<Engine, Map\>

> **TypedPubSub**\<`Engine`, `Map`\>: `Engine` _extends_ [`PubSubEngineV3`](../interfaces/PubSubEngineV3.md) ? `TypedPubSubV3`\<`Engine`, `Map`\> : `Engine` _extends_ [`PubSubEngineV2`](../interfaces/PubSubEngineV2.md) ? `TypedPubSubV2`\<`Engine`, `Map`\> : `never`

## Type Parameters

• **Engine** _extends_ [`PubSubEngineV2`](../interfaces/PubSubEngineV2.md) \| [`PubSubEngineV3`](../interfaces/PubSubEngineV3.md)

• **Map** _extends_ `Record`\<`string`, `any`\>
