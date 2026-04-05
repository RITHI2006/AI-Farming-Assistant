import { useState } from 'react'
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Signin = ({ onClose, onSwitchToSignup }) => {
  const { login, error: authError } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      await login(formData.email, formData.password)
      setSuccessMessage('Login successful! Redirecting...')
      setTimeout(() => {
        onClose()
      }, 1000)
    } catch (err) {
      console.error('Login failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignin = async () => {
    setLoading(true)
    try {
      // This would require Google OAuth setup
      alert('Google login integration coming soon!')
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneSignin = async () => {
    alert('Phone login integration coming soon!')
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold text-forest-green mb-2">Sign In</h2>
        <p className="text-gray-600 mb-6">Access your AI-Farming Assistant account</p>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {authError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-green ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-green ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lime-green text-forest-green font-semibold py-2 rounded-lg hover:bg-lime-green/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">Or continue with</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Social/Alternative Login Options */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleSignin}
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-50 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span className="text-lg">🔍</span>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={handlePhoneSignin}
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-50 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span className="text-lg">📱</span>
            <span>Phone Number</span>
          </button>
        </div>

        {/* Switch to Signup */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignup}
            className="text-lime-green font-semibold hover:text-forest-green"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  )
}

export default Signin
