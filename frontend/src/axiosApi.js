import axios from 'axios';
import {apiUrl} from "./config";

const axiosApi = axios.create({
    baseURL: apiUrl,
});

export default axiosApi;