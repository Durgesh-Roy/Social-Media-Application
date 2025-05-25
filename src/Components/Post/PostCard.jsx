import React, { useState, useEffect } from 'react'
import { BsBookmark, BsBookmarkFill, BsEmojiSmile, BsThreeDots } from 'react-icons/bs'
import { RiSendPlaneLine } from 'react-icons/ri'
import { FaRegComment } from 'react-icons/fa'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import './PostCard.css'
import CommentModal from '../Comment/CommentModal'
import { useDisclosure } from '@chakra-ui/react'

const PostCard = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [isPostLiked, setIsPostLiked] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleSavePost = () => setIsSaved(!isSaved)
    const handlePostLike = () => setIsPostLiked(!isPostLiked)
    const handleClick = () => setShowDropdown(!showDropdown)
    const handleOpenCommentModal = () => onOpen()

    // 🛠 Reset body overflow after modal closes
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                document.body.style.overflow = 'auto'
            }, 300)
        } else {
            document.body.style.overflow = 'hidden'
        }
    }, [isOpen])

    return (
        <div>
            <div className='border rounded-md shadow-md'>
                <div className='flex justify-between items-center py-4 px-5'>
                    <div className='flex items-center'>
                        <img className='h-12 w-12 rounded-full' src="https://cdn.pixabay.com/photo/2025/05/09/01/22/waiting-9588284_1280.jpg" alt="" />
                        <div className='pl-2'>
                            <p className='font-semibold text-sm'>username</p>
                            <p className='font-thin text-sm'>location</p>
                        </div>
                    </div>
                    <div className='dropdown'>
                        <BsThreeDots className='dots' onClick={handleClick} />
                        {showDropdown && <p className='bg-black text-white py-1 px-4 rounded-md cursor-pointer'>Delete</p>}
                    </div>
                </div>

                <div onDoubleClick={handlePostLike} className='w-full'>
                    <img className='w-full' src="https://cdn.pixabay.com/photo/2023/04/05/21/09/bird-7902319_1280.jpg" alt="" />
                </div>

                <div className='flex justify-between items-center w-full px-5 py-4'>
                    <div className='flex items-center space-x-2'>
                        {isPostLiked ? (
                            <AiFillHeart className='text-[1.65rem] hover:opacity-60 cursor-pointer text-red-700' onClick={handlePostLike} />
                        ) : (
                            <AiOutlineHeart className='text-[1.65rem] hover:opacity-60 cursor-pointer' onClick={handlePostLike} />
                        )}
                        <FaRegComment onClick={handleOpenCommentModal} className="text-[1.3rem] hover:opacity-60 cursor-pointer" />
                        <RiSendPlaneLine className="text-2xl hover:opacity-60 cursor-pointer" />
                    </div>
                    <div>
                        {isSaved ? (
                            <BsBookmarkFill className='text-[1.3rem] hover:opacity-60 cursor-pointer' onClick={handleSavePost} />
                        ) : (
                            <BsBookmark className='text-[1.3rem] hover:opacity-60 cursor-pointer' onClick={handleSavePost} />
                        )}
                    </div>
                </div>

                <div className='w-full px-5'>
                    <p>10 likes</p>
                    <p className='opacity-60 py-2 cursor-pointer'>view all 10 comments</p>
                </div>

                <div className='border-t'>
                    <div className='flex w-full items-center px-5'>
                        <BsEmojiSmile />
                        <input className='commentInput' type="text" placeholder="Add a comment..." />
                    </div>
                </div>
            </div>

            {/* 🛠 Updated: Modal only renders when open */}
            {isOpen && (
                <CommentModal
                    isPostLiked={isPostLiked}
                    isSaved={isSaved}
                    handlePostLike={handlePostLike}
                    onClose={onClose}
                    isOpen={isOpen}
                    handleSavePost={handleSavePost}
                />
            )}
        </div>
    )
}

export default PostCard
