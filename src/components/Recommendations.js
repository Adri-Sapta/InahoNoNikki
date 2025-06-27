import React from 'react';

import rendangImg from '../assets/recommendations/rendang.jpg';
import nasigorengImg from '../assets/recommendations/nasiGoreng.jpg';
import satepadangImg from '../assets/recommendations/satepadang.jpg';
import candiborobudurImg from '../assets/recommendations/candiborobudur.jpg';
import rajaampatImg from '../assets/recommendations/rajaampat.jpg';
import ubudImg from '../assets/recommendations/ubud.jpg';
import batikImg from '../assets/recommendations/membatik.jpg';
import delmanImg from '../assets/recommendations/delman.jpg';
import wayangImg from '../assets/recommendations/wayang.jpg';

const recommendations = [
    { category: 'Makanan', item: 'Rendang', desc: 'Daging sapi kaya rempah yang dimasak lama, dinobatkan sebagai salah satu makanan terlezat di dunia.', image: rendangImg},
    { category: 'Makanan', item: 'Nasi Goreng', desc: 'Makanan nasional Indonesia, nasi yang digoreng dengan bumbu, telur, dan berbagai lauk.', image: nasigorengImg },
    { category: 'Makanan', item: 'Sate Padang', desc: 'Daging bakar dengan kuah kental kaya rempah, khas dari Sumatera Barat.', image: satepadangImg},
    { category: 'Wisata', item: 'Candi Borobudur, Jawa Tengah', desc: 'Candi Buddha terbesar di dunia, sebuah situs warisan dunia UNESCO.', image: candiborobudurImg },
    { category: 'Wisata', item: 'Raja Ampat, Papua', desc: 'Surga bawah laut dengan keanekaragaman hayati tertinggi di dunia.', image: rajaampatImg},
    { category: 'Wisata', item: 'Ubud, Bali', desc: 'Pusat budaya dan seni di Bali, dikelilingi sawah dan hutan yang asri.', image: ubudImg},
    { category: 'Aktivitas', item: 'Belajar Membatik', desc: 'Mencoba seni tradisional Indonesia melukis kain menggunakan lilin dan pewarna.', image: batikImg },
    { category: 'Aktivitas', item: 'Naik Delman di Yogyakarta', desc: 'Menikmati suasana kota dengan kereta kuda tradisional.', image: delmanImg },
    { category: 'Aktivitas', item: 'Menonton Wayang Kulit', desc: 'Pertunjukan teater bayangan boneka kulit tradisional yang menceritakan kisah epik.', image: wayangImg },
];

function Recommendations({ isActive, hasBeenViewed }) {
  return (
    <div className={`transition-all duration-700 ease-in-out ${hasBeenViewed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${isActive ? 'animate-pulse-active' : ''}`}>
      <h2 className="section-title">❤️ Inaho WishList</h2>
      <div className="bg-white p-6 rounded-xl shadow-lg border border-pink-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <div key={index} className="rounded-xl overflow-hidden border border-gray-200 group">
                <div className="overflow-hidden h-40"><img src={rec.image} alt={rec.item} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" /></div>
                <div className="p-4"><p className="text-xs font-semibold uppercase text-pink-500">{rec.category}</p><p className="font-bold text-gray-800 mt-1">{rec.item}</p><p className="text-sm text-gray-600 mt-1 h-16">{rec.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Recommendations;