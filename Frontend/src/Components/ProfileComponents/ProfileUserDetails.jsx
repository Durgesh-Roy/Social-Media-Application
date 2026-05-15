import React, { useEffect, useState } from 'react'
import { TbCircleDashed } from 'react-icons/tb'
import { IoSettingsOutline } from 'react-icons/io5'
import EditProfileModal from './EditProfileModal'
import FollowListModal from './FollowListModal'
import { useAuth } from '../../auth/AuthContext'
import { followUser, unfollowUser } from '../../api/userApi'

const Stat = ({ value, label, onClick }) => (
    <div
        onClick={onClick}
        className={`text-base ${onClick ? 'cursor-pointer hover:opacity-70' : ''}`}
    >
        <span className='font-semibold mr-2'>{value}</span>
        <span>{label}</span>
    </div>
)

const ProfileUserDetails = ({ user, postsCount = 0, isOwnProfile = false, onProfileUpdated }) => {
    const { currentUser, setCurrentUser } = useAuth()
    const [editOpen, setEditOpen] = useState(false)
    const [listType, setListType] = useState(null) // 'followers' | 'following' | null
    const [isFollowing, setIsFollowing] = useState(false)
    const [followBusy, setFollowBusy] = useState(false)
    const [showUnfollowConfirm, setShowUnfollowConfirm] = useState(false)

    useEffect(() => {
        if (!user || !currentUser) return
        setIsFollowing((currentUser.followingIds || []).includes(user.id))
    }, [user, currentUser])

    if (!user) return null

    const listIds = listType === 'followers'
        ? (user.followerIds || [])
        : listType === 'following'
            ? (user.followingIds || [])
            : []

    const updateLocalFollow = (nowFollowing) => {
        // keep auth context in sync so the Following badge on suggestions etc. updates
        if (!currentUser) return
        const ids = new Set(currentUser.followingIds || [])
        if (nowFollowing) ids.add(user.id); else ids.delete(user.id)
        setCurrentUser({
            ...currentUser,
            following: Array.from(ids),
        })
    }

    const handleFollowClick = async () => {
        if (followBusy) return
        if (isFollowing) {
            setShowUnfollowConfirm(true)
            return
        }
        setFollowBusy(true)
        try {
            await followUser(user.id)
            setIsFollowing(true)
            updateLocalFollow(true)
        } catch {
            // ignore
        } finally {
            setFollowBusy(false)
        }
    }

    const confirmUnfollow = async () => {
        setFollowBusy(true)
        try {
            await unfollowUser(user.id)
            setIsFollowing(false)
            updateLocalFollow(false)
        } catch {
            // ignore
        } finally {
            setFollowBusy(false)
            setShowUnfollowConfirm(false)
        }
    }

    return (
        <div className='py-10 w-full max-w-[935px] mx-auto'>
            <div className='flex items-center gap-16'>
                <div className='shrink-0'>
                    <img
                        className='w-36 h-36 rounded-full object-cover'
                        src={user.avatar || 'https://via.placeholder.com/144'}
                        alt={user.username}
                    />
                </div>

                <div className='flex-1 space-y-5'>
                    <div className='flex space-x-4 items-center'>
                        <p className='text-xl'>{user.username}</p>
                        {isOwnProfile ? (
                            <>
                                <button
                                    onClick={() => setEditOpen(true)}
                                    className='text-sm font-semibold bg-gray-100 hover:bg-gray-200 rounded-md px-4 py-1.5'
                                >
                                    Edit profile
                                </button>
                                <button className='text-sm font-semibold bg-gray-100 hover:bg-gray-200 rounded-md px-4 py-1.5'>
                                    View archive
                                </button>
                                <IoSettingsOutline className='text-2xl cursor-pointer' />
                            </>
                        ) : (
                            <button
                                onClick={handleFollowClick}
                                disabled={followBusy}
                                className={`text-sm font-semibold rounded-md px-4 py-1.5 disabled:opacity-60 ${
                                    isFollowing
                                        ? 'bg-gray-100 hover:bg-gray-200 text-black'
                                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                                }`}
                            >
                                {isFollowing ? 'Following' : 'Follow'}
                            </button>
                        )}
                        <TbCircleDashed className='text-2xl cursor-pointer' />
                    </div>

                    <div className='flex space-x-10'>
                        <Stat value={postsCount} label='posts' />
                        <Stat value={user.followers} label='followers' onClick={() => setListType('followers')} />
                        <Stat value={user.following} label='following' onClick={() => setListType('following')} />
                    </div>

                    <div>
                        <p className='font-semibold'>{user.fullName || user.username}</p>
                        {user.bio && <p className='text-sm whitespace-pre-line'>{user.bio}</p>}
                    </div>
                </div>
            </div>

            <EditProfileModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                onUpdated={onProfileUpdated}
            />

            <FollowListModal
                open={!!listType}
                title={listType || ''}
                userIds={listIds}
                onClose={() => setListType(null)}
            />

            {showUnfollowConfirm && (
                <div
                    className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'
                    onClick={() => !followBusy && setShowUnfollowConfirm(false)}
                >
                    <div
                        className='bg-white rounded-xl w-full max-w-sm overflow-hidden'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='flex flex-col items-center pt-6 pb-3 px-6'>
                            <img
                                className='w-24 h-24 rounded-full object-cover'
                                src={user.avatar || 'https://via.placeholder.com/96'}
                                alt={user.username}
                            />
                            <p className='mt-4 text-base text-center'>
                                Unfollow <span className='font-semibold'>@{user.username}</span>?
                            </p>
                        </div>
                        <button
                            onClick={confirmUnfollow}
                            disabled={followBusy}
                            className='w-full border-t py-3 text-sm font-semibold text-red-500 hover:bg-gray-50 disabled:opacity-60'
                        >
                            {followBusy ? 'Unfollowing...' : 'Unfollow'}
                        </button>
                        <button
                            onClick={() => !followBusy && setShowUnfollowConfirm(false)}
                            className='w-full border-t py-3 text-sm hover:bg-gray-50'
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileUserDetails
