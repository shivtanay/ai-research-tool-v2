
import React from 'react';
import { FlaskIcon } from './icons/FlaskIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 sm:mb-12">
      <div className="flex items-center justify-center gap-4">
        <FlaskIcon className="w-10 h-10 text-cyan-400" />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
          AI Research Synthesizer
        </h1>
      </div>
      <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
        Your virtual assistant for navigating the frontiers of scientific discovery.
      </p>
    </header>
  );
};

export default Header;
