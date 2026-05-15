import React, { useEffect, useState } from 'react'
import name from '../../assets/name.png';
import { IoReorderThreeOutline, IoLogOutOutline } from "react-icons/io5";
import menu from './SidebarConfig';
import { useNavigate } from 'react-router-dom';
import CreatePostModal from '../Post/CreatePostModal';
import { useDisclosure } from '@chakra-ui/react';
import SearchComponents from '../SearchComponents/SearchComponents';
import NotificationsPanel from '../NotificationsPanel/NotificationsPanel';
import { useAuth } from '../../auth/AuthContext';
const Sidebar = () => {
  const [isSearchVisible,setIsSearchVisible]=useState(false);
  const [isNotificationsVisible,setIsNotificationsVisible]=useState(false);
  const [showMore, setShowMore] = useState(false);

  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const isPanelOpen = activeTab === "Search" || activeTab === "Notifications";
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
      navigate(`/username/${currentUser?.username || ''}`);
    } else if (title === "Home") {
      navigate('/');
    } else if (title === "Messages") {
      navigate('/messages');
    } else if (title === "Create") {
      onOpen();
    }
    setIsSearchVisible(title === "Search");
    setIsNotificationsVisible(title === "Notifications");
  }

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className='sticky top-0 h-[100vh] flex'>
        <div className={`flex flex-col justify-between h-full ${isPanelOpen?"px-3 w-[72px]":"px-6 w-[260px]"}`}>
       <div>
        {!isPanelOpen &&<div className='pt-10 '>
            <img className='w-40'
            src={name}
             alt=""
             />
        </div>}
        <div className='mt-10'>
            {menu.map((item)=>(
              <div
              key={item.title}
              onClick={() => handleTabClick(item.title)}
              className="flex items-center mb-5 cursor-pointer text-lg"
              >
            {activeTab === item.title ? item.activeIcon :item.icon}
           {!isPanelOpen && <p className={`${activeTab===item.title? "font-bold":"font-semibold"}`}>{item.title}</p>}
            </div>
        ))}
            <div
              onClick={handleLogout}
              className='flex items-center mb-5 cursor-pointer text-lg text-red-500 hover:opacity-80'
            >
              <IoLogOutOutline className='text-2xl mr-5'/>
              {!isPanelOpen && <p className='font-semibold'>Log out</p>}
            </div>
      </div>
      </div>
        <div className='pb-10 relative'>
          <div onClick={() => setShowMore(s => !s)} className='flex items-center cursor-pointer'>
            <IoReorderThreeOutline className='text-2xl'/>
            {!isPanelOpen && <p className='ml-5'>More</p>}
          </div>
          {showMore && (
            <div className='absolute bottom-12 left-0 bg-white border rounded-md shadow-md py-2 w-44 z-20'>
              <div onClick={handleLogout} className='flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm'>
                <IoLogOutOutline className='text-lg mr-3' />
                Log out
              </div>
            </div>
          )}
        </div>
       </div>

        {isOpen && <CreatePostModal
        onClose={onClose}
        isOpen={isOpen}
        onOpen={onOpen}
        />
        }
        {isSearchVisible&& <SearchComponents/> }
        {isNotificationsVisible && <NotificationsPanel/>}

      </div>
      
  );
}

export default Sidebar;