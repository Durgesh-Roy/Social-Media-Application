import React from 'react'
import { useNavigate } from 'react-router-dom'

const StoryCircle = ({ story, isYou = false }) => {
    const navigate = useNavigate()
    const handleNavigate = () => navigate('/story', { state: { userId: story?.userId } })

    const ring = story?.hasUnseenStory
        ? 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600'
        : 'bg-gray-300'

    return (
        <div onClick={handleNavigate} className='cursor-pointer flex flex-col items-center shrink-0 w-20'>
            <div className='relative'>
                <div className={`p-[2px] rounded-full ${ring}`}>
                    <div className='bg-white p-[2px] rounded-full'>
                        <img
                            className='w-16 h-16 rounded-full object-cover'
                            src={story?.avatar}
                            alt={story?.username || 'story'}
                        />
                    </div>
                </div>
                {isYou && (
                    <div
                        onClick={(e) => { e.stopPropagation(); handleNavigate() }}
                        className='absolute bottom-0 right-0 w-5 h-5 rounded-full bg-blue-500 border-2 border-white text-white flex items-center justify-center text-xs font-bold leading-none hover:bg-blue-600'
                        title='Add to your story'
                    >
                        +
                    </div>
                )}
            </div>
            <p className='text-xs mt-1 truncate w-full text-center'>
                {isYou ? 'Your story' : story?.username}
            </p>
        </div>
    )
}

export default StoryCircle