import { useState } from 'react';

const useInput = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);
    const onChange = (e) => {
        setValue(e.target.value);
    };

    const resetValue = () => setValue(initialValue);

    return {
        value,
        onChange,
        resetValue,
    };
};

export default useInput;
