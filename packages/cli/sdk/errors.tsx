import { Text } from '@baeta/ink';
import style from 'ansi-styles';
import React from 'react';

export interface ErrorsProps {
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

export function Errors(props: ErrorsProps) {
  return (
    <>
      {props.warnings?.map((warning, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: it is safe in this case
        <Text key={index} bold={true}>
          {warning}
        </Text>
      ))}
      {props.errors?.map((error, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: it is safe in this case
        <Text key={index} bold={true}>
          {error}
        </Text>
      ))}
    </>
  );
}
