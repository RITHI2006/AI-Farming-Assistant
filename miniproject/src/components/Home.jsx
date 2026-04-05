import { Sparkles, LogIn, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import Signin from './Signin'
import Signup from './Signup'

const Home = () => {
  const { t } = useLanguage()
  const [showAuthModal, setShowAuthModal] = useState(null) // 'signin', 'signup', or null

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-green to-white">
      {/* Main Hero Section */}
      <section className="relative bg-gradient-to-r from-forest-green to-dark-green text-white py-24 md:py-32 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-lime-green rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-lime-green rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Sparkles className="w-20 h-20 text-lime-green" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              WELCOME TO<br />
              <span className="text-lime-green">AI-FARMING ASSISTANT</span>
            </h1>
            
            <p className="text-lg md:text-xl mb-12 text-gray-200 max-w-2xl mx-auto">
              Empowering farmers with AI-driven solutions for crop disease detection, weather forecasting, market prices, and government schemes.
            </p>

            {/* Auth Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowAuthModal('signin')}
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-lg font-semibold text-lg bg-lime-green text-forest-green hover:bg-lime-green/90 transition-all transform hover:scale-105"
              >
                <LogIn className="w-6 h-6" />
                <span>Sign In</span>
              </button>
              
              <button
                onClick={() => setShowAuthModal('signup')}
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-lg font-semibold text-lg bg-white text-forest-green hover:bg-gray-100 transition-all transform hover:scale-105 border-2 border-lime-green"
              >
                <UserPlus className="w-6 h-6" />
                <span>Sign Up</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-forest-green text-center mb-12">
          Why Choose AI-Farming Assistant?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Disease Detection', desc: 'AI-powered crop disease identification using ML models' },
            { title: 'Smart Weather', desc: 'Real-time weather forecasts tailored for farming' },
            { title: 'Mandi Live', desc: 'Current market prices and trading information' },
            { title: 'Government Schemes', desc: 'Access all agricultural subsidy schemes' },
            { title: 'Voice Assistant', desc: 'Chat with AI in your preferred language' },
            { title: 'Community Forum', desc: 'Connect with farmers and share experiences' },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-forest-green mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Auth Modal - Sign In */}
      {showAuthModal === 'signin' && (
        <Signin onClose={() => setShowAuthModal(null)} onSwitchToSignup={() => setShowAuthModal('signup')} />
      )}

      {/* Auth Modal - Sign Up */}
      {showAuthModal === 'signup' && (
        <Signup onClose={() => setShowAuthModal(null)} onSwitchToSignin={() => setShowAuthModal('signin')} />
      )}
    </div>
  )
}

export default Home
