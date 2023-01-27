import React, { useState } from 'react';
import { MainContext } from '../context/main-context';

// Default implementation, that you can customize
export default function Root({ children, ...props }) {
    const [isStrict, setIsStrict] = useState(true);
    return (
        <MainContext.Provider value={{ isStrict, setIsStrict }}>
            {children}
        </MainContext.Provider>
    );
}
