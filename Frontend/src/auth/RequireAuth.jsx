import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'

const RequireAuth = ({ children }) => {
    const { currentUser, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen text-sm opacity-60'>
                Loading...
            </div>
        )
    }

    if (!currentUser) {
        return <Navigate to='/login' replace state={{ from: location }} />
    }

    return children
}

export default RequireAuth
