import React from 'react';

export const SVGXAndYAxes = () => (
    <>
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
    </>
);

export const SVGGridLines = () => (
    <>
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
    </>
);

export const SVGHashMarks = () => (
    <>
          <g id="hashMarksX">
          {[...Array(9)].map((_, i) => {
              const x = (i*3);
              const xTicks = ['0', 'π/4', 'π/2', '3π/4', 'π', '5π/4', '3π/2', '7π/4', '2π']
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
    </>
);

export const SVGXAndYAxes2 = () => (
    <>
      <defs>
          <marker id="arrow-left-up" markerWidth="3" markerHeight="3" refX="3" refY="1.5" orient="auto" markerUnits="strokeWidth">
          <path d="M3,0 L3,3 L0,1.5 z" fill="black" />
          </marker>
          <marker id="arrow-right-down" markerWidth="3" markerHeight="3" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,3 L3,1.5 z" fill="black" />
          </marker>
      </defs>

      <line x1="-1.5" y1="0" x2="33" y2="0" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />        
      <line x1="0" y1="-9" x2="0" y2="8.5" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />

      <text x="33" y="-0.7" textAnchor="middle" fontSize="1.2">x</text>
      <text x="0" y="-10" textAnchor="end" fontSize="1.2">f(x)</text>
    </>
);

export const SVGGridLines2 = () => {
    const xArray = [1.57, 1.05, 0.785, 0.5, 0, -0.5, -0.785, -1.05, -1.57];
    return (
    <>
        <g id="gridLinesX">
            {xArray.map((_, i) => {
            const y = Math.sin(xArray[i]) *8;
            return (
                <g key={i}>
                <line key={i} x1="0" x2="32" y1={y} y2={y} stroke="gray" strokeWidth="0.05" />
                </g>
            );
            })}
        </g>

        <g id="gridLinesY">
            {[...Array(25)].map((_, i) => {
            if (i === 1 || i === 5  || i == 7 || i === 11 || i === 13 || i === 17 || i === 19 || i === 23 ) {
                return null;
            }
            // const x = i * 2;
            const x = ((6.28/24)*i) * 5 ;
            return (
                <g key={i}>
                <line key={i} x1={x} x2={x} y1="-8.0" y2="8.0" stroke="gray" strokeWidth="0.05" />
                </g>
            );
            })}
        </g>
    </>
    )
};

export const SVGHashMarks2 = () => {
    const xArray = [1.57, 1.05, 0.785, 0.5, 0, -0.5, -0.785, -1.05, -1.57];
    return (
    <>
        <g id="hashMarksX">
          {[...Array(25)].map((_, i) => {
            if (i === 1 || i === 5  || i == 7 || i === 11 || i === 13 || i === 17 || i === 19 || i === 23 ) {
                return null;
            }
            const x = (i*(3.14/24)*10);
            const xTicks = ['0', '', 'π/6', 'π/4', 'π/3', '', 'π/2','', '2π/3', '3π/4', '5π/6','', 'π', '', '7π/6', '5π/4', '4π/3', '', '3π/2', '', '5π/3', '7π/4', '11π/6', '', '2π'];
            let y = "1.5";
            if (i % 2 === 1) {
               y = "-1.0" 
            }
            return (
                <g key={i}>
                <line key={i} x1={x} y1="-0.3" x2={x} y2="0.3" stroke="black" strokeWidth="0.1" />
                <text x={x} y={y} textAnchor="middle" fontSize="1">{x>0 ? xTicks[i]: ""}</text>
                </g>
            );
          })}
        </g>

      <g id="hashMarksY">
          {xArray.map((_, i) => {
              const y = Math.sin(xArray[i]) *8;
              const yTicks = ["-1", "-√3/2", "-√2/2", "-1/2", "0", "1/2", "√2/2", "√3/2", "1"]
              return (
                  <g key={i}>
                  <line key={i} x1="-0.3" y1={y} x2="0.3" y2={y} stroke="black" strokeWidth="0.1" />
                  <text x="-1.3" y={y+ 0.3} textAnchor="middle" fontSize="1">{yTicks[i] != "0" ? yTicks[i] : ""}</text>
                  </g>
              );
          })}
      </g>
    </>
    )
}

{/* <svg
    width="500"
    height="350"
    viewBox="-2 -8 36 16"
    xmlns="http://www.w3.org/2000/svg"
>
<defs>
    <marker id="arrow-left-up" markerWidth="3" markerHeight="3" refX="3" refY="1.5" orient="auto" markerUnits="strokeWidth">
    <path d="M3,0 L3,3 L0,1.5 z" fill="black" />
    </marker>
    <marker id="arrow-right-down" markerWidth="3" markerHeight="3" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
    <path d="M0,0 L0,3 L3,1.5 z" fill="black" />
    </marker>
</defs>

<line x1="-1.5" y1="0" x2="33" y2="0" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />        
<line x1="0" y1="-9" x2="0" y2="8.5" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />

<text x="33" y="-0.7" textAnchor="middle" fontSize="1.2">x</text>
<text x="0" y="-10" textAnchor="end" fontSize="1.2">f(x)</text>
<g id="gridLinesX">
            {xArray.map((_, i) => {
            const y = Math.sin(xArray[i]) *8;
            return (
                <g key={i}>
                <line key={i} x1="0" x2="32" y1={y} y2={y} stroke="gray" strokeWidth="0.05" />
                </g>
            );
            })}
        </g>

        <g id="gridLinesY">
            {[...Array(25)].map((_, i) => {
            if (i === 1 || i === 5  || i == 7 || i === 11 || i === 13 || i === 17 || i === 19 || i === 23 ) {
                return null;
            }
            // const x = i * 2;
            const x = ((6.28/24)*i) * 5 ;
            return (
                <g key={i}>
                <line key={i} x1={x} x2={x} y1="-8.0" y2="8.0" stroke="gray" strokeWidth="0.05" />
                </g>
            );
            })}
        </g>
        <g id="hashMarksX">
          {[...Array(25)].map((_, i) => {
            if (i === 1 || i === 5  || i == 7 || i === 11 || i === 13 || i === 17 || i === 19 || i === 23 ) {
                return null;
            }
            const x = (i*(3.14/24)*10);
            const xTicks = ['0', '', 'π/6', 'π/4', 'π/3', '', 'π/2','', '2π/3', '3π/4', '5π/6','', 'π', '', '7π/6', '5π/4', '4π/3', '', '3π/2', '', '5π/3', '7π/4', '11π/6', '', '2π'];
            return (
                <g key={i}>
                <line key={i} x1={x} y1="-0.3" x2={x} y2="0.3" stroke="black" strokeWidth="0.1" />
                <text x={x} y="1.7" textAnchor="middle" fontSize="0.8">{x>0 ? xTicks[i]: ""}</text>
                </g>
            );
          })}
        </g>

      <g id="hashMarksY">
          {[...Array(9)].map((_, i) => {
              const y = i*(2);
              const yTicks = ["1", "√3/2", "√2/2", "1/2", "0", "-1/2", "-√2/2", "-√3/2", "-1"]
              return (
                  <g key={i}>
                  <line key={i} x1="-0.3" y1={y-8} x2="0.3" y2={y-8} stroke="black" strokeWidth="0.1" />
                  <text x="-1.3" y={y-8} textAnchor="middle" fontSize="0.8">{yTicks[i] != "0" ? yTicks[i] : ""}</text>
                  </g>
              );
          })}
      </g>
</svg> */}