import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProfileUserDetails from '../../Components/ProfileComponents/ProfileUserDetails'
import ReqUserPostPart from '../../Components/ProfileComponents/ReqUserPostPart'
import { findUserByUsername } from '../../api/userApi'
import { findPostsByUserId } from '../../api/postApi'
import { normalizeUser, normalizePost } from '../../api/normalize'
import { useAuth } from '../../auth/AuthContext'

const Profile = () => {
    const { username } = useParams()
    const { currentUser } = useAuth()
    const targetUsername = username || currentUser?.username

    const [profile, setProfile] = useState(null)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!targetUsername) return
        let cancelled = false
        setLoading(true)
        setError('')

        findUserByUsername(targetUsername)
            .then(async (u) => {
                if (cancelled) return
                const normalized = normalizeUser(u)
                setProfile(normalized)
                try {
                    const userPosts = await findPostsByUserId(u.id)
                    if (!cancelled) setPosts((userPosts || []).map(normalizePost))
                } catch {
                    if (!cancelled) setPosts([])
                }
            })
            .catch(() => { if (!cancelled) setError('User not found') })
            .finally(() => { if (!cancelled) setLoading(false) })

        return () => { cancelled = true }
    }, [targetUsername])

    if (loading) {
        return <div className='py-20 text-center opacity-60'>Loading profile...</div>
    }
    if (error || !profile) {
        return <div className='py-20 text-center opacity-60'>{error || 'User not found'}</div>
    }

    const handleProfileUpdated = (updatedUser) => {
        setProfile(normalizeUser(updatedUser))
    }

    return (
        <div className='px-10'>
            <ProfileUserDetails
                user={profile}
                postsCount={posts.length}
                isOwnProfile={profile.id === currentUser?.id}
                onProfileUpdated={handleProfileUpdated}
            />
            <ReqUserPostPart posts={posts} />
        </div>
    )
}

export default Profile
