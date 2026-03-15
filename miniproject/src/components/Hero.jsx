import { Mic, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const Hero = () => {
  const { t } = useLanguage()
  const [isListening, setIsListening] = useState(false)

  const handleVoiceAssistant = () => {
    setIsListening(!isListening)
    // Placeholder for Bhashini API integration
    console.log('Voice Assistant triggered - Bhashini API integration pending')
  }

  return (
    <section className="relative bg-gradient-to-r from-forest-green to-dark-green text-white py-16 md:py-24 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-lime-green rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-lime-green rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-16 h-16 text-lime-green" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t('welcomeTitle')}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            {t('welcomeSubtitle')}
          </p>
          <button
            onClick={handleVoiceAssistant}
            className={`inline-flex items-center space-x-3 px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : 'bg-lime-green text-forest-green hover:bg-lime-green/90'
            }`}
          >
            <Mic className={`w-6 h-6 ${isListening ? 'animate-pulse' : ''}`} />
            <span>{isListening ? t('listening') : t('startVoiceAssistant')}</span>
          </button>
          {isListening && (
            <p className="mt-4 text-sm text-gray-300">
              {t('speakQuestion')}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero

