# ModuleBuilder

## Constructors

### Constructor

> **new ModuleBuilder**(`id`, `dirname`, `hashes`, `typedef`, `extensions`): `ModuleBuilder`

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

`id`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`dirname`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`hashes`

</td>
<td>

[`TypeHashMap`](../type-aliases/TypeHashMap.md)

</td>
</tr>
<tr>
<td>

`typedef`

</td>
<td>

`DocumentNode`

</td>
</tr>
<tr>
<td>

`extensions`

</td>
<td>

[`Extension`](Extension.md)[]

</td>
</tr>
</tbody>
</table>

#### Returns

`ModuleBuilder`

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="dirname"></a> `dirname`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

<a id="hashes"></a> `hashes`

</td>
<td>

`readonly`

</td>
<td>

[`TypeHashMap`](../type-aliases/TypeHashMap.md)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

<a id="id"></a> `id`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

<a id="mapper"></a> `mapper`

</td>
<td>

`readonly`

</td>
<td>

[`ResolverMapper`](ResolverMapper.md)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

<a id="transformers"></a> `transformers`

</td>
<td>

`readonly`

</td>
<td>

[`SchemaTransformer`](../type-aliases/SchemaTransformer.md)[]

</td>
<td>

`[]`

</td>
</tr>
<tr>
<td>

<a id="typedef"></a> `typedef`

</td>
<td>

`readonly`

</td>
<td>

`DocumentNode`

</td>
<td>

`undefined`

</td>
</tr>
</tbody>
</table>

## Methods

### build()

> **build**(): `object`

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

`resolvers`

</td>
<td>

`IResolvers`

</td>
</tr>
<tr>
<td>

`transform()`

</td>
<td>

(`schema`) => `GraphQLSchema`

</td>
</tr>
<tr>
<td>

`typedef`

</td>
<td>

`DocumentNode`

</td>
</tr>
</tbody>
</table>

---

### createMiddlewareBuilder()

> **createMiddlewareBuilder**\<`Result`, `Root`, `Context`, `Args`\>(`type`, `field`): (`middleware`) => `void`

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

`type`

</td>
<td>

`string`

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
</tbody>
</table>

#### Returns

> (`middleware`): `void`

##### Parameters

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

`middleware`

</td>
<td>

[`Middleware`](../../index/type-aliases/Middleware.md)\<`Result`, `Root`, `Context`, `Args`\>

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

---

### createModuleMethods()

> **createModuleMethods**\<`Context`\>(): [`ModuleExtensions`](../namespaces/BaetaExtensions/interfaces/ModuleExtensions.md) & `object`

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

`Context`

</td>
</tr>
</tbody>
</table>

#### Returns

[`ModuleExtensions`](../namespaces/BaetaExtensions/interfaces/ModuleExtensions.md) & `object`

---

### createResolverBuilder()

> **createResolverBuilder**\<`Result`, `Root`, `Context`, `Args`\>(`type`, `field`): (`resolver`) => `void` & [`ResolverExtensions`](../namespaces/BaetaExtensions/interfaces/ResolverExtensions.md)\<`Result`, `Root`, `Context`, `Args`\> & `object`

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

`type`

</td>
<td>

`string`

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
</tbody>
</table>

#### Returns

(`resolver`) => `void` & [`ResolverExtensions`](../namespaces/BaetaExtensions/interfaces/ResolverExtensions.md)\<`Result`, `Root`, `Context`, `Args`\> & `object`

---

### createResolveType()

> **createResolveType**\<`Result`, `Value`, `Context`\>(`type`): (`resolver`) => `void`

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

`Value`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
</tbody>
</table>

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

`type`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

> (`resolver`): `void`

##### Parameters

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

`resolver`

</td>
<td>

[`TypeResolver`](../../index/type-aliases/TypeResolver.md)\<`Result`, `Value`, `Context`\>

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

---

### createScalarBuilder()

> **createScalarBuilder**(`scalar`): (`resolver`) => `void`

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

`scalar`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

> (`resolver`): `void`

##### Parameters

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

`resolver`

</td>
<td>

[`ScalarResolver`](../../index/type-aliases/ScalarResolver.md)

</td>
</tr>
</tbody>
</table>

##### Returns

`void`

---

### createSubscriptionBuilder()

> **createSubscriptionBuilder**\<`Result`, `Root`, `Context`, `Args`\>(`field`): \<`Payload`\>(`subscription`) => `void` & `object`

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

`field`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

\<`Payload`\>(`subscription`) => `void` & `object`

---

### createSubscriptionMethods()

> **createSubscriptionMethods**\<`Root`, `Context`\>(): [`TypeExtensions`](../namespaces/BaetaExtensions/interfaces/TypeExtensions.md)\<`Root`, `Context`\> & `object` & `object`

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

#### Returns

[`TypeExtensions`](../namespaces/BaetaExtensions/interfaces/TypeExtensions.md)\<`Root`, `Context`\> & `object` & `object`

---

### createTypeMethods()

> **createTypeMethods**\<`Root`, `Context`\>(`type`): [`TypeExtensions`](../namespaces/BaetaExtensions/interfaces/TypeExtensions.md)\<`Root`, `Context`\> & `object`

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

`type`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

[`TypeExtensions`](../namespaces/BaetaExtensions/interfaces/TypeExtensions.md)\<`Root`, `Context`\> & `object`
