import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  // Sign up new user
  signup: async (userData) => {
    try {
      const response = await apiClient.post('/auth/signup', {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        state: userData.state,
        district: userData.district || '',
        password: userData.password,
        confirm_password: userData.confirmPassword,
      })
      
      // Store token and user
      localStorage.setItem('token', response.data.access_token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      return response.data
    } catch (error) {
      throw error.response?.data || { detail: 'Signup failed' }
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      })
      
      // Store token and user
      localStorage.setItem('token', response.data.access_token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      return response.data
    } catch (error) {
      throw error.response?.data || { detail: 'Login failed' }
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/auth/me')
      return response.data
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to get user' }
    }
  },

  // Verify token
  verifyToken: async (token) => {
    try {
      const response = await apiClient.get(`/auth/verify/${token}`)
      return response.data
    } catch (error) {
      throw error.response?.data || { detail: 'Token verification failed' }
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  // Get all users (admin)
  getAllUsers: async () => {
    try {
      const response = await apiClient.get('/users/all')
      return response.data
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to fetch users' }
    }
  },
}

export default apiClient
