---
"@baeta/auth": minor
---

All auth checks, including `auth()` and `authAfter()` on types and fields, now run as top-level middlewares at `authAppPlugin`'s position, so plugin order applies to them.
Boolean scopes such as `auth(scope.isLoggedIn)` and default scopes now hit the scope cache.
`authAfter` checks default scopes before the resolver, and using it on a Mutation or a subscription's `subscribe` fails when the application is created.
Nested `rule.or` failures keep their error codes, and `rule.race` fails with every rule's error, like `rule.or`, instead of a new `ForbiddenError`.
