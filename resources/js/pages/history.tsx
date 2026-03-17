import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ShieldAlert, ShieldCheck, ArrowLeft, Clock, ExternalLink } from 'lucide-react';

interface PhishingLog {
    id: number;
    url: string;
    status: string;
    malicious_count: number;
    suspicious_count: number;
    created_at: string;
}

interface Props {
    history: PhishingLog[];
}

const HistoryPage = ({ history }: Props) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8">
      <Head title="Investigation Logs - PhishGuard" />

      <div className="max-w-6xl mx-auto">
        {/* Header & Navigasi */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-blue-500">Investigation Logs</h1>
            <p className="text-slate-500">Historical data of all analyzed threats</p>
          </div>
          <Link 
            href="/api/" 
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition"
          >
            <ArrowLeft size={18}/> Back to Scanner
          </Link>
        </div>

        {/* Table / List Area */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-widest">
              <tr>
                <th className="p-4">Status</th>
                <th className="p-4">Target URL</th>
                <th className="p-4 text-center">Engine Detections</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {history.length > 0 ? (
                history.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="p-4">
                      <span className={`flex items-center gap-2 font-bold text-xs uppercase ${item.status === 'dangerous' ? 'text-red-500' : 'text-emerald-500'}`}>
                        {item.status === 'dangerous' ? <ShieldAlert size={16}/> : <ShieldCheck size={16}/>}
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 max-w-md">
                      <p className="truncate font-mono text-sm text-slate-300" title={item.url}>
                        {item.url}
                      </p>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-4 text-xs font-mono">
                        <span className="text-red-400">M: {item.malicious_count}</span>
                        <span className="text-yellow-400">S: {item.suspicious_count}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-500 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock size={14}/>
                        {new Date(item.created_at).toLocaleString('id-ID')}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-20 text-center text-slate-600 italic">
                    No investigations found in database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;