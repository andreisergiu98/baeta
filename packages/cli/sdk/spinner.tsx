import { Text } from 'ink';
import React, { useCallback, useEffect, useState } from 'react';

const spinner = {
	interval: 80,
	frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
};

export function Spinner() {
	const [frame, setFrame] = useState(0);

	const nextFrame = useCallback(() => {
		setFrame((previousFrame) => {
			if (previousFrame >= spinner.frames.length) {
				return 0;
			}
			return previousFrame + 1;
		});
	}, []);

	useEffect(() => {
		const timer = setInterval(nextFrame, spinner.interval);

		return () => {
			clearInterval(timer);
		};
	}, [nextFrame]);

	return <Text>{spinner.frames[frame]}</Text>;
}
