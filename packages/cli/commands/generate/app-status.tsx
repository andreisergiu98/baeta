import { Text } from 'ink';
import { Layout } from '../../sdk/index.ts';

export function AppStatus({ children }: { children: string }) {
	return (
		<Layout title="App" color="blue">
			<Text wrap={'wrap'}>{children}</Text>
		</Layout>
	);
}
