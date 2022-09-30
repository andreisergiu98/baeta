import React from "react";
import { Text } from "ink";
import { red, bgRed } from "chalk";

interface MessagesProps {
  warnings?: string[];
  errors?: string[];
}

export const errorNamespace = red("✘ ") + bgRed("[ERROR]");

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
