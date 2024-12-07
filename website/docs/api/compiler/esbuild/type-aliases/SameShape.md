# Type Alias: SameShape\<Out, In\>

> **SameShape**\<`Out`, `In`\>: `In` & `{ [Key in Exclude<keyof In, keyof Out>]: never }`

## Type Parameters

• **Out**

• **In** *extends* `Out`
