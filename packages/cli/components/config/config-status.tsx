import React, { useEffect, useRef, useState } from "react";
import { Box, Text } from "ink";
import { useConfig } from "../../providers/ConfigProvider";
import { Spinner } from "../spinner";

export function ConfigStatus() {
  const [configChanged, setConfigChanged] = useState(false);
  const skipInitial = useRef(true);

  const config = useConfig();

  useEffect(() => {
    if (skipInitial.current) {
      skipInitial.current = false;
      return;
    }

    setConfigChanged(true);

    const id = setTimeout(() => {
      setConfigChanged(false);
    }, 2000);

    return () => {
      clearTimeout(id);
    };
  }, [config]);

  if (!configChanged) {
    return null;
  }

  return (
    <Box flexDirection="column">
      <Text bold={true} color="yellow">
        <Spinner /> Config
      </Text>
      <Box marginLeft={2}>
        <Text>Config changed! Restarting...</Text>
      </Box>
    </Box>
  );
}
