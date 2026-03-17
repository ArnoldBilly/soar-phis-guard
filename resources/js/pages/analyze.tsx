import React, { useState } from 'react';
import axios from 'axios';
import { ShieldAlert, ShieldCheck, Search, History } from 'lucide-react';

interface PhishingResult {
    url: string;
    status: string;
    malicious_count: number;
    suspicious_count: number;
}

const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<PhishingResult | null>(null);

  const handleScan = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/analyze', { url });
      setResult(response.data);
    } catch (error) {
      alert("Gagal terhubung ke Security Engine");
      console.log(error)
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-blue-400">PhishGuard SOAR</h1>
        <p className="text-slate-400">Automated Phishing Analysis Dashboard v1.0</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <label className="block mb-2 text-sm font-medium">Investigate New URL</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="https://suspicious-link.com/login"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button 
                onClick={handleScan}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition"
              >
                {loading ? "Analyzing..." : <><Search size={18}/> Scan</>}
              </button>
            </div>
          </div>

          {result && (
            <div className={`p-6 rounded-xl border-2 ${result?.status === 'dangerous' ? 'border-red-500 bg-red-500/10' : 'border-green-500 bg-green-500/10'}`}>
              <div className="flex items-center gap-4 mb-4">
                {result?.status === 'dangerous' ? <ShieldAlert size={48} className="text-red-500"/> : <ShieldCheck size={48} className="text-green-500"/>}
                <div>
                  <h2 className="text-2xl font-bold uppercase">{result?.status}</h2>
                  <p className="text-sm opacity-80">Verdict based on VirusTotal Intelligence</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <span className="text-xs text-slate-400 uppercase">Malicious Engines</span>
                  <p className="text-2xl font-mono text-red-400">{result?.malicious_count}</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <span className="text-xs text-slate-400 uppercase">Suspicious Engines</span>
                  <p className="text-2xl font-mono text-yellow-400">{result?.suspicious_count}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Masih hard-coded ajg */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-fit">
          <h3 className="flex items-center gap-2 font-bold mb-4 text-slate-300">
            <History size={18}/> Recent Investigations
          </h3>
          <div className="space-y-3">
            <div className="text-xs p-3 bg-slate-900 rounded border-l-4 border-red-500">
              <p className="truncate font-mono">http://paypal-security-update.com</p>
              <span className="text-slate-500">2 mins ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;