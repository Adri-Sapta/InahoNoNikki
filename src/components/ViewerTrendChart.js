import React, { useState, useEffect } from 'react';
// Impor komponen dan modul yang dibutuhkan dari Chart.js
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Daftarkan modul-modul Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// --- LOGIKA PENGKATEGORIAN VIDEO ---
const categorizeVideo = (title) => {
  const lowerTitle = title.toLowerCase();
  if (['minecraft', 'emily', 'shinkansen 0', 'dreadout', 'pamali'].some(term => lowerTitle.includes(term))) return 'Games';
  if (['天皇賞', 'マイルc', 'オークス', 'ダービー', '安田記念'].some(term => lowerTitle.includes(term))) return 'Pacuan Kuda';
  if (['karaoke', '歌配信'].some(term => lowerTitle.includes(term))) return 'Karaoke';
  if (['belajar', 'study with me', '日本語', 'test-day'].some(term => lowerTitle.includes(term))) return 'Belajar / Study';
  if (['indomie', 'durian', 'natto', 'nangka', 'idmievsjp', 'makan', '宝石たべる'].some(term => lowerTitle.includes(term))) return 'Makan-Makan';
  if (['zatsudan', 'mengobrol', 'chill chat', '雑談', 'pacar jepang'].some(term => lowerTitle.includes(term))) return 'Zatsudan';
  if (['buku catatan', 'berkencan'].some(term => lowerTitle.includes(term))) return 'Special';
  return 'Lain-lain';
};

const excludedTitles = [
  '【#新人vtuber 】落乃いなほ5月3日19時',
  '【Vtuber】Perkenalan diri【Dari Jepang'
];

const categoryOrder = [
    'Games',
    'Belajar / Study',
    'Karaoke',
    'Zatsudan',
    'Makan-Makan',
    'Pacuan Kuda',
    'Special',
    'Lain-lain'
];

// 1. Terima 'videoData' dan 'apiError' sebagai props
function ViewerTrendChart({ isActive, hasBeenViewed, videoData, apiError }) {
  const [categorizedStreams, setCategorizedStreams] = useState({});
  const [activeCategory, setActiveCategory] = useState('Games');
  
  // 2. useEffect memproses data dari props
  useEffect(() => {
    if (!videoData || videoData.length === 0) return;

    const debutDate = new Date('2024-05-01');
    const processedData = videoData
      .filter(video => {
        const publishDate = new Date(video.snippet.publishedAt);
        const isExcludedByTitle = excludedTitles.some(excluded => video.snippet.title.includes(excluded));
        return publishDate >= debutDate && !isExcludedByTitle;
      })
      .reduce((acc, video) => {
        const category = categorizeVideo(video.snippet.title);
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(video);
        return acc;
      }, {});

    for (const category in processedData) {
      processedData[category].sort((a, b) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount));
    }
    
    setCategorizedStreams(processedData);
  }, [videoData]);

  const topVideos = categorizedStreams[activeCategory]?.slice(0, 5) || [];
  const chartData = {
    labels: topVideos.map(v => v.snippet.title.substring(0, 25) + '...'),
    datasets: [{
      label: 'Jumlah Views',
      data: topVideos.map(v => v.statistics.viewCount),
      backgroundColor: '#ec4899',
      borderColor: '#be185d',
      borderWidth: 1,
    }],
  };

  const chartOptions = {
    indexAxis: 'y', 
    responsive: true,
    maintainAspectRatio: false, //mengontrol tinggi
    plugins: { 
      legend: { display: false } 
    },
    scales: { 
      x: { 
        ticks: { 
          font: { size: 10 },
          callback: value => value >= 1000 ? `${value / 1000}K` : value 
        } 
      },
      y: {
        ticks: {
          font: { size: 10 }
        }
      }
    }
  };

  return (
    <div className={`transition-all duration-700 ease-in-out ${hasBeenViewed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${isActive ? 'animate-pulse-active' : ''}`}>
      <h2 className="section-title">📊 Viewer Trends</h2>
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-pink-100 space-y-6">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3">Pilih Kategori:</h3>
          <div className="flex flex-wrap gap-2">
            {categoryOrder
              .filter(category => categorizedStreams[category])
              .map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-full transition-colors duration-200 ${
                    activeCategory === category
                      ? 'bg-pink-600 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-pink-100'
                  }`}
                >
                  {category}
                </button>
            ))}
          </div>
        </div>

        {/* 3. Tampilan loading/error sekarang dikontrol oleh props dari App.js */}
        {!videoData && !apiError && <p className="text-center text-gray-500">Menganalisis tren...</p>}
        {apiError && <p className="text-center text-red-500">Error: {apiError}</p>}
        
        {videoData && Object.keys(categorizedStreams).length > 0 && (
          <div className="p-2 md:p-4 border rounded-lg bg-pink-50/50">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 text-center">Top 5 Video Terpopuler: {activeCategory}</h3>
            {topVideos.length > 0 ? (
               <div className="relative h-64 md:h-80">
                <Bar options={chartOptions} data={chartData} />
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">Tidak ada data untuk kategori ini.</p>
            )}
          </div>
        )}

         {videoData && Object.keys(categorizedStreams).length === 0 && !apiError && (
          <p className="text-center text-gray-500 py-8">Belum ada video yang bisa dianalisis.</p>
        )}
      </div>
    </div>
  );
}

export default ViewerTrendChart;