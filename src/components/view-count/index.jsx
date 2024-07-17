import React, { useEffect, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './index.module.css';
import api from '../../lib/api';

const EYE_LIGHT_IMG_URL = require('/static/img/eye_light.png').default;
const EYE_DARK_IMG_URL = require('/static/img/eye_dark.png').default;

const ViewCount = () => {
    const { colorMode } = useColorMode();
    const [views, setViews] = useState(0);
    const isDarkMode = colorMode === 'dark';

    const fetchViewCount = async () => {
        try {
            const { data } = await api.post(`/views`, {
                urlPath: window.location.pathname,
            });

            setViews(data.viewCount);
        } catch (err) {
            console.error(err);
        }
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
