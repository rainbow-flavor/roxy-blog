import React, { useEffect } from 'react';

const App = ({ children }) => {
    useEffect(() => {
        window.WhatapBrowserAgent = {
            config: {
                projectAccessKey: 'x4te823r4ri9p-x107ca46a3pivo-z16j3crpakvotc',
                pcode: 30152,
                sampleRate: 100,
            },
        };
    }, []);

    return children;
};

export default App;
