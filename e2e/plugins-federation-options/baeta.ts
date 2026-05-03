import { defineConfig } from '@baeta/cli';
import { federationPlugin } from '@baeta/plugin-federation';

export default defineConfig({
	graphql: {
		schemas: ['src/**/*.gql'],
		modulesDir: 'src/graphql',
		typesDir: 'src/types-gen',
		moduleDefinitionName: 'module-types',
	},
	plugins: [
		federationPlugin({
			moduleName: 'apollo',
			version: '2.0',
			include: 'all',
		}),
	],
});
