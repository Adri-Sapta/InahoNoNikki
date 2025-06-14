// src/components/sidebar.js

import React from 'react';

function Sidebar({ activeTab, handleScrollTo }) {
  // PENTING: headerHeight ini HARUS SAMA dengan yang di Header.js dan App.js
  const headerHeight = '70px'; 
  const sidebarWidth = '256px'; // Set lebar sidebar agar konsisten dengan w-64 (16rem = 256px)

  const menuItems = [
    { key: 'home', label: '🏠 Home' },
    { key: 'profile', label: '👤 Profile' },
    { key: 'stream', label: '📈 Stream Stats' },
    { key: 'trend', label: '📊 Viewer Trends' },
    { key: 'growth', label: '🚀 Pencapaian' },
    { key: 'bahasa', label: '🇮🇩 Bahasa Recap' }
  ];

  return (
    // Menggunakan 'fixed' agar sidebar tetap di tempat saat halaman di-scroll
    // top-[...] untuk posisi di bawah header
    // h-[calc(100vh-...)] untuk mengisi sisa tinggi layar
    // w-64 sesuai lebar yang Anda inginkan
    <aside
      className={`bg-inahoRed px-4 shadow-md fixed left-0 z-40 overflow-y-auto`}
      style={{
        height: `calc(100vh + ${headerHeight})`,
        width: sidebarWidth // Menggunakan style prop untuk lebar agar lebih eksplisit atau gunakan w-64
      }}
    >
      {/* Mengembalikan judul penuh "Inaho" */}
      <div className="text-xl py-4 font-bold mb-2 text-pink-700 h-[70px] flex items-center">
        <span className="text-4xl font-bold uppercase">落乃いなほ</span> {/* Tambahan span dan kelas font */}
      </div>

      <nav className="space-y-2 pt-4">
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
