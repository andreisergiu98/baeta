---
"@baeta/subscriptions-cloudflare": minor
---

Updated for Baeta v2. The public API is unchanged, except that the `Subscribe<Map>`
helper now returns an `AsyncIterable` instead of an `AsyncIterator`, matching the v2
subscription builder's `.subscribe()`.
