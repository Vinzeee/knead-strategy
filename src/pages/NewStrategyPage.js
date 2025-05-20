// src/pages/NewStrategyPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useApp } from '../context/AppContext';

const NewStrategyPage = () => {
  const navigate = useNavigate();
  const { addStrategy } = useApp();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      // Mock a POST request delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      addStrategy({
        title,
        description,
        visibility,
      });
      
      navigate('/');
    } catch (error) {
      console.error('Error adding strategy:', error);
      setIsSubmitting(false);
    }
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
        <h1 className="text-2xl font-bold text-primary-800 mb-6">Create New Strategy</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
              placeholder="Enter a descriptive title for your strategy"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="10"
              className={`w-full px-4 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
              placeholder="Describe your strategy in detail, including how it works, when to use it, and any special considerations"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Visibility
            </label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  id="public"
                  type="radio"
                  value="public"
                  checked={visibility === 'public'}
                  onChange={() => setVisibility('public')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <label htmlFor="public" className="ml-2 text-sm text-gray-700">
                  Public
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="private"
                  type="radio"
                  value="private"
                  checked={visibility === 'private'}
                  onChange={() => setVisibility('private')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <label htmlFor="private" className="ml-2 text-sm text-gray-700">
                  Private
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 mr-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Strategy'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewStrategyPage;
