import type { CompilerOptions } from '@baeta/compiler';
import { ExecaChildProcess } from 'execa';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useConfig } from '../../providers/ConfigProvider';
import { AppOutput } from '../app';
import { makeErrorMessage } from '../errors';
import { WithGenerator } from '../generator';
import { killProcesses, startProcess } from './builder-plugin';
import { BuilderStatus } from './builder-status';
import { Build, CreateEsbuildCliHooksPlugin, importCompiler } from './builder-utils';

interface Props {
  watch?: boolean;
  generate?: boolean;
  onSuccess?: string;
  onError?: string;
  hideWarnings?: boolean;
}

const emptyArray: string[] = [];

export function Builder(props: Props) {
  const { config, relativeLocation } = useConfig();
  const [isConfigured, setIsConfigured] = useState(() => config.compiler != null);

  const [output, setOutput] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);

  const [running, setRunning] = useState(false);
  const [buildTime, setBuildTime] = useState(0);

  const processesRef = useRef<ExecaChildProcess[]>([]);

  const killHanging = useCallback(() => {
    return killProcesses(processesRef.current);
  }, []);

  const handleCommand = useCallback(
    async (command?: string) => {
      await killHanging();

      if (!command) {
        return;
      }

      return startProcess(
        processesRef.current,
        command,
        (output) => {
          setOutput((current) => [...current, output]);
        },
        () => {}
      );
    },
    [killHanging]
  );

  const handleStart = useCallback(async () => {
    await killHanging();

    setRunning(true);
    setOutput(emptyArray);
    setWarnings(emptyArray);
    setErrors(emptyArray);
  }, [killHanging]);

  const handleEnd = useCallback(
    (buildTime: number, warnings: string[], errors: string[]) => {
      setRunning(false);
      setBuildTime(buildTime);
      setWarnings(warnings);
      setErrors(errors);

      if (errors.length > 0) {
        return handleCommand(props.onError);
      }

      return handleCommand(props.onSuccess);
    },
    [props.onSuccess, props.onError, handleCommand]
  );

  const handler = useCallback(
    async (config: CompilerOptions, build: Build, createCliPlugin: CreateEsbuildCliHooksPlugin) => {
      if (props.watch) {
        config.watch = true;
      }

      const plugins = config.esbuild?.plugins ?? [];

      plugins.push(
        createCliPlugin({
          onBuildStart: handleStart,
          onBuildEnd: handleEnd,
        })
      );

      const options = {
        ...config,
        watch: props.watch,
        esbuild: {
          ...config.esbuild,
          plugins,
        },
      };

      const result = await build(options).catch((err) => {
        console.log(err);
        process.exit(1);
      });

      return () => {
        result?.stop?.();
      };
    },
    [props.watch, props.onSuccess, props.onError, handleStart, handleEnd]
  );

  useEffect(() => {
    let stop: (() => void) | undefined = undefined;
    let stopped = false;

    const run = async () => {
      setIsConfigured(config.compiler != null);

      if (config.compiler == null) {
        return;
      }

      const compiler = await importCompiler();

      if (compiler == null) {
        console.log(makeErrorMessage("@baeta/compiler is required for 'build' command`", true));
        process.exit(1);
      }

      stop = await handler(config.compiler, compiler.build, compiler.createCliPlugin);

      if (stopped) {
        stop?.();
      }
    };

    run();

    return () => {
      stopped = true;
      stop?.();
    };
  }, [config, handler]);

  return (
    <>
      {isConfigured && (
        <BuilderStatus
          running={running}
          watching={props.watch}
          errors={errors}
          warnings={warnings}
          buildTime={buildTime}
        />
      )}
      {!isConfigured && (
        <BuilderStatus
          running={running}
          watching={props.watch}
          errors={[makeErrorMessage(`compiler is not configured, check ${relativeLocation}`)]}
          warnings={emptyArray}
          buildTime={buildTime}
        />
      )}
      {isConfigured && errors.length === 0 && !!props.onSuccess && <AppOutput output={output} />}
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
