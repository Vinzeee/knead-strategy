// src/pages/StrategyDetailPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { HeartIcon, ChartBarIcon, ClockIcon, EyeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import CommentSection from '../components/CommentSection';
import UserProfile from '../components/UserProfile';
import { useApp } from '../context/AppContext';

const StrategyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { strategies, users, toggleLikeStrategy, isLiked } = useApp();
  const [showUserProfile, setShowUserProfile] = useState(false);
  
  const strategyId = parseInt(id);
  const strategy = strategies.find(s => s.id === strategyId);
  
  if (!strategy) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-xl text-gray-600">Strategy not found</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Forum
        </button>
      </div>
    );
  }
  
  const author = users.find(user => user.id === strategy.authorId);
  const liked = isLiked(strategyId);
  const formattedDate = format(new Date(strategy.createdAt), 'MMMM d, yyyy');
  
  // Mock metrics
  const metrics = {
    winRate: Math.round(Math.random() * 30 + 50) + '%',
    avgProfit: '$' + Math.round(Math.random() * 40 + 10) + '/trade',
    timeframe: ['1H', '4H', 'Daily'][Math.floor(Math.random() * 3)],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <button 
        onClick={() => navigate('/')}
        className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        Back to Forum
      </button>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-primary-800 mb-3">{strategy.title}</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button 
              onClick={() => setShowUserProfile(true)}
              className="font-medium text-primary-600 hover:text-primary-800"
            >
              {author?.name}
            </button>
            <span className="text-gray-500 ml-2">• {formattedDate}</span>
          </div>
          
          <button 
            onClick={() => toggleLikeStrategy(strategyId)}
            className={`flex items-center ${liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
          >
            {liked ? <HeartIconSolid className="h-6 w-6 mr-1" /> : <HeartIcon className="h-6 w-6 mr-1" />}
            <span>{strategy.likes}</span>
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-md mb-6">
          <div className="flex items-center">
            <ChartBarIcon className="h-5 w-5 text-primary-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Win Rate</p>
              <p className="font-semibold">{metrics.winRate}</p>
            </div>
          </div>
          <div className="flex items-center">
            <HeartIcon className="h-5 w-5 text-primary-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Avg. Profit</p>
              <p className="font-semibold">{metrics.avgProfit}</p>
            </div>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 text-primary-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Timeframe</p>
              <p className="font-semibold">{metrics.timeframe}</p>
            </div>
          </div>
        </div>
        
        <div className="prose max-w-none mb-8">
          <p className="text-gray-700 whitespace-pre-line">{strategy.description}</p>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <EyeIcon className="h-5 w-5 mr-1" />
          <span>{strategy.visibility === 'public' ? 'Public Strategy' : 'Private Strategy'}</span>
        </div>
        
        <CommentSection strategyId={strategyId} comments={strategy.comments} />
      </div>
      
      {showUserProfile && (
        <UserProfile userId={author.id} onClose={() => setShowUserProfile(false)} />
      )}
    </div>
  );
};

export default StrategyDetailPage;
