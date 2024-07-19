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
        <>
            <div className="flex flex-col justify-start pt-20 md:pt-0 md:justify-center items-center h-[calc(100vh-var(--ifm-navbar-height))]">

                <div className="flex justify-center px-5 gap-5 mb-2">
                    <div className="rounded-3xl shadow-md overflow-hidden w-full max-w-[280px]">
                        <img
                            className="w-full h-full object-cover"
                            src={HankImg}
                            alt="Hank"
                        />
                    </div>

                    <div className="rounded-3xl shadow-md overflow-hidden w-full max-w-[280px]">
                        <img
                            className="w-full h-full object-cover"
                            src={IrostubImg}
                            alt="Irostub"
                        />
                    </div>
                </div>


                <div className="flex flex-col items-center justify-center">
                    <h1 className="hero__title mb-4 text-4xl sm:text-6xl md:text-7xl font-bold mb-10"
                        style={{color: 'var(--ifm-color-primary)', fontFamily: `"Montserrat", sans-serif`}}>
                        Hello from {siteConfig.title}
                    </h1>
                    {/*<p className="dark:color-white text-lg mb-2">*/}
                    {/*    {siteConfig.tagline}*/}
                    {/*</p>*/}

                    <button
                        // className="button button--secondary button--md"
                        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        <Link
                            href="/front/js/functional-programming/iterator"
                            className={styles.buttonLink}
                        >
                            글 보러가기
                        </Link>
                    </button>
                </div>
            </div>
        </>
    );
};

export default HomepageHeader;
