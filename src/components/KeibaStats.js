import React from 'react';
// Fitur yang gagal ditampilkan
const keibaStats = {
  knownBets: 3,
  wins: 2,
};

function KeibaStats({ isActive, hasBeenViewed }) {
  return (
    <div className={`transition-all duration-700 ease-in-out ${hasBeenViewed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${isActive ? 'animate-pulse-active' : ''}`}>
      <div className="bg-white p-6 rounded-xl shadow-lg border border-pink-100">
        <p className="text-sm text-gray-500 mb-4 text-center">(Berdasarkan pelacakan komunitas)</p>
        <div className="flex justify-around text-center">
          <div>
            <p className="text-5xl font-bold text-green-500">{keibaStats.wins}</p>
            <p className="text-md text-gray-600">Total Menang</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-gray-700">{keibaStats.knownBets}</p>
            <p className="text-md text-gray-600">Total Taruhan (Diketahui)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default KeibaStats;