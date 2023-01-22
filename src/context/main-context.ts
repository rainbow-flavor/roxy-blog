import { createContext, useContext } from 'react';

export const MainContext = createContext({
    isStrict: false,
    setIsStrict: null,
});

export const useMainContext = () => useContext(MainContext);
