import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import Progressbar from './Progressbar.jsx'

const StoryViewer = ({ usersWithStories, startUserIndex = 0 }) => {
    const navigate = useNavigate()
    const [userIndex, setUserIndex] = useState(startUserIndex)
    const [frameIndex, setFrameIndex] = useState(0)

    const currentUser = usersWithStories[userIndex]
    const frames = currentUser?.frames || []

    const handleNext = () => {
        if (frameIndex < frames.length - 1) {
            setFrameIndex(frameIndex + 1)
        } else if (userIndex < usersWithStories.length - 1) {
            setUserIndex(userIndex + 1)
            setFrameIndex(0)
        } else {
            navigate('/')
        }
    }

    const handlePrev = () => {
        if (frameIndex > 0) {
            setFrameIndex(frameIndex - 1)
        } else if (userIndex > 0) {
            const prev = usersWithStories[userIndex - 1]
            setUserIndex(userIndex - 1)
            setFrameIndex(prev.frames.length - 1)
        }
    }

    useEffect(() => {
        const t = setTimeout(handleNext, 4000)
        return () => clearTimeout(t)
    }, [frameIndex, userIndex])

    const handleClose = () => navigate('/')

    if (!currentUser) return null

    const hasPrev = userIndex > 0 || frameIndex > 0
    const hasNext = userIndex < usersWithStories.length - 1 || frameIndex < frames.length - 1

    return (
        <div className='fixed inset-0 bg-black flex items-center justify-center z-50'>
            <IoClose
                onClick={handleClose}
                className='absolute top-5 right-6 text-white text-3xl cursor-pointer hover:opacity-70'
            />

            {hasPrev && (
                <button
                    onClick={handlePrev}
                    className='absolute left-[calc(50%-200px)] top-1/2 -translate-y-1/2 -translate-x-full bg-white/90 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md'
                    aria-label='Previous'
                >
                    <FiChevronLeft className='text-xl' />
                </button>
            )}

            {hasNext && (
                <button
                    onClick={handleNext}
                    className='absolute right-[calc(50%-200px)] top-1/2 -translate-y-1/2 translate-x-full bg-white/90 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md'
                    aria-label='Next'
                >
                    <FiChevronRight className='text-xl' />
                </button>
            )}

            <div className='relative w-[340px] h-[600px] mx-4'>
                <div className='absolute top-2 left-2 right-2 flex z-10'>
                    {frames.map((f, i) => (
                        <Progressbar
                            key={f.id}
                            index={i}
                            duration={4000}
                            activeIndex={frameIndex}
                        />
                    ))}
                </div>

                <div className='absolute top-6 left-3 right-3 flex items-center z-10'>
                    <img
                        src={currentUser.avatar}
                        alt={currentUser.username}
                        className='w-8 h-8 rounded-full object-cover border border-white/40'
                    />
                    <p className='ml-2 text-white text-sm font-semibold'>{currentUser.username}</p>
                    <p className='ml-2 text-white/70 text-xs'>{currentUser.postedAgo}</p>
                </div>

                <img
                    src={frames[frameIndex]?.image}
                    alt=''
                    className='w-full h-full object-cover rounded-lg'
                />
            </div>
        </div>
    )
}

export default StoryViewer
