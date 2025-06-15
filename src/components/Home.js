import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Typewriter from 'typewriter-effect';

// Impor gambar Anda
import img1 from '../assets/carousel/carouselInaho01.png';
import img2 from '../assets/carousel/carouselInaho02.png';
import img3 from '../assets/carousel/carouselInaho03.png'; // Menggunakan gambar pertama lagi, sesuai kode Anda

// Impor CSS wajib untuk carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const carouselImages = [img1, img2, img3];

// 1. Terima dua prop: 'isActive' dan 'hasBeenViewed'
function Home({ isActive, hasBeenViewed }) {
  const [recentStreams, setRecentStreams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStreams = async () => {
      const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
      const channelId = 'UCxk-xk9E_GS8Z5qJ-iBYLyw'; 
      const maxResults = 3;

      if (!apiKey) {
        setError("API Key tidak ditemukan di file .env!");
        setIsLoading(false);
        return;
      }

      const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.error) {
          setError(`Error dari Google: ${data.error.message}`);
        } else if (data.items && data.items.length > 0) {
          setRecentStreams(data.items);
        } else {
          setError("Tidak ada video terbaru yang ditemukan untuk channel ini.");
        }
      } catch (err) {
        setError(`Gagal melakukan fetch: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStreams();
  }, []);

  return (
    <div className={`
      transition-all duration-700 ease-in-out space-y-8
      ${hasBeenViewed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
      ${isActive ? 'animate-pulse-active' : ''}
    `}>
      
      {/* Bagian Carousel Hero Section */}
      <div className="rounded-xl overflow-hidden shadow-lg border border-pink-100">
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={4000}>
          {carouselImages.map((imgSrc, index) => (
            // Mengubah tinggi di mobile agar tidak terlalu besar
            <div key={index} className="relative h-64 md:h-80 lg:h-[30rem]">
              <div style={{ backgroundImage: `url(${imgSrc})` }} className="w-full h-full bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4">
                {/* Mengubah ukuran teks di mobile */}
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-shadow-md mb-2">落乃いなほ</h2>
                <div className="text-xl md:text-2xl lg:text-3xl text-gray-200 h-12 flex items-center justify-center text-shadow-sm">
                  <span className="mr-3">I'm a</span>
                  <Typewriter options={{ strings: ['VTuber', 'Bahasa Indonesia Enjoyer', 'Horse Racing Expert'], autoStart: true, loop: true, delay: 75 }} />
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Kartu Selamat Datang */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-pink-100">
        {/* Mengubah ukuran teks di mobile */}
        <h2 className="text-2xl md:text-3xl font-bold text-pink-700 mb-3">Selamat Datang di Catatan Perjalanan Inaho!</h2>
        <p className="text-gray-700 leading-relaxed">
          From TurfMates to 落乃いなほ (Ochinai Inaho). Made With Love Absolutely
        </p>
      </div>

      {/* Bagian Grid Stream Terbaru */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-pink-100">
        {/* Mengubah ukuran teks di mobile */}
        <h2 className="text-2xl md:text-3xl font-bold text-pink-700 mb-4">Stream Terbaru</h2>
        {isLoading && <p className="text-center text-gray-500">Memuat stream terbaru...</p>}
        {error && (<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"><strong className="font-bold">Terjadi Masalah! </strong><span className="block sm:inline">{error}</span></div>)}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentStreams.map((stream) => (
              <a key={stream.id.videoId} href={`https://www.youtube.com/watch?v=${stream.id.videoId}`} target="_blank" rel="noopener noreferrer" className="group rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block">
                <img src={stream.snippet.thumbnails.medium.url} alt={stream.snippet.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 h-16 group-hover:text-pink-600 transition-colors duration-300">{stream.snippet.title}</h3>
                  <p className="text-sm text-gray-500 mt-2">{new Date(stream.snippet.publishTime).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;