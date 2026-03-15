import { TrendingUp, TrendingDown, Minus, Search, X } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { fetchMandiPrices, getDistricts, getCrops } from './mandiApi'
import { useLanguage } from '../../context/LanguageContext'

const MandiLive = () => {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [allPrices, setAllPrices] = useState([])
  const [displayPrices, setDisplayPrices] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedCrop, setSelectedCrop] = useState('')
  const districts = getDistricts()
  const crops = getCrops()

  const loadPrices = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await fetchMandiPrices(selectedDistrict, selectedCrop)
      setAllPrices(data)
      setDisplayPrices(data)
    } catch (error) {
      console.error('Error fetching prices:', error)
      setAllPrices([])
      setDisplayPrices([])
    } finally {
      setIsLoading(false)
    }
  }, [selectedDistrict, selectedCrop])

  useEffect(() => {
    loadPrices()
  }, [loadPrices])

  useEffect(() => {
    // Filter prices based on search query
    if (!searchQuery) {
      setDisplayPrices(allPrices)
    } else {
      const filtered = allPrices.filter(item =>
        item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.crop.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setDisplayPrices(filtered)
    }
  }, [searchQuery, allPrices])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedDistrict('')
    setSelectedCrop('')
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />
      default:
        return <Minus className="w-4 h-4 text-gray-400" />
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-2 border-lime-green">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-lime-green/20 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6 text-forest-green" />
          </div>
          <h3 className="text-xl font-bold text-forest-green">{t('mandiLive')}</h3>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-2 border-lime-green">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-lime-green/20 p-3 rounded-lg">
          <TrendingUp className="w-6 h-6 text-forest-green" />
        </div>
        <h3 className="text-xl font-bold text-forest-green">{t('mandiLive')}</h3>
      </div>
      <p className="text-gray-600 mb-4 text-sm">
        {t('realTimePrices')}
      </p>

      {/* Search and Filters */}
      <div className="mb-4 space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={t('searchDistricts')}
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-green text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-green text-sm"
          >
            <option value="">{t('district')}: All</option>
            {districts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
          
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-green text-sm"
          >
            <option value="">{t('crop')}: All</option>
            {crops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>
        
        {(selectedDistrict || selectedCrop || searchQuery) && (
          <button
            onClick={clearFilters}
            className="text-xs text-forest-green hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Prices Table */}
      <div className="overflow-x-auto max-h-96">
        <table className="w-full">
          <thead className="sticky top-0 bg-white">
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-2 text-sm font-semibold text-gray-700">{t('district')}</th>
              <th className="text-left py-2 text-sm font-semibold text-gray-700">{t('crop')}</th>
              <th className="text-right py-2 text-sm font-semibold text-gray-700">{t('price')}</th>
              <th className="text-right py-2 text-sm font-semibold text-gray-700">{t('change')}</th>
            </tr>
          </thead>
          <tbody>
            {displayPrices.length > 0 ? (
              displayPrices.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-light-green transition-colors">
                  <td className="py-3 text-sm font-medium text-gray-800">{item.district}</td>
                  <td className="py-3 text-sm font-medium text-gray-800">{item.crop}</td>
                  <td className="py-3 text-right text-sm font-bold text-forest-green">₹{item.price}</td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      {getTrendIcon(item.trend)}
                      <span
                        className={`text-sm font-semibold ${
                          item.trend === 'up'
                            ? 'text-green-600'
                            : item.trend === 'down'
                            ? 'text-red-600'
                            : 'text-gray-400'
                        }`}
                      >
                        {item.change > 0 ? '+' : ''}{item.change}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-8 text-center text-gray-500">
                  No prices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <p className="mt-4 text-xs text-gray-500 text-center">
        {t('pricesUpdated')}
      </p>
    </div>
  )
}

export default MandiLive

