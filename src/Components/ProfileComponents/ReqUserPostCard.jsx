import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { FaComment } from 'react-icons/fa'
import './ReqUserPostCard.css'
const ReqUserPostCard = () => {
  return (
    <div className='p-2'>
      <div className='post w-72 h-72'>
         <img className='cursor-pointer ' src="https://cdn.pixabay.com/photo/2016/11/29/04/23/little-girl-1867297_1280.jpg" alt="" />
         <div className='overlay'>
            <div className='overlay-text flex justify-between'>
                <div>
                    <AiFillHeart/> <span>10</span>
                </div>
                <div>
                    <FaComment/><span>30</span>
                </div>
                </div>
         </div>
      </div>
    </div>
  )
}

export default ReqUserPostCard
