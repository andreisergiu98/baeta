import { type PropsWithChildren, useCallback, useState } from 'react';
import { Generator, type GeneratorProps } from './generator.tsx';

export function WithGenerator(props: PropsWithChildren<GeneratorProps>) {
	const { children, ...rest } = props;
	const [generated, setGenerated] = useState(false);

	const onSuccess = useCallback(() => {
		setGenerated(true);
	}, []);

	return (
		<>
			<Generator {...rest} onSuccess={onSuccess} />
			{generated && children}
		</>
	);
}
