import { DateTimeResolver, UUIDResolver } from 'graphql-scalars';
import { getScalarsModule } from './typedef.ts';

const { Scalar } = getScalarsModule();

Scalar.DateTime(DateTimeResolver);

Scalar.UUID(UUIDResolver);
