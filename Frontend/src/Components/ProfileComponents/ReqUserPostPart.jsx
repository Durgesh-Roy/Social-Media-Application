import React, { useState } from 'react'
import { AiOutlineTable, AiOutlineUser } from 'react-icons/ai'
import { RiVideoAddLine } from 'react-icons/ri'
import { BiBookmark } from 'react-icons/bi'
import ReqUserPostCard from './ReqUserPostCard'

const tabs = [
    { tab: 'POSTS',  icon: <AiOutlineTable /> },
    { tab: 'REELS',  icon: <RiVideoAddLine /> },
    { tab: 'SAVED',  icon: <BiBookmark /> },
    { tab: 'TAGGED', icon: <AiOutlineUser /> },
]

const ReqUserPostPart = ({ posts = [] }) => {
    const [activeTab, setActiveTab] = useState('POSTS')

    return (
        <div className='max-w-[935px] mx-auto'>
            <div className='flex justify-center gap-12 border-t'>
                {tabs.map((item) => {
                    const isActive = activeTab === item.tab
                    return (
                        <div
                            key={item.tab}
                            onClick={() => setActiveTab(item.tab)}
                            className={`flex items-center gap-2 cursor-pointer py-4 text-xs tracking-widest ${
                                isActive
                                    ? 'border-t border-black -mt-px font-semibold'
                                    : 'opacity-60'
                            }`}
                        >
                            <span className='text-base'>{item.icon}</span>
                            <span>{item.tab}</span>
                        </div>
                    )
                })}
            </div>

            <div className='py-1'>
                {activeTab === 'POSTS' ? (
                    posts.length === 0 ? (
                        <div className='py-20 text-center opacity-60'>
                            <p className='text-sm'>No posts yet.</p>
                        </div>
                    ) : (
                        <div className='grid grid-cols-3 gap-1'>
                            {posts.map((post) => (
                                <ReqUserPostCard key={post.id} post={post} />
                            ))}
                        </div>
                    )
                ) : (
                    <div className='py-20 text-center opacity-60'>
                        <p className='text-sm'>Nothing to show here yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ReqUserPostPart
