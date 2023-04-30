import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'https://github.com/Nam3001/trello/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosClient
