import { defineConfig } from 'prisma/config';

export default defineConfig({
	schema: 'schema.prisma',
	migrations: {
		path: 'migrations',
		seed: 'yarn node ./lib/db/seed.ts',
	},
	datasource: {
		url: 'file:./dev.db',
	},
});
