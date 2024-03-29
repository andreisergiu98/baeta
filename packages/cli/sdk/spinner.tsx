import { Text } from '@baeta/ink';
import spinners, { SpinnerName } from 'cli-spinners';
import React, { useEffect, useState } from 'react';

export interface SpinnerProps {
  type?: SpinnerName;
}

export function Spinner({ type = 'dots' }: SpinnerProps) {
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
