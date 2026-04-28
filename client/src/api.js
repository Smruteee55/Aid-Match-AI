import axios from 'axios';

// This connects your Frontend to your Backend
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// This automatically attaches your "Token" to every request once you log in
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;