import { MessageCircle, Heart, Share2, User } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'

const CommunityForum = () => {
  const { t } = useLanguage()
  const [posts] = useState([
    {
      id: 1,
      author: 'Rajesh Kumar',
      time: '2 hours ago',
      content: 'Great tips on organic farming! My tomato yield increased by 30% this season.',
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      author: 'Priya Devi',
      time: '5 hours ago',
      content: 'Can anyone suggest the best time to plant paddy in Tamil Nadu?',
      likes: 15,
      comments: 12,
    },
    {
      id: 3,
      author: 'Mohan Singh',
      time: '1 day ago',
      content: 'Sharing my experience with drip irrigation - saved 40% water!',
      likes: 42,
      comments: 18,
    },
  ])

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-2 border-lime-green">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-lime-green/20 p-3 rounded-lg">
          <MessageCircle className="w-6 h-6 text-forest-green" />
        </div>
        <h3 className="text-xl font-bold text-forest-green">{t('communityForum')}</h3>
      </div>
      <p className="text-gray-600 mb-4 text-sm">
        {t('communityForumDesc')}
      </p>

      {/* Posts Feed */}
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-lime-green transition-colors"
          >
            <div className="flex items-center space-x-2 mb-2">
              <div className="bg-forest-green text-white rounded-full p-2">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-forest-green">{post.author}</p>
                <p className="text-xs text-gray-500">{post.time}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-3">{post.content}</p>
            <div className="flex items-center space-x-4 text-xs text-gray-600">
              <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                <Heart className="w-4 h-4" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-forest-green transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-forest-green transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 bg-forest-green text-white rounded-lg hover:bg-dark-green transition-colors font-semibold text-sm">
        {t('viewAllPosts')}
      </button>
    </div>
  )
}

export default CommunityForum

