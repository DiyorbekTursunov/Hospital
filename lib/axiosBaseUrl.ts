import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://195.158.9.124:4109',
});

export default axiosInstance;
