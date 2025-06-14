/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tambahkan warna baru Anda di sini
        'inahoRed': '#be185d', // Ini adalah warna #be185d yang Anda inginkan
        // Anda juga bisa mendefinisikan shade (turunan) jika perlu
      },
    },
  },
  plugins: [],
}