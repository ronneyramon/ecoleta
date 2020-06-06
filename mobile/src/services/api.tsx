import axios from 'axios';

const api = axios.create(
    {
        baseURL: 'http://6fef26bccfcb.ngrok.io'
    }
);

export default api;