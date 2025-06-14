import React, { useEffect, useRef } from 'react';

const NotifikasiModal = ({ isOpen, onClose, notifikasis }) => {
  const modalRef = useRef(); // Digunakan jika ingin fokus pada modal saat dibuka

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
  }, [isOpen, onClose]); // Dependensi: hanya aktif jika isOpen berubah atau onClose berubah

  // Jika modal tidak terbuka, jangan render apa pun
  if (!isOpen) return null;

  return (
    // Overlay (latar belakang gelap)
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]" // z-index sangat tinggi agar selalu di atas
      onClick={onClose} // Menutup modal saat mengklik di luar konten modal
    >
      {/* Konten Modal */}
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4 md:mx-0"
        onClick={(e) => e.stopPropagation()} // Mencegah penutupan saat mengklik di dalam konten modal
        role="dialog" // Penting untuk aksesibilitas
        aria-modal="true" // Penting untuk aksesibilitas
        aria-labelledby="notifikasi-modal-title"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="notifikasi-modal-title" className="text-2xl font-bold text-gray-800">
            Notifikasi
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none text-3xl font-light leading-none"
            aria-label="Tutup notifikasi"
          >
            &times; {/* Simbol 'x' untuk menutup */}
          </button>
        </div>

        {notifikasis.length === 0 ? (
          <p className="text-gray-600">Tidak ada notifikasi baru.</p>
        ) : (
          <ul className="space-y-3 max-h-80 overflow-y-auto"> {/* Max height dan scroll jika notifikasi banyak */}
            {notifikasis.map((notifikasi, index) => (
              <li key={index} className="bg-gray-50 p-3 rounded-md border border-gray-200 text-gray-700 text-sm">
                {notifikasi.message}
                {notifikasi.timestamp && (
                  <span className="block text-xs text-gray-500 mt-1">
                    {new Date(notifikasi.timestamp).toLocaleString('id-ID')}
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