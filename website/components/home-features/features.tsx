import LogoGraphql from '@site/static/img/logo-graphql.svg';
import LogoModular from '@site/static/img/logo-modular.svg';
import LogoRocket from '@site/static/img/logo-rocket.svg';
import LogoTypescript from '@site/static/img/logo-typescript.svg';
import styles from './feature.module.css';
import { Feature, type FeatureProps } from './feature.tsx';

const featureList: FeatureProps[] = [
	{
		title: 'Schema First',
		Svg: LogoGraphql,
		description: (
			<>
				Define your API contract upfront with a clear, schema-first approach that ensures
				consistency and maintainability.
			</>
		),
	},
	{
		title: 'Modular By Design',
		Svg: LogoModular,
		description: (
			<>
				Build your API piece by piece. Baeta's modular architecture lets you organize code into
				small, maintainable modules.
			</>
		),
	},
	{
		title: 'Type Safe',
		Svg: LogoTypescript,
		description: (
			<>
				Focus on your logic while Baeta handles type safety with automatic code generation and
				TypeScript integration.
			</>
		),
	},
	{
		title: 'Flexible & Extensible',
		Svg: LogoRocket,
		description: (
			<>
				Use only what you need. Add powerful features through official extensions when your API
				grows.
			</>
		),
	},
];

const featureListWithIdx = featureList.map((props, idx) => ({ ...props, idx }));

export function HomeFeatures() {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{featureListWithIdx.map((props) => (
						<Feature key={props.idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
