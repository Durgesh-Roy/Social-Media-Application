import React, { useState, useMemo } from 'react'
import { BsEmojiSmile } from 'react-icons/bs'
import { RiSendPlaneLine } from 'react-icons/ri'
import { FiPhone, FiVideo, FiInfo } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
import { currentUser, conversations, findUser, getMessages } from '../../data/mockData'

const ConversationRow = ({ conv, active, onClick }) => {
    const user = findUser(conv.userId)
    return (
        <div
            onClick={onClick}
            className={`flex items-center px-4 py-2 cursor-pointer ${active ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
        >
            <div className='relative shrink-0'>
                <img className='w-14 h-14 rounded-full object-cover' src={user.avatar} alt={user.username} />
                {conv.online && (
                    <span className='absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full' />
                )}
            </div>
            <div className='ml-3 min-w-0 flex-1'>
                <p className='text-sm font-medium truncate'>{user.fullName}</p>
                <p className={`text-xs truncate ${conv.unread ? 'font-semibold text-black' : 'opacity-60'}`}>
                    {conv.lastMessage} <span className='opacity-50'>· {conv.timeAgo}</span>
                </p>
            </div>
            {conv.unread && <span className='ml-2 w-2 h-2 rounded-full bg-blue-500 shrink-0' />}
        </div>
    )
}

const MessageBubble = ({ message }) => (
    <div className={`flex ${message.fromMe ? 'justify-end' : 'justify-start'} mb-1`}>
        <div
            className={`max-w-[60%] px-3 py-2 rounded-3xl text-sm break-words ${
                message.fromMe ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'
            }`}
        >
            {message.text}
        </div>
    </div>
)

const Messages = () => {
    const [selectedId, setSelectedId] = useState(conversations[0]?.id)
    const [draft, setDraft] = useState('')

    const selectedConv = useMemo(
        () => conversations.find(c => c.id === selectedId),
        [selectedId]
    )
    const selectedUser = selectedConv ? findUser(selectedConv.userId) : null
    const messages = selectedId ? getMessages(selectedId) : []

    const handleSend = () => {
        if (!draft.trim()) return
        setDraft('')
    }

    return (
        <div className='flex h-screen border-l border-slate-200'>
            <aside className='w-[360px] border-r border-slate-200 flex flex-col shrink-0'>
                <div className='px-5 py-5 border-b border-slate-200'>
                    <p className='font-semibold text-lg'>{currentUser.username}</p>
                </div>
                <div className='flex justify-between items-center px-5 py-3'>
                    <p className='font-semibold'>Messages</p>
                    <p className='text-sm opacity-60 cursor-pointer'>Requests</p>
                </div>
                <div className='flex-1 overflow-y-auto'>
                    {conversations.map(conv => (
                        <ConversationRow
                            key={conv.id}
                            conv={conv}
                            active={conv.id === selectedId}
                            onClick={() => setSelectedId(conv.id)}
                        />
                    ))}
                </div>
            </aside>

            {selectedUser ? (
                <section className='flex-1 flex flex-col min-w-0'>
                    <header className='flex items-center justify-between px-5 py-3 border-b border-slate-200'>
                        <div className='flex items-center min-w-0'>
                            <img
                                className='w-10 h-10 rounded-full object-cover shrink-0'
                                src={selectedUser.avatar}
                                alt={selectedUser.username}
                            />
                            <div className='ml-3 min-w-0'>
                                <p className='font-semibold text-sm truncate'>{selectedUser.fullName}</p>
                                <p className='text-xs opacity-60'>
                                    {selectedConv.online ? 'Active now' : `Active ${selectedConv.timeAgo} ago`}
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center space-x-4 text-xl'>
                            <FiPhone className='cursor-pointer hover:opacity-60' />
                            <FiVideo className='cursor-pointer hover:opacity-60' />
                            <FiInfo className='cursor-pointer hover:opacity-60' />
                        </div>
                    </header>

                    <div className='flex-1 overflow-y-auto px-5 py-4 bg-white'>
                        <div className='flex flex-col items-center mb-6'>
                            <img className='w-20 h-20 rounded-full object-cover' src={selectedUser.avatar} alt='' />
                            <p className='font-semibold mt-3'>{selectedUser.fullName}</p>
                            <p className='text-sm opacity-60'>{selectedUser.username} · Instagram</p>
                            <button className='mt-3 text-sm border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-50'>
                                View profile
                            </button>
                        </div>
                        {messages.map(m => <MessageBubble key={m.id} message={m} />)}
                    </div>

                    <footer className='px-4 pb-4'>
                        <div className='flex items-center border rounded-full px-4 py-2'>
                            <BsEmojiSmile className='text-xl opacity-70' />
                            <input
                                className='flex-1 outline-none px-3 text-sm bg-transparent'
                                placeholder='Message...'
                                value={draft}
                                onChange={e => setDraft(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
                            />
                            {draft.trim() ? (
                                <RiSendPlaneLine
                                    onClick={handleSend}
                                    className='text-xl text-blue-500 cursor-pointer hover:opacity-80'
                                />
                            ) : (
                                <AiOutlineHeart className='text-xl opacity-70 cursor-pointer' />
                            )}
                        </div>
                    </footer>
                </section>
            ) : (
                <section className='flex-1 flex flex-col items-center justify-center text-center px-6'>
                    <div className='w-24 h-24 rounded-full border-2 border-black flex items-center justify-center mb-4'>
                        <RiSendPlaneLine className='text-4xl' />
                    </div>
                    <p className='text-xl'>Your messages</p>
                    <p className='text-sm opacity-60 mt-1'>Send a message to start a chat.</p>
                </section>
            )}
        </div>
    )
}

export default Messages
