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
import MembershipStats from './components/MembershipStats';
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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const homeRef = useRef(null);
  const profileRef = useRef(null);
  const streamRef = useRef(null);
  const trendRef = useRef(null);
  const membershipRef = useRef(null);
  const bahasaRef = useRef(null);

  const sectionRefs = {
    home: homeRef,
    profile: profileRef,
    stream: streamRef,
    trend: trendRef,
    membership: membershipRef,
    bahasa: bahasaRef,
  };

  // Fungsi untuk smooth scroll dengan offset headbar
  const handleScrollTo = (key) => {
    const targetRef = sectionRefs[key];
    if (targetRef && targetRef.current) {
      const yOffset = -HEADER_HEIGHT; // Offset negatif dari tinggi headbar
      const y = targetRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Logic untuk mendeteksi section aktif saat scroll
  useEffect(() => {
    const sections = [homeRef, profileRef, streamRef, trendRef, membershipRef, bahasaRef];
    const options = {
      root: null,
      // rootMargin disesuaikan untuk Fixed Header.
      // Top margin harus sama dengan tinggi header (atau sedikit lebih besar)
      // agar IntersectionObserver memicu ketika bagian atas section terlihat di bawah header.
      // Contoh: `-${HEADER_HEIGHT}px 0px 0px 0px` berarti observer dimulai `HEADER_HEIGHT`px di bawah bagian atas viewport.
      rootMargin: `-${HEADER_HEIGHT}px 0px -50% 0px`, // Sesuaikan 50% jika perlu.
      threshold: 0, // Pemicu segera setelah elemen masuk/keluar
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

    // Fungsi untuk membuka/menutup modal notifikasi
  const toggleNotifikasiModal = () => {
    setIsNotifikasiModalOpen(!isNotifikasiModalOpen);
  };

  return (
    <>
      <Preloader isLoading={isLoading} />

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
        <main className="p-6 h-full"> {/* Hapus `flex-1` dan `overflow-y-auto` di sini. */}
          {/* Konten akan di-scroll oleh `body` atau root div jika tidak ada overflow di `main` */}
          {/* Untuk mengaktifkan scrolling di `main`, tambahkan `overflow-y-auto` ke sini */}
          {/* Atau, biarkan scrolling ditangani oleh root div jika semua konten di sini */}

          {/* Render SEMUA komponen secara berurutan */}
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