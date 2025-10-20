# createContextStore()

> **createContextStore**\<`Result`, `Context`\>(`key`, `options?`): readonly \[(`ctx`) => `Promise`\<`Result`\>, (`ctx`, `loader`) => `void`\]

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

readonly \[(`ctx`) => `Promise`\<`Result`\>, (`ctx`, `loader`) => `void`\]

A tuple containing get and load functions for managing the stored value

## Example

```typescript
// Create a store for user data
const userStoreKey = Symbol("userStore");
const [getUser, setUserLoader] = createContextStore<User>(userStoreKey, {
  lazy: true,
});

// Set the loader function after creating the context object
setUserLoader(ctx, async () => {
  return fetchUser(userId);
});

// Later, retrieve the user in a resolver
const user = await getUser(ctx);
```
