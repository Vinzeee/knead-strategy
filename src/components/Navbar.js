// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const { currentUser } = useApp();

  return (
    <nav className="bg-primary-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-white font-bold text-xl">Knead</span>
              <span className="text-primary-200 font-medium ml-2">Strategy Forum</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to="/new-strategy"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              New Strategy
            </Link>
            <div className="ml-4 flex items-center">
              <span className="text-primary-200 mr-2">{currentUser.name}</span>
              <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
                {currentUser.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
