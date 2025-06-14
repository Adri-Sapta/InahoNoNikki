import React, { useState, useEffect } from 'react';

function Footer() {
  // State untuk mengontrol visibilitas tombol scroll-to-top
  const [isVisible, setIsVisible] = useState(false);

  // Fungsi untuk scroll ke atas
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Efek untuk memunculkan/menyembunyikan tombol berdasarkan posisi scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) { // Muncul setelah scroll 300px
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // Cleanup listener saat komponen di-unmount
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <footer className="bg-white text-center p-6 mt-12 rounded-t-xl shadow-inner-top border-t border-pink-100">
      <div className="text-sm text-gray-600">
        © Copyright <strong>TurfMates</strong>. All Rights Reserved.
      </div>
      <div className="text-xs text-gray-500 mt-1">
        Designed & Developed with ❤️ & Dedication For Ochinai Inaho
      </div>

      {/* Tombol Scroll to Top */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-pink-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-pink-700 focus:outline-none transition-all duration-300 flex items-center justify-center"
          aria-label="Kembali ke atas"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </footer>
  );
}

export default Footer;
