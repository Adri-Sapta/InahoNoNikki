import React from 'react';
// Pastikan Anda sudah membuat folder 'awards' dan menaruh gambar sertifikat di dalamnya
import certificateImage from '../assets/awards/sertif01.jpeg'; 

function Awards({ isActive, hasBeenViewed }) {
  return (
    <div className={`transition-all duration-700 ease-in-out ${hasBeenViewed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${isActive ? 'animate-pulse-active' : ''}`}>
      <div className="bg-white p-6 rounded-xl shadow-lg border border-pink-100 text-center">
        <h3 className="text-xl font-bold text-gray-800">Sertifikat Kelulusan Ujian Bahasa</h3>
        <p className="text-gray-600 mb-4 mt-1">Diberikan sebagai apresiasi atas keberhasilan menyelesaikan Ujian Bahasa Indonesia Batch 1 dengan nilai memuaskan.</p>
         <div className="flex justify-center">
           <img src={certificateImage} alt="Sertifikat untuk Inaho" className="max-w-full md:max-w-lg rounded-lg shadow-md" />
         </div>
      </div>
    </div>
  );
}
export default Awards;