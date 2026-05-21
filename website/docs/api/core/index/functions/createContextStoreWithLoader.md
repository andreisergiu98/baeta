# createContextStoreWithLoader()

> **createContextStoreWithLoader**\<`Result`, `Context`, `Args`\>(`key`, `loader`, `options?`): readonly \[(`ctx`) => `Promise`\<`Result`\>, (`ctx`, ...`args`) => `void`\]

Creates a context store for managing asynchronous values within the context object.
See https://baeta.io/docs/guides/context-store

## Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Result`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`Context`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`Args` *extends* `unknown`[]

</td>
<td>

`unknown`[]

</td>
</tr>
</tbody>
</table>

## Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`key`

</td>
<td>

`symbol`

</td>
<td>

A unique symbol to identify the stored value in the context

</td>
</tr>
<tr>
<td>

`loader`

</td>
<td>

(`ctx`, ...`args`) => `Result` \| `PromiseLike`\<`Result`\>

</td>
<td>

A function that returns the value for the store

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`ContextStoreOptions`](../interfaces/ContextStoreOptions.md)

</td>
<td>

Configuration options for the store

</td>
</tr>
</tbody>
</table>

## Returns

readonly \[(`ctx`) => `Promise`\<`Result`\>, (`ctx`, ...`args`) => `void`\]

A tuple containing get and load functions for managing the stored value

## Example

```typescript
// Create a store for user data
const userStoreKey = Symbol('userStore');
const [getUser, initUserStore] = createContextStoreWithLoader(userStoreKey, (userId: string) => { return fetchUser(userId); }, { lazy: true });

// Initialize the store when you create the context
initUserStore(ctx, userId);

// Later, retrieve the user in a resolver
const user = await getUser(ctx);
```
