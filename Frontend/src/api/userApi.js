import api from './axiosClient'

export const findUserById = async (id) => {
    const { data } = await api.get(`/api/users/id/${id}`)
    return data
}

export const findUserByUsername = async (username) => {
    const { data } = await api.get(`/api/users/username/${username}`)
    return data
}

export const followUser = async (followUserId) => {
    const { data } = await api.put(`/api/users/follow/${followUserId}`)
    return data
}

export const unfollowUser = async (userId) => {
    const { data } = await api.put(`/api/users/unfollow/${userId}`)
    return data
}

export const findUsersByIds = async (userIds) => {
    if (!userIds || userIds.length === 0) return []
    const { data } = await api.get(`/api/users/m/${userIds.join(',')}`)
    return data
}

export const searchUsers = async (query) => {
    const { data } = await api.get(`/api/users/search`, { params: { q: query } })
    return data
}

export const fetchAllUsers = async () => {
    const { data } = await api.get('/api/users/all')
    return data
}

export const updateUser = async (user) => {
    const { data } = await api.put('/api/users/update', user)
    return data
}
