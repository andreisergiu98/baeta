import spinners, { SpinnerName } from 'cli-spinners';
import { Text } from 'ink';
import React, { useEffect, useState } from 'react';

interface Props {
  type?: SpinnerName;
}

export function Spinner({ type = 'dots' }: Props) {
  const [frame, setFrame] = useState(0);
  const spinner = spinners[type];

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((previousFrame) => {
        const isLastFrame = previousFrame === spinner.frames.length - 1;
        return isLastFrame ? 0 : previousFrame + 1;
      });
    }, spinner.interval);

    return () => {
      clearInterval(timer);
    };
  }, [spinner]);

  return <Text>{spinner.frames[frame]}</Text>;
}
