import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import LogoBaeta from '@site/static/img/logo-baeta.svg';
import clsx from 'clsx';
import styles from './header.module.css';

export function HomeHeader() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<header className={clsx('hero', styles.heroBanner)}>
			<div className="container">
				<div className={styles.titleContainer}>
					<LogoBaeta className={styles.logo} />
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
