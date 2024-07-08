import { Text } from 'ink';
import React from 'react';
import { Errors, Layout } from '../../sdk';

interface StatusProps {
  running: boolean;
  watching?: boolean;
  buildTime?: number;
  errors?: string[];
  warnings?: string[];
}

export function BuilderStatus(props: StatusProps) {
  return (
    <Layout
      title="Builder"
      color="green"
      loading={props.running}
      time={props.buildTime}
      timePrefix=" "
    >
      <BuilderStatusContent {...props} />
    </Layout>
  );
}

function BuilderStatusContent(props: StatusProps) {
  const hasErrors = props.errors != null && props.errors.length > 0;
  if (hasErrors) {
    return <Errors warnings={props.warnings} errors={props.errors} />;
  }

  if (props.running) {
    return <Text>Building...</Text>;
  }

  if (props.watching) {
    return <Text>Watching for changes</Text>;
  }

  return <Text>Done</Text>;
}
