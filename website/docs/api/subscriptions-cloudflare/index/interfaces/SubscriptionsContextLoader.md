# Interface: SubscriptionsContextLoader\<Env, Context, ContextParams\>

## Type Parameters

• **Env**

• **Context**

• **ContextParams**

## Properties

### createContext()

> **createContext**: (`params`, `env`, `executionContext`) => `Context`

#### Parameters

##### params

`ContextParams`

##### env

`Env`

##### executionContext

`ExecutionContext`

#### Returns

`Context`

---

### getContextParams()

> **getContextParams**: (`request`, `env`) => `ContextParams`

#### Parameters

##### request

`Request`\<`unknown`, `CfProperties`\<`unknown`\>\>

##### env

`Env`

#### Returns

`ContextParams`
