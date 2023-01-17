import type { CompilerOptions } from '@baeta/compiler';
import type { BuildContext } from '@baeta/compiler/esbuild';
import { ExecaChildProcess } from 'execa';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useConfig } from '../../providers/ConfigProvider';
import { AppOutput } from '../app';
import { makeErrorMessage } from '../errors';
import { WithGenerator } from '../generator';
import { killProcesses, startProcess } from './builder-plugin';
import { BuilderStatus } from './builder-status';
import { Build, BuildAndWatch, CreateCliPlugin, importCompiler } from './builder-utils';

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
    async (
      config: CompilerOptions,
      build: Build,
      buildAndWatch: BuildAndWatch,
      createCliPlugin: CreateCliPlugin
    ) => {
      const configPlugins = config.esbuild?.plugins ?? [];

      const plugins = [
        createCliPlugin({
          onBuildStart: handleStart,
          onBuildEnd: handleEnd,
        }),
        ...configPlugins,
      ];

      const options = {
        ...config,
        esbuild: {
          ...config.esbuild,
          plugins,
        },
      };

      if (!props.watch) {
        return build(options).catch((err) => {
          console.log(err);
          process.exit(1);
        });
      }

      return buildAndWatch(options).catch((err) => {
        console.log(err);
        process.exit(1);
      });
    },
    [props.watch, props.onSuccess, props.onError, handleStart, handleEnd]
  );

  useEffect(() => {
    let ctx: BuildContext | undefined | void;
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

      ctx = await handler(
        config.compiler,
        compiler.build,
        compiler.buildAndWatch,
        compiler.createCliPlugin
      );

      if (stopped) {
        ctx?.dispose();
      }
    };

    run();

    return () => {
      stopped = true;
      ctx?.dispose();
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
