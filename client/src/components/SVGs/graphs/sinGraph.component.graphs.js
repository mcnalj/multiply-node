  import React from 'react';

  export function SinGraph() {
    return (
      <div>
      <svg width="400" height="400" viewBox="-2 -8 29 16" xmlns="http://www.w3.org/2000/svg">

        <defs>
            <marker id="arrow-left-up" markerWidth="3" markerHeight="3" refX="3" refY="1.5" orient="auto" markerUnits="strokeWidth">
            <path d="M3,0 L3,3 L0,1.5 z" fill="black" />
            </marker>
            <marker id="arrow-right-down" markerWidth="3" markerHeight="3" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,3 L3,1.5 z" fill="black" />
            </marker>
        </defs>

        <line x1="-1.5" y1="0" x2="25" y2="0" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />        
        <line x1="0" y1="-8" x2="0" y2="8" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />

        <text x="25" y="-0.7" textAnchor="middle" fontSize="1.2">x</text>
        <text x="0" y="-9" textAnchor="end" fontSize="1.2">f(x)</text>

        <g id="gridLinesX">
          {[...Array(5)].map((_, i) => {
            const y = i * 3.5;
            return (
              <g key={i}>
                <line key={i} x1="-2" x2="25" y1={y-7} y2={y-7} stroke="gray" strokeWidth="0.05" />
              </g>
            );
          })}
        </g>

        <g id="gridLinesY">
          {[...Array(9)].map((_, i) => {
            const x = i * 3;
            return (
              <g key={i}>
                <line key={i} x1={x} x2={x} y1="-8" y2="8" stroke="gray" strokeWidth="0.05" />
              </g>
            );
          })}
        </g>

        <path
          d={Array.from({ length: 600 }, (_, i) => {
            const x = -1.5 + (i / 20);
            const y = -2* (Math.sin(x * (Math.PI / 12)) * 3.5);
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
          }).join(' ')}
          stroke="blue"
          strokeWidth="0.2"
          fill="none"
        />

        <g id="hashMarksX">
            {[...Array(9)].map((_, i) => {
                const x = (i*3);
                const xTicks = ['0', 'π/4', 'π/2', '3π/4', 'π', "5π/4", "3π/2", "7π/4", "2π"]
                return (
                    <g key={i}>
                    <line key={i} x1={x} y1="-0.3" x2={x} y2="0.3" stroke="black" strokeWidth="0.1" />
                    <text x={x} y="1.7" textAnchor="middle" fontSize="1.1">{x>0 ? xTicks[i]: ""}</text>
                    </g>
                );
            })}
        </g>

        <g id="hashMarksY">
            {[...Array(5)].map((_, i) => {
                const y = i*(3.5);
                const yTicks = ["1", "1/2", "0", "-1/2", "-1"]
                return (
                    <g key={i}>
                    <line key={i} x1="-0.3" y1={y-7} x2="0.3" y2={y-7} stroke="black" strokeWidth="0.1" />
                    <text x="-1.3" y={y-6.6} textAnchor="middle" fontSize="1.1">{yTicks[i] != "0" ? yTicks[i] : ""}</text>
                    </g>
                );
            })}
        </g>
      </svg>
      </div>
    )
  }
