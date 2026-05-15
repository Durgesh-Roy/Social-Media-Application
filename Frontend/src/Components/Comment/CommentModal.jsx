import React, { useEffect, useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react'
import { BsBookmark, BsBookmarkFill, BsEmojiSmile, BsThreeDots } from 'react-icons/bs'
import CommentCard from './CommentCard'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { RiSendPlaneLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import './CommentModal.css'
import { fetchCommentsForPost, createComment } from '../../api/commentApi'
import EmojiPicker from '../Emoji/EmojiPicker'

const CommentModal = ({ onClose, isOpen, isPostLiked, isSaved, handlePostLike, handleSavePost, post }) => {
    const author = post?.author
    const navigate = useNavigate()
    const goToAuthorProfile = () => {
        if (author?.username) {
            onClose?.()
            navigate(`/username/${author.username}`)
        }
    }
    const [comments, setComments] = useState(post?.comments || [])
    const [draft, setDraft] = useState('')
    const [busy, setBusy] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showEmoji, setShowEmoji] = useState(false)

    useEffect(() => {
        if (!isOpen || !post?.id) return
        let cancelled = false
        setLoading(true)
        fetchCommentsForPost(post.id)
            .then((res) => { if (!cancelled) setComments(res || []) })
            .catch(() => { if (!cancelled) setComments(post?.comments || []) })
            .finally(() => { if (!cancelled) setLoading(false) })
        return () => { cancelled = true }
    }, [isOpen, post?.id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const text = draft.trim()
        if (!text || busy) return
        setBusy(true)
        try {
            const newComment = await createComment(post.id, text)
            setComments((prev) => [...prev, newComment])
            setDraft('')
        } catch {
            // noop
        } finally {
            setBusy(false)
        }
    }

    return (
        <div>
            <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody className='p-0'>
                        <div className='flex h-[75vh]'>
                            <div className='w-[55%] bg-black flex items-center justify-center'>
                                <img className='max-h-full max-w-full object-contain'
                                    src={post?.image}
                                    alt={post?.caption || ''} />
                            </div>
                            <div className='w-[45%] pl-5 pr-3 relative flex flex-col'>
                                <div className='flex justify-between items-center py-3'>
                                    <div onClick={goToAuthorProfile} className='flex items-center cursor-pointer hover:opacity-80'>
                                        <img className='w-9 h-9 rounded-full object-cover'
                                            src={author?.avatar}
                                            alt={author?.username || ''} />
                                        <div className='ml-2'>
                                            <p className='font-semibold text-sm'>{author?.username}</p>
                                            {post?.location && <p className='text-xs opacity-70'>{post.location}</p>}
                                        </div>
                                    </div>
                                    <BsThreeDots/>
                                </div>
                                <hr/>
                                <div className='comment flex-1 overflow-y-auto pr-2'>
                                    {loading && <p className='text-sm opacity-60 py-6 text-center'>Loading comments...</p>}
                                    {!loading && comments.length === 0 && (
                                        <p className='text-sm opacity-60 py-6 text-center'>No comments yet.</p>
                                    )}
                                    {comments.map((c) => <CommentCard key={c.id} comment={c} />)}
                                </div>
                                <div className='border-t pt-2 pb-3'>
                                    <div className='flex justify-between items-center w-full py-2'>
                                        <div className='flex items-center space-x-3'>
                                            {isPostLiked
                                                ? <AiFillHeart className='text-[1.4rem] hover:opacity-60 cursor-pointer text-red-700' onClick={handlePostLike} />
                                                : <AiOutlineHeart className='text-[1.4rem] hover:opacity-60 cursor-pointer' onClick={handlePostLike} />}
                                            <FaRegComment className="text-[1.3rem] hover:opacity-60 cursor-pointer"/>
                                            <RiSendPlaneLine className="text-[1.3rem] hover:opacity-60 cursor-pointer"/>
                                        </div>
                                        {isSaved
                                            ? <BsBookmarkFill className='text-[1.3rem] hover:opacity-60 cursor-pointer' onClick={handleSavePost} />
                                            : <BsBookmark className='text-[1.3rem] hover:opacity-60 cursor-pointer' onClick={handleSavePost} />}
                                    </div>
                                    <p className='font-semibold text-sm'>{post?.likes ?? 0} likes</p>
                                    <p className='opacity-60 text-xs'>{post?.timeAgo}</p>
                                    <form onSubmit={handleSubmit} className='flex border-t w-full items-center mt-2 pt-2 relative'>
                                        <BsEmojiSmile
                                            onClick={() => setShowEmoji((s) => !s)}
                                            className='cursor-pointer hover:opacity-70'
                                        />
                                        <EmojiPicker
                                            open={showEmoji}
                                            onSelect={(e) => { setDraft((d) => d + e); setShowEmoji(false) }}
                                            onClose={() => setShowEmoji(false)}
                                            anchor='top-left'
                                        />
                                        <input
                                            className='commentInput flex-1'
                                            type='text'
                                            placeholder='Add a comment...'
                                            value={draft}
                                            onChange={(e) => setDraft(e.target.value)}
                                        />
                                        {draft.trim() && (
                                            <button
                                                type='submit'
                                                disabled={busy}
                                                className='text-blue-500 font-semibold text-sm disabled:opacity-60'
                                            >
                                                {busy ? 'Posting...' : 'Post'}
                                            </button>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default CommentModal
