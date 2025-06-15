import React from 'react';

// Terima semua props yang dikirim dari App.js
function Headbar({ onMenuClick, onNotifikasiClick, notifikasiCount }) {
  return (
    <div
      className="bg-white fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 shadow-sm border-b border-pink-100"
      style={{ height: '72px' }}
    >
      {/* --- TOMBOL MENU BARU (HANYA MUNCUL DI MOBILE) --- */}
      <button 
        onClick={onMenuClick}
        className="p-2 rounded-full text-gray-500 hover:bg-pink-100 md:hidden" // md:hidden menyembunyikannya di layar besar
        aria-label="Buka menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>

      {/* Spacer agar tombol notifikasi tetap di kanan di mobile */}
      <div className="flex-grow md:hidden"></div>

      {/* Judul yang hanya terlihat di layar besar */}
      <div className="hidden md:block text-lg font-semibold text-pink-700 ml-4">
        Inaho Log Analytics
      </div>
      
      {/* Tombol Notifikasi */}
      <button 
          onClick={onNotifikasiClick} 
          className="buttonnotif" // Menggunakan kelas dari app.css Anda
          aria-label="Tampilkan notifikasi"
        >
          {/* Menggunakan SVG lonceng baru dari Uiverse */}
          <svg viewBox="0 0 448 512" className="bellnotif">
              <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path>
          </svg>
          {notifikasiCount > 0 && (
            // Lencana notifikasi
            <span className="absolute top-1.5 right-1.5 inline-flex items-center justify-center h-4 w-4 text-[10px] font-bold text-white bg-red-500 rounded-full">
              {notifikasiCount}
            </span>
          )}
        </button>
    </div>
  );
}

export default Headbar;