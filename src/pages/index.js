import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Wallpaper from '@site/static/img/wallpaper.png';

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />"
        >
            <main style={{ lineHeight: '0', fontSize: '0' }}>
                <img src={Wallpaper} alt="Roxy 월페이퍼" />
            </main>
        </Layout>
    );
}
