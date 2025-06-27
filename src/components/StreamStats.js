import React, { useState, useEffect } from 'react';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

//modul-modul Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function StreamStats({ isActive, hasBeenViewed, videoData, apiError }) {
  const [filteredStreams, setFilteredStreams] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState('all');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [streamsPerPage] = useState(5);
  const [isPaginating, setIsPaginating] = useState(false);

  const availableYears = [2025, 2024, 2023];
  const months = [
    { value: 'all', label: 'Semua Bulan' }, { value: 1, label: 'Januari' },
    { value: 2, label: 'Februari' }, { value: 3, label: 'Maret' },
    { value: 4, label: 'April' }, { value: 5, label: 'Mei' },
    { value: 6, label: 'Juni' }, { value: 7, label: 'Juli' },
    { value: 8, label: 'Agustus' }, { value: 9, label: 'September' },
    { value: 10, label: 'Oktober' }, { value: 11, label: 'November' },
    { value: 12, label: 'Desember' }
  ];

  //useEffect fokus untuk memfilter data yang sudah ada (dari props)
  useEffect(() => {
    // videoData dari props
    let streams = videoData || []; 
    
    streams = streams.filter(stream => new Date(stream.snippet.publishedAt).getFullYear() === selectedYear);
    if (selectedMonth !== 'all') {
      streams = streams.filter(stream => (new Date(stream.snippet.publishedAt).getMonth() + 1) === selectedMonth);
    }
    
    setFilteredStreams(streams);
    setCurrentPage(1); // Reset ke halaman pertama setiap kali filter berubah

    const reversedStreams = [...streams].reverse();
    setChartData({
      labels: reversedStreams.map(s => new Date(s.snippet.publishedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })),
      datasets: [{
        label: 'Views',
        data: reversedStreams.map(s => s.statistics.viewCount),
        borderColor: '#ec4899',
        backgroundColor: 'rgba(236, 72, 153, 0.2)',
        fill: true,
        tension: 0.4,
      }],
    });
  }, [videoData, selectedYear, selectedMonth]);

  const indexOfLastStream = currentPage * streamsPerPage;
  const indexOfFirstStream = indexOfLastStream - streamsPerPage;
  const currentStreams = filteredStreams.slice(indexOfFirstStream, indexOfLastStream);
  const totalPages = Math.ceil(filteredStreams.length / streamsPerPage);

  const paginate = (pageNumber) => {
    setIsPaginating(true);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setIsPaginating(false);
    }, 300);
  };

  const chartOptions = { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { ticks: { callback: value => value >= 1000 ? `${value / 1000}K` : value } } } };

  return (
    <div className={`transition-all duration-700 ease-in-out ${hasBeenViewed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${isActive ? 'animate-pulse-active' : ''}`}>
      <h2 className="section-title">📈 Stream Stats</h2>
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-pink-100 space-y-8">
        
        {/* Area Filter */}
        <div className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-200">
          <div className="flex-1">
            <label htmlFor="year-filter" className="block text-sm font-medium text-gray-700 mb-1">Tahun:</label>
            <select id="year-filter" value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md">
              {availableYears.map(year => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="month-filter" className="block text-sm font-medium text-gray-700 mb-1">Bulan:</label>
            <select id="month-filter" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value === 'all' ? 'all' : Number(e.target.value))} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md">
              {months.map(month => <option key={month.value} value={month.value}>{month.label}</option>)}
            </select>
          </div>
        </div>

        {/*Tampilan loading/error sekarang dikontrol oleh props dari App.js */}
        {!videoData && !apiError && <p className="text-center text-gray-500">Memuat statistik...</p>}
        {apiError && <p className="text-center text-red-500">Error: {apiError}</p>}
        {videoData && (
          <div className="space-y-8">
            {filteredStreams.length > 0 ? (
              <div className="p-2 md:p-4 border rounded-lg bg-pink-50/50">
                 <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 text-center">Tren Views per Stream</h3>
                <Line options={chartOptions} data={chartData} />
              </div>
            ) : null}

            {/* Tampilan Tabel untuk Desktop */}
            <div className="hidden md:block">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul Stream</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Likes</th>
                    </tr>
                  </thead>
                  <tbody className={`bg-white divide-y divide-gray-200 transition-opacity duration-300 ${isPaginating ? 'opacity-0' : 'opacity-100'}`}>
                    {currentStreams.length > 0 ? (
                      currentStreams.map(stream => (
                         <tr key={stream.id} className="hover:bg-pink-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center"><div className="flex-shrink-0 h-10 w-10"><img className="h-10 w-10 rounded-full" src={stream.snippet.thumbnails.default.url} alt="" /></div><div className="ml-4"><div className="text-sm font-medium text-gray-900 truncate" style={{maxWidth: '250px'}}>{stream.snippet.title}</div></div></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(stream.snippet.publishedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Number(stream.statistics.viewCount).toLocaleString('id-ID')}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Number(stream.statistics.likeCount).toLocaleString('id-ID')}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="4" className="px-6 py-4 text-center text-gray-500">Tidak ada data untuk periode ini.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tampilan Kartu untuk Mobile */}
            <div className={`block md:hidden space-y-4 transition-opacity duration-300 ${isPaginating ? 'opacity-0' : 'opacity-100'}`}>
              {currentStreams.length > 0 ? (
                currentStreams.map(stream => (
                  <div key={stream.id} className="bg-white rounded-lg shadow border border-gray-200 p-4">
                    <div className="flex gap-4">
                      <img src={stream.snippet.thumbnails.medium.url} alt={stream.snippet.title} className="w-20 h-20 object-cover rounded-md" />
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{stream.snippet.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{new Date(stream.snippet.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="flex justify-around mt-4 border-t pt-2 text-center">
                      <div><p className="font-bold text-pink-600">{Number(stream.statistics.viewCount).toLocaleString('id-ID')}</p><p className="text-xs text-gray-500">Views</p></div>
                      <div><p className="font-bold text-pink-600">{Number(stream.statistics.likeCount).toLocaleString('id-ID')}</p><p className="text-xs text-gray-500">Likes</p></div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">Tidak ada data untuk periode ini.</p>
              )}
            </div>

            {totalPages > 1 && (
              <nav className="flex items-center justify-between border-t border-gray-200 px-0 pt-4">
                <div className="flex-1 flex justify-between sm:justify-end">
                  <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
                    Sebelumnya
                  </button>
                  <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
                    Selanjutnya
                  </button>
                </div>
              </nav>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

export default StreamStats;