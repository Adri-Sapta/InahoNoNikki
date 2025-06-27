import React, { useEffect, useRef } from 'react';

const NotifikasiModal = ({ isOpen, onClose, notifikasis }) => {
  // Efek untuk menutup modal saat tombol ESC ditekan
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Jika modal tidak terbuka, jangan render apa pun
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] transition-opacity duration-300 p-4"
      onClick={onClose}
    >
      {/* Konten Modal dengan animasi muncul */}
      <div
        className="bg-white p-4 md:p-6 rounded-xl shadow-xl w-full max-w-md transition-transform duration-300 transform scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="notifikasi-modal-title"
      >
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-pink-100">
          {/*Menyesuaikan ukuran judul */}
          <h2 id="notifikasi-modal-title" className="text-xl md:text-2xl font-bold text-pink-800">
            Notifikasi
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-pink-600 focus:outline-none transition-colors rounded-full p-1"
            aria-label="Tutup notifikasi"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {notifikasis.length === 0 ? (
          <p className="text-gray-600">Tidak ada notifikasi baru.</p>
        ) : (
          <ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {notifikasis.map((notifikasi) => (
              //padding list item
              <li key={notifikasi.id} className="bg-pink-50/50 p-3 rounded-md border border-pink-100 text-gray-700 text-sm hover:bg-pink-100 transition-colors">
                {notifikasi.message}
                {notifikasi.timestamp && (
                  <span className="block text-xs text-pink-700/80 mt-1">
                    {new Date(notifikasi.timestamp).toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotifikasiModal;