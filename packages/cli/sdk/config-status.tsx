import { Box, Text } from 'ink';
import { useConfig } from './config-provider.tsx';
import { Spinner } from './spinner.tsx';

export function ConfigStatus() {
	const { showConfigChanged } = useConfig();

	if (!showConfigChanged) {
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
