import { Box, Text } from 'ink';
import React, { useEffect, useRef, useState } from 'react';
import { useConfig } from './config-provider';
import { Spinner } from './spinner';

export function ConfigStatus() {
	const [configChanged, setConfigChanged] = useState(false);
	const skipInitial = useRef(true);
	const { config } = useConfig();

	// biome-ignore lint/correctness/useExhaustiveDependencies: we want to run this effect when config changes
	useEffect(() => {
		if (skipInitial.current) {
			skipInitial.current = false;
			return;
		}

		setConfigChanged(true);

		const id = setTimeout(() => {
			setConfigChanged(false);
		}, 1000);

		return () => {
			clearTimeout(id);
		};
	}, [config]);

	if (!configChanged) {
		return null;
	}

	return (
		<Box flexDirection="column">
			<Text bold={true} color="yellow">
				<Spinner /> Config
			</Text>
			<Box marginLeft={2}>
				<Text>Config changed! Restarting...</Text>
			</Box>
		</Box>
	);
}
