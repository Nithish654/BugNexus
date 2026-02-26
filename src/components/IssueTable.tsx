import { AlertCircle, AlertTriangle, Info, ChevronRight } from 'lucide-react';
import { Issue } from '../types';

interface IssueTableProps {
  issues: Issue[];
}

export default function IssueTable({ issues }: IssueTableProps) {
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'Medium': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'Low': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'High': return <AlertCircle className="w-4 h-4" />;
      case 'Medium': return <AlertTriangle className="w-4 h-4" />;
      case 'Low': return <Info className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="bg-zinc-900/50 border border-border rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
      <div className="px-8 py-6 border-b border-border flex items-center justify-between bg-zinc-900/80">
        <div>
          <h3 className="text-xl font-bold">Detected Issues</h3>
          <p className="text-sm text-zinc-500 mt-1">Found {issues.length} areas requiring attention</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-500/5 border border-red-500/10 text-[10px] font-bold uppercase tracking-wider text-red-500">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            High Priority
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900/30">
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500 border-b border-border">Type</th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500 border-b border-border">Severity</th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500 border-b border-border">Description</th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500 border-b border-border">Business Impact</th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500 border-b border-border">Recommendation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {issues.map((issue, index) => (
              <tr key={index} className="hover:bg-white/5 transition-colors group">
                <td className="px-8 py-6">
                  <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">
                    {issue.type}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getSeverityStyles(issue.severity)}`}>
                    {getSeverityIcon(issue.severity)}
                    {issue.severity}
                  </div>
                </td>
                <td className="px-8 py-6 max-w-xs">
                  <p className="text-sm text-zinc-400 line-clamp-2 group-hover:text-zinc-300 transition-colors">
                    {issue.description}
                  </p>
                </td>
                <td className="px-8 py-6 max-w-xs">
                  <div className="flex items-start gap-2">
                    <div className="mt-1 p-1 rounded bg-zinc-800 text-zinc-500">
                      <ChevronRight className="w-3 h-3" />
                    </div>
                    <p className="text-sm text-zinc-500 italic">
                      {issue.businessImpact}
                    </p>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-xs text-emerald-400/80 font-medium max-w-xs">
                    {issue.recommendation}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {issues.length === 0 && (
        <div className="py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold">No Issues Found</h4>
          <p className="text-zinc-500 text-sm">Your website passed all primary automated checks.</p>
        </div>
      )}
    </div>
  );
}
