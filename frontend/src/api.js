// api.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'YOUR_PRODUCTION_BACKEND_URL/api' // Replace with your actual production backend URL
    : 'http://localhost:5000/api', // Or whatever port your backend runs on
});

export default API;