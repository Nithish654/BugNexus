import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  History as HistoryIcon, 
  Search, 
  Trash2, 
  ExternalLink, 
  Calendar, 
  Shield, 
  ChevronRight,
  Filter,
  ArrowUpRight
} from 'lucide-react';
import { historyService } from '../services/historyService';
import { HistoryItem } from '../types';
import Layout from '../components/Layout';
import { cn } from '../utils/cn';
import { useNavigate } from 'react-router-dom';

export default function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    setHistory(historyService.getHistory());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    historyService.deleteItem(id);
    setHistory(historyService.getHistory());
  };

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'Medium': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'Low': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
    }
  };

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <HistoryIcon className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Audit History</h1>
            </div>
            <p className="text-zinc-500">Review and manage your previous website QA reports.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text"
                placeholder="Search URL..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/50 border border-border rounded-xl py-2 pl-10 pr-4 outline-none focus:border-emerald-500/50 transition-all text-sm"
              />
            </div>
            <div className="flex items-center gap-2 bg-zinc-900/50 border border-border rounded-xl p-1">
              <button 
                onClick={() => setFilterType('all')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                  filterType === 'all' ? "bg-emerald-500 text-white" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                All
              </button>
              <button 
                onClick={() => setFilterType('saas')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                  filterType === 'saas' ? "bg-emerald-500 text-white" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                SaaS
              </button>
              <button 
                onClick={() => setFilterType('ecommerce')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                  filterType === 'ecommerce' ? "bg-emerald-500 text-white" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                Shop
              </button>
            </div>
          </div>
        </header>

        <AnimatePresence mode="popLayout">
          {filteredHistory.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredHistory.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => navigate(`/dashboard?type=${item.type}`, { state: { reportData: item.response } })}
                  className="group relative bg-zinc-900/50 border border-border rounded-2xl p-6 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all cursor-pointer flex flex-col md:flex-row md:items-center gap-6"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 transition-colors">
                        <Globe className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-lg truncate group-hover:text-emerald-400 transition-colors">
                        {item.url}
                      </h3>
                      <div className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                        {item.type}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-4 h-4" />
                        Score: <span className="font-bold text-zinc-300">{item.overallScore}</span>
                      </div>
                      <div className={cn(
                        "px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider",
                        getRiskColor(item.riskLevel)
                      )}>
                        {item.riskLevel} Risk
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={(e) => handleDelete(item.id, e)}
                      className="p-2.5 rounded-xl bg-zinc-800/50 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      title="Delete entry"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 border-2 border-dashed border-border rounded-3xl"
            >
              <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-600 mx-auto mb-6">
                <HistoryIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-zinc-300 mb-2">No History Found</h3>
              <p className="text-zinc-500 max-w-xs mx-auto">
                You haven't performed any website audits yet. Start your first test from the dashboard.
              </p>
              <button 
                onClick={() => navigate('/select-type')}
                className="mt-8 px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20"
              >
                Start New Test
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

function Globe(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
