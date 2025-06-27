import React, { useState, useMemo } from 'react';

const recapDataRaw = [
  {
    date: '23 Juni 2025',
    streamTitle: 'Ekspresi Keinginan & Frekuensi',
    words: [
      'berminat', 'tertarik', 'gak mau', 'komik', 'sampai', 'mati', 
      'kadang-kadang', 'nanti', 'lagi', 'hanya', 'hafal', 'kosakata'
    ]
  },
  {
    date: '19 Mei 2025',
    streamTitle: 'Stream Belajar Bahasa Pertama',
    words: [
      'Nama Kucing : Sushi', 'Perkenalan diri (Nama Saya Inaho)', 'Partikel ~nya',
      'Silahkan Panggil Saya Inaho', 'Senang Bertemu Denganmu', 'aku, saya, Kamu',
      'Kata tanya (apa, dimana, kemana)', 'ingin dan jalan', 'Sudah dan Belum',
      'Sifat (keren, lucu, cantik, dll)', 'Angka 1 - 8', 'Kalimat sifat (pandai & Pemalas)',
      'Hewan (kucing, ikan, kuda)', 'Kepemilikan (punya)', 'Senang'
    ]
  },
  {
    date: '29 Mei 2025',
    streamTitle: 'Belajar dari Lagu & Kosa Kata Baru',
    words: [
      'Lagu Naik Delman', 'suara', 'Sepatu', 'Luar Biasa', 'Mantap', 'Makan',
      'Banyak', 'Sedikit', 'Sangat', 'Durian', 'Nangka', 'mau', 'ingin', 'minum',
      'Maaf', 'Tapi', 'Kata tanya (siapa, kenapa, bagaimana)', 'kunci', 'Hari Ini',
      'Melihat', 'Belajar', 'Bahasa Indonesia', 'Suka', 'Berpikir', 'Pergi', 'Terima Kasih'
    ]
  },
  {
    date: '2 Juni 2025',
    streamTitle: 'Konteks Sosial & Ungkapan Sehari-hari',
    words: [
      'Sekolah', 'Rumah Sakit', 'Bukan', 'orang', 'manusia', 'permisi', 'Tolong',
      'Orang Kaya', 'Bang', 'Mbak', 'Tak Kenal Maka Tak Sayang', 'Hore', 'Yippee',
      'Alamak', 'Tulisan', 'Menyambung', 'Karena', 'Kaldu', 'Perayaan'
    ]
  },
  {
    date: '6 Juni 2025',
    streamTitle: 'Kata Perintah & Preposisi',
    words: [
      'Boleh', 'Jangan', 'Masuk', 'Ruang', 'Mengerti', 'di', 'ke', 'dari', 'Lupa',
      'Kereta', 'Sudah', 'Sedang', 'Danau', 'Daerah', 'Bobo', 'Tidur'
    ]
  },
  {
    date: '13 Juni 2025', // Tahun saya sesuaikan berdasarkan data Anda
    streamTitle: 'Inaho & Viewers',
    words: [
      'wakaru / shiru = tahu / mengetahui / mengerti', 'about = tentang / mengenai',
      'Alfabet & Hiragana', 'Space Button / Tombol Spasi', 'Angka 9, 10, dan puluhan',
      'Nama Orang Dikanjikan', 'mawaru / mawateru = Berputar / Berkeliling', 'Hari'
    ]
  },
  {
    date: '16 Juni 2025',
    streamTitle: 'Kosa Kata Konseptual & Ekspresi',
    words: [
      'Pasti, Bisa, Seru', 'Hebat, Mantap, Ayo', 'Mungkin, Kayaknya', 
      'Kapan, Kapanpun (Kata Tanya)', 'Mustahil, Tidak Mungkin', 
      'Hantu, Monster', 'Legenda Nyi Roro Kidul'
    ]
  },
];

const monthMap = {
  'Januari': 0, 'Februari': 1, 'Maret': 2, 'April': 3, 'Mei': 4, 'Juni': 5,
  'Juli': 6, 'Agustus': 7, 'September': 8, 'Oktober': 9, 'November': 10, 'Desember': 11
};

const parseDate = (dateString) => {
  const parts = dateString.split(' ');
  const day = parseInt(parts[0], 10);
  const month = monthMap[parts[1]];
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day);
};

const recapData = recapDataRaw.sort((a, b) => parseDate(b.date) - parseDate(a.date));

function AccordionItem({ date, streamTitle, words, isOpen, onClick }) {
    return (
        <div className="border border-pink-200 bg-white rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md">
            <button onClick={onClick} className="w-full flex justify-between items-center p-4 hover:bg-pink-50 focus:outline-none transition-colors">
                <div className="text-left">
                    <p className="font-bold text-pink-800 text-sm md:text-base">{date}</p>
                    <p className="text-xs md:text-sm text-pink-600">{streamTitle}</p>
                </div>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>▼</span>
            </button>
            {isOpen && (
                <div className="p-4 border-t border-pink-100 bg-gray-50">
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {words.map((word, index) => <li key={index}>{word}</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
}

function BahasaRecap({ isActive, hasBeenViewed }) {
    const [openIndex, setOpenIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);

    const stats = useMemo(() => {
        const totalWords = recapData.reduce((acc, item) => acc + item.words.length, 0);
        let level = 'Dasar (Beginner)';
        let nextLevelTarget = 500;
        if (totalWords >= 5000) {
            level = 'Lanjutan (Advanced)';
            nextLevelTarget = 10000;
        } else if (totalWords >= 1500) {
            level = 'Menengah (Intermediate)';
            nextLevelTarget = 5000;
        }
        const progress = Math.min((totalWords / nextLevelTarget) * 100, 100);
        return { totalWords, level, progress, nextLevelTarget };
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = recapData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(recapData.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setOpenIndex(null);
        setCurrentPage(pageNumber);
    };

    return (
        <div className={`transition-all duration-700 ease-in-out ${hasBeenViewed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${isActive ? 'animate-pulse-active' : ''}`}>
            <h2 className="section-title">🇮🇩 Bahasa Recap</h2>
            
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-pink-100 space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-xl md:text-2xl font-bold text-pink-700 mb-4 text-center">Statistik Level Bahasa</h3>
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <div className="text-center">
                            <p className="text-sm text-gray-500">Total Kosa Kata</p>
                            <p className="text-3xl md:text-4xl font-bold text-pink-600">{stats.totalWords}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-500">Level Saat Ini</p>
                            <p className="text-lg md:text-2xl font-bold text-pink-600">{stats.level}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-xs md:text-sm text-center text-gray-600 mb-2">
                            Perjalanan menuju {stats.totalWords >= 1500 ? 'Lanjutan' : 'Menengah'} ({stats.totalWords}/{stats.nextLevelTarget} kata)
                        </p>
                        <div className="w-full bg-pink-100 rounded-full h-4">
                            <div className="bg-pink-500 h-4 rounded-full transition-all duration-500" style={{ width: `${stats.progress}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 min-h-[350px]">
                    {currentItems.map((item, index) => (
                        <AccordionItem key={item.date} {...item} isOpen={openIndex === indexOfFirstItem + index} onClick={() => setOpenIndex(openIndex === indexOfFirstItem + index ? null : indexOfFirstItem + index)} />
                    ))}
                </div>

                {totalPages > 1 && (
                    <nav className="flex items-center justify-between border-t border-gray-100 pt-4">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                        >
                            Sebelumnya
                        </button>
                        <div className="text-sm text-gray-500">
                            Halaman {currentPage} dari {totalPages}
                        </div>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                        >
                            Selanjutnya
                        </button>
                    </nav>
                )}
            </div>
        </div>
    );
}
export default BahasaRecap;