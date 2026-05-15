import api from './axiosClient'

export const createComment = async (postId, content) => {
    const { data } = await api.post(`/api/comments/create/${postId}`, { content })
    return data
}

export const fetchCommentsForPost = async (postId) => {
    const { data } = await api.get(`/api/comments/post/${postId}`)
    return data
}

export const likeComment = async (commentId) => {
    const { data } = await api.put(`/api/comments/like/${commentId}`)
    return data
}

export const unlikeComment = async (commentId) => {
    const { data } = await api.put(`/api/comments/unlike/${commentId}`)
    return data
}
