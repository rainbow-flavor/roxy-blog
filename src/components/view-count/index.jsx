import React, { useEffect, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './index.module.css';
import { API_URL } from '../../constants/url';

const EYE_LIGHT_IMG_URL = require('/static/img/eye_light.png').default;
const EYE_DARK_IMG_URL = require('/static/img/eye_dark.png').default;

const ViewCount = () => {
    const { colorMode } = useColorMode();
    const [views, setViews] = useState(0);
    const isDarkMode = colorMode === 'dark';

    const fetchViewCount = async () => {
        const url = API_URL + '/views';

        const body = {
            urlPath: window.location.pathname,
        };
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();

        setViews(data.viewCount);
    };

    useEffect(() => {
        fetchViewCount();
    }, []);

    return (
        <div className={styles.wrapper}>
            <img
                src={isDarkMode ? EYE_DARK_IMG_URL : EYE_LIGHT_IMG_URL}
                alt=""
            />
            {views}
        </div>
    );
};

export default ViewCount;
