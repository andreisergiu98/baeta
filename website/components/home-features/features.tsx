import LogoGraphql from '@site/static/img/logo-graphql.svg';
import LogoModular from '@site/static/img/logo-modular.svg';
import LogoRocket from '@site/static/img/logo-rocket.svg';
import LogoTypescript from '@site/static/img/logo-typescript.svg';
import React from 'react';
import { Feature, FeatureProps } from './feature';
import styles from './feature.module.css';

const FeatureList: FeatureProps[] = [
  {
    title: 'Schema First',
    Svg: LogoGraphql,
    description: <>First class SDL support like you've never seen before.</>,
  },
  {
    title: 'Modular',
    Svg: LogoModular,
    description: <>Split your api into small, maintainable and extendable modules.</>,
  },
  {
    title: 'Type Safe',
    Svg: LogoTypescript,
    description: <>Baeta makes sure your resolvers are completely type safe.</>,
  },
  {
    title: 'Advanced Features',
    Svg: LogoRocket,
    description: <>Middlewares and directives out of the box. Extensible through plugins.</>,
  },
];

export function HomeFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
