import { useState } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import DiseaseDetector from './components/features/DiseaseDetector'
import SmartWeather from './components/features/SmartWeather'
import MandiLive from './components/features/MandiLive'
import VoiceAssistant from './components/features/VoiceAssistant'
import SarkaarSchemes from './components/features/SarkaarSchemes'
import CommunityForum from './components/features/CommunityForum'
import WhatsAppButton from './components/WhatsAppButton'
import OfflineIndicator from './components/OfflineIndicator'
import { useLanguage } from './context/LanguageContext'

function AppContent() {
  const { t } = useLanguage()
  const [isOffline, setIsOffline] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-green to-white">
      <Header />
      <Hero />
      
      {/* Main Dashboard Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-forest-green text-center mb-8">
          {t('aiFeaturesDashboard')}
        </h2>
        
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

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App

