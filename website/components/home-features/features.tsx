import LogoGraphql from '@site/static/img/logo-graphql.svg';
import LogoModular from '@site/static/img/logo-modular.svg';
import LogoRocket from '@site/static/img/logo-rocket.svg';
import LogoTypescript from '@site/static/img/logo-typescript.svg';
import React from 'react';
import styles from './feature.module.css';
import { Feature, type FeatureProps } from './feature.tsx';

const featureList: FeatureProps[] = [
	{
		title: 'Schema First',
		Svg: LogoGraphql,
		description: <>Schema-first approach for a consistent and well-defined API.</>,
	},
	{
		title: 'Modular',
		Svg: LogoModular,
		description: <>Modular architecture for easy organization and scalability.</>,
	},
	{
		title: 'Type Safe',
		Svg: LogoTypescript,
		description: (
			<>Automatic code generation for type safety, increased productivity, and reduced errors.</>
		),
	},
	{
		title: 'Advanced Features',
		Svg: LogoRocket,
		description: <>Extensible, including support for middlewares, directives and plugins.</>,
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
