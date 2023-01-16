import { generate, generateAndWatch } from '@baeta/generator';
import React, { useEffect, useState } from 'react';
import { useConfig } from '../../providers/ConfigProvider';
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
    if (watch === true && skipInitial === true) {
      return;
    }

    if (!config) {
      return;
    }

    const handler = async () => {
      setRunning(true);
      setError(undefined);

      try {
        await generate(config);
        onSuccess?.();
      } catch (err) {
        setError(err);
      } finally {
        setRunning(false);
      }
    };

    handler();
  }, [config, watch, skipInitial, onSuccess]);

  useEffect(() => {
    if (watch !== true) {
      return;
    }

    if (!config) {
      return;
    }

    const instance = generateAndWatch(config, {
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
