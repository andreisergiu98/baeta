import { createContextStore } from '@baeta/core';
import type { ComplexityLimit } from './complexity-limits.ts';

export interface ComplexityStore {
	limits: Required<ComplexityLimit>;
	cacheComplexity: (fn: () => Required<ComplexityLimit>) => Required<ComplexityLimit>;
}

export const complexityStoreKey = Symbol('complexity-extension');

export const [getComplexityStore, setComplexityStoreLoader] =
	createContextStore<ComplexityStore>(complexityStoreKey);
