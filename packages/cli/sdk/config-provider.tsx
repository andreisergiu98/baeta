import chokidar from 'chokidar';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { loadConfig, LoadedBaetaConfig } from '../lib/config-loader';
import { createContextProvider } from '../utils/context';
import { ConfigStatus } from './config-status';

export interface ConfigProps {
  initialConfig: LoadedBaetaConfig;
  watchConfig?: boolean;
}

export function useConfigStore(props: ConfigProps) {
  const [config, setConfig] = useState<LoadedBaetaConfig>(props.initialConfig);

  const updateConfig = useCallback(async () => {
    const config = await loadConfig();
    if (config) {
      setConfig(config);
    }
  }, []);

  useEffect(() => {
    if (props.watchConfig !== true) {
      return;
    }

    const instance = chokidar
      .watch(props.initialConfig.location, {
        ignoreInitial: true,
      })
      .on('add', updateConfig)
      .on('change', updateConfig)
      .on('unlink', updateConfig);

    return () => {
      instance.close();
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
