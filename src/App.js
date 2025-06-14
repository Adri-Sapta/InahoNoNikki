import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import ProfileCard from './components/profilecard';
import StreamStats from './components/streamstat';
import ViewerTrendChart from './components/viewertrenchart';
import MembershipStats from './components/membershipstat';
import BahasaRecap from './components/bahasarecap';

function App() {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileCard />;
      case 'stream':
        return <StreamStats />;
      case 'trend':
        return <ViewerTrendChart />;
      case 'membership':
        return <MembershipStats />;
      case 'bahasa':
        return <BahasaRecap />;
      default:
        return <ProfileCard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-pink-50 text-gray-800">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <main className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-pink-700">🌸 いなほの観察日記 🌸</h1>
          <p className="text-sm text-pink-500">落乃いなほのStatistic</p>
        </header>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
