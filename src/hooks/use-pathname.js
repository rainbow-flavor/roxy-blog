import React from 'react';
import { useLocation } from '@docusaurus/router';

const usePathname = () => {
    const { pathname } = useLocation();
    const folderUrl = pathname.split('/')[1];

    return {
        pathname,
        folderUrl,
    };
};

export default usePathname;
