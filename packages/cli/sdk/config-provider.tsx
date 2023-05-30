import { Watcher } from '@baeta/generator';
import path from 'path';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { LoadedBaetaConfig, loadConfig } from '../lib/config-loader';
import { createContextProvider } from '../utils/context';
import { ConfigStatus } from './config-status';

export interface ConfigProps {
  initialConfig: LoadedBaetaConfig;
  watchConfig?: boolean;
}

export function useConfigStore(props: ConfigProps) {
  const [config, setConfig] = useState<LoadedBaetaConfig>(props.initialConfig);

  const updateConfig = useCallback(async (f) => {
    const config = await loadConfig();
    if (config) {
      setConfig(config);
    }
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

  return config;
}

export const [ConfigProviderBase, useConfig] = createContextProvider(
  {
    name: 'Config',
  },
  useConfigStore
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
