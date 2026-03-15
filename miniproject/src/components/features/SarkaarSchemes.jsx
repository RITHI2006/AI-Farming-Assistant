import { Search, FileText, IndianRupee } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'

const SarkaarSchemes = () => {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  
  const schemes = [
    {
      id: 1,
      title: 'PM-KISAN Scheme',
      description: 'Direct income support of ₹6,000 per year to all landholding farmers',
      amount: '₹6,000/year',
    },
    {
      id: 2,
      title: 'Kisan Credit Card',
      description: 'Credit facility for farmers to meet short-term credit requirements',
      amount: 'Up to ₹3 Lakh',
    },
    {
      id: 3,
      title: 'Pradhan Mantri Fasal Bima Yojana',
      description: 'Crop insurance scheme to provide financial support to farmers',
      amount: 'Premium: 1.5-2%',
    },
    {
      id: 4,
      title: 'Soil Health Card Scheme',
      description: 'Free soil testing and recommendations for farmers',
      amount: 'Free',
    },
    {
      id: 5,
      title: 'National Mission on Agricultural Extension',
      description: 'Support for agricultural extension services and training',
      amount: 'Varies',
    },
  ]

  const filteredSchemes = schemes.filter(scheme =>
    scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-2 border-lime-green">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-lime-green/20 p-3 rounded-lg">
          <FileText className="w-6 h-6 text-forest-green" />
        </div>
        <h3 className="text-xl font-bold text-forest-green">{t('sarkaarSchemes')}</h3>
      </div>
      <p className="text-gray-600 mb-4 text-sm">
        {t('searchSchemesDesc')}
      </p>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder={t('searchSchemes')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-green"
        />
      </div>

      {/* Schemes List */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {filteredSchemes.length > 0 ? (
          filteredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="border border-gray-200 rounded-lg p-3 hover:border-lime-green hover:bg-light-green transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-forest-green text-sm">{scheme.title}</h4>
                <div className="flex items-center space-x-1 text-lime-green bg-lime-green/10 px-2 py-1 rounded">
                  <IndianRupee className="w-3 h-3" />
                  <span className="text-xs font-semibold">{scheme.amount}</span>
                </div>
              </div>
              <p className="text-xs text-gray-600">{scheme.description}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">No schemes found</p>
        )}
      </div>
    </div>
  )
}

export default SarkaarSchemes

