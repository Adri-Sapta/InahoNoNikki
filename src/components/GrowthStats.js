import React, { useState, useEffect } from 'react';

// --- DATABASE MILESTONE MANUAL ---
// Saya perbarui berdasarkan informasi Anda. Anda bisa menyesuaikannya lagi nanti.
const milestones = [
  { date: 'Juni 2025', event: 'Mencapai 14,000 Subscribers', icon: '💖' },
  { date: 'Awal Juni 2025', event: 'Mencapai 10,000 Subscribers', icon: '🎉' },
  { date: 'Akhir Mei 2025', event: 'Mencapai 7,000 Subscribers', icon: '✨' },
  { date: 'Pertengahan Mei 2025', event: 'Mencapai 5,000 Subscribers', icon: '👍' },
  { date: '15 Mei 2025', event: 'Stream Karaoke Pertama', icon: '🎤' },
  { date: '3 Mei 2025', event: 'Debut Resmi di YouTube', icon: '🚀' },
  // Tambahkan milestone lainnya di sini jika Anda ingat
];

function GrowthStats({ isActive, hasBeenViewed }) {
  const [channelStats, setChannelStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannelStats = async () => {
      const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
      const channelId = 'UCxk-xk9E_GS8Z5qJ-iBYLyw';
      if (!apiKey) {
        setError("API Key tidak ditemukan!"); setLoading(false); return;
      }
      const apiUrl = `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&id=${channelId}&part=statistics`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setChannelStats(data.items[0].statistics);
        } else {
          throw new Error("Channel tidak ditemukan.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchChannelStats();
  }, []);

  return (
    <div className={`transition-all duration-700 ease-in-out ${hasBeenViewed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${isActive ? 'animate-pulse-active' : ''}`}>
      <h2 className="section-title">🚀 Pencapaian</h2>
      <div className="bg-white p-6 rounded-xl shadow-lg border border-pink-100 space-y-8">
        
        {loading && <p className="text-center text-gray-500">Memuat data pertumbuhan...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {channelStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div className="bg-pink-50 p-6 rounded-lg">
              <p className="text-lg md:text-xl text-pink-800 font-semibold">Total Subscriber</p>
              <p className="text-4xl md:text-5xl font-bold text-pink-600 mt-2">
                {Number(channelStats.subscriberCount).toLocaleString('id-ID')}
              </p>
            </div>
            <div className="bg-pink-50 p-6 rounded-lg">
              <p className="text-lg md:text-xl text-pink-800 font-semibold">Total Channel Views</p>
              <p className="text-4xl md:text-5xl font-bold text-pink-600 mt-2">
                {Number(channelStats.viewCount).toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        )}
        
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center">Linimasa Pencapaian</h3>
          <div className="relative border-l-2 border-pink-200 ml-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="mb-8 pl-8">
                <div className="absolute -left-[11px] h-5 w-5 rounded-full bg-pink-500 border-2 border-white"></div>
                <p className="text-sm text-pink-600 font-semibold">{milestone.date}</p>
                <h4 className="text-base md:text-lg font-bold text-gray-900 mt-1">{milestone.icon} {milestone.event}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


export default GrowthStats;