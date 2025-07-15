import React from 'react';
import { Script } from '../types';
import { ClientIcon, ServerIcon, SharedIcon, ServiceIcon } from './icons';

interface ScriptCardProps {
  script: Script;
  onOpenModal: (script: Script) => void;
  onHover: (id: string | null) => void;
  setRef: (element: HTMLDivElement | null) => void;
}

const typeConfig = {
    Client: { Icon: ClientIcon, color: 'text-blue-300' },
    Server: { Icon: ServerIcon, color: 'text-green-300' },
    Shared: { Icon: SharedIcon, color: 'text-purple-300' },
    Service: { Icon: ServiceIcon, color: 'text-yellow-300' }
};

const ScriptCard: React.FC<ScriptCardProps> = ({ script, onOpenModal, onHover, setRef }) => {
  const { Icon, color } = typeConfig[script.type] || typeConfig.Service;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpenModal(script);
    }
  };

  return (
    <div
      id={script.id}
      ref={setRef}
      className="script-card p-4 rounded-md cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={() => onOpenModal(script)}
      onMouseEnter={() => onHover(script.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(script.id)}
      onBlur={() => onHover(null)}
      onKeyDown={handleKeyDown}
      aria-label={`Details for ${script.id}`}
    >
      <h3 className={`font-bold text-lg ${color} flex items-center gap-2`}>
        <Icon />
        {script.id.replace(/_/g, ' ')}
      </h3>
      <p className="text-sm text-gray-400 mt-1">{script.description}</p>
    </div>
  );
};

export default ScriptCard;
