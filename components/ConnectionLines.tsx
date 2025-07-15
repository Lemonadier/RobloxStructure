import React, { useState, useLayoutEffect } from 'react';
import { ScriptData } from '../types';

interface ConnectionLinesProps {
  scriptData: ScriptData;
  hoveredId: string | null;
  cardRefs: Map<string, HTMLDivElement | null>;
  mainRef: React.RefObject<HTMLDivElement>;
}

interface Line {
  key: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  sourceId: string;
  targetId: string;
}

const ConnectionLines: React.FC<ConnectionLinesProps> = ({ scriptData, hoveredId, cardRefs, mainRef }) => {
  const [lines, setLines] = useState<Line[]>([]);

  useLayoutEffect(() => {
    const calculateLines = () => {
      const newLines: Line[] = [];
      if (!mainRef.current) return;
      
      const mainRect = mainRef.current.getBoundingClientRect();

      for (const sourceId in scriptData) {
        const sourceScript = scriptData[sourceId];
        const sourceElem = cardRefs.get(sourceId);

        if (sourceElem && sourceScript.connections) {
          const sourceRect = sourceElem.getBoundingClientRect();
          const sourceX = sourceRect.left - mainRect.left + sourceRect.width / 2;
          const sourceY = sourceRect.top - mainRect.top + sourceRect.height / 2;

          sourceScript.connections.forEach(targetId => {
            const targetElem = cardRefs.get(targetId);
            if (targetElem) {
              const targetRect = targetElem.getBoundingClientRect();
              const targetX = targetRect.left - mainRect.left + targetRect.width / 2;
              const targetY = targetRect.top - mainRect.top + targetRect.height / 2;
              newLines.push({ key: `${sourceId}-${targetId}`, x1: sourceX, y1: sourceY, x2: targetX, y2: targetY, sourceId, targetId });
            }
          });
        }
      }
      setLines(newLines);
    };

    calculateLines();
    
    window.addEventListener('resize', calculateLines);
    return () => window.removeEventListener('resize', calculateLines);
  }, [scriptData, cardRefs, mainRef]);

  const getColorVar = (id: string | null) => {
    if (!id) return '--color-accent-blue';
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
