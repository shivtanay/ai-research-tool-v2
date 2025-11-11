
import React from 'react';
import { DISCIPLINES } from '../constants';

interface InputFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  disciplines: string[];
  setDisciplines: (disciplines: string[]) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ topic, setTopic, disciplines, setDisciplines, onAnalyze, isLoading }) => {
  const handleDisciplineChange = (discipline: string) => {
    setDisciplines(
      disciplines.includes(discipline)
        ? disciplines.filter((d) => d !== discipline)
        : [...disciplines, discipline]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-slate-300 mb-2">
          Research Topic or Question
        </label>
        <textarea
          id="topic"
          rows={3}
          className="block w-full bg-slate-800 border border-slate-700 rounded-md shadow-sm py-2 px-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
          placeholder="e.g., 'The role of quantum entanglement in photosynthesis' or 'Graphene-based biosensors for early disease detection'"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Select Disciplines
        </label>
        <div className="flex flex-wrap gap-3">
          {DISCIPLINES.map((discipline) => (
            <label key={discipline} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 rounded bg-slate-700 border-slate-600 text-indigo-500 focus:ring-indigo-600 cursor-pointer disabled:opacity-50"
                checked={disciplines.includes(discipline)}
                onChange={() => handleDisciplineChange(discipline)}
                disabled={isLoading}
              />
              <span className="text-slate-300 text-sm">{discipline}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={onAnalyze}
          disabled={isLoading}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 disabled:bg-indigo-900/50 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Synthesize Research'
          )}
        </button>
      </div>
    </div>
  );
};

export default InputForm;
