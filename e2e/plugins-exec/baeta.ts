import { defineConfig } from '@baeta/cli';
import { createExecPlugin } from '@baeta/plugin-exec';

const isWindows = process.platform === 'win32';
const markerCmd = isWindows ? 'cmd /c echo. > exec-marker.txt' : 'touch exec-marker.txt';
const skippedCmd = isWindows ? 'cmd /c echo. > skipped-marker.txt' : 'touch skipped-marker.txt';

export default defineConfig({
	graphql: {
		schemas: ['src/**/*.gql'],
	},
	plugins: [
		createExecPlugin({
			name: 'exec-marker',
			actionName: 'marker file',
			exec: markerCmd,
		}),
		createExecPlugin({
			name: 'exec-skipped',
			actionName: 'skipped command',
			exec: skippedCmd,
			skip: () => true,
		}),
	],
});
