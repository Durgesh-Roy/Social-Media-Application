import React, { useMemo, useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { likeComment, unlikeComment } from '../../api/commentApi'
import { useAuth } from '../../auth/AuthContext'

const CommentCard = ({ comment }) => {
    const { currentUser } = useAuth()
    const navigate = useNavigate()
    const author = comment?.user || {}
    const username = author.username || author.userName || ''
    const avatar = author.userImage || author.image || ''

    const initiallyLiked = useMemo(
        () => (comment?.likedByUsers || []).some(u => u.id === currentUser?.id),
        [comment, currentUser]
    )

    const [isCommentLiked, setIsCommentLiked] = useState(initiallyLiked)
    const [likeCount, setLikeCount] = useState(comment?.likedByUsers?.length ?? 0)

    const handleLikeComment = async () => {
        const next = !isCommentLiked
        setIsCommentLiked(next)
        setLikeCount((n) => n + (next ? 1 : -1))
        try {
            if (next) await likeComment(comment.id)
            else await unlikeComment(comment.id)
        } catch {
            setIsCommentLiked(!next)
            setLikeCount((n) => n + (next ? -1 : 1))
        }
    }

    const timeAgo = comment?.createdAt
        ? new Date(comment.createdAt).toLocaleString()
        : (comment?.timeAgo || '')

    const goToProfile = () => {
        if (username) navigate(`/username/${username}`)
    }

    return (
        <div>
            <div className='flex items-start justify-between py-3'>
                <div className='flex items-start'>
                    {avatar && (
                        <img
                            onClick={goToProfile}
                            className='h-9 w-9 rounded-full object-cover shrink-0 cursor-pointer'
                            src={avatar}
                            alt={username}
                        />
                    )}
                    <div className='ml-3'>
                        <p>
                            <span onClick={goToProfile} className='font-semibold cursor-pointer hover:opacity-70'>{username}</span>
                            <span className='ml-2'>{comment?.content || comment?.text}</span>
                        </p>
                        <div className='flex items-center text-xs space-x-3 opacity-60 pt-2'>
                            <span>{timeAgo}</span>
                            <span>{likeCount} likes</span>
                        </div>
                    </div>
                </div>

                {isCommentLiked
                    ? <AiFillHeart onClick={handleLikeComment} className='text-sm hover:opacity-50 cursor-pointer text-red-600 mt-3'/>
                    : <AiOutlineHeart onClick={handleLikeComment} className='text-sm hover:opacity-50 cursor-pointer mt-3'/>}
            </div>
        </div>
    )
}

export default CommentCard
