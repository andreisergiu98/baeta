import CodeBlock from '@theme/CodeBlock';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

interface Props {
	package: string;
}

export function PackageManagerCreate(props: Props) {
	return (
		<Tabs groupId="package-manager">
			<TabItem value="yarn">
				<CodeBlock language="bash">yarn create {props.package}</CodeBlock>
			</TabItem>
			<TabItem value="npm">
				<CodeBlock language="bash">npx create-{props.package}</CodeBlock>
			</TabItem>
			<TabItem value="pnpm">
				<CodeBlock language="bash">pnpm create {props.package}</CodeBlock>
			</TabItem>
			<TabItem value="bun">
				<CodeBlock language="bash">bun create {props.package}</CodeBlock>
			</TabItem>
			<TabItem value="yarn-2" label="yarn 2+">
				<CodeBlock language="bash">yarn dlx create-{props.package}</CodeBlock>
			</TabItem>
		</Tabs>
	);
}
