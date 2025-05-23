import React, { useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
const CommentCard = () => {
  
    const [isCommentLiked, setIsCommentLiked] = useState(false);
    const handleLikeComment = () => {
        setIsCommentLiked(!isCommentLiked);
    }
    return (
    <div>
      <div className='flex items-center justify-between py-3'>
        <div className='flex items-center'>
            <div>
            <img className='h-9 w-9 rounded-full' 
            src="https://cdn.pixabay.com/photo/2025/05/09/01/22/waiting-9588284_1280.jpg"
             alt="" />
        </div>
        <div className='ml-3'>
            <p>
                <span className='font-semibold'>username</span>
                <span className='ml-2'>comment text</span>
            </p>
            <div className='flex items-center text-sm space-x-3 opacity-60 pt-2'>
                <span>1 min ago</span>
                <span> 23 likes</span>
            </div>
            
        </div>
      </div>

      {isCommentLiked? <AiFillHeart onClick={handleLikeComment} className='text-xs hover:opacity-50 cursor-pointer text-red-600'/> : <AiOutlineHeart onClick={handleLikeComment} className='text-xs hover:opacity-50 cursor-pointer'/>}
    </div>
    </div>
  )
}

export default CommentCard
