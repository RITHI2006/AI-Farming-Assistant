import { Search, Globe, User, Menu, X, Languages, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="bg-forest-green text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-lime-green text-forest-green rounded-full p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold">Farmer Assistant</h1>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-green"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              title={language === 'en' ? 'தமிழுக்கு மாற்று' : 'Switch to English'}
            >
              <Languages className="w-4 h-4" />
              <span>{language === 'en' ? 'EN' : 'TA'}</span>
            </button>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden lg:inline truncate max-w-[150px]">{user.name}</span>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout()
                        setIsProfileOpen(false)
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 hover:bg-gray-100 transition-colors text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="flex items-center space-x-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <User className="w-4 h-4" />
                <span className="hidden lg:inline">{t('profile')}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-green"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2 space-y-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Languages className="w-4 h-4" />
              <span>{t('language')}: {language === 'en' ? 'EN' : 'TA'}</span>
            </button>
            
            {user ? (
              <>
                <div className="px-3 py-2 rounded-lg bg-white/10">
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-xs text-gray-300">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-red-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <User className="w-4 h-4" />
                <span>{t('profile')}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

