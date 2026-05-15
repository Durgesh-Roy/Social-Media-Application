import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

const Signup = () => {
    const navigate = useNavigate()
    const { signup } = useAuth()
    const [form, setForm] = useState({ email: '', name: '', userName: '', password: '' })
    const [error, setError] = useState('')
    const [busy, setBusy] = useState(false)

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setBusy(true)
        try {
            await signup(form)
            navigate('/', { replace: true })
        } catch (err) {
            setError(err?.response?.data?.message || 'Could not create account')
        } finally {
            setBusy(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='w-[350px]'>
                <div className='bg-white border border-gray-200 rounded-md px-10 py-8'>
                    <h1 className='text-4xl text-center mb-6' style={{ fontFamily: 'cursive' }}>Instagram</h1>
                    <p className='text-center text-gray-500 font-semibold text-sm mb-6'>
                        Sign up to see photos and videos from your friends.
                    </p>

                    <form onSubmit={handleSubmit} className='space-y-2'>
                        <input
                            name='email'
                            type='email'
                            placeholder='Email'
                            value={form.email}
                            onChange={handleChange}
                            className='w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-400'
                            required
                        />
                        <input
                            name='name'
                            type='text'
                            placeholder='Full Name'
                            value={form.name}
                            onChange={handleChange}
                            className='w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-400'
                            required
                        />
                        <input
                            name='userName'
                            type='text'
                            placeholder='Username'
                            value={form.userName}
                            onChange={handleChange}
                            className='w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-400'
                            required
                        />
                        <input
                            name='password'
                            type='password'
                            placeholder='Password'
                            value={form.password}
                            onChange={handleChange}
                            className='w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-400'
                            required
                        />
                        <button
                            type='submit'
                            disabled={busy}
                            className='w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold text-sm rounded py-1.5 mt-2'
                        >
                            {busy ? 'Creating...' : 'Sign up'}
                        </button>
                    </form>

                    {error && <p className='text-red-500 text-sm text-center mt-3'>{error}</p>}
                </div>

                <div className='bg-white border border-gray-200 rounded-md px-10 py-4 mt-3 text-center text-sm'>
                    Have an account? <Link to='/login' className='text-blue-500 font-semibold'>Log in</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup
