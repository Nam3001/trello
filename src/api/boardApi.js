import axiosClient from './axiosClient'

const boardApi = {
    getAll() {
        return axiosClient.get('/boards')
    },
    getById(boardId) {
        return axiosClient.get(`boards/${boardId}`)
    },
    add(data) {
        return axiosClient.post(`/boards/${data}`)
    },
    update(id, payload) {
        return axiosClient.patch(`/boards/${id}`, payload)
    },
    delete(id) {
        return axiosClient.delete(`/boards/${id}`)
    },
}

export default boardApi
