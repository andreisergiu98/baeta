import React from "react";
import { Text } from "ink";
import { Layout } from "../layout";

interface Props {
  running: boolean;
  watching?: boolean;
}

export function GeneratorStatus(props: Props) {
  return (
    <Layout title="Generator" color="magenta" loading={props.running}>
      <GeneratorStatusContent {...props} />
    </Layout>
  );
}

function GeneratorStatusContent(props: Props) {
  if (props.running) {
    return <Text>Generating...</Text>;
  }

  if (props.watching) {
    return <Text>Watching for changes</Text>;
  }

  return <Text>Generated</Text>;
}
