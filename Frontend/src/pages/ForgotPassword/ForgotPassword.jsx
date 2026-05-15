import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { requestPasswordReset } from '../../api/authApi'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('idle') // idle | sending | sent | error
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email.trim()) return
        setStatus('sending')
        setError('')
        try {
            await requestPasswordReset(email.trim())
            setStatus('sent')
        } catch (err) {
            setStatus('error')
            setError(err?.response?.data || 'Could not send reset email')
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='w-[350px]'>
                <div className='bg-white border border-gray-200 rounded-md px-10 py-8'>
                    <h1 className='text-4xl text-center mb-6' style={{ fontFamily: 'cursive' }}>Instagram</h1>

                    {status !== 'sent' ? (
                        <>
                            <p className='text-center text-sm font-semibold mb-2'>Trouble logging in?</p>
                            <p className='text-center text-xs opacity-60 mb-6'>
                                Enter your email and we'll send you a link to reset your password.
                            </p>

                            <form onSubmit={handleSubmit} className='space-y-2'>
                                <input
                                    type='email'
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-400'
                                    required
                                />
                                <button
                                    type='submit'
                                    disabled={status === 'sending'}
                                    className='w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold text-sm rounded py-1.5 mt-2'
                                >
                                    {status === 'sending' ? 'Sending...' : 'Send reset link'}
                                </button>
                            </form>

                            {error && <p className='text-red-500 text-sm text-center mt-3'>{error}</p>}
                        </>
                    ) : (
                        <div className='text-center'>
                            <p className='text-sm font-semibold mb-2'>Check your email</p>
                            <p className='text-xs opacity-60'>
                                We sent a password reset link to <span className='font-semibold'>{email}</span>.
                                The link expires in 30 minutes.
                            </p>
                        </div>
                    )}
                </div>

                <div className='bg-white border border-gray-200 rounded-md px-10 py-4 mt-3 text-center text-sm'>
                    <Link to='/login' className='text-blue-500 font-semibold'>Back to login</Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
