---
"@baeta/util-log": major
---

`createLogger` is now a public export and accepts a log `level` argument (`'debug' | 'info' | 'warn' | 'error'`, default `'info'`) so messages below the configured level are dropped. The exported types changed accordingly: the `ConsoleLogger` and `ConsolePayload` type exports were removed and replaced by a single `Logger` type. The pre-built `log` export is unchanged.

**v1:**

```typescript
import { log, type ConsoleLogger } from '@baeta/util-log';
// createLogger was internal; no level filtering
```

**v2:**

```typescript
import { log, createLogger, type Logger } from '@baeta/util-log';

const logger = createLogger('warn'); // debug/info calls become no-ops
```
