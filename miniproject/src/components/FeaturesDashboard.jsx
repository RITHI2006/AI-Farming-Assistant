import VoiceAssistant from './features/VoiceAssistant'
import DiseaseDetector from './features/DiseaseDetector'
import SmartWeather from './features/SmartWeather'
import MandiLive from './features/MandiLive'
import SarkaarSchemes from './features/SarkaarSchemes'
import CommunityForum from './features/CommunityForum'
import { useLanguage } from '../context/LanguageContext'

const FeaturesDashboard = () => {
  const { t } = useLanguage()
  
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-forest-green text-center mb-8">
        {t('aiFeaturesDashboard')}
      </h2>
      
      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <div className="lg:col-span-2">
          <DiseaseDetector />
        </div>
        <div className="space-y-6">
          <SmartWeather />
          <MandiLive />
        </div>
      </div>

      {/* Additional Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-6">
        <VoiceAssistant />
        <SarkaarSchemes />
        <CommunityForum />
      </div>
    </section>
  )
}

export default FeaturesDashboard

