import React from 'react'
import {TbCircleDashed} from "react-icons/tb"
const ProfileUserDetails = () => {
  return (
    <div className='py-10 w-full '>
      <div className='flex items-center'>
        <div className='w-[15%]'>
            <img
      className='w-32 h-32 rounded-full'
      src="https://cdn.pixabay.com/photo/2021/04/24/18/07/road-6204694_1280.jpg"
      alt=""
            />
        </div>
    
      <div className='space-y-5 '>
        <div className='flex space-x-10 items-center'>
            <p>username</p>
            <button>Edit Profile</button>
            <TbCircleDashed/>
        </div>
          
          <div className='flex space-x-10'>
            <div>
              <span className='font-semibold mr-2'>10</span>
              <span>posts</span>
            </div>
           <div>
              <span className='font-semibold mr-2'>5</span>
              <span>follower</span>
            </div>
            <div>
              <span className='font-semibold mr-2'>7</span>
              <span>following</span>
            </div>
            </div>
            <div>
              <p className='font-semibold'>Full Name</p>
              <p className='font-thin text-sm'>Code, Coffee, and Chill ☕💻. Software Developer</p>
            </div>
          </div>
          </div>
         </div>
  );
};
export default ProfileUserDetails;
