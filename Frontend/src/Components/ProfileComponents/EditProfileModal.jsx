import React, { useState, useMemo } from 'react'
import { IoClose } from 'react-icons/io5'
import { updateUser } from '../../api/userApi'
import { useAuth } from '../../auth/AuthContext'

const fileToDataUrl = (f) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(f)
})

const EditProfileModal = ({ open, onClose, onUpdated }) => {
    const { currentUser, setCurrentUser } = useAuth()
    const [form, setForm] = useState({
        userName: currentUser?.username || '',
        name: currentUser?.fullName || '',
        bio: currentUser?.bio || '',
        website: currentUser?.website || '',
        mobile: currentUser?.mobile || '',
        gender: currentUser?.gender || '',
        image: currentUser?.avatar || '',
    })
    const [file, setFile] = useState(null)
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState('')

    const previewUrl = useMemo(() => {
        if (file) return URL.createObjectURL(file)
        return form.image
    }, [file, form.image])

    if (!open || !currentUser) return null

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleFile = (f) => {
        if (f && f.type.startsWith('image/')) setFile(f)
    }

    const handleSave = async () => {
        if (busy) return
        setBusy(true)
        setError('')
        try {
            const image = file ? await fileToDataUrl(file) : form.image
            const updated = await updateUser({ ...form, image })
            setCurrentUser(updated)
            onUpdated?.(updated)
            onClose?.()
        } catch (err) {
            setError(err?.response?.data?.message || 'Could not save profile')
        } finally {
            setBusy(false)
        }
    }

    return (
        <div
            className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'
            onClick={() => !busy && onClose?.()}
        >
            <div
                className='bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-xl'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex items-center justify-between px-5 py-3 border-b'>
                    <p className='font-semibold text-base'>Edit profile</p>
                    <IoClose className='text-2xl cursor-pointer hover:opacity-60' onClick={() => !busy && onClose?.()} />
                </div>

                <div className='px-6 py-5 space-y-4 max-h-[75vh] overflow-y-auto'>
                    <div className='flex items-center gap-4'>
                        <img
                            className='w-16 h-16 rounded-full object-cover border'
                            src={previewUrl || 'https://via.placeholder.com/64'}
                            alt='avatar preview'
                        />
                        <div className='flex-1'>
                            <p className='font-semibold text-sm'>{currentUser.username}</p>
                            <label className='text-blue-500 text-sm font-semibold cursor-pointer'>
                                Change photo
                                <input
                                    type='file'
                                    accept='image/*'
                                    className='hidden'
                                    onChange={(e) => handleFile(e.target.files[0])}
                                />
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className='block text-xs font-semibold mb-1'>Name</label>
                        <input
                            name='name'
                            type='text'
                            value={form.name}
                            onChange={handleChange}
                            className='w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-400'
                        />
                    </div>

                    <div>
                        <label className='block text-xs font-semibold mb-1'>Username</label>
                        <input
                            name='userName'
                            type='text'
                            value={form.userName}
                            onChange={handleChange}
                            className='w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-400'
                        />
                    </div>

                    <div>
                        <label className='block text-xs font-semibold mb-1'>Bio</label>
                        <textarea
                            name='bio'
                            value={form.bio}
                            onChange={handleChange}
                            rows={3}
                            className='w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-400 resize-none'
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-xs font-semibold mb-1'>Website</label>
                            <input
                                name='website'
                                type='text'
                                value={form.website}
                                onChange={handleChange}
                                className='w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-400'
                            />
                        </div>
                        <div>
                            <label className='block text-xs font-semibold mb-1'>Mobile</label>
                            <input
                                name='mobile'
                                type='text'
                                value={form.mobile}
                                onChange={handleChange}
                                className='w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-400'
                            />
                        </div>
                    </div>

                    <div>
                        <label className='block text-xs font-semibold mb-1'>Gender</label>
                        <select
                            name='gender'
                            value={form.gender}
                            onChange={handleChange}
                            className='w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-400 bg-white'
                        >
                            <option value=''>Prefer not to say</option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                            <option value='other'>Other</option>
                        </select>
                    </div>

                    {error && <p className='text-red-500 text-sm'>{error}</p>}
                </div>

                <div className='flex justify-end gap-3 px-5 py-3 border-t'>
                    <button
                        onClick={() => !busy && onClose?.()}
                        className='text-sm font-semibold px-4 py-1.5 rounded-md hover:bg-gray-100'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={busy}
                        className='text-sm font-semibold px-4 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-60'
                    >
                        {busy ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditProfileModal
