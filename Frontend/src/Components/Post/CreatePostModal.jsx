import React, { useState, useMemo } from 'react'
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react'
import { IoArrowBack, IoClose } from 'react-icons/io5'
import { BsEmojiSmile } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'
import './CreatePostModal.css'
import { useAuth } from '../../auth/AuthContext'
import { createPost } from '../../api/postApi'
import EmojiPicker from '../Emoji/EmojiPicker'

const MediaIcon = () => (
    <svg aria-label='Icon to represent media' className='w-24 h-24 mx-auto opacity-90' fill='none' viewBox='0 0 97.6 77.3'>
        <path d='M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z' fill='currentColor' />
        <path d='M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.9l2-34c.4-5.8-4-10.7-9.7-11zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z' fill='currentColor' />
        <path d='M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z' fill='currentColor' />
    </svg>
)

const fileToDataUrl = (f) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(f)
})

const CreatePostModal = ({ onClose, isOpen }) => {
    const { currentUser } = useAuth()
    const [isDragOver, setIsDragOver] = useState(false)
    const [file, setFile] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
    const [caption, setCaption] = useState('')
    const [location, setLocation] = useState('')
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState('')
    const [showEmoji, setShowEmoji] = useState(false)

    const previewUrl = useMemo(() => {
        if (file) return URL.createObjectURL(file)
        if (imageUrl) return imageUrl
        return null
    }, [file, imageUrl])
    const isVideo = file?.type?.startsWith('video/')
    const hasMedia = !!file || !!imageUrl.trim()

    const reset = () => {
        setFile(null)
        setImageUrl('')
        setCaption('')
        setLocation('')
        setIsDragOver(false)
        setError('')
    }

    const handleClose = () => {
        reset()
        onClose?.()
    }

    const acceptFile = (f) => {
        if (f && (f.type.startsWith('image/') || f.type.startsWith('video/'))) {
            setFile(f)
            setImageUrl('')
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragOver(false)
        acceptFile(e.dataTransfer.files[0])
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
        setIsDragOver(true)
    }

    const handleShare = async () => {
        if (busy) return
        setBusy(true)
        setError('')
        try {
            const image = file ? await fileToDataUrl(file) : imageUrl.trim()
            await createPost({ caption, image, location })
            handleClose()
            window.location.reload()
        } catch (err) {
            setError(err?.response?.data?.message || 'Could not share post')
        } finally {
            setBusy(false)
        }
    }

    return (
        <Modal size='4xl' isOpen={isOpen} onClose={handleClose} isCentered>
            <ModalOverlay backdropFilter='blur(2px)' />
            <ModalContent borderRadius='lg' overflow='hidden' bg='white'>
                <div className='flex justify-between items-center border-b py-3 px-4 relative'>
                    {hasMedia ? (
                        <IoArrowBack className='text-2xl cursor-pointer hover:opacity-60' onClick={reset} />
                    ) : (
                        <span className='w-6' />
                    )}
                    <p className='font-semibold text-base absolute left-1/2 -translate-x-1/2'>Create new post</p>
                    {hasMedia ? (
                        <button
                            onClick={handleShare}
                            disabled={busy}
                            className='text-blue-500 font-semibold text-sm hover:text-blue-700 disabled:opacity-60'
                        >
                            {busy ? 'Sharing...' : 'Share'}
                        </button>
                    ) : (
                        <IoClose className='text-2xl cursor-pointer hover:opacity-60' onClick={handleClose} />
                    )}
                </div>

                {!hasMedia ? (
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={() => setIsDragOver(false)}
                        className={`h-[70vh] flex flex-col items-center justify-center text-center px-6 transition-colors ${
                            isDragOver ? 'bg-blue-50' : 'bg-white'
                        }`}
                    >
                        <MediaIcon />
                        <p className='text-xl mt-4 font-light'>Drag photos and videos here</p>
                        <label
                            htmlFor='file-upload'
                            className='mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-md px-4 py-2 cursor-pointer'
                        >
                            Select from computer
                        </label>
                        <input
                            id='file-upload'
                            type='file'
                            accept='image/*,video/*'
                            className='hidden'
                            onChange={(e) => acceptFile(e.target.files[0])}
                        />
                        <p className='mt-6 text-xs opacity-60'>or paste an image URL</p>
                        <input
                            type='url'
                            placeholder='https://...'
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className='mt-2 w-72 max-w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-gray-400'
                        />
                    </div>
                ) : (
                    <div className='flex h-[70vh]'>
                        <div className='w-[58%] bg-black flex items-center justify-center'>
                            {isVideo ? (
                                <video src={previewUrl} controls className='max-h-full max-w-full' />
                            ) : (
                                <img src={previewUrl} alt='preview' className='max-h-full max-w-full object-contain' />
                            )}
                        </div>
                        <div className='w-[42%] flex flex-col'>
                            <div className='flex items-center px-4 py-3 border-b'>
                                <img className='w-8 h-8 rounded-full object-cover' src={currentUser?.avatar} alt={currentUser?.username} />
                                <p className='font-semibold ml-3 text-sm'>{currentUser?.username}</p>
                            </div>

                            <div className='px-4 pt-3 flex-1 flex flex-col'>
                                <textarea
                                    placeholder='Write a caption...'
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    maxLength={2200}
                                    rows={6}
                                    className='captionInput flex-1'
                                />
                                <div className='flex justify-between items-center text-xs opacity-60 pt-2 relative'>
                                    <BsEmojiSmile
                                        onClick={() => setShowEmoji((s) => !s)}
                                        className='text-lg cursor-pointer hover:opacity-100'
                                    />
                                    <EmojiPicker
                                        open={showEmoji}
                                        onSelect={(e) => { setCaption((c) => c + e); setShowEmoji(false) }}
                                        onClose={() => setShowEmoji(false)}
                                        anchor='top-left'
                                    />
                                    <span>{caption.length}/2,200</span>
                                </div>
                            </div>

                            <div className='border-t px-4 py-2 flex justify-between items-center'>
                                <input
                                    type='text'
                                    placeholder='Add location'
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className='locationInput text-sm'
                                />
                                <GoLocation className='opacity-60' />
                            </div>
                            {error && <p className='text-red-500 text-xs px-4 pb-2'>{error}</p>}
                        </div>
                    </div>
                )}
            </ModalContent>
        </Modal>
    )
}

export default CreatePostModal
