import type { ScalarResolver } from '@baeta/core';
import { BigIntResolver, ByteResolver, DateTimeResolver, JSONResolver } from 'graphql-scalars';
import { DecimalJSScalar } from './decimal';

interface ModuleRegisterer {
  Scalar: {
    DateTime: (resolver: ScalarResolver) => void;
    BigInt: (resolver: ScalarResolver) => void;
    Json: (resolver: ScalarResolver) => void;
    Decimal: (resolver: ScalarResolver) => void;
    Bytes: (resolver: ScalarResolver) => void;
  };
}

export function registerScalars(module: ModuleRegisterer) {
  module.Scalar.DateTime(DateTimeResolver);
  module.Scalar.BigInt(BigIntResolver);
  module.Scalar.Json(JSONResolver);
  module.Scalar.Decimal(DecimalJSScalar);
  module.Scalar.Bytes(ByteResolver);
}
