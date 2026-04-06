# SubscriptionBuilder\<Result, Source, Context, Args, Info\>

## Type Parameters

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

`Source`

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
<tr>
<td>

`Info`

</td>
</tr>
</tbody>
</table>

## Constructors

### Constructor

> **new SubscriptionBuilder**\<`Result`, `Source`, `Context`, `Args`, `Info`\>(`options`): `SubscriptionBuilder`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`SubscriptionBuilderOptions`](../interfaces/SubscriptionBuilderOptions.md)\<`Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`SubscriptionBuilder`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

## Accessors

### field

#### Get Signature

> **get** **field**(): `string`

##### Returns

`string`

## Methods

### edit()

> **edit**(): `object`

#### Returns

`object`

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`addMiddleware()`

</td>
<td>

(`middleware`) => \{ readonly field: string; readonly addMiddleware: (middleware: Middleware\<SubscriptionWrapper, Source, Context, Args, Info\>) =\> ...; readonly useStore: \<T\>(key: symbol) =\> \{ ...; \}; readonly setStore: (key: symbol, value: Readonly\<...\>) =\> ...; readonly commit: () =\> SubscriptionBuilder\<...\>; readonly commitToMethod...

</td>
</tr>
<tr>
<td>

`commit()`

</td>
<td>

() => `SubscriptionBuilder`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

`commitToMethods()`

</td>
<td>

() => [`SubscriptionMethods`](../type-aliases/SubscriptionMethods.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

`field`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`setStore()`

</td>
<td>

(`key`, `value`) => \{ readonly field: string; readonly addMiddleware: (middleware: Middleware\<SubscriptionWrapper, Source, Context, Args, Info\>) =\> ...; readonly useStore: \<T\>(key: symbol) =\> \{ ...; \}; readonly setStore: (key: symbol, value: Readonly\<...\>) =\> ...; readonly commit: () =\> SubscriptionBuilder\<...\>; readonly commitToMethod...

</td>
</tr>
<tr>
<td>

`useStore()`

</td>
<td>

\<`T`\>(`key`) => `object`

</td>
</tr>
</tbody>
</table>

---

### toMethods()

> **toMethods**(): [`SubscriptionMethods`](../type-aliases/SubscriptionMethods.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>

#### Returns

[`SubscriptionMethods`](../type-aliases/SubscriptionMethods.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>
