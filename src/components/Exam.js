import React from 'react';
import examThumbnail from '../assets/thumbnails/thumb01.png';

const examData = {
  title: 'Ujian Bahasa Indonesia Inaho (Batch 1)',
  status: 'Passed',
  link: 'https://docs.google.com/document/d/14qMT79ByzU60_RMmp03GW1B98rc3UxnCTwhjgM_Jf8w/edit?tab=t.0'
};

function Exam({ isActive, hasBeenViewed }) {
  return (
    <div className={`transition-all duration-700 ease-in-out ${hasBeenViewed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${isActive ? 'animate-pulse-active' : ''}`}>
        <h3 className="text-xl font-bold text-gray-800">Ujian Bahasa Indonesia</h3>
        <p className="text-gray-600 mb-4 mt-1">"Practice Is Nothing Without Test"</p>
        {/* --- KARTU PEMBUNGKUS BARU --- */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-pink-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Kartu Ujian individual */}
          <div className="group rounded-xl overflow-hidden border border-gray-200 bg-white shadow-md hover:shadow-xl transition-shadow">
            <img src={examThumbnail} alt={examData.title} className="w-full h-40 object-cover" />
            <div className="p-4 flex flex-col items-center text-center">
              <h3 className="font-semibold text-gray-800 h-12">{examData.title}</h3>
              <span className="my-2 bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">{examData.status}</span>
              <a href={examData.link} target="_blank" rel="noopener noreferrer" className="mt-2 w-full bg-pink-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors">
                Mulai Ujian
              </a>
            </div>
          </div>
          {/* Anda bisa menambahkan kartu ujian lainnya di sini */}
        </div>
      </div>
    </div>
  );
}
export default Exam;