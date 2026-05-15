import React, { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { resetPassword } from '../../api/authApi'

const ResetPassword = () => {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const token = params.get('token') || ''

    const [form, setForm] = useState({ newPassword: '', confirm: '' })
    const [status, setStatus] = useState('idle') // idle | submitting | done | error
    const [error, setError] = useState('')

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (form.newPassword.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }
        if (form.newPassword !== form.confirm) {
            setError('Passwords do not match')
            return
        }
        if (!token) {
            setError('Missing reset token')
            return
        }
        setStatus('submitting')
        try {
            await resetPassword(token, form.newPassword)
            setStatus('done')
            setTimeout(() => navigate('/login', { replace: true }), 1500)
        } catch (err) {
            setStatus('error')
            setError(err?.response?.data || 'Could not reset password')
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='w-[350px]'>
                <div className='bg-white border border-gray-200 rounded-md px-10 py-8'>
                    <h1 className='text-4xl text-center mb-6' style={{ fontFamily: 'cursive' }}>Instagram</h1>

                    {status !== 'done' ? (
                        <>
                            <p className='text-center text-sm font-semibold mb-6'>Choose a new password</p>

                            <form onSubmit={handleSubmit} className='space-y-2'>
                                <input
                                    name='newPassword'
                                    type='password'
                                    placeholder='New password'
                                    value={form.newPassword}
                                    onChange={handleChange}
                                    className='w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-400'
                                    required
                                />
                                <input
                                    name='confirm'
                                    type='password'
                                    placeholder='Confirm password'
                                    value={form.confirm}
                                    onChange={handleChange}
                                    className='w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-400'
                                    required
                                />
                                <button
                                    type='submit'
                                    disabled={status === 'submitting'}
                                    className='w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold text-sm rounded py-1.5 mt-2'
                                >
                                    {status === 'submitting' ? 'Resetting...' : 'Reset password'}
                                </button>
                            </form>

                            {error && <p className='text-red-500 text-sm text-center mt-3'>{error}</p>}
                        </>
                    ) : (
                        <div className='text-center'>
                            <p className='text-sm font-semibold mb-2'>Password reset</p>
                            <p className='text-xs opacity-60'>Redirecting to login...</p>
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

export default ResetPassword
