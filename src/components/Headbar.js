import React from 'react';

// Terima semua props yang dikirim dari App.js
function Headbar({ sidebarWidth, onNotifikasiClick, notifikasiCount }) {
  return (
    <div
      className="bg-white fixed top-0 z-40 flex items-center justify-end px-6 shadow-sm border-b border-pink-100"
      style={{
        height: '72px',
        left: `${sidebarWidth}px`,
        width: `calc(100% - ${sidebarWidth}px)`,
      }}
    >
      <button 
        onClick={onNotifikasiClick} 
        className="relative p-2 rounded-full hover:bg-pink-100 text-gray-500 hover:text-pink-600 focus:outline-none transition-colors"
        aria-label="Tampilkan notifikasi"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm-2-6V6a4 4 0 1 0-8 0v4H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2zM8 8a2 2 0 1 1 4 0v2H8V8z" /></svg>
        {notifikasiCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-500 rounded-full">
            {notifikasiCount}
          </span>
        )}
      </button>
    </div>
  );
}


export default Headbar;