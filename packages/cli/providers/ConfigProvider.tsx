import { Config } from '@baeta/core';
import { loadConfig } from '@baeta/core/sdk';
import chokidar from 'chokidar';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { ConfigStatus } from '../components/config';
import { createContextProvider } from '../utils/context';

export interface ConfigProps {
  watchConfig?: boolean;
}

export function useConfigStore(props: ConfigProps) {
  const [config, setConfig] = useState<Config | undefined>(() => loadConfig());

  const updateConfig = useCallback(async () => {
    const config = loadConfig();
    setConfig(config);
  }, []);

  useEffect(() => {
    if (props.watchConfig !== true) {
      return;
    }

    const root = process.cwd();
    const instance = chokidar
      .watch(`./baeta.{js,cjs,mjs,ts,cts,mts}`, {
        ignoreInitial: true,
      })
      .on('add', updateConfig)
      .on('change', updateConfig)
      .on('unlink', updateConfig);

    return () => {
      instance.close();
    };
  }, [props.watchConfig, updateConfig]);

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
