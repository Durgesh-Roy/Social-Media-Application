import React from 'react'
import {TbCircleDashed} from "react-icons/tb";
const ProfileUserDetails = () => {
  return (
    <div className='py-10 w-full'>
      <div className='flex items-center'>
        <div className='w-[15%]'>
            <img
      className='w-32 h-32 rounded-full'
      src="https://cdn.pixabay.com/photo/2021/04/24/18/07/road-6204694_1280.jpg"
      alt=""
            />
        </div>
    
      <div>
        <div className='flex space-x-10 items-center'>
            <p>username</p>
            <button>Edit Profile</button>
            <TbCircleDashed />
        </div>
          </div>
      </div>
    </div>
  );
};
export default ProfileUserDetails;
