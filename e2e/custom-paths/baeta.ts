import { defineConfig } from '@baeta/cli';

export default defineConfig({
	graphql: {
		schemas: ['src/**/*.gql'],
		modulesDir: 'src/graphql',
		typesDir: 'src/custom-types',
		moduleDefinitionName: 'module-types',
	},
});
