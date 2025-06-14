import React from 'react';

import profileImage from '../assets/inahoImgSide.png';

function Sidebar({ activeTab, handleScrollTo, headerHeight }) {
  

  const menuItems = [
    { key: 'home', label: '🏠 Home' },
    { key: 'profile', label: '👤 Profile' },
    { key: 'stream', label: '📈 Stream Stats' },
    { key: 'trend', label: '📊 Viewer Trends' },
    { key: 'growth', label: '🚀 Pencapaian' },
    { key: 'bahasa', label: '🇮🇩 Bahasa Recap' },
    { key: 'exam', label: '📝 Ujian' },
    { key: 'awards', label: '🏆 Penghargaan' },
    { key: 'recommendations', label: '❤️ Rekomendasi' },
  ];

  return (
    <aside 
      className="bg-white p-4 shadow-lg fixed left-0 top-0 z-50 flex flex-col"
      style={{
        width: '256px', // Lebar w-64
        height: '100vh',
      }}
    >
      <div className="flex flex-col items-center text-center pb-4 border-b border-pink-100">
        <img 
          src={profileImage} 
          alt="Inaho Profile" 
          className="w-24 h-24 rounded-full object-cover border-4 border-pink-200 mb-3"
        />
        <h1 className="text-lg font-bold text-pink-800">落乃いなほ</h1>
        <p className="text-xs text-gray-500">Ochinai Inaho</p>
        
        <div className="flex space-x-3 mt-4">
          <a href="https://www.youtube.com/@落乃いなほ" target="_blank" rel="noopener noreferrer" title="YouTube" className="text-gray-500 hover:text-red-600 transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a href="https://x.com/inaho_vt" target="_blank" rel="noopener noreferrer" title="X (Twitter)" className="text-gray-500 hover:text-black transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>

      <nav className="flex-grow space-y-2 mt-4 overflow-y-auto">
        {menuItems.map(item => (
          <button
            key={item.key}
            onClick={() => handleScrollTo(item.key)}
            className={`block w-full text-left px-4 py-2 rounded transition-all duration-200 ${
              activeTab === item.key
                ? 'bg-pink-200 text-pink-900 font-semibold shadow-inner'
                : 'hover:bg-pink-100 text-gray-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
