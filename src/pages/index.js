import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import {
    HomepageFeatures,
    NerdHompageFeatures,
} from '../components/homepage-feature';
import { useMainContext } from '../context/main-context';
import HomepageHeader from '../components/hompage/homepage-header';

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
                {isStrict ? <HomepageFeatures /> : <NerdHompageFeatures />}
            </main>
        </Layout>
    );
}
