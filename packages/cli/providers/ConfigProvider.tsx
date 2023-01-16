import chokidar from 'chokidar';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { ConfigStatus } from '../components/config';
import { BaetaOptions, loadConfig } from '../lib/config';
import { createContextProvider } from '../utils/context';

export interface ConfigProps {
  initialConfig: BaetaOptions;
  configPath: string;
  watchConfig?: boolean;
}

export function useConfigStore(props: ConfigProps) {
  const [config, setConfig] = useState<BaetaOptions>(props.initialConfig);

  const updateConfig = useCallback(async () => {
    const result = await loadConfig();
    if (result?.config) {
      setConfig(result.config);
    }
  }, []);

  useEffect(() => {
    if (props.watchConfig !== true) {
      return;
    }


    const instance = chokidar
      .watch(props.configPath, {
        ignoreInitial: true,
      })
      .on('add', updateConfig)
      .on('change', updateConfig)
      .on('unlink', updateConfig);

    return () => {
      instance.close();
    };
  }, [props.watchConfig, props.configPath, updateConfig]);

  return config;
}

export const [ConfigProviderBase, useConfig] = createContextProvider(
  {
    name: 'Config',
    strict: false,
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
