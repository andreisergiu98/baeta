export * from '../../__generated__/prisma/index.js';

import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../../__generated__/prisma/index.js';

export const db = new PrismaClient({
	adapter: new PrismaBetterSqlite3({
		url: 'file:./dev.db',
	}),
});
