export const API_URL =
    process.env.NODE_ENV === 'development'
        ? 'http://127.0.0.1:8080/api/v1'
        : 'https://roxy.iro.ooo/api/v1';
