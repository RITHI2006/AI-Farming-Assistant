import { MessageCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const WhatsAppButton = () => {
  const { t } = useLanguage()
  const handleWhatsAppClick = () => {
    // Placeholder for WhatsApp Business API integration
    const phoneNumber = '6369703006' // Replace with actual number
    const message = encodeURIComponent('Hello! I need help with farming.')
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-110 z-40 flex items-center space-x-2 group"
      aria-label="Connect on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="hidden md:block font-semibold pr-2">{t('connectWhatsApp')}</span>
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
    </button>
  )
}

export default WhatsAppButton

