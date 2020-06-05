import axios from 'axios';

const api = axios.create(
    {
        baseURL: 'http://934ee01d1322.ngrok.io'
    }
);

export default api;