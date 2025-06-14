import React from 'react';

function Sidebar({ activeTab, handleScrollTo }) {
  // Pastikan 'key' di sini sama persis dengan 'id' section di App.js
  const menuItems = [
    { key: 'home', label: '🏠 Home' }, 
    { key: 'profile', label: '👤 Profile' },
    { key: 'stream', label: '📈 Stream Stats' },
    { key: 'trend', label: '📊 Viewer Trends' },
    { key: 'membership', label: '🧑‍🤝‍🧑 Membership' },
    { key: 'bahasa', label: '🇮🇩 Bahasa Recap' }
  ];

  return (
    // 2. Tambahkan kelas 'sticky top-0 h-screen' agar sidebar tetap di tempat
    //    saat konten utama di-scroll.
    <aside className="w-64 bg-white p-4 shadow-md sticky top-0 h-screen">
      <nav className="space-y-2">
        {menuItems.map(item => (
          <button
            key={item.key}
            // 3. Ganti onClick untuk memanggil fungsi scroll
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
