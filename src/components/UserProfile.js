// src/components/UserProfile.js
import React from 'react';
import { useApp } from '../context/AppContext';

const UserProfile = ({ userId, onClose }) => {
  const { users, strategies, toggleFollow, isFollowing } = useApp();
  const user = users.find(u => u.id === userId);
  
  if (!user) return null;
  
  const userStrategies = strategies.filter(s => s.authorId === userId);
  const following = isFollowing(userId);
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-primary-700">User Profile</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="h-16 w-16 rounded-full bg-primary-500 flex items-center justify-center text-white text-xl">
            {user.name.charAt(0)}
          </div>
          <div className="ml-4">
            <h4 className="text-xl font-medium">{user.name}</h4>
            <p className="text-gray-500">Karma: {user.karma}</p>
          </div>
        </div>
        
        <div className="flex justify-between mb-4 text-sm text-gray-500">
          <div>
            <span className="font-medium">{user.followers}</span> Followers
          </div>
          <div>
            <span className="font-medium">{user.following}</span> Following
          </div>
          <div>
            <span className="font-medium">{userStrategies.length}</span> Strategies
          </div>
        </div>
        
        <div className="mb-4">
          <h5 className="font-medium mb-2">Recent Strategies</h5>
          {userStrategies.length > 0 ? (
            <ul className="text-sm">
              {userStrategies.slice(0, 3).map(strategy => (
                <li key={strategy.id} className="mb-1 text-primary-600 hover:text-primary-800">
                  {strategy.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No strategies yet</p>
          )}
        </div>
        
        <button
          onClick={() => toggleFollow(userId)}
          className={`w-full py-2 px-4 rounded-md text-center text-white ${
            following 
              ? 'bg-gray-500 hover:bg-gray-600' 
              : 'bg-primary-600 hover:bg-primary-700'
          }`}
        >
          {following ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
