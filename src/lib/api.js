import axios from 'axios';

const API_URL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8080/api/v1'
        : 'https://roxy.iro.ooo/api/v1';

const api = axios.create({
    baseURL: API_URL,
});

export default api;
