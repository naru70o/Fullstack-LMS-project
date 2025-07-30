import axios from "axios"

console.log(typeof process.env.PORT)

const axiosInstance = axios.create({
    baseURL: process.env.PORT || 'http://localhost:3000/api/v1',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    withCredentials: true
});

export default axiosInstance;