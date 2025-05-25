import React, { useEffect } from 'react';
import StoryCircle from '../../Components/Story/StoryCircle';
import HomeRight from '../../Components/HomeRight/HomeRight';
import PostCard from '../../Components/Post/PostCard';
import CreatePostModal from '../../Components/Post/CreatePostModal';

const Homepage = () => {
 
  return (
    <div>
      <div className='mt-10 flex w-[100%] justify-center'>
        <div className="w-[44%] px-10">
          <div className='storyDiv flex space-x-2 border p-4 rounded-md justify-start w-full'>
            {[1,1,1,1].map((item) => <StoryCircle/>)}
          </div>
          <div className='space-y-10 w-full mt-10'>
            {[1,1,1,1].map((item) => <PostCard/>)}
          </div>
        </div>
        <div className='w-[25%]'>
          <HomeRight/>
        </div>
      </div>
      <CreatePostModal />
    </div>
  )
}

export default Homepage;
