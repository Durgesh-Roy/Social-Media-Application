import api from './axiosClient'

export const createPost = async (post) => {
    const { data } = await api.post('/api/posts/create', post)
    return data
}

export const findPostsByUserId = async (userId) => {
    const { data } = await api.get(`/api/posts/following/${userId}`)
    return data
}

export const findAllPostsByUserIds = async (userIds) => {
    if (!userIds || userIds.length === 0) return []
    const { data } = await api.get(`/api/posts/all/${userIds.join(',')}`)
    return data
}

export const fetchFeed = async () => {
    const { data } = await api.get('/api/posts/feed')
    return data
}

export const findPostById = async (postId) => {
    const { data } = await api.get(`/api/posts/${postId}`)
    return data
}

export const likePost = async (postId) => {
    const { data } = await api.put(`/api/posts/like/${postId}`)
    return data
}

export const unlikePost = async (postId) => {
    const { data } = await api.put(`/api/posts/unlike/${postId}`)
    return data
}

export const deletePost = async (postId) => {
    const { data } = await api.delete(`/api/posts/delete/${postId}`)
    return data
}

export const savePost = async (postId) => {
    const { data } = await api.put(`/api/posts/save_post/${postId}`)
    return data
}

export const unsavePost = async (postId) => {
    const { data } = await api.put(`/api/posts/unSave_post/${postId}`)
    return data
}

export const fetchSavedPosts = async () => {
    const { data } = await api.get('/api/posts/savedPost')
    return data
}
