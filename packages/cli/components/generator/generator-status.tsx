import React from "react";
import { Text } from "ink";
import { Layout } from "../layout";
import { errorNamespace, Errors } from "../errors";
import { GraphQLError } from "graphql";
import { red, bgRed } from "chalk";

interface Props {
  error?: unknown;
  running: boolean;
  watching?: boolean;
}

function formatError(error: unknown) {
  if (error instanceof GraphQLError) {
    let path = error.source?.name;
    if (path == null) {
      return error.message;
    }

    const location = [
      path,
      error.locations?.[0]?.line,
      error.locations?.[0]?.column,
    ]
      .filter((x) => x != null)
      .join(":");

    return error.message + "\n\n" + location;
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
    const errorMessage = errorNamespace + " " + formatError(props.error);
    return <Errors errors={[errorMessage]}></Errors>;
  }

  if (props.running) {
    return <Text>Generating...</Text>;
  }

  if (props.watching) {
    return <Text>Watching for changes</Text>;
  }

  return <Text>Generated</Text>;
}
