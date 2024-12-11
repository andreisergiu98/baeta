# Function: createExtensions()

> **createExtensions**(...`extensions`): () => [`Extension`](../../sdk/classes/Extension.md)[]

Creates a collection of Baeta extensions to be used in modules.
The result must be exported as default, and the file path registered in `baeta.ts`.
See https://baeta.io/docs/extensions/

## Parameters

### extensions

...() => [`Extension`](../../sdk/classes/Extension.md)[]

Array of extension factory functions

## Returns

() => [`Extension`](../../sdk/classes/Extension.md)[]

Array of extension factory functions that can be used by Baeta modules

## Example

```typescript
// auth-extension.ts
export const authExt = authExtension(...);

// cache-extension.ts
export const cacheExt = cacheExtension(...);

// extensions.ts
import { createExtensions } from '@baeta/core';
import { authExt } from './auth-extension.ts';
import { cacheExt } from './cache-extension.ts';

export default createExtensions(authExt, cacheExt);
```

## Remarks

Extensions are executed in the order they are provided.
