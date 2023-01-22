import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Wallpaper from '@site/static/img/wallpaper.png';

const FeatureList = [
    {
        title: 'Easy to Learn',
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: <>개발자 공식 문서를 더욱 쉽게 공부해봅시다.</>,
    },
    {
        title: 'Focus on What Matters',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (
            <>
                새로운 기술이 나타났을 때, 어떤 배경으로 왜 태어났는지 <br />
                집중해봅시다.
            </>
        ),
    },
    {
        title: 'Powered by React',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (
            <>
                <code>react</code> <code>next.js</code> <code>web3</code>
            </>
        ),
    },
];
function Feature({ Svg, title, description }) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img" />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export function HomepageFeatures() {
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

export function NerdHompageFeatures() {
    return (
        <div className={styles.nerdFeature}>
            <img src={Wallpaper} alt="Roxy 월페이퍼" />
        </div>
    );
}
