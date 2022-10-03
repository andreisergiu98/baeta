import { Text } from 'ink';
import React from 'react';

interface MessagesProps {
  warnings?: string[];
  errors?: string[];
}

export const errorNamespace = '✘ ' + '[ERROR]';

export function Errors(props: MessagesProps) {
  return (
    <>
      {props.warnings?.map((warning, index) => (
        <Text key={index} bold={true}>
          {warning}
        </Text>
      ))}
      {props.errors?.map((error, index) => (
        <Text key={index} bold={true}>
          {error}
        </Text>
      ))}
    </>
  );
}
