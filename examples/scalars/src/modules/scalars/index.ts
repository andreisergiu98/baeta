import { DateTimeResolver, UUIDResolver } from 'graphql-scalars';
import { ScalarsModule } from './typedef.ts';

export default ScalarsModule.$schema({
	DateTime: DateTimeResolver,
	UUID: UUIDResolver,
});
