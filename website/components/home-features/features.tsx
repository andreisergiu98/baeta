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
		description: <>Use GraphQL SDL to design modular, easy-to-maintain schemas.</>,
	},
	{
		title: 'Modular By Design',
		Svg: LogoModular,
		description: <>Split your code into small, manageable modules for better maintainability.</>,
	},
	{
		title: 'Type Safe',
		Svg: LogoTypescript,
		description: <>Out-of-the-box type safety with automatic code generation. </>,
	},
	{
		title: 'Flexible & Extensible',
		Svg: LogoRocket,
		description: <>Use only what you need — extend with plugins anytime.</>,
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
