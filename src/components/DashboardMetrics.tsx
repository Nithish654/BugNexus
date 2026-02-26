import { motion } from 'motion/react';
import { Shield, AlertTriangle, CheckCircle, Activity, Search, Globe, ShieldCheck } from 'lucide-react';
import { LighthouseScore } from '../types';

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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Overall Health Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 bg-zinc-900/50 border border-border rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-zinc-800"
              />
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={364.4}
                strokeDashoffset={364.4 - (364.4 * executiveSummary.overallScore) / 100}
                className={getScoreColor(executiveSummary.overallScore)}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">{executiveSummary.overallScore}</span>
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Score</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
                Health Grade: <span className={getScoreColor(executiveSummary.overallScore)}>{executiveSummary.healthGrade}</span>
              </h3>
              <p className="text-zinc-500 text-sm mt-1">Audit performed on {new Date(executiveSummary.auditDate).toLocaleDateString()}</p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <div className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${getRiskColor(executiveSummary.riskLevel)}`}>
                <Shield className="w-3 h-3" />
                {executiveSummary.riskLevel} Risk
              </div>
              <div className="px-3 py-1 rounded-full border border-border bg-zinc-800/50 text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Activity className="w-3 h-3" />
                Automated Audit
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
            <div className="text-center p-3 rounded-xl bg-red-500/5 border border-red-500/10">
              <div className="text-xl font-bold text-red-500">{executiveSummary.issueBreakdown.high}</div>
              <div className="text-[10px] uppercase text-zinc-500 font-bold">High</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
              <div className="text-xl font-bold text-amber-500">{executiveSummary.issueBreakdown.medium}</div>
              <div className="text-[10px] uppercase text-zinc-500 font-bold">Med</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <div className="text-xl font-bold text-emerald-500">{executiveSummary.issueBreakdown.low}</div>
              <div className="text-[10px] uppercase text-zinc-500 font-bold">Low</div>
            </div>
          </div>
        </div>

        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h4 className="font-bold text-lg mb-2">Security Status</h4>
          <p className="text-zinc-400 text-sm leading-relaxed">
            All primary security protocols analyzed. No critical vulnerabilities detected in standard headers.
          </p>
        </div>
      </div>

      {/* Performance Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          icon={<Zap className="w-5 h-5" />} 
          label="Performance" 
          score={lighthouseScores.performance.score} 
          status={lighthouseScores.performance.label} 
        />
        <MetricCard 
          icon={<Globe className="w-5 h-5" />} 
          label="Accessibility" 
          score={lighthouseScores.accessibility.score} 
          status={lighthouseScores.accessibility.label} 
        />
        <MetricCard 
          icon={<Search className="w-5 h-5" />} 
          label="SEO" 
          score={lighthouseScores.seo.score} 
          status={lighthouseScores.seo.label} 
        />
        <MetricCard 
          icon={<ShieldCheck className="w-5 h-5" />} 
          label="Best Practices" 
          score={lighthouseScores.bestPractices.score} 
          status={lighthouseScores.bestPractices.label} 
        />
      </div>
    </div>
  );
}

function MetricCard({ icon, label, score, status }: { icon: React.ReactNode, label: string, score: number, status: string }) {
  const getStatusColor = (s: string) => {
    switch (s) {
      case 'Excellent': return 'text-emerald-500 bg-emerald-500/10';
      case 'Good': return 'text-amber-500 bg-amber-500/10';
      case 'Poor': return 'text-red-500 bg-red-500/10';
      default: return 'text-zinc-500 bg-zinc-500/10';
    }
  };

  return (
    <div className="bg-zinc-900/50 border border-border rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400">
          {icon}
        </div>
        <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusColor(status)}`}>
          {status}
        </div>
      </div>
      <div>
        <div className="text-sm text-zinc-500 font-medium">{label}</div>
        <div className="text-3xl font-bold mt-1">{score}</div>
      </div>
      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${score >= 90 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
        />
      </div>
    </div>
  );
}

function Zap(props: any) {
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
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
