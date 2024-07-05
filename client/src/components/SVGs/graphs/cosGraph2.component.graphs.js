import React from 'react';

export function CosPath2() {
    return (
      <path
        d={Array.from({ length: 600 }, (_, i) => {
          const x = -1.5 + (i / 50);
          const y = -Math.cos(x);
          return `${i === 0 ? 'M' : 'L'} ${x * 5} ${y * 8}`;
        }).join(' ')}
        stroke="blue"
        strokeWidth="0.2"
        fill="none"
      />
    );
  }
  