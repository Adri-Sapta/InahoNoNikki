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
import Exam from './components/Exam';
import Awards from './components/Awards';
import Recommendations from './components/Recommendations';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [viewedSections, setViewedSections] = useState({ home: true });
  const [isNotifikasiModalOpen, setIsNotifikasiModalOpen] = useState(false);
  const [notifikasis] = useState([
    { id: 1, message: 'Selamat datang, Inaho~san!', timestamp: new Date() },
    { id: 2, message: 'Jangan lupa untuk selalu bahagia!😊', timestamp: new Date() },
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const HEADER_HEIGHT_PX = 72;
  const SIDEBAR_WIDTH_PX = 256;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);
  
  const homeRef = useRef(null), profileRef = useRef(null), streamRef = useRef(null), trendRef = useRef(null), growthRef = useRef(null), bahasaRef = useRef(null), examRef = useRef(null), awardsRef = useRef(null), recommendationsRef = useRef(null);
  
  useEffect(() => {
    if (isLoading) return;
    const sections = [homeRef, profileRef, streamRef, trendRef, growthRef, bahasaRef, examRef, awardsRef, recommendationsRef];
    // Offset untuk scroll-spy disesuaikan dengan tinggi header
    const options = { root: null, rootMargin: `-${HEADER_HEIGHT_PX + 20}px 0px -60% 0px`, threshold: 0 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveTab(sectionId);
          setViewedSections(prev => ({ ...prev, [sectionId]: true }));
        }
      });
    }, options);
    sections.forEach(section => { if (section.current) observer.observe(section.current); });
    return () => { sections.forEach(section => { if (section.current) observer.unobserve(section.current); }); };
  }, [isLoading]);

  const sectionRefs = { home: homeRef, profile: profileRef, stream: streamRef, trend: trendRef, growth: growthRef, bahasa: bahasaRef, exam: examRef, recommendations: recommendationsRef, awards: awardsRef};
  
  const handleScrollTo = (key) => {
    const targetKey = key === 'home' ? 'home' : key;
    const section = sectionRefs[key]?.current;

     if (key === 'home') {
        // Jika targetnya home, scroll ke paling atas
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } else if (section) {
      const y = section.getBoundingClientRect().top + window.pageYOffset - HEADER_HEIGHT_PX;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
  
  const toggleNotifikasiModal = () => setIsNotifikasiModalOpen(!isNotifikasiModalOpen);

  return (
    <div className="bg-pink-50 min-h-screen">
      <Preloader isLoading={isLoading} />
      
      {/* Wrapper untuk konten utama yang hanya muncul setelah loading selesai */}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Headbar dan Sidebar berada di luar main content untuk posisi fixed */}
        <Headbar
          onMenuClick={toggleSidebar} 
          sidebarWidth={SIDEBAR_WIDTH_PX}
          onNotifikasiClick={toggleNotifikasiModal}
          notifikasiCount={notifikasis.length}
        />
        <Sidebar 
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          activeTab={activeTab} 
          handleScrollTo={handleScrollTo}
          headerHeight={HEADER_HEIGHT_PX}
        />
        
        {/* Kontainer utama untuk konten yang bisa di-scroll */}
        <main 
          className="relative md:ml-64"
          style={{ 
            marginLeft: `${SIDEBAR_WIDTH_PX}px`,
          }}
        >
          <div className="p-6">
            {/* Setiap section diberi paddingTop agar posisinya pas di bawah header */}
            <section id="home" ref={homeRef} style={{paddingTop: `${HEADER_HEIGHT_PX}px`}} className="-mt-6 -mx-6 px-6">
              <Home isActive={activeTab === 'home'} hasBeenViewed={viewedSections.home} />
            </section>
            <section id="profile" ref={profileRef} className="section-container" style={{paddingTop: `${HEADER_HEIGHT_PX}px`}}>
              <ProfileCard isActive={activeTab === 'profile'} hasBeenViewed={viewedSections.profile} />
            </section>
            <section id="stream" ref={streamRef} className="section-container" style={{paddingTop: `${HEADER_HEIGHT_PX}px`}}>
              <StreamStats isActive={activeTab === 'stream'} hasBeenViewed={viewedSections.stream} />
            </section>
            <section id="trend" ref={trendRef} className="section-container" style={{paddingTop: `${HEADER_HEIGHT_PX}px`}}>
              <ViewerTrendChart isActive={activeTab === 'trend'} hasBeenViewed={viewedSections.trend} />
            </section>
            <section id="growth" ref={growthRef} className="section-container" style={{paddingTop: `${HEADER_HEIGHT_PX}px`}}>
              <GrowthStats isActive={activeTab === 'growth'} hasBeenViewed={viewedSections.growth} />
            </section>
            <section id="bahasa" ref={bahasaRef} className="section-container" style={{paddingTop: `${HEADER_HEIGHT_PX}px`}}>
              <BahasaRecap isActive={activeTab === 'bahasa'} hasBeenViewed={viewedSections.bahasa} />
            </section>
            <section id="exam" ref={examRef} className="section-container" style={{paddingTop: `${HEADER_HEIGHT_PX}px`}}>
              <Exam isActive={activeTab === 'exam'} hasBeenViewed={viewedSections.exam} />
            </section>
            <section id="awards" ref={awardsRef} className="section-container" style={{paddingTop: `${HEADER_HEIGHT_PX}px`}}>
              <Awards isActive={activeTab === 'awards'} hasBeenViewed={viewedSections.awards} />
            </section>
            <section id="recommendations" ref={recommendationsRef} className="section-container" style={{paddingTop: `${HEADER_HEIGHT_PX}px`}}>
              <Recommendations isActive={activeTab === 'recommendations'} hasBeenViewed={viewedSections.recommendations} />
            </section>
          </div>
          <Footer handleScrollToHome={() => handleScrollTo('home')} />
        </main>
      </div>

      <NotifikasiModal
        isOpen={isNotifikasiModalOpen}
        onClose={toggleNotifikasiModal}
        notifikasis={notifikasis}
      />
    </div>
  );
}

export default App;