import React, { useEffect, useState } from 'react';

const useGetIp = () => {
    const [ip, setIp] = useState('');

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        const data = JSON.parse(xhr.responseText);
        setIp(data.ip);
    };
    const getIp = () => {
        xhr.open('GET', 'https://api.ipify.org?format=json', true);
        xhr.send();
    };

    useEffect(() => {
        getIp();
    }, []);

    return { ip };
};

export default useGetIp;
