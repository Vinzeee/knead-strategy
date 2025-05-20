// src/components/StrategyCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useApp } from '../context/AppContext';

const StrategyCard = ({ strategy }) => {
  const { users, toggleLikeStrategy, isLiked } = useApp();
  const author = users.find(user => user.id === strategy.authorId);
  const liked = isLiked(strategy.id);

  // Format date to readable string
  const formattedDate = format(new Date(strategy.createdAt), 'MMM d, yyyy');
  
  // Truncate description for preview
  const truncateDescription = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-200">
      <Link to={`/strategy/${strategy.id}`}>
        <h2 className="text-xl font-semibold text-primary-700 mb-2 hover:text-primary-500">
          {strategy.title}
        </h2>
      </Link>
      <div className="flex items-center mb-3">
        <Link to={`/user/${author?.id}`} className="text-sm font-medium text-gray-600 hover:text-primary-600">
          {author?.name}
        </Link>
        <span className="text-xs text-gray-500 ml-2">• {formattedDate}</span>
      </div>
      <p className="text-gray-700 mb-4">{truncateDescription(strategy.description)}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex space-x-4">
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleLikeStrategy(strategy.id);
            }}
            className="flex items-center hover:text-primary-600"
          >
            {liked ? 
              <HeartIconSolid className="h-5 w-5 text-red-500 mr-1" /> : 
              <HeartIcon className="h-5 w-5 mr-1" />
            }
            <span>{strategy.likes}</span>
          </button>
          <Link to={`/strategy/${strategy.id}`} className="flex items-center hover:text-primary-600">
            <ChatBubbleLeftIcon className="h-5 w-5 mr-1" />
            <span>{strategy.comments.length}</span>
          </Link>
        </div>
        <div>
          <span className="text-xs">
            {strategy.visibility === 'public' ? 'Public' : 'Private'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StrategyCard;
