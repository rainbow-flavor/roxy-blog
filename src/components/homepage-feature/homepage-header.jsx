import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

const HomepageHeader = () => {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx('hero--primary', styles.heroBanner)}>
            <div className="container">
                <h1 className="hero__title">{siteConfig.title}</h1>
                <p className="hero__subtitle">{siteConfig.tagline}</p>

                <div className={styles.buttonGroup}>
                    <div className={styles.buttons}>
                        <Link
                            className="button button--secondary button--md"
                            to="/front/"
                        >
                            Frontend Development Post for Web
                        </Link>
                    </div>
                    <div className={styles.buttons}>
                        <Link
                            className="button button--secondary button--md"
                            to="/back/"
                        >
                            Backend Development Post for Web
                        </Link>
                    </div>
                    <div className={styles.buttons}>
                        <Link
                            className="button button--secondary button--md"
                            to="/infra/"
                        >
                            Infra Development Post for Web
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HomepageHeader;
