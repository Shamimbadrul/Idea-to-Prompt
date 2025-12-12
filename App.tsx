import React, { useState } from 'react';
import { generateOptimizedPrompt } from './services/geminiService';
import { PromptConfiguration, Tone, PromptFormat, GeneratedResult } from './types';
import PromptSettings from './components/PromptSettings';
import ResultCard from './components/ResultCard';
import { Wand2, Zap, AlertCircle, Sparkles } from './components/Icons';

const EXAMPLE_IDEAS = [
  { 
    category: "Code Generation", 
    text: "Write a Python script to scrape stock prices from Yahoo Finance using BeautifulSoup and visualize the 30-day moving average with Matplotlib." 
  },
  { 
    category: "Creative Writing", 
    text: "Write a short sci-fi story about a robot who discovers it can dream, written in the style of Philip K. Dick, focusing on themes of consciousness." 
  },
  { 
    category: "Data Analysis", 
    text: "Analyze the current trends in remote work adoption for 2024 and suggest 3 distinct HR strategies to improve employee engagement." 
  },
  {
    category: "Education",
    text: "Explain the concept of quantum entanglement to a curious 12-year-old student using a simple analogy involving magical dice."
  }
];

function App() {
  const [idea, setIdea] = useState("");
  const [config, setConfig] = useState<PromptConfiguration>({
    tone: Tone.Professional,
    format: PromptFormat.Structured,
    includeReasoning: true
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await generateOptimizedPrompt(idea, config);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong while generating the prompt. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-slate-100 font-sans selection:bg-brand-500/30 selection:text-brand-100">
      
      {/* Navbar / Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-brand-600 p-2 rounded-lg shadow-lg shadow-brand-500/20">
              <Zap className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              Prompt<span className="text-brand-400">Architect</span>
            </h1>
          </div>
          <div className="text-xs font-medium text-slate-500 border border-slate-800 px-2 py-1 rounded-full">
            Powered by Gemini 2.5 Flash
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            Turn ideas into <br className="hidden sm:block" />
            <span className="text-brand-400">Master Prompts</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Stop struggling with vague instructions. Transform your raw thoughts into precise, high-performance prompts for any LLM.
          </p>
        </div>

        {/* Input Section */}
        <div className="space-y-6">
          
          <div className="relative group">
             <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-slate-900 rounded-xl p-1">
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Describe your idea here... e.g., 'I want a python script to scrape stock data and visualize it'"
                className="w-full h-40 bg-slate-900 text-lg p-5 rounded-lg text-slate-100 placeholder:text-slate-600 focus:outline-none resize-none"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Example Prompts */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-3 px-1">
              <div className="flex items-center gap-2 text-slate-500 text-sm mt-1.5 shrink-0">
                <Sparkles size={14} className="text-brand-400" />
                <span className="font-medium">Try an example:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_IDEAS.map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => setIdea(example.text)}
                    disabled={isLoading}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white hover:border-brand-500/30 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    title={example.text}
                  >
                    {example.category}
                  </button>
                ))}
              </div>
          </div>

          <PromptSettings 
            config={config} 
            onChange={setConfig} 
            disabled={isLoading} 
          />

          <button
            onClick={handleGenerate}
            disabled={!idea.trim() || isLoading}
            className={`
              w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl transition-all duration-300
              ${!idea.trim() || isLoading 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                : 'bg-gradient-to-r from-brand-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white shadow-brand-900/50 hover:shadow-brand-500/25 hover:-translate-y-1'
              }
            `}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Architecting Prompt...
              </>
            ) : (
              <>
                <Wand2 size={22} />
                Generate Professional Prompt
              </>
            )}
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-xl flex items-center gap-3 animate-pulse">
            <AlertCircle size={20} className="text-red-400" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="pt-8 animate-fade-in">
             <ResultCard result={result} />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 mt-20 bg-slate-900/50 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} PromptArchitect AI. Built with Gemini 2.5 Flash.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;