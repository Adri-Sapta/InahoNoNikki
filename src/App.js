import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-pink-50 p-6 text-gray-800">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-pink-700">🌸 いなほの観察日記 🌸</h1>
        <p className="text-sm text-pink-500">落乃いなほのStatistic</p>
      </header>

      <section className="bg-white rounded-xl shadow p-4 max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2">📈 Stream Stats</h2>
        <ul className="space-y-1 text-sm">
          <li>📅 Total Streams: <strong>38</strong></li>
          <li>👥 Avg Viewers: <strong>1123</strong></li>
          <li>🔥 Peak Viewers: <strong>2403</strong></li>
          <li>🕒 Last Stream: <strong>2025-06-10</strong></li>
        </ul>
      </section>
    </div>
  );
}

export default App;
