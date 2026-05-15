import React from 'react'
import { useNavigate } from 'react-router-dom'

const SearchUserCard = ({ user }) => {
  const navigate = useNavigate()
  const handleClick = () => navigate(`/username/${user?.username}`)

  return (
    <div onClick={handleClick} className='py-2 px-2 cursor-pointer hover:bg-gray-100 rounded-md'>
      <div className='flex items-center'>
        <img
          className='w-11 h-11 rounded-full object-cover shrink-0'
          src={user?.avatar}
          alt={user?.username || ''}
        />
        <div className='ml-3 min-w-0 flex-1'>
            <p className='font-semibold text-sm truncate'>{user?.username}</p>
            <p className='opacity-60 text-sm truncate'>{user?.fullName}</p>
        </div>
      </div>
    </div>
  )
}

export default SearchUserCard
