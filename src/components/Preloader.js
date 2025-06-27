import React from 'react';

// menerima prop 'isLoading' untuk mengontrol kapan animasi fade-out dijalankan
function Preloader({ isLoading }) {
  return (
    <div 
      // Menambahkan padding horizontal
      className={`
        preloader fixed inset-0 z-[9999] flex items-center justify-center bg-pink-50 p-4
        ${!isLoading ? 'animate-fade-out' : ''}
      `}
    >
      <div className="text-center animate-pulse-text">
        {/* Ukuran teks dibuat lebih kecil jika layar kecil dan membesar di layar yang lebih lebar */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-700">
          🌸 いなほの観察日記 🌸
        </h1>
        {/* Ukuran teks subjudul juga dibuat responsif */}
        <p className="text-base sm:text-lg text-pink-500 mt-2">Tunggu Sebentar Bang...</p>
      </div>
    </div>
  );
}

export default Preloader;