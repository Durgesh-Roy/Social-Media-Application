import axios from 'axios'
import api, { API_BASE, TOKEN_KEY } from './axiosClient'

// /signup expects { userName, name, email, password } and returns the saved User.
export const signupRequest = async ({ userName, name, email, password }) => {
    const { data } = await axios.post(`${API_BASE}/signup`, {
        userName, name, email, password,
    })
    return data
}

// /signin uses HTTP Basic auth (email + password). JWT comes back in the
// `Authorization` response header as a raw token (no "Bearer " prefix).
export const signinRequest = async ({ email, password }) => {
    const resp = await axios.get(`${API_BASE}/signin`, {
        auth: { username: email, password },
    })
    const rawToken = resp.headers.authorization || resp.headers.Authorization
    if (!rawToken) throw new Error('No token returned from server')
    const bearer = `Bearer ${rawToken}`
    localStorage.setItem(TOKEN_KEY, bearer)
    return { user: resp.data, token: bearer }
}

export const fetchCurrentUser = async () => {
    const { data } = await api.get('/api/users/req')
    return data
}

export const logout = () => localStorage.removeItem(TOKEN_KEY)

export const requestPasswordReset = async (email) => {
    const { data } = await axios.post(`${API_BASE}/auth/forgot-password`, null, {
        params: { email },
    })
    return data
}

export const resetPassword = async (token, newPassword) => {
    const { data } = await axios.post(`${API_BASE}/auth/reset-password`, null, {
        params: { token, newPassword },
    })
    return data
}
