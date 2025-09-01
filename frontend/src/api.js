// // api.js
// import axios from 'axios';

// const API = axios.create({
//   baseURL: process.env.NODE_ENV === 'production'
//     ? 'YOUR_PRODUCTION_BACKEND_URL/api' // Replace with your actual production backend URL
//     : 'http://localhost:5000/api', // Or whatever port your backend runs on
// });

// export default API;

// File: /src/api.js

import axios from 'axios';

// This creates a central configuration for all your API calls.
// By setting baseURL to '/', we ensure all requests are relative.
// For example, API.post('/auth/login') will go to '/auth/login',
// which the proxy will then correctly forward to your backend.
const API = axios.create({ baseURL: '/' });

export default API;