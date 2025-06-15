import React from 'react';

// Komponen ini menerima prop 'isLoading' untuk mengontrol kapan animasi fade-out dijalankan
function Preloader({ isLoading }) {
  return (
    <div 
      // Menambahkan padding horizontal (p-4) untuk memberi ruang di layar sempit
      className={`
        preloader fixed inset-0 z-[9999] flex items-center justify-center bg-pink-50 p-4
        ${!isLoading ? 'animate-fade-out' : ''}
      `}
    >
      <div className="text-center animate-pulse-text">
        {/* Ukuran teks dibuat lebih kecil di HP (text-3xl) dan membesar di layar yang lebih lebar */}
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