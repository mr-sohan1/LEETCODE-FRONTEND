import axios from "axios"

const axiosClient =  axios.create({
    baseURL: 'https://leetcode-backend-6lds.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;