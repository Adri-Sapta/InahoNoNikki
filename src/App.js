import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// 1. Impor komponen Preloader yang baru
import Preloader from './components/Preloader';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import ProfileCard from './components/ProfileCard';
import StreamStats from './components/StreamStats';
import ViewerTrendChart from './components/ViewerTrendChart';
import GrowthStats from './components/GrowthStats';
import BahasaRecap from './components/BahasaRecap';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  
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
  };

  return (
    <>
      <Preloader isLoading={isLoading} />
      <div className={`flex min-h-screen bg-pink-50 text-gray-800 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Sidebar activeTab={activeTab} handleScrollTo={handleScrollTo} />
        
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
    </>
  );
}

export default App;