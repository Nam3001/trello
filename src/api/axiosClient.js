import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'https://fake-api-trello.herokuapp.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosClient
