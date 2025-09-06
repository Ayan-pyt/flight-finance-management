import axios from 'axios';

// This creates a central configuration for all your API calls.
// By setting baseURL to '/', we ensure all requests are relative.
// For example, API.post('/auth/login') will go to '/auth/login',
// which the proxy will then correctly forward to your backend.
const API = axios.create({ baseURL: '/' });

export default API;