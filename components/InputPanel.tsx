import React, { useState } from 'react';

interface InputPanelProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
  error: string | null;
}

const InputPanel: React.FC<InputPanelProps> = ({ onGenerate, isLoading, error }) => {
  const [prompt, setPrompt] = useState('');

  const handleGenerateClick = () => {
    if (prompt.trim() && !isLoading) {
      onGenerate(prompt);
    }
  };

  return (
    <section className="mb-10 glass-surface p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Describe Your Game Architecture</h2>
      <p className="text-center text-gray-400 mb-6 max-w-3xl mx-auto">
        Enter a description of your game's scripts, services, and how they connect. The AI will generate an interactive diagram based on your input. Be as detailed as you like!
      </p>
      <div className="flex flex-col gap-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'My game has a Server-side PlayerDataService that saves progress to DataStoreService. A client-side InventoryUI script communicates with a shared ToolManager module...'"
          className="w-full h-32 p-4 rounded-md bg-[var(--color-bg-secondary)] border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-accent-blue)] focus:outline-none transition-shadow text-gray-200 resize-y"
          aria-label="Game description input"
        />
        <button
          onClick={handleGenerateClick}
          disabled={isLoading || !prompt.trim()}
          className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
          aria-label="Generate architecture diagram"
        >
          {isLoading ? (
            <>
              <span className="spinner mr-2"></span>
              Generating...
            </>
          ) : (
            'Generate Diagram'
          )}
        </button>
      </div>
      {error && (
         <div className="mt-4 bg-red-900/50 border border-red-700/60 text-red-200 p-4 rounded-md text-center">
            <strong>Error:</strong> {error}
        </div>
      )}
    </section>
  );
};

export default InputPanel;
