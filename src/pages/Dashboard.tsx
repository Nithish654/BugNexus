import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import axios from 'axios';
import { Zap, ChevronLeft, LayoutDashboard, History, Settings, LogOut, Globe } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import URLInput from '../components/URLInput';
import Loader from '../components/Loader';
import ReportDisplay from '../components/ReportDisplay';
import { GenerateResponse, WebsiteType } from '../types';

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get('type') as WebsiteType;

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [reportData, setReportData] = useState<GenerateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!type) {
      navigate('/select-type');
    }
  }, [type, navigate]);

  const typeLabels: Record<WebsiteType, string> = {
    portfolio: 'Personal / Portfolio',
    business: 'Business Website',
    ecommerce: 'E-commerce Website',
    blog: 'Blog Website',
    educational: 'Educational Website',
    news: 'News Website',
    saas: 'SaaS / Web Apps'
  };

  const runTest = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setReportData(null);
    
    const statuses = [
      `Initializing AI agents for ${typeLabels[type]}...`,
      'Crawling website structure...',
      'Analyzing functional components...',
      'Checking for broken links...',
      'Validating forms and inputs...',
      'Generating final QA report...'
    ];

    let statusIndex = 0;
    const statusInterval = setInterval(() => {
      if (statusIndex < statuses.length) {
        setStatus(statuses[statusIndex]);
        statusIndex++;
      }
    }, 3000);

    try {
      setStatus(statuses[0]);
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await axios.post(`${apiUrl}/api/generate`, { url, type });
      
      if (response.data.success) {
        setReportData(response.data);
      } else {
        setError(response.data.error || 'Failed to generate report.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'An unexpected error occurred during testing.');
    } finally {
      clearInterval(statusInterval);
      setIsLoading(false);
      setStatus('');
    }
  };

  if (!type) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-screen overflow-hidden"
    >
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-zinc-900/50 hidden lg:flex flex-col">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Zap className="text-white w-5 h-5 fill-current" />
            </div>
            <span className="font-bold text-lg tracking-tight">BugNexus <span className="text-emerald-500">AI</span></span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 text-emerald-400 font-medium">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-all">
            <History className="w-5 h-5" />
            History
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-all">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </nav>

        <div className="p-4 border-t border-border">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-all">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background">
        <header className="h-16 border-b border-border flex items-center justify-between px-8 sticky top-0 bg-background/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <Link to="/select-type" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-zinc-400" />
            </Link>
            <div className="h-4 w-px bg-border mx-2" />
            <h1 className="font-bold text-lg flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-500" />
              Testing: <span className="text-emerald-400">{typeLabels[type]}</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500" />
            <span className="text-sm font-medium hidden sm:inline">Demo User</span>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
          {!reportData && !isLoading && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6 border border-emerald-500/20">
                <Zap className="w-3 h-3" />
                AI-Powered Analysis
              </div>
              <h2 className="text-3xl font-bold mb-4">Enter Website URL</h2>
              <p className="text-zinc-400 mb-12 max-w-xl mx-auto">
                Paste the URL for your {typeLabels[type]} below. Our AI will perform a specialized 
                QA analysis tailored to this category.
              </p>
              <URLInput onRun={runTest} isLoading={isLoading} />
            </motion.div>
          )}

          {isLoading && (
            <div className="py-24">
              <Loader status={status} />
            </div>
          )}

          {error && (
            <div className="max-w-xl mx-auto p-8 rounded-2xl border border-red-500/20 bg-red-500/5 text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mx-auto mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-red-400 mb-2">Testing Failed</h3>
              <p className="text-zinc-400 text-sm mb-8 leading-relaxed">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium transition-colors border border-border"
              >
                Try Again
              </button>
            </div>
          )}

          {reportData && !isLoading && (
            <div className="space-y-8">
              <button 
                onClick={() => setReportData(null)}
                className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to New Test
              </button>
              <ReportDisplay report={reportData.report} />
            </div>
          )}
        </div>
      </main>
    </motion.div>
  );
}
