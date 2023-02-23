import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import React from 'react';

import styles from './header.module.css';

export function HomeHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.titleContainer}>
          <img className={styles.logo} src="/img/logo.svg" alt="Baeta Logo" />
          <h1 className="hero__title">{siteConfig.title}</h1>
        </div>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            Introduction
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/installation"
          >
            Getting Started
          </Link>
        </div>
      </div>
    </header>
  );
}
