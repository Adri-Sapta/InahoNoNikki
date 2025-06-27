import React, { useState, useEffect } from 'react';

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    // Fungsi scroll ke atas halaman 
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      // Tombol akan muncul setelah pengguna scroll ke bawah 
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // Membersihkan listener saat komponen tidak lagi ditampilkan
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    // Padding diubah agar lebih kecil di mobile dan lebih besar di desktop
    <footer className="bg-white text-center p-4 md:p-6 mt-12 rounded-t-xl shadow-inner-top border-t border-pink-100">
      <div className="text-xs md:text-sm text-gray-600">
        © Copyright <strong>TurfMates</strong>. All Rights Reserved.
      </div>
      <div className="text-[11px] md:text-xs text-gray-500 mt-1">
        Designed & Developed with ❤️ & Dedication For Ochinai Inaho
      </div>

      {/* Tombol Scroll to Top responsif */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          // Lebih kecil & sedikit lebih ke dalam di mobile, lebih besar di desktop
          className="fixed bottom-4 right-4 md:bottom-5 md:right-5 bg-pink-600 text-white w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg hover:bg-pink-700 focus:outline-none transition-all duration-300 flex items-center justify-center z-50"
          aria-label="Kembali ke atas"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </footer>
  );
}

export default Footer;
