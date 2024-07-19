import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

import { useMainContext } from '../context/main-context';
import HomepageHeader from '../components/hompage/homepage-header';
import {
    HomepageFeatures,
    NerdHomepageFeatures,
} from '../components/homepage-feature';

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    const { isStrict } = useMainContext();

    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="FB DEVELO4's BLOG 에 어서오세요! Front 와 BackEnd 기술 문서와 간단한 블로깅을 함께하고 있습니다! <head />"
        >
            {isStrict && <HomepageHeader />}
            <main className={isStrict ? styles.strictMain : styles.main}>
                {isStrict ? <HomepageFeatures /> : <NerdHomepageFeatures />}
            </main>
        </Layout>
    );
}
