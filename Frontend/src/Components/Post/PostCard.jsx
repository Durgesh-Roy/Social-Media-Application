import React, { useState, useEffect, useMemo } from 'react'
import { BsBookmark, BsBookmarkFill, BsEmojiSmile, BsThreeDots } from 'react-icons/bs'
import { RiSendPlaneLine } from 'react-icons/ri'
import { FaRegComment } from 'react-icons/fa'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import './PostCard.css'
import CommentModal from '../Comment/CommentModal'
import { useDisclosure } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { likePost, unlikePost, savePost, unsavePost, deletePost } from '../../api/postApi'
import { createComment } from '../../api/commentApi'
import { normalizePost } from '../../api/normalize'
import EmojiPicker from '../Emoji/EmojiPicker'

const PostCard = ({ post: initialPost }) => {
    const { currentUser } = useAuth()
    const navigate = useNavigate()
    const [post, setPost] = useState(initialPost)
    const author = post?.author

    const goToAuthorProfile = () => {
        if (author?.username) navigate(`/username/${author.username}`)
    }

    const initiallyLiked = useMemo(
        () => (post?.likedByUserIds || []).includes(currentUser?.id),
        [post, currentUser]
    )
    const initiallySaved = useMemo(
        () => (currentUser?.savedPost || []).some(p => p.id === post?.id),
        [post, currentUser]
    )

    const [showDropdown, setShowDropdown] = useState(false)
    const [isPostLiked, setIsPostLiked] = useState(initiallyLiked)
    const [isSaved, setIsSaved] = useState(initiallySaved)
    const [draftComment, setDraftComment] = useState('')
    const [showEmoji, setShowEmoji] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => setPost(initialPost), [initialPost])
    useEffect(() => setIsPostLiked(initiallyLiked), [initiallyLiked])
    useEffect(() => setIsSaved(initiallySaved), [initiallySaved])

    const handlePostLike = async () => {
        if (!post?.id) return
        const next = !isPostLiked
        // optimistic UI: flip the heart and adjust the count immediately
        setIsPostLiked(next)
        setPost((p) => p ? { ...p, likes: Math.max(0, (p.likes ?? 0) + (next ? 1 : -1)) } : p)
        try {
            const updated = next ? await likePost(post.id) : await unlikePost(post.id)
            // sync local state from the server-truth response
            setPost(normalizePost(updated))
            setIsPostLiked(
                (updated?.likedByUsers || []).some((u) => u.id === currentUser?.id)
            )
        } catch {
            // revert on failure
            setIsPostLiked(!next)
            setPost((p) => p ? { ...p, likes: Math.max(0, (p.likes ?? 0) + (next ? -1 : 1)) } : p)
        }
    }

    const handleSavePost = async () => {
        const next = !isSaved
        setIsSaved(next)
        try {
            if (next) await savePost(post.id)
            else await unsavePost(post.id)
        } catch {
            setIsSaved(!next)
        }
    }

    const handleDelete = async () => {
        try {
            await deletePost(post.id)
            setShowDropdown(false)
            window.location.reload()
        } catch {}
    }

    const handleSubmitComment = async (e) => {
        e.preventDefault()
        const text = draftComment.trim()
        if (!text) return
        try {
            await createComment(post.id, text)
            setDraftComment('')
        } catch {}
    }

    const handleClick = () => setShowDropdown(!showDropdown)
    const handleOpenCommentModal = () => onOpen()

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => { document.body.style.overflow = 'auto' }, 300)
        } else {
            document.body.style.overflow = 'hidden'
        }
    }, [isOpen])

    if (!post) return null

    return (
        <div>
            <div className='border rounded-md shadow-md'>
                <div className='flex justify-between items-center py-4 px-5'>
                    <div onClick={goToAuthorProfile} className='flex items-center cursor-pointer hover:opacity-80'>
                        <img className='h-12 w-12 rounded-full object-cover' src={author?.avatar} alt={author?.username || ''} />
                        <div className='pl-2'>
                            <p className='font-semibold text-sm'>{author?.username}</p>
                            <p className='font-thin text-sm'>{post?.location}</p>
                        </div>
                    </div>
                    {author?.id === currentUser?.id && (
                        <div className='dropdown'>
                            <BsThreeDots className='dots' onClick={handleClick} />
                            {showDropdown && (
                                <p onClick={handleDelete} className='bg-black text-white py-1 px-4 rounded-md cursor-pointer'>
                                    Delete
                                </p>
                            )}
                        </div>
                    )}
                </div>

                <div onDoubleClick={handlePostLike} className='w-full'>
                    <img className='w-full' src={post?.image} alt={post?.caption || ''} />
                </div>

                <div className='flex justify-between items-center w-full px-5 py-4'>
                    <div className='flex items-center space-x-2'>
                        {isPostLiked
                            ? <AiFillHeart className='text-[1.65rem] hover:opacity-60 cursor-pointer text-red-700' onClick={handlePostLike} />
                            : <AiOutlineHeart className='text-[1.65rem] hover:opacity-60 cursor-pointer' onClick={handlePostLike} />}
                        <FaRegComment onClick={handleOpenCommentModal} className="text-[1.3rem] hover:opacity-60 cursor-pointer" />
                        <RiSendPlaneLine className="text-2xl hover:opacity-60 cursor-pointer" />
                    </div>
                    {isSaved
                        ? <BsBookmarkFill className='text-[1.3rem] hover:opacity-60 cursor-pointer' onClick={handleSavePost} />
                        : <BsBookmark className='text-[1.3rem] hover:opacity-60 cursor-pointer' onClick={handleSavePost} />}
                </div>

                <div className='w-full px-5'>
                    <p>{post?.likes ?? 0} likes</p>
                    {post?.caption && (
                        <p className='py-1 text-sm'>
                            <span onClick={goToAuthorProfile} className='font-semibold mr-2 cursor-pointer hover:opacity-70'>{author?.username}</span>
                            {post.caption}
                        </p>
                    )}
                    <p onClick={handleOpenCommentModal} className='opacity-60 py-2 cursor-pointer'>
                        view all {post?.commentCount ?? 0} comments
                    </p>
                </div>

                <form onSubmit={handleSubmitComment} className='border-t'>
                    <div className='flex w-full items-center px-5 relative'>
                        <BsEmojiSmile
                            onClick={() => setShowEmoji((s) => !s)}
                            className='cursor-pointer hover:opacity-70'
                        />
                        <EmojiPicker
                            open={showEmoji}
                            onSelect={(e) => { setDraftComment((d) => d + e); setShowEmoji(false) }}
                            onClose={() => setShowEmoji(false)}
                            anchor='top-left'
                        />
                        <input
                            className='commentInput'
                            type='text'
                            placeholder='Add a comment...'
                            value={draftComment}
                            onChange={(e) => setDraftComment(e.target.value)}
                        />
                        {draftComment.trim() && (
                            <button type='submit' className='text-blue-500 font-semibold text-sm'>Post</button>
                        )}
                    </div>
                </form>
            </div>

            {isOpen && (
                <CommentModal
                    isPostLiked={isPostLiked}
                    isSaved={isSaved}
                    handlePostLike={handlePostLike}
                    onClose={onClose}
                    isOpen={isOpen}
                    handleSavePost={handleSavePost}
                    post={post}
                />
            )}
        </div>
    )
}

export default PostCard
