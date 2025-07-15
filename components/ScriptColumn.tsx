import React from 'react';
import { Script, ScriptType, ScriptData } from '../types';
import ScriptCard from './ScriptCard';

interface ScriptColumnProps {
  type: ScriptType;
  title: string;
  color: string;
  allScripts: ScriptData;
  onOpenModal: (script: Script) => void;
  onHover: (id: string | null) => void;
  setCardRef: (id: string, element: HTMLDivElement | null) => void;
}

const ScriptColumn: React.FC<ScriptColumnProps> = ({ type, title, color, allScripts, onOpenModal, onHover, setCardRef }) => {
  const scriptsInColumn = Object.values(allScripts).filter(script => script.type === type);

  return (
    <div id={`${type.toLowerCase()}-col`} className="glass-surface p-6 rounded-lg shadow-lg flex flex-col gap-4">
      <h2 className={`text-2xl font-bold text-center ${color} mb-4 sticky top-0 bg-inherit py-2`}>
        {title}
      </h2>
      {scriptsInColumn.map(script => (
        <ScriptCard
          key={script.id}
          script={script}
          onOpenModal={onOpenModal}
          onHover={onHover}
          setRef={(el) => setCardRef(script.id, el)}
        />
      ))}
    </div>
  );
};

export default ScriptColumn;
