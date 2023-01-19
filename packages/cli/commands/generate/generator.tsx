import { generate, generateAndWatch, GeneratorHooks, getGeneratorPlugins } from '@baeta/generator';
import { graphqlPlugin } from '@baeta/plugin-graphql';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useConfig } from '../../sdk';
import { flattenArrays } from '../../utils/array';
import { GeneratorStatus } from './generator-status';

export interface GeneratorProps {
  watch?: boolean;
  skipInitial?: boolean;
  onSuccess?: () => void;
}

export function Generator(props: GeneratorProps) {
  const { watch, skipInitial, onSuccess } = props;
  const { config } = useConfig();
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<unknown>(undefined);

  const [startedPlugins, setStartedPlugins] = useState<string[]>([]);
  const [finishedPlugins, setFinishedPlugins] = useState<string[]>([]);

  const plugins = useMemo(() => {
    const generatorPlugins = getGeneratorPlugins(flattenArrays(config.plugins ?? []));
    return [graphqlPlugin(), ...generatorPlugins];
  }, [config.plugins]);

  const getHooks = useCallback((): GeneratorHooks => {
    return {
      onStart: () => {
        setRunning(true);
        setStartedPlugins([]);
        setFinishedPlugins([]);
        setError(undefined);
      },
      onEnd: () => {
        setRunning(false);
        setStartedPlugins([]);
        setFinishedPlugins([]);
        onSuccess?.();
      },
      onError: (error) => {
        setRunning(false);
        setStartedPlugins([]);
        setFinishedPlugins([]);
        setError(error);
      },
      onPluginStepStart: (plugin, step) => {
        if (step === 'generate') {
          setStartedPlugins((current) => [...current, plugin.actionName]);
        }
      },
      onPluginStepEnd: (plugin, step) => {
        if (step === 'generate') {
          setFinishedPlugins((current) => [...current, plugin.actionName]);
        }
      },
    };
  }, [onSuccess]);

  useEffect(() => {
    if (!config) {
      return;
    }

    if (watch === true && skipInitial === true) {
      return;
    }

    generate(config.graphql, plugins, getHooks());
  }, [config, watch, skipInitial, plugins, getHooks]);

  useEffect(() => {
    if (watch !== true) {
      return;
    }

    if (!config) {
      return;
    }

    const instance = generateAndWatch(config.graphql, plugins, getHooks());

    return () => {
      instance.close();
    };
  }, [config, watch, plugins, getHooks]);

  return (
    <GeneratorStatus
      error={error}
      running={running}
      watching={props.watch}
      startedPlugins={startedPlugins}
      finishedPlugins={finishedPlugins}
    />
  );
}
