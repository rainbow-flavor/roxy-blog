import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Wallpaper from '@site/static/img/wallpaper.png';

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
    return <section className={styles.features}></section>;
}

export function NerdHompageFeatures() {
    return (
        <div className={styles.nerdFeature}>
            <img src={Wallpaper} alt="Roxy 월페이퍼" />
        </div>
    );
}
