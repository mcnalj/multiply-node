import React from 'react';
import { SVGXAndYAxes, SVGGridLines, SVGHashMarks} from './coreComponents.component.graph.js';

export function CosGraph() {
  return (
    <svg width="400" height="400" viewBox="-2 -8 29 16" xmlns="http://www.w3.org/2000/svg">
      <SVGXAndYAxes />
      <SVGGridLines />
      <SVGHashMarks />

      <path
        d={Array.from({ length: 600 }, (_, i) => {
          const x = -1.5 + (i / 20);
          const y = -2* (Math.cos(x * (Math.PI / 12)) * 3.5);
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ')}
        stroke="blue"
        strokeWidth="0.2"
        fill="none"
      />
    </svg>  
  );
}
