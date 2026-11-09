import { defineConfig } from '@baeta/cli';
import { createCliPlugin, createCommand } from '@baeta/cli-sdk';

const greetPlugin = createCliPlugin({
	name: 'greet',
	commands: [
		createCommand({
			name: 'greet',
			describe: 'print a greeting from a CLI plugin',
			positionals: { name: {} },
			handler: (args) => {
				console.log(`hello ${args.name}`);
			},
		}),
	],
});

export default defineConfig({
	graphql: {
		schemas: ['src/**/*.gql'],
	},
	plugins: [greetPlugin],
});
