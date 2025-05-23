import React from 'react'

const SuggestionCard = () => {
  return (
    <div className='flex justify-between items-center'>
        <div className='flex items-center'>
            <img className='w-9 h-9 rounded-full' src="https://cdn.pixabay.com/photo/2023/02/18/04/38/man-7797279_1280.jpg"
             alt="" />
             <div>
             <p className='text-sm font-semibold'>username</p>
             <p className='text-sm font-semibold opacity-70'>Follows You</p>
             </div>
        </div>
        <p className='text-blue-700 text-sm font-semibold cursor-pointer'>
            Follow
        </p>
    </div>
  )
}

export default SuggestionCard
