import axios from 'axios'

export const API_BASE = 'http://localhost:5454'
export const TOKEN_KEY = 'insta_token'

const api = axios.create({ baseURL: API_BASE })

api.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) config.headers.Authorization = token
    return config
})

export default api
