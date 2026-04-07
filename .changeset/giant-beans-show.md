---
"@baeta/cache-cloudflare": patch
"@baeta/cache-iovalkey": patch
"@baeta/cache-ioredis": patch
"@baeta/cache-upstash": patch
"@baeta/cache": patch
---

fix: do not overwrite with query items if they already exist to avoid missing invalidation events
