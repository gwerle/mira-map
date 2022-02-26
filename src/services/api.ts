import axios from 'axios';

const api = axios.create({
  baseURL: 'ttps://apimira.sharedgis.com/',
});

export default api;
