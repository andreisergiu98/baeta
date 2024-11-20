import { Box, Text } from 'ink';
import { useEffect, useState } from 'react';
import { useConfig } from './config-provider.tsx';
import { Spinner } from './spinner.tsx';

export function ConfigStatus() {
	const { events } = useConfig();
	const [configChanged, setConfigChanged] = useState(false);

	useEffect(() => {
		const showConfigChanged = () => {
			setConfigChanged(true);
		};

		events.on('update', showConfigChanged);

		return () => {
			events.off('update', showConfigChanged);
		};
	}, [events]);

	useEffect(() => {
		if (!configChanged) {
			return;
		}

		const id = setTimeout(() => {
			setConfigChanged(false);
		}, 1000);

		return () => {
			clearTimeout(id);
		};
	}, [configChanged]);

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
