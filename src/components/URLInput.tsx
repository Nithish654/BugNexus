import React, { useState } from 'react';
import { Search, ArrowRight, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';

interface URLInputProps {
  onRun: (url: string) => void;
  isLoading: boolean;
}

export default function URLInput({ onRun, isLoading }: URLInputProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (input: string) => {
    try {
      new URL(input.startsWith('http') ? input : `https://${input}`);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a URL');
      return;
    }
    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }
    setError('');
    onRun(url.startsWith('http') ? url : `https://${url}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className={cn(
            "w-5 h-5 transition-colors",
            error ? "text-red-400" : "text-zinc-500 group-focus-within:text-emerald-400"
          )} />
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (error) setError('');
          }}
          placeholder="https://example.com"
          className={cn(
            "w-full bg-zinc-900/50 border-2 rounded-2xl py-4 pl-12 pr-32 outline-none transition-all",
            error 
              ? "border-red-500/50 focus:border-red-500 shadow-lg shadow-red-500/10" 
              : "border-border focus:border-emerald-500/50 focus:bg-zinc-900 shadow-xl"
          )}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-2 bottom-2 px-6 bg-emerald-500 text-white rounded-xl font-medium 
                     hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all
                     flex items-center gap-2"
        >
          {isLoading ? "Testing..." : "Run Test"}
          {!isLoading && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
      {error && (
        <div className="mt-3 flex items-center gap-2 text-red-400 text-sm animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </form>
  );
}
