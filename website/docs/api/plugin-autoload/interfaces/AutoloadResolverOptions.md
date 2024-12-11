# Interface: AutoloadResolverOptions

## Properties

### disableDefaultSuffixes?

> `optional` **disableDefaultSuffixes**: `boolean`

If true, disables the default resolver suffixes

---

### match()?

> `optional` **match**: (`filename`) => `boolean`

Custom function to determine if a resolver file should be included

#### Parameters

##### filename

`string`

#### Returns

`boolean`

---

### suffix?

> `optional` **suffix**: `string` \| `string`[]

Custom suffix(es) to identify resolver files
Used together with the default suffixes, unless disabled
