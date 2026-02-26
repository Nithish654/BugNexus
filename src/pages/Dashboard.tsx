import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import axios from 'axios';
import { Zap, ChevronLeft, Globe, AlertCircle, Download, Share2, Search, CheckCircle2 } from 'lucide-react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import URLInput from '../components/URLInput';
import Loader from '../components/Loader';
import ReportDisplay from '../components/ReportDisplay';
import DashboardMetrics from '../components/DashboardMetrics';
import IssueTable from '../components/IssueTable';
import Layout from '../components/Layout';
import { GenerateResponse, WebsiteType } from '../types';
import { historyService } from '../services/historyService';

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const type = searchParams.get('type') as WebsiteType;

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [reportData, setReportData] = useState<GenerateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!type) {
      navigate('/select-type');
    }
    
    // Check if we're viewing a report from history
    if (location.state?.reportData) {
      setReportData(location.state.reportData);
    }
  }, [type, navigate, location.state]);

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
    setShowSuccess(false);
    
    const statuses = [
      `Initializing AI agents for ${typeLabels[type]}...`,
      'Crawling website structure...',
      'Analyzing functional components...',
      'Checking for broken links...',
      'Validating forms and inputs...',
      'Running Lighthouse performance audits...',
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
      const API = import.meta.env.VITE_API_URL || '';
      const response = await axios.post(`${API}/generate`, { url, type });
      
      if (response.data.success) {
        const data = response.data as GenerateResponse;
        setReportData(data);
        setShowSuccess(true);
        
        // Save to history
        if (data.executiveSummary) {
          historyService.saveHistory({
            id: Date.now().toString(),
            url,
            type,
            date: new Date().toISOString(),
            overallScore: data.executiveSummary.overallScore,
            riskLevel: data.executiveSummary.riskLevel,
            response: data
          });
        }
        
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setError(response.data.error || 'Failed to generate report.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'An unexpected error occurred during testing. Please check your backend connection.');
    } finally {
      clearInterval(statusInterval);
      setIsLoading(false);
      setStatus('');
    }
  };

  if (!type) return null;

  return (
    <Layout>
      <header className="h-16 border-b border-border flex items-center justify-between px-4 sm:px-8 sticky top-0 bg-background/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <button 
            onClick={() => navigate('/select-type')}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors shrink-0"
          >
            <ChevronLeft className="w-5 h-5 text-zinc-400" />
          </button>
          <div className="h-4 w-px bg-border mx-1 sm:mx-2 shrink-0" />
          <h1 className="font-bold text-sm sm:text-lg flex items-center gap-2 truncate">
            <Globe className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="hidden xs:inline">Testing:</span> <span className="text-emerald-400 truncate">{typeLabels[type]}</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/20" />
          <span className="text-sm font-bold hidden sm:inline">Demo User</span>
        </div>
      </header>

      <div className="p-4 sm:p-8 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!reportData && !isLoading && (
            <motion.div 
              key="input"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-center py-8 sm:py-12"
            >
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-500/20"
              >
                <Zap className="w-3 h-3 fill-current" />
                AI-Powered Analysis Engine
              </motion.div>
              <h2 className="text-3xl sm:text-5xl font-black mb-4 tracking-tighter">Analyze Your Website</h2>
              <p className="text-zinc-400 mb-12 max-w-xl mx-auto text-base sm:text-lg font-medium leading-relaxed">
                Paste the URL for your {typeLabels[type]} below. Our neural agents will perform a specialized 
                QA audit tailored to your industry.
              </p>
              <URLInput onRun={runTest} isLoading={isLoading} />
              
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  { icon: Search, label: 'Deep Crawl', desc: 'Full site structure analysis' },
                  { icon: Zap, label: 'Performance', desc: 'Lighthouse & Core Web Vitals' },
                  { icon: AlertCircle, label: 'Issue Detection', desc: 'Automated bug finding' }
                ].map((feature, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-zinc-900/30 border border-border/50">
                    <feature.icon className="w-6 h-6 text-emerald-500 mx-auto mb-3" />
                    <h4 className="font-bold text-sm mb-1">{feature.label}</h4>
                    <p className="text-xs text-zinc-500">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {isLoading && (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24"
            >
              <Loader status={status} />
            </motion.div>
          )}

          {error && (
            <motion.div 
              key="error"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-xl mx-auto p-8 sm:p-10 rounded-3xl border border-red-500/20 bg-red-500/5 text-center shadow-2xl shadow-red-500/5"
            >
              <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mx-auto mb-6 border border-red-500/20 animate-pulse">
                <AlertCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-red-400 mb-3 tracking-tight">Audit Interrupted</h3>
              <p className="text-zinc-400 text-sm mb-8 leading-relaxed font-medium">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="w-full sm:w-auto px-10 py-4 bg-zinc-800 hover:bg-zinc-700 rounded-2xl text-sm font-black transition-all border border-border shadow-lg"
              >
                Try Again
              </button>
            </motion.div>
          )}

          {reportData && !isLoading && (
            <motion.div 
              key="report"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 sm:space-y-12"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <button 
                    onClick={() => {
                      setReportData(null);
                      navigate('/dashboard?type=' + type, { replace: true, state: {} });
                    }}
                    className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm font-bold transition-colors mb-4 group"
                  >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to New Test
                  </button>
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tighter">Audit Intelligence</h2>
                    {showSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        Saved to History
                      </motion.div>
                    )}
                  </div>
                  <p className="text-zinc-500 mt-1 font-medium">Comprehensive QA assessment for your {typeLabels[type]}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-zinc-900 border border-border hover:bg-zinc-800 rounded-2xl text-sm font-black transition-all group">
                    <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Share
                  </button>
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl text-sm font-black transition-all shadow-lg shadow-emerald-500/20 group">
                    <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    Export PDF
                  </button>
                </div>
              </div>

              {/* Structured Sections */}
              {reportData.executiveSummary && reportData.lighthouseScores && (
                <DashboardMetrics 
                  executiveSummary={reportData.executiveSummary} 
                  lighthouseScores={reportData.lighthouseScores} 
                />
              )}

              {reportData.issues && (
                <IssueTable issues={reportData.issues} />
              )}

              <div className="pt-12 border-t border-border">
                <ReportDisplay report={reportData.report} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
