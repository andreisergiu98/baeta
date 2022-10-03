import type { Config } from '@baeta/core/lib';
import { useApp } from 'ink';
import React, { useCallback, useEffect, useState } from 'react';
import { useConfig } from '../../providers/ConfigProvider';
import { AppOutput } from '../app';
import { WithGenerator } from '../generator';
import { BuilderStatus } from './builder-status';
import { importCompiler } from './builder-utils';

interface Props {
  watch?: boolean;
  generate?: boolean;
  onSuccess?: string;
  onError?: string;
  hideWarnings?: boolean;
}

const emptyArray: string[] = [];

export function Builder(props: Props) {
  const { exit } = useApp();
  const config = useConfig();

  const [output, setOutput] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);

  const [running, setRunning] = useState(false);
  const [buildTime, setBuildTime] = useState(0);

  const handler = useCallback(
    async (config?: Config) => {
      const build = await importCompiler();

      if (config?.compiler == null) {
        console.log('Compiler is not configured!');
        return;
      }

      if (props.watch) {
        config.compiler.watch = true;
      }

      config.compiler.commands = {
        onBuildStart: () => {
          setRunning(true);
          setOutput(emptyArray);
          setErrors(emptyArray);
          setWarnings(emptyArray);
        },
        onBuildEnd: (buildTime) => {
          setRunning(false);
          setBuildTime(buildTime);
        },
        onBuildErrors: (errors) => {
          setErrors(errors);
        },
        onBuildWarnings: (warnings) => {
          setWarnings(warnings);
        },
        onSuccess: props.onSuccess
          ? {
              command: props.onSuccess,
              stdout: (data) => {
                setOutput((current) => [...current, data]);
              },
            }
          : undefined,
        onError: props.onError
          ? {
              command: props.onError,
            }
          : undefined,
      };

      const result = await build(config.compiler).catch((err) => {
        exit(err);
        return null;
      });

      return () => {
        result?.stop?.();
      };
    },
    [props.watch, props.hideWarnings, props.onSuccess, props.onError]
  );

  useEffect(() => {
    let stop: (() => void) | undefined = undefined;
    let stopped = false;

    const cleanup = () => {
      stop?.();
      stopped = true;
    };

    const runHandler = async () => {
      stop = await handler(config);

      if (stopped) {
        stop?.();
      }
    };

    runHandler();

    return () => {
      cleanup();
    };
  }, [config, handler]);

  return (
    <>
      <BuilderStatus
        running={running}
        watching={props.watch}
        errors={errors}
        warnings={warnings}
        buildTime={buildTime}
      />
      {errors.length === 0 && !!props.onSuccess && <AppOutput output={output} />}
    </>
  );
}

export function BuilderWithGenerator(props: Props) {
  return (
    <WithGenerator watch={props.watch} skipInitial={false}>
      <Builder {...props} />
    </WithGenerator>
  );
}
