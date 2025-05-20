// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ForumPage from './pages/ForumPage';
import StrategyDetailPage from './pages/StrategyDetailPage';
import NewStrategyPage from './pages/NewStrategyPage';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="pt-4 pb-8">
            <Routes>
              <Route path="/" element={<ForumPage />} />
              <Route path="/strategy/:id" element={<StrategyDetailPage />} />
              <Route path="/new-strategy" element={<NewStrategyPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
