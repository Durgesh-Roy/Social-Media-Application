import React from 'react'

const SearchUserCard = () => {
  return (
    <div className='py-2 cursor-pointer'>
      <div className='flex items-center'>
        <img className='w-10 h-10 rounded-full' src="https://cdn.pixabay.com/photo/2023/10/27/10/28/woman-8344944_1280.jpg" alt="" />
        <div>
            <p>Full name</p>
            <p className='opacity-70'>username</p>
        </div>
      </div>
    </div>
  )
}

export default SearchUserCard
