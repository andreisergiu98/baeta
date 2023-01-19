import { generate, generateAndWatch, getGeneratorPlugins } from '@baeta/generator';
import graphqlPlugin from '@baeta/plugin-graphql';
import React, { useEffect, useState } from 'react';
import { useConfig } from '../../sdk';
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

  useEffect(() => {
    if (!config) {
      return;
    }

    if (watch === true && skipInitial === true) {
      return;
    }

    const plugins = [graphqlPlugin(config.graphql), ...getGeneratorPlugins(config.plugins)];

    generate(config.graphql, plugins, {
      onStart: () => {
        setRunning(true);
        setError(undefined);
      },
      onEnd: () => {
        setRunning(false);
        onSuccess?.();
      },
      onError: (error) => {
        setRunning(false);
        setError(error);
      },
    });
  }, [config, watch, skipInitial, onSuccess]);

  useEffect(() => {
    if (watch !== true) {
      return;
    }

    if (!config) {
      return;
    }

    const plugins = [graphqlPlugin(config.graphql), ...getGeneratorPlugins(config.plugins)];

    const instance = generateAndWatch(config.graphql, plugins, {
      onStart: () => {
        setRunning(true);
        setError(undefined);
      },
      onEnd: () => {
        setRunning(false);
        onSuccess?.();
      },
      onError: (error) => {
        setRunning(false);
        setError(error);
      },
    });

    return () => {
      instance.close();
    };
  }, [config, watch, onSuccess]);

  return <GeneratorStatus error={error} running={running} watching={props.watch} />;
}
