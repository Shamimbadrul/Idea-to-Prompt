import React from 'react';
import { PromptConfiguration, Tone, PromptFormat } from '../types';
import { Settings2 } from './Icons';

interface PromptSettingsProps {
  config: PromptConfiguration;
  onChange: (newConfig: PromptConfiguration) => void;
  disabled: boolean;
}

const PromptSettings: React.FC<PromptSettingsProps> = ({ config, onChange, disabled }) => {
  
  const handleChange = <K extends keyof PromptConfiguration>(
    key: K,
    value: PromptConfiguration[K]
  ) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-5 mb-6 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4 text-brand-400">
        <Settings2 size={18} />
        <h3 className="text-sm font-semibold uppercase tracking-wider">Configuration</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Tone Selection */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">Tone of Voice</label>
          <div className="relative">
            <select
              value={config.tone}
              onChange={(e) => handleChange('tone', e.target.value as Tone)}
              disabled={disabled}
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent block p-2.5 appearance-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {Object.values(Tone).map((tone) => (
                <option key={tone} value={tone}>{tone}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* Format Selection */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">Output Structure</label>
          <div className="relative">
            <select
              value={config.format}
              onChange={(e) => handleChange('format', e.target.value as PromptFormat)}
              disabled={disabled}
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent block p-2.5 appearance-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {Object.values(PromptFormat).map((format) => (
                <option key={format} value={format}>{format}</option>
              ))}
            </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* Reasoning Toggle */}
        <div className="space-y-2 flex flex-col justify-center">
          <label className="text-xs font-medium text-slate-400 mb-2 block">Advanced Options</label>
          <label className="inline-flex items-center cursor-pointer group">
            <input 
              type="checkbox" 
              checked={config.includeReasoning}
              onChange={(e) => handleChange('includeReasoning', e.target.checked)}
              disabled={disabled}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
            <span className="ms-3 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
              Include Reasoning
            </span>
          </label>
        </div>

      </div>
    </div>
  );
};

export default PromptSettings;