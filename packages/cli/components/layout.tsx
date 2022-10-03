import { Box, Text, TextProps } from 'ink';
import React, { PropsWithChildren } from 'react';
import { Spinner } from './spinner';
import { Time } from './time';

interface LayoutProps extends PropsWithChildren {
  loading?: boolean;
  title?: string;
  color?: TextProps['color'];
  time?: number;
  timePrefix?: string;
}

export function Layout(props: LayoutProps) {
  return (
    <Box flexDirection="column">
      <Box>
        <Text color={props.color} bold={true}>
          {props.loading && <Spinner />}
          {props.loading && ' '}
          {props.title}
        </Text>
        {props.time != null && <Time prefix={props.timePrefix} value={props.time} />}
      </Box>
      <Box marginLeft={2} flexDirection="column">
        {props.children}
      </Box>
    </Box>
  );
}
