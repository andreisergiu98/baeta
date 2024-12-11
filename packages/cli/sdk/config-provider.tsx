import { EventEmitter } from 'node:events';
import { Watcher } from '@baeta/generator';
import path from '@baeta/util-path';
import { type PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { type LoadedBaetaConfig, loadConfig } from '../lib/config-loader.ts';
import { createContextProvider } from '../utils/context.ts';
import { ConfigStatus } from './config-status.tsx';

export interface ConfigProps {
	initialConfig: LoadedBaetaConfig;
	watchConfig?: boolean;
}

export type ConfigEventMap = {
	update: [LoadedBaetaConfig];
};

export type { LoadedBaetaConfig };

export function useConfigStore(props: ConfigProps) {
	const [config, setConfig] = useState<LoadedBaetaConfig>(props.initialConfig);
	const events = useMemo(() => new EventEmitter<ConfigEventMap>(), []);

	const updateConfig = useCallback(async () => {
		const config = await loadConfig();
		if (config) {
			setConfig(config);
			events.emit('update', config);
		}
	}, [events]);

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

	return useMemo(() => ({ ...config, events }), [config, events]);
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
