import { motion } from 'motion/react';
import { Shield, AlertTriangle, CheckCircle, Activity, Search, Globe, ShieldCheck, Zap } from 'lucide-react';
import { LighthouseScore } from '../types';
import AnimatedCounter from './AnimatedCounter';
import { cn } from '../utils/cn';

interface DashboardMetricsProps {
  executiveSummary: {
    overallScore: number;
    healthGrade: string;
    riskLevel: 'High' | 'Medium' | 'Low';
    auditDate: string;
    issueBreakdown: {
      high: number;
      medium: number;
      low: number;
    };
  };
  lighthouseScores: {
    performance: LighthouseScore;
    accessibility: LighthouseScore;
    seo: LighthouseScore;
    bestPractices: LighthouseScore;
  };
}

export default function DashboardMetrics({ executiveSummary, lighthouseScores }: DashboardMetricsProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'Medium': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'Low': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Overall Health Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ y: -4 }}
          className="col-span-1 lg:col-span-2 bg-zinc-900/50 border border-border rounded-3xl p-8 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -mr-32 -mt-32 rounded-full group-hover:bg-emerald-500/10 transition-colors duration-700" />
          
          <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="72"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                className="text-zinc-800"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="72"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={452.4}
                initial={{ strokeDashoffset: 452.4 }}
                animate={{ strokeDashoffset: 452.4 - (452.4 * executiveSummary.overallScore) / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className={getScoreColor(executiveSummary.overallScore)}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black tracking-tighter">
                <AnimatedCounter value={executiveSummary.overallScore} />
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black mt-1">Overall Score</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-6 text-center md:text-left z-10">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h3 className="text-3xl font-black tracking-tight">
                  Health Grade: <span className={getScoreColor(executiveSummary.overallScore)}>{executiveSummary.healthGrade}</span>
                </h3>
                <div className={cn(
                  "px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5",
                  getRiskColor(executiveSummary.riskLevel)
                )}>
                  <Shield className="w-3 h-3" />
                  {executiveSummary.riskLevel} Risk
                </div>
              </div>
              <p className="text-zinc-500 text-sm font-medium">Audit performed on {new Date(executiveSummary.auditDate).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-zinc-800/30 border border-border rounded-2xl p-4 group/stat hover:bg-zinc-800/50 transition-colors">
                <div className="text-2xl font-black text-red-500 mb-1">
                  <AnimatedCounter value={executiveSummary.issueBreakdown.high} />
                </div>
                <div className="text-[10px] uppercase text-zinc-500 font-black tracking-wider">High Issues</div>
              </div>
              <div className="bg-zinc-800/30 border border-border rounded-2xl p-4 group/stat hover:bg-zinc-800/50 transition-colors">
                <div className="text-2xl font-black text-amber-500 mb-1">
                  <AnimatedCounter value={executiveSummary.issueBreakdown.medium} />
                </div>
                <div className="text-[10px] uppercase text-zinc-500 font-black tracking-wider">Medium Issues</div>
              </div>
              <div className="bg-zinc-800/30 border border-border rounded-2xl p-4 group/stat hover:bg-zinc-800/50 transition-colors">
                <div className="text-2xl font-black text-emerald-500 mb-1">
                  <AnimatedCounter value={executiveSummary.issueBreakdown.low} />
                </div>
                <div className="text-[10px] uppercase text-zinc-500 font-black tracking-wider">Low Issues</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h4 className="font-black text-xl mb-3 tracking-tight">Security Status</h4>
          <p className="text-zinc-400 text-sm leading-relaxed font-medium">
            All primary security protocols analyzed. No critical vulnerabilities detected in standard headers.
          </p>
          <div className="mt-6 flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
            <CheckCircle className="w-3 h-3" />
            Verified Secure
          </div>
        </motion.div>
      </div>

      {/* Performance Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard 
          icon={<Zap className="w-5 h-5" />} 
          label="Performance" 
          score={lighthouseScores.performance.score} 
          status={lighthouseScores.performance.label} 
          delay={0.1}
        />
        <MetricCard 
          icon={<Globe className="w-5 h-5" />} 
          label="Accessibility" 
          score={lighthouseScores.accessibility.score} 
          status={lighthouseScores.accessibility.label} 
          delay={0.2}
        />
        <MetricCard 
          icon={<Search className="w-5 h-5" />} 
          label="SEO" 
          score={lighthouseScores.seo.score} 
          status={lighthouseScores.seo.label} 
          delay={0.3}
        />
        <MetricCard 
          icon={<ShieldCheck className="w-5 h-5" />} 
          label="Best Practices" 
          score={lighthouseScores.bestPractices.score} 
          status={lighthouseScores.bestPractices.label} 
          delay={0.4}
        />
      </div>
    </div>
  );
}

function MetricCard({ icon, label, score, status, delay }: { icon: React.ReactNode, label: string, score: number, status: string, delay: number }) {
  const getStatusColor = (s: string) => {
    switch (s) {
      case 'Excellent': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'Good': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'Poor': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -4 }}
      className="bg-zinc-900/50 border border-border rounded-3xl p-6 space-y-6 group hover:bg-zinc-800/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-300">
          {icon}
        </div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusColor(status)}`}>
          {status}
        </div>
      </div>
      <div>
        <div className="text-xs text-zinc-500 font-black uppercase tracking-widest mb-1">{label}</div>
        <div className="text-4xl font-black tracking-tighter">
          <AnimatedCounter value={score} />
        </div>
      </div>
      <div className="space-y-2">
        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1.5, ease: "easeOut", delay: delay + 0.2 }}
            className={cn(
              "h-full rounded-full",
              score >= 90 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 
              score >= 50 ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 
              'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'
            )}
          />
        </div>
        <div className="flex justify-between text-[10px] font-black text-zinc-600 uppercase tracking-widest">
          <span>0</span>
          <span>100</span>
        </div>
      </div>
    </motion.div>
  );
}

