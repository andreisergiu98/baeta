import React from "react";
import { Text } from "ink";

interface MessagesProps {
  warnings?: string[];
  errors?: string[];
}

export function Errors(props: MessagesProps) {
  return (
    <>
      {props.warnings?.map((warning, index) => (
        <Text key={index}>{warning}</Text>
      ))}
      {props.errors?.map((error, index) => (
        <Text key={index}>{error}</Text>
      ))}
    </>
  );
}
