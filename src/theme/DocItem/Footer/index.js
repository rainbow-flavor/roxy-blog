import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { ThemeClassNames, useColorMode } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/theme-common/internal';
import LastUpdated from '@theme/LastUpdated';
import EditThisPage from '@theme/EditThisPage';
import TagsListInline from '@theme/TagsListInline';
import styles from './styles.module.css';
import useGetIp from '../../../hooks/useGetIp';

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
    const { colorMode } = useColorMode();
    const { metadata } = useDoc();
    const { ip } = useGetIp();
    const [views, setViews] = useState(0);

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

    const isDarkMode = colorMode === 'dark';
    const EYE_LIGHT_IMG_URL = require('/static/img/eye_light.png').default;
    const EYE_DARK_IMG_URL = require('/static/img/eye_dark.png').default;

    const fetchViewCount = async () => {
        const url =
            process.env.NODE_ENV === 'development'
                ? `http://localhost:8080/views`
                : 'http://roxy-api-service/views';

        const body = {
            urlPath: window.location.pathname,
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
                <img
                    src={isDarkMode ? EYE_DARK_IMG_URL : EYE_LIGHT_IMG_URL}
                    alt=""
                />
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
