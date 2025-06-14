import React from 'react';

// Komponen ini menerima prop 'isLoading' untuk mengontrol kapan animasi fade-out dijalankan
function Preloader({ isLoading }) {
  return (
    <div 
      className={`
        preloader fixed inset-0 z-50 flex items-center justify-center bg-pink-50 
        ${!isLoading ? 'animate-fade-out' : ''}
      `}
    >
      <div className="text-center animate-pulse-text">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-700">
          🌸 いなほの観察日記 🌸
        </h1>
        <p className="text-lg text-pink-500 mt-2">Tunggu Sebentar Bang...</p>
      </div>
    </div>
  );
}

export default Preloader;