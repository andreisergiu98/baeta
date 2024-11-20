import { HomeFeatures } from '@site/components/home-features';
import { HomeHeader } from '@site/components/home-header';
import { HomeSnippets } from '@site/components/home-snippets';
import Layout from '@theme/Layout';

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
