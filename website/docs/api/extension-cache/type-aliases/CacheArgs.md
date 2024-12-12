# Type Alias: CacheArgs\<T\>

> **CacheArgs**\<`T`\>: `{ [P in keyof T]?: T[P] extends object ? CacheArgs<T[P]> : T[P] }`

Optional query arguments

## Type Parameters

• **T**
