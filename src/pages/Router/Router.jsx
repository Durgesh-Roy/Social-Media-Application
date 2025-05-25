import React from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar.jsx';
import { Route, Routes } from 'react-router-dom';
import Homepage from '../Homepage/Homepage.jsx';
import Profile from '../Profile/Profile.jsx';
import Story from '../Story/Story.jsx';
const Router=()=>{
    return(
        <div>
        <div className='flex'>
            <div className="w-[20%] border border-l-slate-500 ">
                <Sidebar/>
            </div>
            <div className='w-full'>
                <Routes>
                    <Route path="/" element={<Homepage/>} />
                    <Route path="/username" element={<Profile/>} />
                    <Route path="/story" element={<Story/>}/>
                </Routes>
            </div>
        </div>
        </div>
    );
}
export default Router;
