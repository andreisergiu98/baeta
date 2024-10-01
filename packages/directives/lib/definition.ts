import { SchemaTransformer } from '@baeta/core/sdk';

export interface Definition {
	sdl: string;
	directive: SchemaTransformer;
}
