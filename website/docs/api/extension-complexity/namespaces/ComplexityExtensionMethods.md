# ComplexityExtensionMethods

## Interfaces

### ModuleExtensions

---

### ResolverExtensions\<Result, Root, Context, Args\>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Result`

</td>
</tr>
<tr>
<td>

`Root`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Args`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`$complexity`

</td>
<td>

(`fn`: [`GetFieldSettings`](../index.md#getfieldsettingscontext-args)\<`Context`, `Args`\>) => `void`

</td>
<td>

Configures complexity calculation for a type field.

**Example**

```typescript
Query.users.$complexity(({ args }) => ({
  complexity: 1,
  multiplier: args.limit || 10,
}));

// Disable complexity calculation
Query.simple.$complexity(() => false);
```

</td>
</tr>
</tbody>
</table>

---

### SubscriptionExtensions\<Root, Context, Args\>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Root`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Args`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`$complexity`

</td>
<td>

(`fn`: [`GetFieldSettings`](../index.md#getfieldsettingscontext-args)\<`Context`, `Args`\>) => `void`

</td>
<td>

Configures complexity calculation for subscription fields.

**Example**

```typescript
Subscription.userUpdates.$complexity(({ args }) => ({
  complexity: 5,
  multiplier: args.batchSize || 1,
}));
```

</td>
</tr>
</tbody>
</table>

---

### SubscriptionResolveExtensions\<Result, Root, Context, Args\>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Result`

</td>
</tr>
<tr>
<td>

`Root`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Args`

</td>
</tr>
</tbody>
</table>

---

### SubscriptionSubscribeExtensions\<Root, Context, Args\>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Root`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Args`

</td>
</tr>
</tbody>
</table>

---

### TypeExtensions\<Root, Context\>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Root`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`$complexity`

</td>
<td>

(`fn`: [`GetFieldSettings`](../index.md#getfieldsettingscontext-args)\<`Context`, `unknown`\>) => `void`

</td>
<td>

Configures complexity calculation for all fields of a type.

**Example**

```typescript
User.$complexity(() => ({
  complexity: 2, // Higher base complexity for all User fields
  multiplier: 5,
}));
```

</td>
</tr>
</tbody>
</table>
