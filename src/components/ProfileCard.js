import React from 'react';
import profileImage from '../assets/inahoImg01.png';

//prop: 'isActive' untuk pulse, 'hasBeenViewed' untuk reveal
function ProfileCard({ isActive, hasBeenViewed }) {
  return (
    <div className={`
      bg-white p-6 rounded-xl shadow-lg border border-pink-100 
      transition-all duration-700 ease-in-out
      ${hasBeenViewed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
      ${isActive ? 'animate-pulse-active' : ''}
    `}>
      {/* Bagian Header Profil */}
      <div className="flex flex-col md:flex-row items-center">
        {/* Ukuran gambar disesuaikan untuk mobile dan desktop */}
        <img 
          src={profileImage}
          alt="落乃いなほ Profile" 
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-pink-200 shadow-lg mb-4 md:mb-0 md:mr-6 transition-transform duration-300 hover:scale-105"
        />
        <div className="text-center md:text-left">
          {/* Ukuran judul utama responsif */}
          <h2 className="text-2xl md:text-3xl font-bold text-pink-800">落乃いなほ (Ochinai Inaho)</h2>
          <p className="text-sm md:text-base text-gray-600">Ambisi: Menikah dengan raja minyak.</p>
          <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">娯楽プロ (Goraku Pro)</span>
            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Pecinta Pacuan Kuda</span>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Belajar Multi-bahasa</span>
          </div>
        </div>
      </div>

      {/* Bagian Lore */}
      <div className="mt-8 border-t border-pink-100 pt-6">
        {/* Ukuran subjudul responsif */}
        <h3 className="text-lg md:text-xl font-semibold text-pink-700 mb-4">Lore Resmi</h3>
        <div className="space-y-3 text-gray-700">
          <blockquote className="border-l-4 border-pink-200 pl-4 italic text-sm md:text-base">
           "Seorang wanita cantik berkimono dengan aura tenang. Namun sebenarnya orang gila yang pernah berhenti dari pekerjaannya karena terlalu mencintai pacuan kuda. Sedang belajar banyak bahasa dan memiliki ambisi untuk menikah dengan raja minyak di masa depan."
          </blockquote>
        </div>
      </div>

      {/* Bagian Kreator */}
      <div className="mt-8 border-t border-pink-100 pt-6">
        <h3 className="text-lg md:text-xl font-semibold text-pink-700 mb-4">Kreator (Mama & Papa)</h3>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">♡ Mama (Ilustrator):</span> 
            <a href="https://twitter.com/TeraAru6262" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-2">
              @TeraAru6262
            </a>
          </p>
          <p>
            <span className="font-semibold">♡ Papa (Live2D):</span> 
            <a href="https://twitter.com/hatyati" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-2">
              @hatyati
            </a>
          </p>
        </div>
      </div>
      
      {/* Bagian Tautan Resmi */}
      <div className="mt-8 border-t border-pink-100 pt-6">
        <h3 className="text-lg md:text-xl font-semibold text-pink-700 mb-4">Tautan Resmi</h3>
        <div className="flex flex-wrap gap-3">
          <a href="https://www.youtube.com/@落乃いなほ" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-110">
            YouTube
          </a>
          <a href="https://x.com/inaho_vt" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-110">
            X (Twitter)
          </a>
          <a href="https://gorakupro.jp/talent/ochinai_inaho" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-110">
            Website Goraku Pro
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
