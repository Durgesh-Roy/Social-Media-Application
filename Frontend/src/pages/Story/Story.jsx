import React from 'react'
import { useLocation } from 'react-router-dom'
import StoryViewer from '../../Components/StoryComponents/StoryViewer'
import { usersWithStories } from '../../data/mockData'

const Story = () => {
    const location = useLocation()
    const startUserId = location.state?.userId
    const startIndex = Math.max(
        0,
        usersWithStories.findIndex(u => u.userId === startUserId)
    )

    return <StoryViewer usersWithStories={usersWithStories} startUserIndex={startIndex} />
}

export default Story
