# Enumeration: BaetaErrorCode

Standard error codes used across the Baeta framework.

## Enumeration Members

### AggregateError

> **AggregateError**: `"AGGREGATE_ERROR"`

Multiple errors occurred simultaneously

---

### BadUserInput

> **BadUserInput**: `"BAD_USER_INPUT"`

Invalid input provided by the user

---

### Forbidden

> **Forbidden**: `"FORBIDDEN"`

User is authenticated but lacks required permissions

---

### InternalServerError

> **InternalServerError**: `"INTERNAL_SERVER_ERROR"`

Unexpected server-side error

---

### Unauthenticated

> **Unauthenticated**: `"UNAUTHENTICATED"`

Authentication is required but was not provided

---

### ValidationError

> **ValidationError**: `"VALIDATION_ERROR"`

Validation failed
