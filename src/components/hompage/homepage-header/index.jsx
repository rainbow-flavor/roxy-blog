import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import clsx from 'clsx';
import HankImg from '@site/static/img/hank-profile.png';
import IrostubImg from '@site/static/img/irostub-profile.jpeg';
import Link from '@docusaurus/core/lib/client/exports/Link';

const HomepageHeader = () => {
    const { siteConfig } = useDocusaurusContext();

    return (
        <header className={clsx('hero--primary', styles.header)}>
            <div className={styles.profileContainer}>
                <div className={styles.profile}>
                    <img
                        className={styles.profileImg}
                        src={HankImg}
                        alt="Hank"
                    />
                </div>

                <div className={styles.profile}>
                    <img
                        className={styles.profileImg}
                        src={IrostubImg}
                        alt="Irostub"
                    />
                </div>
            </div>

            <div className={styles.titleContainer}>
                <h1 className="hero__title">Hello from {siteConfig.title}</h1>
                <p className={clsx('hero__subtitle', styles.subTitle)}>
                    {siteConfig.tagline}
                </p>

                <button className="button button--secondary button--md">
                    <Link href="/front/js/functional-programming/iterator" className={styles.buttonLink}>
                        글 보러가기
                    </Link>
                </button>
            </div>
        </header>
    );
};

export default HomepageHeader;
