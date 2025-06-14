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

      {/* Spacer agar tombol notifikasi tetap di kanan */}
      <div className="flex-grow md:hidden"></div>

      {/* Judul yang hanya terlihat di layar besar */}
      <div className="hidden md:block text-lg font-semibold text-pink-700 ml-4">
        Inaho Log Analytics
      </div>
      
      {/* Tombol Notifikasi */}
      <button onClick={onNotifikasiClick} className="relative p-2 rounded-full hover:bg-pink-100 text-gray-500 hover:text-pink-600 focus:outline-none transition-colors">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm-2-6V6a4 4 0 1 0-8 0v4H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2zM8 8a2 2 0 1 1 4 0v2H8V8z" /></svg>
        {notifikasiCount > 0 && (
          <span className="absolute top-1 right-1 inline-flex items-center justify-center h-4 w-4 text-xs font-bold text-white bg-red-500 rounded-full">
            {notifikasiCount}
          </span>
        )}
      </button>
    </div>
  );
}

export default Headbar;