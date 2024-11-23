# Type Alias: Publish()\<Map\>

> **Publish**\<`Map`\>: \<`C`, `P`\>(`topic`, `payload`) => `Promise`\<`void`\>

## Type Parameters

• **Map** *extends* `DefaultPubSubMap`

## Type Parameters

• **C** *extends* keyof `Map`

• **P** *extends* `Map`\[`C`\]

## Parameters

• **topic**: `C`

• **payload**: `P`

## Returns

`Promise`\<`void`\>

## Defined in

[lib/subscription.ts:8](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/subscriptions-cloudflare/lib/subscription.ts#L8)
