import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { followUser, unfollowUser } from '../../api/userApi'

const SuggestionCard = ({ user, initiallyFollowing = false }) => {
  const navigate = useNavigate()
  const [isFollowing, setIsFollowing] = useState(initiallyFollowing)
  const [showConfirm, setShowConfirm] = useState(false)
  const [busy, setBusy] = useState(false)

  const goToProfile = () => {
    if (user?.username) navigate(`/username/${user.username}`)
  }

  const handleClick = async () => {
    if (busy) return
    if (isFollowing) {
      setShowConfirm(true)
      return
    }
    setBusy(true)
    try {
      await followUser(user.id)
      setIsFollowing(true)
    } catch {
      // leave state unchanged
    } finally {
      setBusy(false)
    }
  }

  const confirmUnfollow = async () => {
    setBusy(true)
    try {
      await unfollowUser(user.id)
      setIsFollowing(false)
    } catch {
      // ignore
    } finally {
      setBusy(false)
      setShowConfirm(false)
    }
  }

  return (
    <div className='flex justify-between items-center'>
      <div onClick={goToProfile} className='flex items-center cursor-pointer hover:opacity-80'>
        <img
          className='w-9 h-9 rounded-full object-cover'
          src={user?.avatar}
          alt={user?.username || ''}
        />
        <div className='ml-3'>
          <p className='text-sm font-semibold'>{user?.username}</p>
          <p className='text-sm font-semibold opacity-70'>{user?.fullName || 'Suggested for you'}</p>
        </div>
      </div>

      <p
        onClick={handleClick}
        className={`text-sm font-semibold cursor-pointer ${
          isFollowing ? 'text-black' : 'text-blue-500 hover:text-blue-700'
        } ${busy ? 'opacity-60' : ''}`}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </p>

      {showConfirm && (
        <div
          className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'
          onClick={() => !busy && setShowConfirm(false)}
        >
          <div
            className='bg-white rounded-xl w-full max-w-sm overflow-hidden'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex flex-col items-center pt-6 pb-3 px-6'>
              <img
                className='w-24 h-24 rounded-full object-cover'
                src={user?.avatar}
                alt={user?.username || ''}
              />
              <p className='mt-4 text-base text-center'>
                Unfollow <span className='font-semibold'>@{user?.username}</span>?
              </p>
            </div>
            <button
              onClick={confirmUnfollow}
              disabled={busy}
              className='w-full border-t py-3 text-sm font-semibold text-red-500 hover:bg-gray-50 disabled:opacity-60'
            >
              {busy ? 'Unfollowing...' : 'Unfollow'}
            </button>
            <button
              onClick={() => !busy && setShowConfirm(false)}
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

export default SuggestionCard
