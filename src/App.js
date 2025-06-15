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

  // --- STATE BARU UNTUK KONTROL SIDEBAR MOBILE ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [allVideoData, setAllVideoData] = useState([]);
  const [apiError, setApiError] = useState(null);
  
  const HEADER_HEIGHT_PX = 72;
  const SIDEBAR_WIDTH_PX = 256;

  useEffect(() => {
    const fetchAllData = async () => {
      const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
      const channelId = 'UCxk-xk9E_GS8Z5qJ-iBYLyw';
      if (!apiKey) {
        setApiError("API Key tidak ditemukan!");
        return;
      }
      try {
        // Langkah 1: Dapatkan daftar ID video
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=50&type=video`;
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();
        if (searchData.error) throw new Error(`Search API Error: ${searchData.error.message}`);

        const videoIds = searchData.items.map(item => item.id.videoId).join(',');
        if (!videoIds) {
          setAllVideoData([]);
          return;
        }

        // Langkah 2: Dapatkan statistik untuk semua video tersebut
        const statsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=snippet,statistics`;
        const statsResponse = await fetch(statsUrl);
        const statsData = await statsResponse.json();
        if (statsData.error) throw new Error(`Videos API Error: ${statsData.error.message}`);
        
        // Simpan data final ke state utama
        setAllVideoData(statsData.items);

      } catch (err) {
        setApiError(err.message);
      }
    };
    
    fetchAllData();
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);
  
  const homeRef = useRef(null), profileRef = useRef(null), streamRef = useRef(null), trendRef = useRef(null), growthRef = useRef(null), bahasaRef = useRef(null), examRef = useRef(null), recommendationsRef = useRef(null), awardsRef = useRef(null);
  
  useEffect(() => {
    if (isLoading) return;
    const sections = [homeRef, profileRef, streamRef, trendRef, growthRef, bahasaRef, examRef, recommendationsRef, awardsRef];
    const options = { root: null, rootMargin: `-${HEADER_HEIGHT_PX}px 0px -50% 0px`, threshold: 0 };
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

  const sectionRefs = { home: homeRef, profile: profileRef, stream: streamRef, trend: trendRef, growth: growthRef, bahasa: bahasaRef, exam: examRef, recommendations: recommendationsRef, awards: awardsRef };
  
  const handleScrollTo = (key) => {
    const section = sectionRefs[key]?.current;
    if (section) {
      const y = section.getBoundingClientRect().top + window.pageYOffset - HEADER_HEIGHT_PX;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
  
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleNotifikasiModal = () => setIsNotifikasiModalOpen(!isNotifikasiModalOpen);

  return (
    <div className="bg-pink-50 min-h-screen">
      <Preloader isLoading={isLoading} />
      
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Headbar 
          onMenuClick={toggleSidebar}
          onNotifikasiClick={toggleNotifikasiModal}
          notifikasiCount={notifikasis.length}
        />
        <Sidebar 
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          activeTab={activeTab} 
          handleScrollTo={handleScrollTo}
        />
        
        {/* Konten utama sekarang diberi margin-left HANYA di layar besar (md:) */}
        <main 
          className="relative md:ml-64" // ml-64 (256px) hanya aktif di layar medium ke atas
          style={{ paddingTop: `${HEADER_HEIGHT_PX}px` }}
        >
          <div className="p-6">
           <section id="home" ref={homeRef}>
              <Home isActive={activeTab === 'home'} hasBeenViewed={viewedSections.home} videoData={allVideoData.slice(0, 3)} apiError={apiError} />
            </section>
            <section id="profile" ref={profileRef} className="section-container">
              <ProfileCard isActive={activeTab === 'profile'} hasBeenViewed={viewedSections.profile} />
            </section>
            <section id="stream" ref={streamRef} className="section-container">
              <StreamStats isActive={activeTab === 'stream'} hasBeenViewed={viewedSections.stream} videoData={allVideoData} apiError={apiError} />
            </section>
            <section id="trend" ref={trendRef} className="section-container">
              <ViewerTrendChart isActive={activeTab === 'trend'} hasBeenViewed={viewedSections.trend} videoData={allVideoData} apiError={apiError} />
            </section>
            <section id="growth" ref={growthRef} className="section-container">
              <GrowthStats isActive={activeTab === 'growth'} hasBeenViewed={viewedSections.growth} />
            </section>
            <section id="bahasa" ref={bahasaRef} className="section-container">
              <BahasaRecap isActive={activeTab === 'bahasa'} hasBeenViewed={viewedSections.bahasa} />
            </section>
            <section id="exam" ref={examRef} className="section-container">
              <Exam isActive={activeTab === 'exam'} hasBeenViewed={viewedSections.exam} />
            </section>
            <section id="recommendations" ref={recommendationsRef} className="section-container">
              <Recommendations isActive={activeTab === 'recommendations'} hasBeenViewed={viewedSections.recommendations} />
            </section>
            <section id="awards" ref={awardsRef} className="section-container">
              <Awards isActive={activeTab === 'awards'} hasBeenViewed={viewedSections.awards} />
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