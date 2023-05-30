import { GraphQLError } from 'graphql';
import { Text } from 'ink';
import React from 'react';
import { Errors, Layout, makeErrorMessage, Spinner } from '../../sdk';

interface Props {
  error?: unknown;
  running: boolean;
  watching?: boolean;
  startedPlugins: string[];
  finishedPlugins: string[];
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

    return error.message + '\n\n' + location;
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
    return <Errors errors={[makeErrorMessage(formatError(props.error))]} />;
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

  const pluginMessages = props.startedPlugins.map((startedPlugin, index) => {
    const isFinished = props.finishedPlugins.includes(startedPlugin);
    // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
    return <GeneratorPluginStatus key={index} plugin={startedPlugin} isFinished={isFinished} />;
  });

  return <>{pluginMessages}</>;
}

interface PluginStatus {
  plugin: string;
  isFinished: boolean;
}

function GeneratorPluginStatus(props: PluginStatus) {
  const status = props.isFinished ? '✔' : <Spinner />;
  const task = props.isFinished ? `Generated ${props.plugin}` : `Generating ${props.plugin}...`;

  return (
    <Text>
      {status} {task}
    </Text>
  );
}
