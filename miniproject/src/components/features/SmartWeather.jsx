import { Cloud, Droplets, Thermometer, AlertTriangle, Search, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import axios from 'axios'

const SmartWeather = () => {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)
  const [searchCity, setSearchCity] = useState('')

  const API_KEY = 'f61d97b78c22d8423d5f6fa0df44d4b7';

  // Core function to fetch weather
  const fetchWeather = async (params) => {
    setIsLoading(true);
    setError(null);
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;
      
      // Check if searching by city name or coordinates
      if (params.city) {
        url += `&q=${params.city}`;
      } else if (params.lat && params.lon) {
        url += `&lat=${params.lat}&lon=${params.lon}`;
      }

      const response = await axios.get(url);
      const data = response.data;

      let smartAlerts = ["Ideal conditions for watering crops"];
      if (data.main.humidity > 80) smartAlerts.push("High humidity - monitor for fungal diseases");
      if (data.weather[0].main === 'Rain') smartAlerts.push("Rain detected - Don't spray pesticides now");
      if (data.main.temp > 35) smartAlerts.push("Heat wave alert - Provide extra irrigation");

      setWeatherData({
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        city: data.name,
        alerts: smartAlerts
      });
      setIsLoading(false);
    } catch (err) {
      console.error("Weather API Error:", err);
      setError("City not found or API error");
      setIsLoading(false);
    }
  };

  // Initial Load: Auto-detect location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => fetchWeather({ lat: position.coords.latitude, lon: position.coords.longitude }),
        () => fetchWeather({ city: 'Chennai' }) // Fallback
      );
    } else {
      fetchWeather({ city: 'Chennai' });
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      fetchWeather({ city: searchCity });
    }
  };

  const resetToCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => fetchWeather({ lat: position.coords.latitude, lon: position.coords.longitude })
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-2 border-lime-green">
      {/* Header & Search Area */}
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-lime-green/20 p-3 rounded-lg">
              <Cloud className="w-6 h-6 text-forest-green" />
            </div>
            <h3 className="text-xl font-bold text-forest-green">{t('smartWeather')}</h3>
          </div>
          <button 
            onClick={resetToCurrentLocation}
            className="p-2 hover:bg-gray-100 rounded-full text-forest-green"
            title="Use My Location"
          >
            <MapPin className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <input 
            type="text"
            placeholder="Change Location (e.g. Madurai)"
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-100 rounded-lg focus:border-lime-green outline-none text-sm"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </form>
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 bg-gray-100 rounded"></div>
            <div className="h-20 bg-gray-100 rounded"></div>
          </div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-sm p-4 bg-red-50 rounded-lg flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2" /> {error}
        </div>
      ) : (
        <>
          <p className="text-xs font-bold text-gray-400 uppercase mb-4 flex items-center">
            <MapPin className="w-3 h-3 mr-1" /> {weatherData.city}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Thermometer className="w-5 h-5 text-forest-green" />
                <span className="text-sm font-semibold text-gray-700">{t('temperature')}</span>
              </div>
              <p className="text-2xl font-bold text-forest-green">{weatherData.temperature}°C</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Droplets className="w-5 h-5 text-forest-green" />
                <span className="text-sm font-semibold text-gray-700">{t('humidity')}</span>
              </div>
              <p className="text-2xl font-bold text-forest-green">{weatherData.humidity}%</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-gray-700 flex items-center space-x-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <span>{t('actionableAlerts')}</span>
            </h4>
            <div className="space-y-2">
              {weatherData.alerts.map((alert, index) => (
                <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                  <p className="text-xs text-gray-700 font-medium">{alert}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default SmartWeather