import { Download, Copy, Check, FileText } from 'lucide-react';
import { useState } from 'react';
import Markdown from 'react-markdown';
import { cn } from '../utils/cn';

interface ReportDisplayProps {
  report: string;
}

export default function ReportDisplay({ report }: ReportDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `testpilot-qa-report-${new Date().getTime()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">QA Analysis Report</h2>
            <p className="text-sm text-zinc-500">AI-generated functional assessment</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors border border-border"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy Report"}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Download className="w-4 h-4" />
            Download .txt
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[600px]">
        <div className="flex items-center gap-2 px-6 py-3 border-b border-border bg-zinc-900/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-amber-500/20" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
          </div>
          <span className="text-xs font-mono text-zinc-500 ml-2">report_output.md</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-zinc-950/50">
          <div className="markdown-body prose prose-invert prose-emerald max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h1:text-4xl prose-h1:mb-8 prose-h1:pb-4 prose-h1:border-b prose-h1:border-border
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:flex prose-h2:items-center prose-h2:gap-3
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:mb-6
            prose-li:text-zinc-400 prose-li:mb-2
            prose-strong:text-emerald-400 prose-strong:font-bold
            prose-code:text-emerald-300 prose-code:bg-emerald-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-border prose-pre:rounded-xl
            prose-hr:border-border prose-hr:my-12
            prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-500/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
          ">
            <Markdown>{report}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}
