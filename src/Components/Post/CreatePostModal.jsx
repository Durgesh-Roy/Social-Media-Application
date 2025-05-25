import React, { useState } from 'react'
import { Modal,ModalOverlay,Button, ModalContent, ModalBody } from '@chakra-ui/react';
import { FaPhotoVideo } from 'react-icons/fa';
import './CreatePostModal.css';
import { GrEmoji } from 'react-icons/gr';
import { GoLocation } from "react-icons/go"
const CreatePostModal = ({onClose,isOpen}) => {
  const [IsDragOver, setIsDragOver] = useState(false);
  const [file,setFile]=useState(null);
  const[caption,setCaption]=useState();
  const handleDrop=(event)=>{
    event.preventDefault();
    const droppedFile=event.dataTransfer.files[0];
    if(droppedFile.type.startsWith("image/") || droppedFile.type.startsWith("video/")){
            setFile(droppedFile);
    }
  }
  const handleDragOver=(event)=>{
    event.preventDefault();
    event.dataTransfer.dropEffect="copy";
    setIsDragOver(true);
  }
  const handleDragLeave=()=>{
    setIsDragOver(false);
  }
  const handleOnChange=(event)=>{
    const file=event.target.files[0];
    if(file && (file.type.startsWith("image/") || file.type.startsWith("video/"))){
      setFile(file);
    }else{
      setFile(null);
      alert("pleasae select a valid image or video file");
    }
  }
  const handleCaptionChange=(event)=>{
    setCaption(event.target.value);
  }
  return (
    <div>
    <Modal size={"4xl"} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent> 
         <div className='flex justify-between px-10 py-1 items-center'>
          <p>Create New Post</p>
          <Button className='flex' variant={"ghost"}colorScheme={"blue"} size="sm">
            Share
            </Button>
         </div>
         <hr/>
          <ModalBody>
            <div className='h-[70vh] justify-between flex pb-5'>
        <div className='w-[50%]'>
          {!file && <div
         onDrop={handleDrop}
         onDragOver={handleDragOver}
         onDragLeave={handleDragLeave}
         className='drag-drop h-full'
         >
          <div>
            <FaPhotoVideo className='text-3xl'/>
            <p>Drag Photos or videos here</p>
          </div>
          <label htmlFor='file-upload' className='custom-file-upload'>
            Select from computer
          </label>
          <input className='fileInput' type='file' 
          id='file-upload' 
          accept='image/*,video/*' 
          onChange={handleOnChange}/>
         </div>
            }
             {
                file && <img className='max-h-full' src={URL.createObjectURL(file)} alt="" />
              }
           
         </div>
          <div className='w-[1px] border-2 h-full'>
            
            </div>
            <div className='w-[50%]'>
              <div className='flex items-center px-2'>
                <img className='w-7 h-7 rounded-full' 
                src="https://cdn.pixabay.com/photo/2025/05/13/15/00/nuthatch-9597737_1280.jpg" 
                alt="" />
                 <p className='font-semibold ml-4'>username</p>
              </div>
             <div className='px-2 '>
              <textarea placeholder='Write a caption'
               className='captionInput' 
               name='caption' 
               rows="8"
               onChange={handleCaptionChange}
               ></textarea>
             </div>
             <div className='flex justify-between px-2'>
              <GrEmoji/>
              <p className='opacity-70'>{caption?.length}/2,200</p>
             </div>
             <hr/>
             <div className='p-2 flex justify-between items-center'>
              <input className='locationInput' type="text" placeholder='location' name='location' />
              <GoLocation/>
             </div>
             <hr />
            </div>
         </div>
        </ModalBody>
      </ModalContent>
    </Modal>
    </div>
  )
}
export default CreatePostModal
