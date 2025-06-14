// src/App.js

import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import Preloader from './components/Preloader';
import Sidebar from './components/Sidebar'; // Pastikan Sidebar.js (S besar) atau sesuaikan import
import Headbar from './components/Headbar'; // Pastikan Headbar.js (H besar) atau sesuaikan import
import Home from './components/Home';
import ProfileCard from './components/ProfileCard';
import StreamStats from './components/StreamStats';
import ViewerTrendChart from './components/ViewerTrendChart';
import GrowthStats from './components/GrowthStats';
import BahasaRecap from './components/BahasaRecap';
import NotifikasiModal from './components/NotifikasiModal';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [isNotifikasiModalOpen, setIsNotifikasiModalOpen] = useState(false); // <-- State baru untuk modal
  const [notifikasis, setNotifikasis] = useState([ // <-- Data notifikasi dummy
    { id: 1, message: 'Selamat datang kembali, Inaho!', timestamp: new Date().setHours(new Date().getHours() - 2) },
    { id: 2, message: 'Anda memiliki 5 viewers baru di stream terakhir.', timestamp: new Date().setHours(new Date().getHours() - 5) },
    { id: 3, message: 'Event kolaborasi minggu depan telah dijadwalkan.', timestamp: new Date().setDate(new Date().getDate() - 1) },
  ]);

  // Mendefinisikan tinggi headbar dan lebar sidebar secara konsisten
  // Pastikan nilai ini SAMA dengan yang di komponen Headbar.js dan Sidebar.js
  const HEADER_HEIGHT = 70; // dalam px
  const SIDEBAR_WIDTH = 256; // dalam px, karena w-64 = 16rem = 256px
  
  // 1. State baru untuk melacak section yang sudah pernah dilihat.
  //    'home' di-set true karena itu yang pertama muncul.
  const [viewedSections, setViewedSections] = useState({ home: true });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const homeRef = useRef(null);
  const profileRef = useRef(null);
  const streamRef = useRef(null);
  const trendRef = useRef(null);
  const growthRef = useRef(null);
  const bahasaRef = useRef(null);

  useEffect(() => {
    if (isLoading) return;

    const sections = [homeRef, profileRef, streamRef, trendRef, growthRef, bahasaRef];
    const options = {
      root: null,
      rootMargin: '-40% 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          // Set section yang aktif untuk highlight sidebar
          setActiveTab(sectionId);
          // 2. Tandai section ini sebagai sudah pernah dilihat
          setViewedSections(prev => ({ ...prev, [sectionId]: true }));
        }
      });
    }, options);

    sections.forEach(section => {
      if (section.current) observer.observe(section.current);
    });

    return () => {
      sections.forEach(section => {
        if (section.current) observer.unobserve(section.current);
      });
    };
  }, [isLoading]);

    // Fungsi untuk membuka/menutup modal notifikasi
  const toggleNotifikasiModal = () => {
    setIsNotifikasiModalOpen(!isNotifikasiModalOpen);
  };
  const sectionRefs = {
    home: homeRef,
    profile: profileRef,
    stream: streamRef,
    trend: trendRef,
    growth: growthRef,
    bahasa: bahasaRef,
  };

  const handleScrollTo = (key) => {
    sectionRefs[key]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
  

  return (
    <>
      <Preloader isLoading={isLoading} />
      
      {!isLoading && (
      <>
      {/* Headbar di paling atas, fixed */}
      <Headbar
        headerHeight={HEADER_HEIGHT}
        sidebarWidth={SIDEBAR_WIDTH}
        onNotifikasiClick={toggleNotifikasiModal} // <-- Teruskan fungsi ke Headbar
        notifikasiCount={notifikasis.length} // <-- Teruskan jumlah notifikasi
      />

      {/* Sidebar di kiri, fixed, di bawah Headbar */}
      {/* Kita akan meneruskan HEADER_HEIGHT dan SIDEBAR_WIDTH sebagai props
          agar Sidebar bisa menghitung posisinya dengan benar. */}
      <Sidebar
        activeTab={activeTab}
        handleScrollTo={handleScrollTo}
        headerHeight={HEADER_HEIGHT}
        sidebarWidth={SIDEBAR_WIDTH}
      />
       </>
      )}

      {/* Kontainer utama untuk konten yang bisa di-scroll */}
      {/* Div ini akan memiliki margin-left untuk mengimbangi sidebar,
          dan padding-top untuk mengimbangi headbar. */}
      <div
        className={`bg-pink-50 text-gray-800 transition-opacity duration-1000 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          marginLeft: `${SIDEBAR_WIDTH}px`, // Offset ke kanan selebar sidebar
          paddingTop: `${HEADER_HEIGHT}px`, // Offset ke bawah setinggi headbar
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`, // Pastikan mengisi sisa tinggi layar
          // Pastikan tidak ada `flex` di sini yang mengganggu layout sibling `Sidebar`
          // main di dalamnya akan menangani scroll
        }}
      >
        <main className="flex-1 p-6 overflow-y-auto">
          {/* 3. Kirim DUA prop: 'isActive' dan 'hasBeenViewed' */}
          <section id="home" ref={homeRef}>
            <Home isActive={activeTab === 'home'} hasBeenViewed={viewedSections.home} />
          </section>

          <section id="profile" ref={profileRef} className="section-container">
            <ProfileCard isActive={activeTab === 'profile'} hasBeenViewed={viewedSections.profile} />
          </section>

          <section id="stream" ref={streamRef} className="section-container">
            <StreamStats isActive={activeTab === 'stream'} hasBeenViewed={viewedSections.stream} />
          </section>

          <section id="trend" ref={trendRef} className="section-container">
            <ViewerTrendChart isActive={activeTab === 'trend'} hasBeenViewed={viewedSections.trend} />
          </section>

          <section id="growth" ref={growthRef} className="section-container">
            <GrowthStats isActive={activeTab === 'growth'} hasBeenViewed={viewedSections.growth} />
          </section>

          <section id="bahasa" ref={bahasaRef} className="section-container">
            <BahasaRecap isActive={activeTab === 'bahasa'} hasBeenViewed={viewedSections.bahasa} />
          </section>
        </main>
      </div>
      {/* Render Modal Notifikasi di sini */}
      <NotifikasiModal
        isOpen={isNotifikasiModalOpen}
        onClose={toggleNotifikasiModal}
        notifikasis={notifikasis}
      />
    </>
  );
}

export default App;