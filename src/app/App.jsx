import React, { useEffect } from 'react';
import Head from '@docusaurus/Head';

const App = ({ children }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.innerHTML = `
                window.WhatapBrowserAgent = {
                    config: {
                        projectAccessKey: 'x4te823r4ri9p-x107ca46a3pivo-z16j3crpakvotc',
                        pcode: 30152,
                        sampleRate: 100,
                    },
                };
        `;
        document.body.appendChild(script);
    }, []);

    return (
        <>
            <Head></Head>
            {children}
        </>
    );
};

export default App;
