import axios from 'axios';
import { MovieConfiguration } from '../../types/movie.types';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.themoviedb.org/3';
const VITE_REACT_APP_ACCESS_TOKEN = import.meta.env.VITE_REACT_APP_ACCESS_TOKEN;

export const configService = {
    initialize: () => {
        axios.defaults.baseURL = VITE_API_BASE_URL;
        axios.defaults.headers.common['Authorization'] = `Bearer ${VITE_REACT_APP_ACCESS_TOKEN}`;
    },

    getConfiguration: () => 
        axios.get<MovieConfiguration>('/configuration'),
};