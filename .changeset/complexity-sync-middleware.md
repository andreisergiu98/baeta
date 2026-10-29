---
"@baeta/complexity": patch
---

The complexity middleware runs synchronously once the per-request limits are loaded. Static limits and sync limit functions load synchronously, so every root field stays sync; an async limit function only makes the first root field of a request wait.
