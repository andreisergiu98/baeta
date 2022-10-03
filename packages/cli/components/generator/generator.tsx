import React, { useEffect, useState } from "react";
import { generate, generateAndWatch } from "@baeta/generator";
import { GeneratorStatus } from "./generator-status";
import { useConfig } from "../../providers/ConfigProvider";

export interface GeneratorProps {
  watch?: boolean;
  skipInitial?: boolean;
  onSuccess?: () => void;
}

export function Generator(props: GeneratorProps) {
  const config = useConfig();
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<unknown>(undefined);

  useEffect(() => {
    if (props.watch === true && props.skipInitial === true) {
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
        props.onSuccess?.();
      } catch (err) {
        setError(err);
      } finally {
        setRunning(false);
      }
    };

    handler();
  }, [config, props.watch, props.onSuccess]);

  useEffect(() => {
    if (props.watch !== true) {
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
        props.onSuccess?.();
      },
      onError: (error) => {
        setRunning(false);
        setError(error);
      },
    });

    return () => {
      instance.close();
    };
  }, [config, props.watch, props.onSuccess]);

  return (
    <GeneratorStatus error={error} running={running} watching={props.watch} />
  );
}
