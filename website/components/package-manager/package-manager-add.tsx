import CodeBlock from '@theme/CodeBlock';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

interface Props {
	package: string;
	dev?: boolean;
}

export function PackageManagerAdd(props: Props) {
	const devFlag = props.dev ? ' -D' : '';
	return (
		<Tabs groupId="package-manager">
			<TabItem value="yarn">
				<CodeBlock language="bash">
					yarn add {props.package}
					{devFlag}
				</CodeBlock>
			</TabItem>
			<TabItem value="npm">
				<CodeBlock language="bash">
					npm install {props.package}
					{devFlag}
				</CodeBlock>
			</TabItem>
			<TabItem value="pnpm">
				<CodeBlock language="bash">
					pnpm add {props.package}
					{devFlag}
				</CodeBlock>
			</TabItem>
			<TabItem value="bun">
				<CodeBlock language="bash">
					bun add {props.package}
					{devFlag}
				</CodeBlock>
			</TabItem>
		</Tabs>
	);
}
