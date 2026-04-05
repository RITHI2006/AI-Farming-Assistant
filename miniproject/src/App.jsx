import { useState } from 'react'
import { LogOut } from 'lucide-react'
import { LanguageProvider } from './context/LanguageContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Home from './components/Home'
import DiseaseDetector from './components/features/DiseaseDetector'
import SmartWeather from './components/features/SmartWeather'
import MandiLive from './components/features/MandiLive'
import VoiceAssistant from './components/features/VoiceAssistant'
import SarkaarSchemes from './components/features/SarkaarSchemes'
import CommunityForum from './components/features/CommunityForum'
import WhatsAppButton from './components/WhatsAppButton'
import OfflineIndicator from './components/OfflineIndicator'
import { useLanguage } from './context/LanguageContext'

function Dashboard() {
  const { t } = useLanguage()
  const { logout } = useAuth()
  const [isOffline, setIsOffline] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-green to-white">
      <Header />
      <Hero />
      
      {/* Main Dashboard Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-forest-green">
            {t('aiFeaturesDashboard')}
          </h2>
          <button
            onClick={logout}
            className="flex items-center space-x-2 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all transform hover:scale-105"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <VoiceAssistant />
          <DiseaseDetector />
          <SmartWeather />
          <MandiLive />
          <SarkaarSchemes />
          <CommunityForum />
        </div>
      </section>

      <WhatsAppButton />
      <OfflineIndicator isOffline={isOffline} setIsOffline={setIsOffline} />
    </div>
  )
}

function AppContent() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-light-green to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-lime-green border-t-forest-green rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-forest-green font-semibold">Loading...</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? <Dashboard /> : <Home />
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App

