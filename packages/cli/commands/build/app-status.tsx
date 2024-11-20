import { Text } from 'ink';
import { Layout } from '../../sdk/index.ts';
import type { TextOutput } from '../../types/text.ts';

export function AppStatus({ output }: { output: TextOutput[] }) {
	return (
		<Layout title="App" color="blue">
			{output.map((value) => (
				<Text key={value.id}>{value.text}</Text>
			))}
		</Layout>
	);
}
