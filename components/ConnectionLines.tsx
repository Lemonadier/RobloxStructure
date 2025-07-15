import React from 'react';
import { ScriptData, Line } from '../types';

interface ConnectionLinesProps {
  lines: Line[];
  scriptData: ScriptData;
  hoveredId: string | null;
}

const ConnectionLines: React.FC<ConnectionLinesProps> = ({ lines, scriptData, hoveredId }) => {
  const getColorVar = (id: string | null) => {
    if (!id) return '--color-border';
    const type = scriptData[id]?.type;
    switch (type) {
      case 'Client': return '--color-accent-blue';
      case 'Server': return '--color-accent-green';
      case 'Shared': return '--color-accent-purple';
      case 'Service': return '--color-accent-yellow';
      default: return '--color-border';
    }
  };

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
      {lines.map(line => {
        const isHighlighted = hoveredId === line.sourceId || hoveredId === line.targetId;
        const colorVar = isHighlighted ? getColorVar(line.sourceId) : '--color-border';
        const color = getComputedStyle(document.documentElement).getPropertyValue(colorVar).trim();

        return (
          <line
            key={line.key}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={color}
            strokeWidth={isHighlighted ? 2.5 : 1.5}
            className="connector-line"
            style={{
                filter: isHighlighted ? `drop-shadow(0 0 4px ${color})` : 'none'
            }}
          />
        );
      })}
    </svg>
  );
};

export default ConnectionLines;