import React, { useState, useRef, useMemo } from 'react';
import { Script, ScriptData } from './types';
import { initialScriptData } from './data/initial-data';

import ScriptColumn from './components/ScriptColumn';
import ConnectionLines from './components/ConnectionLines';
import ScriptModal from './components/ScriptModal';
import DashboardCharts from './components/DashboardCharts';

const App: React.FC = () => {
  const scriptData: ScriptData = initialScriptData;
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  const mainRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const setCardRef = (id: string, element: HTMLDivElement | null) => {
    cardRefs.current.set(id, element);
  };

  const columnTypes = useMemo(() => [
    { type: 'Client' as const, title: 'Client', color: 'text-[var(--color-accent-blue)]' },
    { type: 'Shared' as const, title: 'Shared', color: 'text-[var(--color-accent-purple)]' },
    { type: 'Server' as const, title: 'Server', color: 'text-[var(--color-accent-green)]' },
    { type: 'Service' as const, title: 'Services & Objects', color: 'text-[var(--color-accent-yellow)]' }
  ], []);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-green-400">
          Game Structure Visualizer
        </h1>
        <p className="text-lg text-gray-400 mt-2">
          Visualize complex game script architectures.
        </p>
      </header>
      
      <main ref={mainRef} className="relative mt-8">
        <ConnectionLines scriptData={scriptData} hoveredId={hoveredId} cardRefs={cardRefs.current} mainRef={mainRef} />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columnTypes.map(({ type, title, color }) => (
            <ScriptColumn
              key={type}
              type={type}
              title={title}
              color={color}
              allScripts={scriptData}
              onOpenModal={setSelectedScript}
              onHover={setHoveredId}
              setCardRef={setCardRef}
            />
          ))}
        </div>
      </main>

      <DashboardCharts scriptData={scriptData} />
      
      {selectedScript && (
        <ScriptModal script={selectedScript} onClose={() => setSelectedScript(null)} />
      )}
    </div>
  );
};

export default App;
