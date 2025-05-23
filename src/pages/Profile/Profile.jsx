import React from 'react'
import ProfileUserDetails from '../../Components/ProfileComponents/ProfileUserDetails';
import ReqUserPostPart from '../../Components/ProfileComponents/ReqUserPostPart';
import ReqUserPostCard from '../../Components/ProfileComponents/ReqUserPostCard';

const Profile = () => {
  return (
    <div className='px-20'>
        <div className=''>
            <ProfileUserDetails />
        </div>
      <div>
        <ReqUserPostPart/>
      </div>
      <div>
        <ReqUserPostCard />
      </div>
    </div>
  )
}

export default Profile
