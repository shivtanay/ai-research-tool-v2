
import React from 'react';
import type { AnalysisResult } from '../types';
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon';
import { PuzzleIcon } from './icons/PuzzleIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { BeakerIcon } from './icons/BeakerIcon';

interface ResultsDisplayProps {
  results: AnalysisResult;
}

const ResultSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
            {icon}
            <h2 className="text-xl font-bold text-slate-100">{title}</h2>
        </div>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const ResultCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-slate-800 p-4 rounded-md border border-slate-700/50">
        <h3 className="font-semibold text-cyan-400 mb-2">{title}</h3>
        <p className="text-slate-300 text-sm leading-relaxed">{children}</p>
    </div>
);


const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
        <ResultSection title="Patterns & Trends" icon={<MagnifyingGlassIcon className="w-6 h-6 text-indigo-400"/>}>
            {results.patternsAndTrends.map((item, index) => (
                <ResultCard key={`pattern-${index}`} title={item.title}>
                    {item.description}
                </ResultCard>
            ))}
        </ResultSection>

        <ResultSection title="Research Gaps" icon={<PuzzleIcon className="w-6 h-6 text-indigo-400"/>}>
            {results.researchGaps.map((item, index) => (
                <ResultCard key={`gap-${index}`} title={item.title}>
                    {item.description}
                </ResultCard>
            ))}
        </ResultSection>

        <ResultSection title="Generated Hypotheses" icon={<LightbulbIcon className="w-6 h-6 text-indigo-400"/>}>
            {results.hypotheses.map((item, index) => (
                <ResultCard key={`hypothesis-${index}`} title={item.title}>
                    {item.description}
                </ResultCard>
            ))}
        </ResultSection>

        <ResultSection title="Suggested Experiments" icon={<BeakerIcon className="w-6 h-6 text-indigo-400"/>}>
            {results.suggestedExperiments.map((item, index) => (
                 <div key={`exp-${index}`} className="bg-slate-800 p-4 rounded-md border border-slate-700/50">
                    <h3 className="font-semibold text-cyan-400 mb-2">{item.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-3"><strong className="text-slate-200">Objective:</strong> {item.description}</p>
                     <p className="text-slate-300 text-sm leading-relaxed"><strong className="text-slate-200">Methodology:</strong> {item.methodology}</p>
                </div>
            ))}
        </ResultSection>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ResultsDisplay;
