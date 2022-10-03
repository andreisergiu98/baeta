import { Text } from 'ink';
import React from 'react';
import { Errors } from '../errors';
import { Layout } from '../layout';

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
  if (props.running) {
    return <Text>Building...</Text>;
  }

  const hasErrors = props.errors != null && props.errors.length > 0;

  let message = 'Done';
  if (hasErrors) {
    message = '';
  }

  if (props.watching) {
    message = 'Watching for changes';
  }

  return (
    <>
      <Errors warnings={props.warnings} errors={props.errors} />
      {message && <Text>{message}</Text>}
    </>
  );
}
