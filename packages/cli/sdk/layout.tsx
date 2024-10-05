import { Box, Text, type TextProps } from 'ink';
import React, { type PropsWithChildren } from 'react';
import { Spinner } from './spinner.tsx';
import { Time } from './time.tsx';

export interface LayoutProps {
	loading?: boolean;
	title?: string;
	color?: TextProps['color'];
	time?: number;
	timePrefix?: string;
}

export function Layout(props: PropsWithChildren<LayoutProps>) {
	return (
		<Box flexDirection="column">
			<Box>
				<Text color={props.color} bold={true}>
					{props.title}
				</Text>
				{props.time != null && <Time prefix={props.timePrefix} value={props.time} />}
				<Text color={props.color} bold={true}>
					{props.loading && ' '}
					{props.loading && <Spinner />}
				</Text>
			</Box>
			<Box marginLeft={2} flexDirection="column">
				{props.children}
			</Box>
		</Box>
	);
}
