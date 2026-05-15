import React from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar.jsx';
import { Route, Routes } from 'react-router-dom';
import Homepage from '../Homepage/Homepage.jsx';
import Profile from '../Profile/Profile.jsx';
import Story from '../Story/Story.jsx';
import Messages from '../Messages/Messages.jsx';
import Login from '../Login/Login.jsx';
import Signup from '../Signup/Signup.jsx';
import ForgotPassword from '../ForgotPassword/ForgotPassword.jsx';
import ResetPassword from '../ResetPassword/ResetPassword.jsx';
import RequireAuth from '../../auth/RequireAuth.jsx';

const Shell = ({ children }) => (
    <div className='flex'>
        <div className='border-r border-slate-200 shrink-0'>
            <Sidebar />
        </div>
        <div className='flex-1'>
            {children}
        </div>
    </div>
)

const Router = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />

            <Route path='/' element={<RequireAuth><Shell><Homepage /></Shell></RequireAuth>} />
            <Route path='/username/:username' element={<RequireAuth><Shell><Profile /></Shell></RequireAuth>} />
            <Route path='/username' element={<RequireAuth><Shell><Profile /></Shell></RequireAuth>} />
            <Route path='/story' element={<RequireAuth><Story /></RequireAuth>} />
            <Route path='/messages' element={<RequireAuth><Shell><Messages /></Shell></RequireAuth>} />
        </Routes>
    )
}

export default Router;
