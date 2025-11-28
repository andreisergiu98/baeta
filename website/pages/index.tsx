import { HomeFeatures } from '@site/components/home-features/index.ts';
import { HomeHeader } from '@site/components/home-header/index.ts';
import { HomeSnippets } from '@site/components/home-snippets/index.ts';
import Layout from '@theme/Layout';
import type { JSX } from 'react';

export default function Home(): JSX.Element {
	return (
		<Layout description="Schema first without the hassle">
			<HomeHeader />
			<main>
				<HomeFeatures />
				<HomeSnippets />
			</main>
		</Layout>
	);
}
