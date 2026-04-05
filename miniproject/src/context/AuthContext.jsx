import { createContext, useState, useEffect, useContext } from 'react'
import { authAPI } from '../services/authAPI'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const checkAuth = async () => {
      const savedUser = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      
      if (savedUser && token) {
        try {
          // Verify token with backend
          const response = await authAPI.verifyToken(token)
          if (response.valid) {
            setUser(response.user)
            setIsAuthenticated(true)
          } else {
            // Token invalid, clear storage
            localStorage.removeItem('user')
            localStorage.removeItem('token')
          }
        } catch (err) {
          console.error('Token verification failed:', err)
          localStorage.removeItem('user')
          localStorage.removeItem('token')
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    setError(null)
    try {
      const response = await authAPI.login(email, password)
      setUser(response.user)
      setIsAuthenticated(true)
      return response
    } catch (err) {
      const message = err.detail || 'Login failed'
      setError(message)
      throw err
    }
  }

 const signup = async (userData) => {
  try {
    const response = await fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.detail || "Signup failed")
    }

    // ✅ Only store token (not full user)
    localStorage.setItem("token", data.access_token)

    return data

  } catch (error) {
    throw error
  }
}

  const logout = () => {
    authAPI.logout()
    setUser(null)
    setIsAuthenticated(false)
    setError(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
