import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`
  }
});

export default axiosInstance;