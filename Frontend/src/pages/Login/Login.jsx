import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuth()
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [busy, setBusy] = useState(false)

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setBusy(true)
        try {
            await login(form)
            const from = location.state?.from?.pathname || '/'
            navigate(from, { replace: true })
        } catch (err) {
            setError(err?.response?.data?.message || 'Invalid email or password')
        } finally {
            setBusy(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='w-[350px]'>
                <div className='bg-white border border-gray-200 rounded-md px-10 py-8'>
                    <h1 className='text-4xl text-center mb-8' style={{ fontFamily: 'cursive' }}>Instagram</h1>

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
                            {busy ? 'Logging in...' : 'Log in'}
                        </button>
                    </form>

                    <div className='text-center mt-4'>
                        <Link to='/forgot-password' className='text-xs text-blue-700'>Forgot password?</Link>
                    </div>

                    {error && <p className='text-red-500 text-sm text-center mt-3'>{error}</p>}
                </div>

                <div className='bg-white border border-gray-200 rounded-md px-10 py-4 mt-3 text-center text-sm'>
                    Don't have an account? <Link to='/signup' className='text-blue-500 font-semibold'>Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
