import React from 'react'
import SuggestionCard from './SuggestionCard'

const HomeRight = () => {
  return (
    <div>
      <div>
        <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          <div>
            <img 
            className="w-12 h-12 rounded-full"
            src="https://cdn.pixabay.com/photo/2021/10/07/00/48/boat-6686952_1280.jpg"
             alt="" />
          </div>
          <div className='ml-3'>
            <p> FullName</p>
            <p className='opacity-70'>username</p>
          </div>
        </div>
        <div><p className='text-blue-700 text-semi-bold'>switch</p></div>
        </div>
        <div className='space-y-5 mt-10'>
          {[1,1,1,1,1,1].map((item) => <SuggestionCard/>)}
        </div>
        </div>
      
      
    </div>
  )
}

export default HomeRight
