import React from 'react'
import { Modal,ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react'
import { BsBookmark, BsBookmarkFill, BsEmojiSmile, BsThreeDots } from 'react-icons/bs'
import CommentCard from './CommentCard'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { RiSendPlaneLine } from 'react-icons/ri'
import './CommentModal.css'
const CommentModal = ({onClose,isOpen,isPostLiked,isSaved,handlePostLike,handleSavePost}) => {
  return (
    <div>
    <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent> 
        <ModalBody>
          <div className=' flex h-[75vh]'>
            <div className='w-[45%] flex flex-col justify-center'>
              <img className='max-h-full w-full'
               src="https://cdn.pixabay.com/photo/2025/05/09/01/22/waiting-9588284_1280.jpg"
               alt="" 
               />
            </div>
            <div className=' w-[55%] pl-10 relative'>
              <div className='flex justify-between items-center py-3'>
              <div className='flex items-center'>
                <div>
                  <img className="w-9 h-9 rounded-full"
                  src=
                  "https://cdn.pixabay.com/photo/2025/05/09/01/22/waiting-9588284_1280.jpg"
                   alt="" />
                </div>
                <div className='ml-2'>
                  <p >username</p>
                </div>
              </div>
              <BsThreeDots/>
            </div>
            <hr/> 
            <div className='comment'>
                {[1,1,1].map(()=><CommentCard 
                />)}
            </div> 
            <div className='absolute  bottom-0 w-[90%]' >
        <div className='flex justify-between items-center w-full py-2'>
            <div className='flex items-center space-x-2'>
                {isPostLiked ? 
                <AiFillHeart className='text-[1.4rem] hover:opacity-60 cursor-pointer text-red-700'
                onClick={handlePostLike} /> : 
                <AiOutlineHeart className='text-[1.4rem] hover:opacity-60 cursor-pointer'
                  onClick={handlePostLike} />}
                <FaRegComment className="text-[1.3rem] hover:opacity-60 cursor-pointer"/>
                <RiSendPlaneLine className="text-[1.3rem] hover:opacity-60 cursor-pointer"/>
            </div>
          <div>
            {isSaved ? (
            <BsBookmarkFill className='text-[1.3rem] hover:opacity-60 cursor-pointer'
                onClick={handleSavePost} />
            ) : (
            <BsBookmark className=' text-[1.3rem] hover:opacity-60 cursor-pointer'
              onClick={handleSavePost} />)}
            </div>
              </div>
            <div className='w-full '>
              <p>10 likes</p>
            <p className='opacity-60 text-sm'> 1 day ago</p>
            {/* <div className='border-t'> */}
            </div>
                <div className='flex border-t w-full items-center px-5'>
                    <BsEmojiSmile/>
                    <input className='commentInput' type="text" placeholder="Add a comment..." />
                </div>
              </div>
            </div>
            {/* </div> */}
            </div>
        </ModalBody>
      </ModalContent>
    </Modal>

    </div>
  )
};

export default CommentModal
