import React, { type ComponentProps, type ComponentType } from 'react';
import styles from './feature.module.css';

export interface FeatureProps {
	title: string;
	Svg: ComponentType<ComponentProps<'svg'>>;
	description: JSX.Element;
}

export function Feature({ title, Svg, description }: FeatureProps) {
	return (
		<div className="col col--3">
			<div className="text--center margin-bottom--md">
				<Svg className={styles.featureSvg} role="img" />
			</div>
			<div className="text--center padding-horiz--md">
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
}
