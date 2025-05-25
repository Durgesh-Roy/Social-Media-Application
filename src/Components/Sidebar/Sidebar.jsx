import React, { useEffect, useState } from 'react'
import name from '../../assets/name.png';
import { IoReorderThreeOutline } from "react-icons/io5";
import menu from './SidebarConfig';
import { useNavigate } from 'react-router-dom';
import CreatePostModal from '../Post/CreatePostModal';
import { useDisclosure } from '@chakra-ui/react';
import SearchComponents from '../SearchComponents/SearchComponents';
const Sidebar = () => {
  const [isSearchVisible,setIsSearchVisible]=useState(false);

  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();
   const{isOpen,onOpen,onClose}=useDisclosure();
   // 🛠 Reset body overflow after modal closes
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                document.body.style.overflow = 'auto'
            }, 300)
        } else {
            document.body.style.overflow = 'hidden'
        }
    }, [isOpen])
  const handleTabClick = (title) => {
    setActiveTab(title);
    if (title === "Profile") {
      navigate('/username');
    } else if (title === "Home") {
      navigate('/');
    }else if(title==="Create"){
      onOpen();
    }
     if(title==="Search"){
      setIsSearchVisible(true);
    }else{
      setIsSearchVisible(false);
    }
  }

  return (
    <div className='sticky top-0 h-[100vh] flex'>
        <div className={`flex flex-col justify-between h-full ${activeTab==="Search"?"px-2":"px-15"}`}>
       <div>
        {activeTab!=="Search" &&<div className='pt-10 '>
            <img className='w-40' 
            src={name}
             alt="" 
             />
        </div>}
        <div className='mt-10'>
            {menu.map((item)=>(
              <div 
              onClick={() => handleTabClick(item.title)} 
              className="flex items-center mb-5 cursor-pointer text-lg"
              >
            {activeTab === item.title ? item.activeIcon :item.icon}
           {activeTab!=="Search" && <p className={`${activeTab===item.title? "font-bold":"font-semibold"}`}>{item.title}</p>}
            </div>
        ))}
      </div>
      </div>
        <div className='flex items-center cursor-pointer pb-10'>
         <IoReorderThreeOutline className='text-2xl'/>
         <p className='ml-5'>More</p>
        </div>
       </div>
      
        {isOpen && <CreatePostModal
        onClose={onClose}
        isOpen={isOpen}
        onOpen={onOpen}
        />
        }
        {isSearchVisible&& <SearchComponents/> }

      </div>
      
  );
}

export default Sidebar;