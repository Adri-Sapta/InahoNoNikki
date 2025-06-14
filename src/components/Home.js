import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Typewriter from 'typewriter-effect';

// Impor gambar Anda
import img1 from '../assets/carousel/carouselInaho01.png';
import img2 from '../assets/carousel/carouselInaho02.png';
import img3 from '../assets/carousel/carouselInaho01.png'; // Menggunakan gambar pertama lagi, sesuai kode Anda

// Impor CSS wajib untuk carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const carouselImages = [img1, img2, img3];

function Home() {
    // State untuk menyimpan data stream dan status loading
    const [recentStreams, setRecentStreams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect untuk mengambil data dari YouTube saat komponen dimuat
    useEffect(() => {
        const fetchStreams = async () => {
        // Mengambil API Key dari file .env
        const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
        const channelId = 'UCxk-xk9E_GS8Z5qJ-iBYLyw'; // ID Channel Inaho
        const maxResults = 3; // Tampilkan 3 video terbaru di halaman utama

        if (!apiKey) {
            console.error("YouTube API Key tidak ditemukan!");
            setIsLoading(false);
            return;
        }

        const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.items) {
            setRecentStreams(data.items);
            }
        } catch (error) {
            console.error("Gagal mengambil data stream:", error);
        } finally {
            setIsLoading(false);
        }
        };

        fetchStreams();
    }, []); //
  return (
    // 'space-y-8' akan memberikan jarak vertikal antar elemen
    <div className="w-full animate-fade-in space-y-8">
      
      {/* Bagian Carousel Hero Section (Tetap sama) */}
      <div className="rounded-xl overflow-hidden shadow-lg border border-pink-100">
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={4000}>
          {carouselImages.map((imgSrc, index) => (
            <div key={index} className="relative h-80 md:h-[30rem]">
              <div style={{ backgroundImage: `url(${imgSrc})` }} className="w-full h-full bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4">
                <h2 className="text-4xl md:text-6xl font-bold text-shadow-md mb-3">落乃いなほ</h2>
                <div className="text-2xl md:text-3xl text-gray-200 h-12 flex items-center justify-center text-shadow-sm">
                  <span className="mr-3">I'm a</span>
                  <Typewriter options={{ strings: ['VTuber', 'Bahasa Indonesia Enjoyer', 'Horse Racing Expert'], autoStart: true, loop: true, delay: 75 }} />
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* --- KONTEN BARU 1: Kartu Selamat Datang --- */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-pink-100">
        <h2 className="text-3xl font-bold text-pink-700 mb-3">Selamat Datang di Catatan Perjalanan Inaho!</h2>
        <p className="text-gray-700 leading-relaxed">
          From TurfMates to 落乃いなほ (Ochino Inaho). Made With Love Absolutely
        </p>
      </div>

      {/* --- KONTEN BARU 2: Grid Stream Terbaru --- */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-pink-100">
        <h2 className="text-3xl font-bold text-pink-700 mb-4">Stream Terbaru</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentStreams.map((stream) => (
            <div key={stream.id} className="group rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <img src={stream.thumbnail} alt={stream.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 h-12 group-hover:text-pink-600 transition-colors duration-300">{stream.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{stream.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}


export default Home;