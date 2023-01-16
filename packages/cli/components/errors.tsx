import style from 'ansi-styles';
import { Text } from 'ink';
import React from 'react';

interface MessagesProps {
  warnings?: string[];
  errors?: string[];
}

const errorIcon = `${style.red.open}✘${style.red.close}`;
const errorTag = `${style.bgRed.open}[ERROR]${style.bgRed.close}`;

export const errorNamespace = `${errorIcon} ${errorTag}`;

export function makeErrorMessage(message: string, bold = false) {
  const wrapped = `${errorNamespace} ${message}`;

  if (!bold) {
    return wrapped;
  }

  return `${style.bold.open}${wrapped}${style.bold.close}`;
}

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
