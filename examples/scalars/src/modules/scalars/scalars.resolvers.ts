import { DateTimeResolver, UUIDResolver } from 'graphql-scalars';
import { getScalarsModule } from './typedef.js';

const { Scalar } = getScalarsModule();

Scalar.DateTime(DateTimeResolver);

Scalar.UUID(UUIDResolver);
