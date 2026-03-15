import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

const translations = {
  en: {
    // Header
    searchPlaceholder: 'Search for crops, diseases, schemes...',
    profile: 'Profile',
    language: 'Language',
    
    // Hero
    welcomeTitle: 'Welcome to Smart AI Farmer Assistant',
    welcomeSubtitle: 'Your intelligent companion for modern farming. Get instant answers, detect crop diseases, check weather, and access government schemes - all in your regional language.',
    startVoiceAssistant: 'Start Voice Assistant',
    listening: 'Listening...',
    speakQuestion: 'Speak your question in Tamil or your regional language...',
    
    // Features
    aiFeaturesDashboard: 'AI Features Dashboard',
    voiceAssistant: 'Voice Assistant',
    voiceAssistantDesc: 'Ask questions in Tamil or your regional language. Get instant AI-powered answers.',
    startVoiceChat: 'Start Voice Chat',
    diseaseDetector: 'Disease Detector',
    diseaseDetectorDesc: 'Upload a photo of your crop leaf to detect diseases instantly.',
    clickToUpload: 'Click to upload leaf photo',
    clickToChange: 'Click to change image',
    scanForDisease: 'Scan for Disease',
    scanning: 'Scanning...',
    smartWeather: 'Smart Weather',
    temperature: 'Temperature',
    humidity: 'Humidity',
    actionableAlerts: 'Actionable Alerts',
    mandiLive: 'Mandi Live',
    realTimePrices: 'Real-time market prices (₹/kg)',
    crop: 'Crop',
    price: 'Price',
    change: 'Change',
    district: 'District',
    searchDistricts: 'Search districts or crops...',
    pricesUpdated: 'Prices updated every 30 minutes',
    sarkaarSchemes: 'Sarkaar Schemes',
    searchSchemes: 'Search schemes...',
    searchSchemesDesc: 'Search and explore government agriculture subsidies',
    communityForum: 'Community Forum',
    communityForumDesc: 'Connect with fellow farmers and share experiences',
    viewAllPosts: 'View All Posts',
    hoursAgo: 'hours ago',
    dayAgo: 'day ago',
    connectWhatsApp: 'Connect on WhatsApp',
    onlineMode: 'Online Mode',
    offlineMode: 'AI Model Loaded (Offline)',
    goOnline: 'Go Online',
    loadOffline: 'Load Offline',
    note: 'Note',
    tensorflowPending: 'TensorFlow Lite integration pending',
    bhashiniPending: 'Bhashini API integration pending',
  },
  ta: {
    // Header
    searchPlaceholder: 'பயிர்கள், நோய்கள், திட்டங்களைத் தேடுங்கள்...',
    profile: 'சுயவிவரம்',
    language: 'மொழி',
    
    // Hero
    welcomeTitle: 'ஸ்மார்ட் AI விவசாய உதவியாளருக்கு வரவேற்கிறோம்',
    welcomeSubtitle: 'நவீன விவசாயத்திற்கான உங்கள் அறிவார்ந்த துணை. உடனடி பதில்கள் பெறுங்கள், பயிர் நோய்களைக் கண்டறியுங்கள், வானிலையைச் சரிபார்க்கவும், அரசு திட்டங்களை அணுகவும் - அனைத்தும் உங்கள் பிராந்திய மொழியில்.',
    startVoiceAssistant: 'குரல் உதவியாளரைத் தொடங்குங்கள்',
    listening: 'கேட்டுக்கொண்டிருக்கிறது...',
    speakQuestion: 'தமிழ் அல்லது உங்கள் பிராந்திய மொழியில் உங்கள் கேள்வியைக் கேட்கவும்...',
    
    // Features
    aiFeaturesDashboard: 'AI அம்சங்கள் டாஷ்போர்டு',
    voiceAssistant: 'குரல் உதவியாளர்',
    voiceAssistantDesc: 'தமிழ் அல்லது உங்கள் பிராந்திய மொழியில் கேள்விகள் கேட்கவும். உடனடி AI-இயக்கப்பட்ட பதில்களைப் பெறுங்கள்.',
    startVoiceChat: 'குரல் அரட்டையைத் தொடங்குங்கள்',
    diseaseDetector: 'நோய் கண்டறிதல்',
    diseaseDetectorDesc: 'நோய்களை உடனடியாகக் கண்டறிய உங்கள் பயிர் இலையின் புகைப்படத்தைப் பதிவேற்றவும்.',
    clickToUpload: 'இலை புகைப்படத்தைப் பதிவேற்ற கிளிக் செய்யவும்',
    clickToChange: 'படத்தை மாற்ற கிளிக் செய்யவும்',
    scanForDisease: 'நோயை ஸ்கேன் செய்யுங்கள்',
    scanning: 'ஸ்கேன் செய்கிறது...',
    smartWeather: 'ஸ்மார்ட் வானிலை',
    temperature: 'வெப்பநிலை',
    humidity: 'ஈரப்பதம்',
    actionableAlerts: 'செயல்படக்கூடிய எச்சரிக்கைகள்',
    mandiLive: 'மண்டி நேரடி',
    realTimePrices: 'நேரடி சந்தை விலைகள் (₹/கிலோ)',
    crop: 'பயிர்',
    price: 'விலை',
    change: 'மாற்றம்',
    district: 'மாவட்டம்',
    searchDistricts: 'மாவட்டங்கள் அல்லது பயிர்களைத் தேடுங்கள்...',
    pricesUpdated: 'விலைகள் ஒவ்வொரு 30 நிமிடங்களுக்கும் புதுப்பிக்கப்படுகின்றன',
    sarkaarSchemes: 'சர்கார் திட்டங்கள்',
    searchSchemes: 'திட்டங்களைத் தேடுங்கள்...',
    searchSchemesDesc: 'அரசு விவசாய மானியங்களைத் தேடி ஆராயுங்கள்',
    communityForum: 'சமூக மன்றம்',
    communityForumDesc: 'விவசாயிகளுடன் இணைந்து அனுபவங்களைப் பகிர்ந்து கொள்ளுங்கள்',
    viewAllPosts: 'அனைத்து இடுகைகளையும் பார்க்கவும்',
    hoursAgo: 'மணி நேரங்களுக்கு முன்பு',
    dayAgo: 'நாளுக்கு முன்பு',
    connectWhatsApp: 'வாட்ஸ்அப்பில் இணைக்கவும்',
    onlineMode: 'ஆன்லைன் முறை',
    offlineMode: 'AI மாதிரி ஏற்றப்பட்டது (ஆஃப்லைன்)',
    goOnline: 'ஆன்லைனுக்குச் செல்லவும்',
    loadOffline: 'ஆஃப்லைனை ஏற்றவும்',
    note: 'குறிப்பு',
    tensorflowPending: 'TensorFlow Lite ஒருங்கிணைப்பு நிலுவையில்',
    bhashiniPending: 'Bhashini API ஒருங்கிணைப்பு நிலுவையில்',
  },
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ta' : 'en')
  }

  const t = (key) => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}


