import React, { useEffect } from 'react';
import { Script } from '../types';

interface ScriptModalProps {
  script: Script | null;
  onClose: () => void;
}

const ScriptModal: React.FC<ScriptModalProps> = ({ script, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);
  
  if (!script) return null;

  const typeColors = {
    Client: { title: 'var(--color-accent-blue)', text: '#9ecbff', bg: 'rgba(88, 166, 255, 0.15)' },
    Server: { title: 'var(--color-accent-green)', text: '#8ce096', bg: 'rgba(86, 211, 100, 0.15)' },
    Shared: { title: 'var(--color-accent-purple)', text: '#d3b1ff', bg: 'rgba(188, 140, 255, 0.15)' },
    Service: { title: 'var(--color-accent-yellow)', text: '#f0c674', bg: 'rgba(227, 179, 65, 0.15)' },
  };
  const colors = typeColors[script.type];

  return (
    <div
      id="modal"
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 is-open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        id="modal-content"
        className="modal-content glass-surface rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col border-blue-500/50"
        onClick={(e) => e.stopPropagation()}
      >
        <div id="modal-header" className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 id="modal-title" className="text-2xl font-bold" style={{ color: colors.title }}>
            {script.id.replace(/_/g, ' ')}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl transition-colors" aria-label="Close modal">&times;</button>
        </div>
        <div id="modal-body" className="text-gray-300 p-6 overflow-y-auto">
            <p className="mb-6 text-gray-300 text-base leading-relaxed">{script.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm p-4 bg-black/20 rounded-lg border border-gray-700/50">
              <div>
                  <strong className="text-gray-400 block mb-1">Type</strong>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ color: colors.text, backgroundColor: colors.bg, border: `1px solid ${colors.bg.replace('0.15', '0.4')}`}}>{script.type}</span>
              </div>
              {script.location && (
              <div>
                  <strong className="text-gray-400 block mb-1">Location</strong>
                  <code className="bg-black/30 px-2 py-1 rounded text-gray-300">{script.location}</code>
              </div>
              )}
            </div>
            
            {script.details && Object.keys(script.details).length > 0 && (
              <div className="mb-6">
                <h4 className="font-bold text-lg mb-3 text-blue-300 border-b border-gray-700 pb-2">Detailed Connections</h4>
                <div className="space-y-4 mt-4">
                  {Object.entries(script.details).map(([type, items]) => (
                    items.length > 0 && <div key={type}>
                      <h5 className="font-semibold text-gray-300 mb-1">{type}</h5>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-gray-400">
                        {items.map((item, index) => <li key={index}><code className="text-purple-300">{item.replace(/ /g, '\u00A0')}</code></li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {script.notes && (
                <div className="mb-6">
                    <h4 className="font-bold text-lg mb-2 text-yellow-400">Important Notes</h4>
                    <p className="bg-yellow-900/20 p-3 rounded-md border border-yellow-700/50 text-yellow-200">{script.notes}</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ScriptModal;
