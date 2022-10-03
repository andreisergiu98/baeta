import { Text } from 'ink';
import React, { useMemo } from 'react';

interface Props {
  value?: number;
  prefix?: string;
}

export function Time(props: Props) {
  const time = useMemo(() => {
    if (!props.value) {
      return '';
    }

    if (props.value > 1000) {
      const seconds = props.value / 1000;
      return seconds.toFixed(2) + 's';
    }

    return Math.round(props.value) + 'ms';
  }, [props.value]);

  if (!time) {
    return null;
  }

  return (
    <Text>
      {props.prefix}[{time}]
    </Text>
  );
}
