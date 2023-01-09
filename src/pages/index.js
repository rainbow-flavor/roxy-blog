import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Wallpaper from '@site/static/img/wallpaper.png';
import styles from './index.module.css';

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="FB DEVELO4's BLOG 에 어서오세요! Front 와 BackEnd 기술 문서와 간단한 블로깅을 함께하고 있습니다! <head />"
        >


            <main className={styles.main}>
                <img src={Wallpaper} alt="Roxy 월페이퍼" />
            </main>
        </Layout>
    );
}
