import React from 'react';

function Sidebar({ setActiveTab, activeTab }) {
  const menuItems = [
    { key: 'profile', label: '👤 Profile' },
    { key: 'stream', label: '📈 Stream Stats' },
    { key: 'trend', label: '📊 Viewer Trends' },
    { key: 'membership', label: '🧑‍🤝‍🧑 Membership' },
    { key: 'bahasa', label: '🇮🇩 Bahasa Recap' }
  ];

  return (
    <aside className="w-64 bg-white p-4 shadow-md">
      <nav className="space-y-2">
        {menuItems.map(item => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === item.key
                ? 'bg-pink-200 text-pink-900 font-semibold'
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