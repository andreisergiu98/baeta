import React from 'react';
import { Feature, FeatureProps } from './feature';
import styles from './feature.module.css';

const FeatureList: FeatureProps[] = [
  {
    title: 'Schema First',
    Svg: require('@site/static/img/logo-graphql.svg').default,
    description: <>Design your schema using the language made specifically for it.</>,
  },
  {
    title: 'GraphQL Modules',
    Svg: require('@site/static/img/logo-graphql-modules.svg').default,
    description: (
      <>GraphQL Modules is built in so you can split your schema into reusable modules.</>
    ),
  },
  {
    title: 'Type Safe',
    Svg: require('@site/static/img/logo-typescript.svg').default,
    description: (
      <>
        Implement your API using TypeScript. Baeta makes sure your resolvers are type
        safe.
      </>
    ),
  },
  {
    title: 'Advanced Features',
    Svg: require('@site/static/img/logo-rocket.svg').default,
    description: (
      <>
        Use directives to validate or mutate values, extend your api using middlewares and
        more...
      </>
    ),
  },
];

export function Features() {
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
