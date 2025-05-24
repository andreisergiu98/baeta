import { GraphQLError } from 'graphql';
import { Text } from 'ink';
import { Errors, Layout, makeErrorOutput, Spinner } from '../../sdk/index.ts';

export type GeneratorPluginName = {
	id: string;
	name: string;
	actionName: string;
};

interface Props {
	error?: unknown;
	running: boolean;
	watching?: boolean;
	startedPlugins: GeneratorPluginName[];
	finishedPlugins: GeneratorPluginName[];
}

function formatError(error: unknown) {
	if (error instanceof GraphQLError) {
		const path = error.source?.name;
		if (path == null) {
			return error.message;
		}

		const location = [path, error.locations?.[0]?.line, error.locations?.[0]?.column]
			.filter((x) => x != null)
			.join(':');

		return `${error.message}\n\n${location}`;
	}

	if (error instanceof Error) {
		return error.message;
	}

	return JSON.stringify(error, null, 2);
}

export function GeneratorStatus(props: Props) {
	return (
		<Layout title="Generator" color="magenta" loading={props.running}>
			<GeneratorStatusContent {...props} />
		</Layout>
	);
}

function GeneratorStatusContent(props: Props) {
	if (props.error) {
		return <Errors errors={[makeErrorOutput('generator-error', formatError(props.error))]} />;
	}

	if (props.running) {
		return <GeneratorPluginsStatus {...props} />;
	}

	if (props.watching) {
		return <Text>Watching for changes</Text>;
	}

	return <Text>Generated</Text>;
}

function GeneratorPluginsStatus(props: Props) {
	if (props.startedPlugins.length === 0) {
		return <Text>Generating...</Text>;
	}

	const finishedActions = props.finishedPlugins.map((plugin) => plugin.actionName);

	const pluginMessages = props.startedPlugins.map((startedPlugin) => {
		const isFinished = finishedActions.includes(startedPlugin.actionName);
		return (
			<GeneratorPluginStatus
				key={startedPlugin.id}
				name={startedPlugin.actionName}
				isFinished={isFinished}
			/>
		);
	});

	return <>{pluginMessages}</>;
}

interface PluginStatus {
	name: string;
	isFinished: boolean;
}

function GeneratorPluginStatus(props: PluginStatus) {
	const status = props.isFinished ? '✔' : <Spinner />;
	const task = props.isFinished ? `Generated ${props.name}` : `Generating ${props.name}...`;

	return (
		<Text>
			{status} {task}
		</Text>
	);
}
