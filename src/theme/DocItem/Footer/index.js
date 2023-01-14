import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/theme-common/internal';
import LastUpdated from '@theme/LastUpdated';
import EditThisPage from '@theme/EditThisPage';
import TagsListInline from '@theme/TagsListInline';
import styles from './styles.module.css';

function TagsRow(props) {
    return (
        <div
            className={clsx(
                ThemeClassNames.docs.docFooterTagsRow,
                'row margin-bottom--sm'
            )}
        >
            <div className="col">
                <TagsListInline {...props} />
            </div>
        </div>
    );
}
function EditMetaRow({
    editUrl,
    lastUpdatedAt,
    lastUpdatedBy,
    formattedLastUpdatedAt,
}) {
    return (
        <div className={clsx(ThemeClassNames.docs.docFooterEditMetaRow, 'row')}>
            <div className="col">
                {editUrl && <EditThisPage editUrl={editUrl} />}
            </div>

            <div className={clsx('col', styles.lastUpdated)}>
                {(lastUpdatedAt || lastUpdatedBy) && (
                    <LastUpdated
                        lastUpdatedAt={lastUpdatedAt}
                        formattedLastUpdatedAt={formattedLastUpdatedAt}
                        lastUpdatedBy={lastUpdatedBy}
                    />
                )}
            </div>
        </div>
    );
}
export default function DocItemFooter() {
    // const { isDarkTheme } = useThemeContext();
    const { metadata } = useDoc();
    const {
        editUrl,
        lastUpdatedAt,
        formattedLastUpdatedAt,
        lastUpdatedBy,
        tags,
    } = metadata;
    const canDisplayTagsRow = tags.length > 0;
    const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
    const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow;

    const [views, setViews] = useState(0);
    const [ip, setIp] = useState('');

    const getIp = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.ipify.org?format=json', true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            setIp(data.ip);
        };
        xhr.send();
    };

    const fetchViewCount = async () => {
        const url =
            process.env.NODE_ENV === 'development'
                ? `http://localhost:8080/views`
                : 'http://roxy-api-service/views';

        const urlPath = window.location.pathname;
        const body = {
            urlPath,
            ip,
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

    const EYE_LIGHT_IMG_URL =
        require('/src/theme/DocItem/Footer/eye-light.png').default;
    const EYE_DARK_IMG_URL =
        require('/src/theme/DocItem/Footer/eye-dark.png').default;

    useEffect(() => {
        getIp();
    }, []);

    useEffect(() => {
        if (ip) {
            fetchViewCount();
        }
    }, [ip]);

    if (!canDisplayFooter) {
        return null;
    }

    return (
        <footer
            className={clsx(ThemeClassNames.docs.docFooter, 'docusaurus-mt-lg')}
        >
            <div className={styles.viewCount}>
                <img src={EYE_DARK_IMG_URL} alt="" />
                {views}
            </div>
            {canDisplayTagsRow && <TagsRow tags={tags} />}

            {canDisplayEditMetaRow && (
                <EditMetaRow
                    editUrl={editUrl}
                    lastUpdatedAt={lastUpdatedAt}
                    lastUpdatedBy={lastUpdatedBy}
                    formattedLastUpdatedAt={formattedLastUpdatedAt}
                />
            )}
        </footer>
    );
}
