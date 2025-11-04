import { Watcher } from '@baeta/generator';
import path from '@baeta/util-path';
import { Box, Text } from 'ink';
import { type PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { type LoadedBaetaConfig, loadConfig } from '../lib/config-loader.ts';
import { createContextProvider } from '../utils/context.ts';
import { Spinner } from './spinner.tsx';

export type { LoadedBaetaConfig } from '../lib/config-loader.ts';
export interface ConfigProps {
	initialConfig: LoadedBaetaConfig;
	watchConfig?: boolean;
}

export type ConfigEventMap = {
	update: [LoadedBaetaConfig];
};

export function useConfigStore(props: Readonly<ConfigProps>) {
	const [config, setConfig] = useState<LoadedBaetaConfig>(props.initialConfig);
	const [showConfigChanged, setShowConfigChanged] = useState(false);
	const configChangedTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

	const updateConfig = useCallback(async () => {
		const config = await loadConfig();
		if (!config) return;
		setConfig(config);
		setShowConfigChanged(true);
		clearTimeout(configChangedTimeout.current);
		configChangedTimeout.current = setTimeout(() => {
			setShowConfigChanged(false);
		}, 1000);
	}, []);

	useEffect(() => {
		if (props.watchConfig !== true) {
			return;
		}

		const configDir = path.dirname(props.initialConfig.location);
		const relativeConfigFile = path.relative(process.cwd(), props.initialConfig.location);

		const watcher = new Watcher(configDir, {
			ignore: [`!${relativeConfigFile}`],
		});

		watcher.on('create', updateConfig);
		watcher.on('update', updateConfig);
		watcher.on('delete', updateConfig);

		return () => {
			watcher.close();
		};
	}, [props.watchConfig, props.initialConfig.location, updateConfig]);

	return useMemo(() => ({ ...config, showConfigChanged }), [config, showConfigChanged]);
}

export const [ConfigProviderBase, useConfig] = createContextProvider(
	{
		name: 'Config',
	},
	useConfigStore,
);

export function ConfigProvider(props: PropsWithChildren<ConfigProps>) {
	const { children, ...rest } = props;
	return (
		<ConfigProviderBase {...rest}>
			<ConfigStatus />
			{children}
		</ConfigProviderBase>
	);
}

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
