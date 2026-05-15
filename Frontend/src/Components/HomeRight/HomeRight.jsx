import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SuggestionCard from './SuggestionCard'
import { useAuth } from '../../auth/AuthContext'
import { fetchAllUsers } from '../../api/userApi'
import { normalizeUser } from '../../api/normalize'

const HomeRight = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [suggestions, setSuggestions] = useState([])
  const [error, setError] = useState('')

  const goToMyProfile = () => {
    if (currentUser?.username) navigate(`/username/${currentUser.username}`)
  }

  useEffect(() => {
    let cancelled = false
    fetchAllUsers()
      .then(users => {
        if (cancelled) return
        const normalized = (users || []).map(normalizeUser)
        setSuggestions(normalized)
      })
      .catch(() => {
        if (!cancelled) setError('Could not load suggestions')
      })
    return () => { cancelled = true }
  }, [])

  if (!currentUser) return null

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div onClick={goToMyProfile} className='flex items-center cursor-pointer hover:opacity-80'>
          <img
            className='w-12 h-12 rounded-full object-cover'
            src={currentUser.avatar || 'https://via.placeholder.com/64'}
            alt={currentUser.username}
          />
          <div className='ml-3'>
            <p className='font-semibold text-sm'>{currentUser.fullName || currentUser.username}</p>
            <p className='opacity-70 text-sm'>{currentUser.username}</p>
          </div>
        </div>
        <p className='text-blue-700 text-sm font-semibold cursor-pointer'>switch</p>
      </div>

      <div className='flex justify-between items-center mt-6 mb-2'>
        <p className='text-sm font-semibold opacity-70'>Suggested for you</p>
        <p className='text-xs font-semibold cursor-pointer'>See All</p>
      </div>

      {error && <p className='text-xs text-red-500'>{error}</p>}

      <div className='space-y-4'>
        {suggestions.map(u => (
          <SuggestionCard
            key={u.id}
            user={u}
            initiallyFollowing={currentUser.followingIds?.includes(u.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default HomeRight
