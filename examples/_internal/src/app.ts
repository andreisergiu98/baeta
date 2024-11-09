import { createApplication } from '@baeta/core';
import { modules } from './modules/autoload.ts';

createApplication({
	modules,
});

console.log('Schema created');
