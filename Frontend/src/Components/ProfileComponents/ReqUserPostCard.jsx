import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { FaComment } from 'react-icons/fa'
import './ReqUserPostCard.css'

const ReqUserPostCard = ({ post }) => {
    return (
        <div className='post aspect-square w-full'>
            <img className='cursor-pointer' src={post?.image} alt='' />
            <div className='overlay'>
                <div className='overlay-text flex justify-center gap-6'>
                    <div className='flex items-center gap-2'>
                        <AiFillHeart /> <span>{post?.likes ?? 0}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <FaComment /> <span>{post?.comments ?? 0}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReqUserPostCard
