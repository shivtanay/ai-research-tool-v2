
import React, { useState, useCallback } from 'react';
import type { AnalysisResult } from './types';
import { analyzeLiterature } from './services/geminiService';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [disciplines, setDisciplines] = useState<string[]>(['Biology']);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  const handleAnalyze = useCallback(async () => {
    if (!topic.trim()) {
      setError('Please enter a research topic.');
      return;
    }
    if (disciplines.length === 0) {
      setError('Please select at least one discipline.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);
    setShowWelcome(false);

    try {
      const response = await analyzeLiterature(topic, disciplines);
      setResults(response);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred. Please check the console and try again.';
      setError(`Failed to retrieve analysis. ${errorMessage}`);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [topic, disciplines]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main>
          <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md py-6 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 shadow-md mb-8">
             <InputForm
              topic={topic}
              setTopic={setTopic}
              disciplines={disciplines}
              setDisciplines={setDisciplines}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
            />
          </div>
          
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative text-center" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="mt-8">
            {isLoading && <LoadingSpinner />}
            {results && <ResultsDisplay results={results} />}
            {showWelcome && !isLoading && !results && (
              <div className="text-center p-10 bg-slate-800/50 rounded-lg border border-slate-700">
                <h2 className="text-3xl font-bold text-slate-100 mb-4">Welcome to the AI Research Synthesizer</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  Enter a scientific topic and select relevant disciplines to begin. The AI will scan academic literature to uncover patterns, identify gaps, and propose novel hypotheses for your next breakthrough.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
