---
"@baeta/plugin-graphql": major
---

The whole generator was rewritten to emit the new side-effect-free builder API (the resolver API itself is documented under `@baeta/core`).

**v1 (generated accessor, side-effect registration):**

```typescript
import { getUserModule } from './typedef';

const { Query } = getUserModule();

Query.user(async (params) => {
  return { id: params.args.id ?? 'id', name: 'John Doe' };
});
```

**v2 (generated module builder + starter `index.ts`):**

```typescript
import { UserModule } from './typedef.ts';

const { Query, User } = UserModule;

export default UserModule.$schema({
  User: User.$fields({
    id: User.id.key('id'),
    name: User.name.resolve((params) => {
      // Implement resolver logic here
    }),
  }),
  Query: Query.$fields({
    user: Query.user.resolve((params) => {
      // Implement resolver logic here
    }),
  }),
});
```

The full set of field/middleware/builder helpers is documented in the `@baeta/core` changelog entry.
