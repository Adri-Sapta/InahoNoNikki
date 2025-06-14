import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// 1. Impor komponen Preloader yang baru
import Preloader from './components/Preloader';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import ProfileCard from './components/ProfileCard';
import StreamStats from './components/StreamStats';
import ViewerTrendChart from './components/ViewerTrendChart';
import MembershipStats from './components/MembershipStats';
import BahasaRecap from './components/BahasaRecap';

function App() {
  // State untuk Preloader dan ActiveTab tetap dipertahankan
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  // Logic untuk preloader tetap ada
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // 1. Buat 'ref' untuk setiap section
  const homeRef = useRef(null);
  const profileRef = useRef(null);
  const streamRef = useRef(null);
  const trendRef = useRef(null);
  const membershipRef = useRef(null);
  const bahasaRef = useRef(null);

  // 2. Logic untuk mendeteksi section aktif saat scroll
  useEffect(() => {
    const sections = [homeRef, profileRef, streamRef, trendRef, membershipRef, bahasaRef];
    const options = {
      root: null,
      rootMargin: '-30% 0px -70% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    }, options);

    sections.forEach(section => {
      if (section.current) observer.observe(section.current);
    });

    return () => observer.disconnect();
  }, [isLoading]); // Kita jalankan observer setelah loading selesai

  // 3. Objek untuk memetakan key ke ref
  const sectionRefs = {
    home: homeRef,
    profile: profileRef,
    stream: streamRef,
    trend: trendRef,
    membership: membershipRef,
    bahasa: bahasaRef,
  };

  // 4. Fungsi untuk smooth scroll
  const handleScrollTo = (key) => {
    sectionRefs[key]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <Preloader isLoading={isLoading} />
      <div className={`flex min-h-screen bg-pink-50 text-gray-800 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Sidebar activeTab={activeTab} handleScrollTo={handleScrollTo} />
        
        {/* Kontainer utama dibuat bisa di-scroll */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* 5. Render SEMUA komponen secara berurutan */}
          <section id="home" ref={homeRef} className="pb-16">
            <Home />
          </section>
          
          <section id="profile" ref={profileRef} className="section-container">
            <h2 className="section-title">👤 Profile</h2>
            <ProfileCard />
          </section>

          <section id="stream" ref={streamRef} className="section-container">
            <h2 className="section-title">📈 Stream Stats</h2>
            <StreamStats />
          </section>

          <section id="trend" ref={trendRef} className="section-container">
            <h2 className="section-title">📊 Viewer Trends</h2>
            <ViewerTrendChart />
          </section>

          <section id="membership" ref={membershipRef} className="section-container">
            <h2 className="section-title">🧑‍🤝‍🧑 Membership</h2>
            <MembershipStats />
          </section>

          <section id="bahasa" ref={bahasaRef} className="section-container">
            <h2 className="section-title">🇮🇩 Bahasa Recap</h2>
            <BahasaRecap />
          </section>
        </main>
      </div>
    </>
  );
}


export default App;