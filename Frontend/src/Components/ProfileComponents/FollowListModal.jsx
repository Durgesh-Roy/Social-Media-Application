import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { findUsersByIds } from '../../api/userApi'
import { normalizeUser } from '../../api/normalize'

const FollowListModal = ({ open, title, userIds, onClose }) => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!open) return
        if (!userIds || userIds.length === 0) {
            setUsers([])
            return
        }
        let cancelled = false
        setLoading(true)
        setError('')
        findUsersByIds(userIds)
            .then((res) => {
                if (cancelled) return
                setUsers((res || []).map(normalizeUser))
            })
            .catch(() => { if (!cancelled) setError('Could not load list') })
            .finally(() => { if (!cancelled) setLoading(false) })
        return () => { cancelled = true }
    }, [open, userIds])

    if (!open) return null

    const goTo = (username) => {
        onClose?.()
        navigate(`/username/${username}`)
    }

    return (
        <div
            className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'
            onClick={onClose}
        >
            <div
                className='bg-white rounded-xl w-full max-w-sm overflow-hidden shadow-xl flex flex-col max-h-[70vh]'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex items-center justify-between px-5 py-3 border-b'>
                    <p className='font-semibold text-base capitalize'>{title}</p>
                    <IoClose className='text-2xl cursor-pointer hover:opacity-60' onClick={onClose} />
                </div>

                <div className='flex-1 overflow-y-auto px-2 py-2'>
                    {loading && <p className='text-sm opacity-60 text-center py-6'>Loading...</p>}
                    {error && <p className='text-sm text-red-500 text-center py-6'>{error}</p>}
                    {!loading && !error && users.length === 0 && (
                        <p className='text-sm opacity-60 text-center py-6'>No users yet.</p>
                    )}
                    {users.map((u) => (
                        <div
                            key={u.id}
                            onClick={() => goTo(u.username)}
                            className='flex items-center px-3 py-2 hover:bg-gray-50 rounded-md cursor-pointer'
                        >
                            <img
                                className='w-11 h-11 rounded-full object-cover shrink-0'
                                src={u.avatar || 'https://via.placeholder.com/44'}
                                alt={u.username}
                            />
                            <div className='ml-3 min-w-0 flex-1'>
                                <p className='font-semibold text-sm truncate'>{u.username}</p>
                                <p className='text-sm opacity-60 truncate'>{u.fullName}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FollowListModal
