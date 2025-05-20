// src/pages/ForumPage.js
import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import StrategyCard from '../components/StrategyCard';
import { useApp } from '../context/AppContext';

const ForumPage = () => {
  const { strategies, users } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAuthor, setFilterAuthor] = useState('');

  // Filter strategies based on search term and author filter
  const filteredStrategies = strategies.filter(strategy => {
    const matchesSearch = strategy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         strategy.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAuthor = filterAuthor === '' || 
                         users.find(user => user.id === strategy.authorId)?.name.toLowerCase().includes(filterAuthor.toLowerCase());
    
    return matchesSearch && matchesAuthor;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-primary-800 mb-6">Strategy Forum</h1>
      
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search strategies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Filter by author..."
              value={filterAuthor}
              onChange={(e) => setFilterAuthor(e.target.value)}
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      
      <div>
        {filteredStrategies.length > 0 ? (
          filteredStrategies.map(strategy => (
            <StrategyCard key={strategy.id} strategy={strategy} />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No strategies found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumPage;
