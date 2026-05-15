import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { TOKEN_KEY } from '../api/axiosClient'
import {
    signinRequest,
    signupRequest,
    fetchCurrentUser,
    logout as clearToken,
} from '../api/authApi'
import { normalizeUser } from '../api/normalize'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [currentUser, _setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const setCurrentUser = useCallback((u) => _setCurrentUser(normalizeUser(u)), [])

    useEffect(() => {
        let cancelled = false
        const bootstrap = async () => {
            const token = localStorage.getItem(TOKEN_KEY)
            if (!token) {
                if (!cancelled) setLoading(false)
                return
            }
            try {
                const user = await fetchCurrentUser()
                if (!cancelled) setCurrentUser(user)
            } catch {
                clearToken()
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        bootstrap()
        return () => { cancelled = true }
    }, [setCurrentUser])

    const login = useCallback(async ({ email, password }) => {
        await signinRequest({ email, password })
        const user = await fetchCurrentUser()
        setCurrentUser(user)
        return user
    }, [setCurrentUser])

    const signup = useCallback(async (form) => {
        await signupRequest(form)
        return login({ email: form.email, password: form.password })
    }, [login])

    const logout = useCallback(() => {
        clearToken()
        _setCurrentUser(null)
    }, [])

    return (
        <AuthContext.Provider value={{ currentUser, loading, login, signup, logout, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}
