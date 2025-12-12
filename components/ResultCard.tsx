import React, { useState } from 'react';
import { GeneratedResult } from '../types';
import { Copy, CheckCircle2, Sparkles, Quote, Terminal } from './Icons';

interface ResultCardProps {
  result: GeneratedResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.optimizedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up">
      {/* Header / Toolbar */}
      <div className="bg-slate-900/50 p-4 border-b border-slate-700 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="p-1.5 bg-brand-500/10 rounded-lg">
                <Sparkles className="text-brand-400" size={18} />
            </div>
            <h2 className="font-semibold text-slate-200">Optimized Prompt</h2>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            copied 
              ? "bg-green-500/20 text-green-400 border border-green-500/30" 
              : "bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600"
          }`}
        >
          {copied ? (
            <>
              <CheckCircle2 size={16} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="p-6 space-y-6">
        
        {/* The Prompt */}
        <div className="relative">
          <div className="absolute top-0 left-0 -translate-x-2 -translate-y-2 text-slate-700 opacity-50">
            <Quote size={48} />
          </div>
          <div className="relative bg-slate-900 rounded-xl p-5 border border-slate-700/50 font-mono text-sm leading-relaxed text-brand-50 whitespace-pre-wrap shadow-inner">
            {result.optimizedPrompt}
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-700/50">
            {/* Explanation */}
            <div className="md:col-span-2 space-y-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Terminal size={14} /> Analysis
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                    {result.explanation}
                </p>
            </div>

            {/* Tags */}
            <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tags</h4>
                <div className="flex flex-wrap gap-2">
                    {result.tags.map((tag, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-full text-xs font-medium bg-brand-900/50 text-brand-300 border border-brand-800/50">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ResultCard;