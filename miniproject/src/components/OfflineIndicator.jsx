import { Wifi, WifiOff, Download } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const OfflineIndicator = ({ isOffline, setIsOffline }) => {
  const { t } = useLanguage()
  return (
    <div className="fixed bottom-6 left-6 z-40">
      <div
        className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-lg transition-all ${
          isOffline
            ? 'bg-green-100 text-green-800 border-2 border-green-500'
            : 'bg-gray-100 text-gray-800 border-2 border-gray-300'
        }`}
      >
        {isOffline ? (
          <>
            <Download className="w-4 h-4" />
            <span className="text-sm font-semibold">{t('offlineMode')}</span>
          </>
        ) : (
          <>
            <Wifi className="w-4 h-4" />
            <span className="text-sm font-semibold">{t('onlineMode')}</span>
          </>
        )}
        <button
          onClick={() => setIsOffline(!isOffline)}
          className="ml-2 text-xs underline hover:no-underline"
        >
          {isOffline ? t('goOnline') : t('loadOffline')}
        </button>
      </div>
    </div>
  )
}

export default OfflineIndicator

