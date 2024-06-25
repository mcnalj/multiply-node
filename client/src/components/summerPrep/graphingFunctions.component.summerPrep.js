import React from 'react';

export default function GraphingFunctions() {

  const radius = 40;
  const x3 = "25"
  const y3 = "95"
  const x4 = "120"
  const y4 = "51"
  const startPoint = {x: 25, y: 140};
  const controlPoint1 = {x:100, y: -30};
  const controlPoint2 = {x:120, y: 190};
  const endPoint = {x: 170, y: 50};
  const curvePoints = [];
  for (let x = 0.1; x<4; x+=0.1) {
    curvePoints.push({x: 3*x, y: (1/x)*-3})
  }
  console.log(curvePoints)

  const curvePathData = curvePoints.map((point) => {
    const {x, y} = point;
    return `${x},${y}`;
  }).join(' ');

  const curvePath = `M 0.1,-30 L${curvePathData}`;
  
  return (
    <div>
      <h1>Graphing Practice</h1>
      <br></br>
      <br></br>
      <div><div>
      <div>
        <p> Graph of square root of x</p>
        <svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">
          <defs>
              <marker id="arrow-left-up" markerWidth="3" markerHeight="3" refX="3" refY="1.5" orient="auto" markerUnits="strokeWidth">
              <path d="M3,0 L3,3 L0,1.5 z" fill="black" />
              </marker>
              <marker id="arrow-right-down" markerWidth="3" markerHeight="3" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,3 L3,1.5 z" fill="black" />
              </marker>
          </defs>

          <line x1="-10" y1="0" x2="10" y2="0" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />        
          <line x1="0" y1="-10" x2="0" y2="10" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />

          <text x="10" y="-0.5" textAnchor="middle" fontSize="1.0">x</text>
          <text x="2" y="-10" textAnchor="end" fontSize="1.0">f(x)</text>

          <g id="gridLinesX">
            {[...Array(11)].map((_, i) => {
              const y = 2*(i - 5);
              return (
                <g key={i}>
                  <line key={i} x1="-10" x2="10" y1={y} y2={y} stroke="gray" strokeWidth="0.05" />
                </g>
              );
            })}
          </g>

          <g id="gridLinesY">
            {[...Array(11)].map((_, i) => {
              const x = 2*(i - 5);
              return (
                <g key={i}>
                  <line key={i} x1={x} x2={x} y1="-10" y2="10" stroke="gray" strokeWidth="0.05" />
                </g>
              );
            })}
          </g>

          <g id="hashMarksX">
              {[...Array(11)].map((_, i) => {
                  const x = 2*i - 10;
                  return (
                      <g key={i}>
                      <line key={i} x1={x} y1="-0.3" x2={x} y2="0.3" stroke="black" strokeWidth="0.1" />
                      <text x={x} y="1.2" textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5: ""}</text>
                      </g>
                  );
              })}
          </g>

          <g id="hashMarksY">
              {[...Array(11)].map((_, i) => {
                  const y = 2*i - 10;
                  return (
                      <g key={i}>
                      <line key={i} x1="-0.3" y1={y} x2="0.3" y2={y} stroke="black" strokeWidth="0.1" />
                      <text x="-1" y={y} textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5 : ""}</text>
                      </g>
                  );
              })}
          </g>

          <polyline
            points={[
              ...Array.from({ length: 100}, (_, i) => i).map(i => {
                const x = i;
                const y =  ((Math.sqrt(i)) * -1);
                return `${2*x} ${2*y}`;
              })
            ]}
            stroke="blue"
            fill="none"
            strokeWidth="0.2"
          />
        </svg>
      </div>                       
      <div>
        <p> Graph of a x^3 -4x^2 +x +3</p>
        <svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">
          <defs>
              <marker id="arrow-left-up" markerWidth="3" markerHeight="3" refX="3" refY="1.5" orient="auto" markerUnits="strokeWidth">
              <path d="M3,0 L3,3 L0,1.5 z" fill="black" />
              </marker>
              <marker id="arrow-right-down" markerWidth="3" markerHeight="3" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,3 L3,1.5 z" fill="black" />
              </marker>
          </defs>

          <line x1="-10" y1="0" x2="10" y2="0" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />        
          <line x1="0" y1="-10" x2="0" y2="10" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />

          <text x="10" y="-0.5" textAnchor="middle" fontSize="1.0">x</text>
          <text x="2" y="-10" textAnchor="end" fontSize="1.0">f(x)</text>

          <g id="gridLinesX">
            {[...Array(11)].map((_, i) => {
              const y = 2*(i - 5);
              return (
                <g key={i}>
                  <line key={i} x1="-10" x2="10" y1={y} y2={y} stroke="gray" strokeWidth="0.05" />
                </g>
              );
            })}
          </g>

          <g id="gridLinesY">
            {[...Array(11)].map((_, i) => {
              const x = 2*(i - 5);
              return (
                <g key={i}>
                  <line key={i} x1={x} x2={x} y1="-10" y2="10" stroke="gray" strokeWidth="0.05" />
                </g>
              );
            })}
          </g>

          <g id="hashMarksX">
              {[...Array(11)].map((_, i) => {
                  const x = 2*i - 10;
                  return (
                      <g key={i}>
                      <line key={i} x1={x} y1="-0.3" x2={x} y2="0.3" stroke="black" strokeWidth="0.1" />
                      <text x={x} y="1.2" textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5: ""}</text>
                      </g>
                  );
              })}
          </g>

          <g id="hashMarksY">
              {[...Array(11)].map((_, i) => {
                  const y = 2*i - 10;
                  return (
                      <g key={i}>
                      <line key={i} x1="-0.3" y1={y} x2="0.3" y2={y} stroke="black" strokeWidth="0.1" />
                      <text x="-1" y={y} textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5 : ""}</text>
                      </g>
                  );
              })}
          </g>

          <polyline
            points={[
              ...Array.from({ length: 100}, (_, i) => i).map(i => {
                const x = (i/10) - 5;
                const y =  ((x**3) - (4*(x**2)) + x +3) * (-1);
                return `${2*x} ${2*y}`;
              })
            ]}
            stroke="blue"
            fill="none"
            strokeWidth="0.2"
          />
        </svg>
      </div>                
      <div>
        <p> Graph of a x^2 -2x -3</p>
        <svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">
          <defs>
              <marker id="arrow-left-up" markerWidth="3" markerHeight="3" refX="3" refY="1.5" orient="auto" markerUnits="strokeWidth">
              <path d="M3,0 L3,3 L0,1.5 z" fill="black" />
              </marker>
              <marker id="arrow-right-down" markerWidth="3" markerHeight="3" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,3 L3,1.5 z" fill="black" />
              </marker>
          </defs>

          <line x1="-10" y1="0" x2="10" y2="0" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />        
          <line x1="0" y1="-10" x2="0" y2="10" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />

          <text x="10" y="-0.5" textAnchor="middle" fontSize="1.0">x</text>
          <text x="2" y="-10" textAnchor="end" fontSize="1.0">f(x)</text>

          <g id="gridLinesX">
            {[...Array(11)].map((_, i) => {
              const y = 2*(i - 5);
              return (
                <g key={i}>
                  <line key={i} x1="-10" x2="10" y1={y} y2={y} stroke="gray" strokeWidth="0.05" />
                </g>
              );
            })}
          </g>

          <g id="gridLinesY">
            {[...Array(11)].map((_, i) => {
              const x = 2*(i - 5);
              return (
                <g key={i}>
                  <line key={i} x1={x} x2={x} y1="-10" y2="10" stroke="gray" strokeWidth="0.05" />
                </g>
              );
            })}
          </g>

          <g id="hashMarksX">
              {[...Array(11)].map((_, i) => {
                  const x = 2*i - 10;
                  return (
                      <g key={i}>
                      <line key={i} x1={x} y1="-0.3" x2={x} y2="0.3" stroke="black" strokeWidth="0.1" />
                      <text x={x} y="1.2" textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5: ""}</text>
                      </g>
                  );
              })}
          </g>

          <g id="hashMarksY">
              {[...Array(11)].map((_, i) => {
                  const y = 2*i - 10;
                  return (
                      <g key={i}>
                      <line key={i} x1="-0.3" y1={y} x2="0.3" y2={y} stroke="black" strokeWidth="0.1" />
                      <text x="-1" y={y} textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5 : ""}</text>
                      </g>
                  );
              })}
          </g>

          <polyline
            points={[
              ...Array.from({ length: 100}, (_, i) => i).map(i => {
                const x = (i/10) - 5;
                const y =  ((x**2) - (2*x) -3) * (-1);
                return `${2*x} ${2*y}`;
              })
            ]}
            stroke="blue"
            fill="none"
            strokeWidth="0.2"
          />
        </svg>
      </div>        
      <div>
        <p> Graph of x^2</p>
        <svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">
          <defs>
              <marker id="arrow-left-up" markerWidth="3" markerHeight="3" refX="3" refY="1.5" orient="auto" markerUnits="strokeWidth">
              <path d="M3,0 L3,3 L0,1.5 z" fill="black" />
              </marker>
              <marker id="arrow-right-down" markerWidth="3" markerHeight="3" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,3 L3,1.5 z" fill="black" />
              </marker>
          </defs>

          <line x1="-10" y1="0" x2="10" y2="0" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />        
          <line x1="0" y1="-10" x2="0" y2="10" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />

          <text x="10" y="-0.5" textAnchor="middle" fontSize="1.0">x</text>
          <text x="2" y="-10" textAnchor="end" fontSize="1.0">f(x)</text>

          <g id="gridLinesX">
            {[...Array(11)].map((_, i) => {
              const y = 2*(i - 5);
              return (
                <g key={i}>
                  <line key={i} x1="-10" x2="10" y1={y} y2={y} stroke="gray" strokeWidth="0.05" />
                </g>
              );
            })}
          </g>

          <g id="gridLinesY">
            {[...Array(11)].map((_, i) => {
              const x = 2*(i - 5);
              return (
                <g key={i}>
                  <line key={i} x1={x} x2={x} y1="-10" y2="10" stroke="gray" strokeWidth="0.05" />
                </g>
              );
            })}
          </g>

          <g id="hashMarksX">
              {[...Array(11)].map((_, i) => {
                  const x = 2*i - 10;
                  return (
                      <g key={i}>
                      <line key={i} x1={x} y1="-0.3" x2={x} y2="0.3" stroke="black" strokeWidth="0.1" />
                      <text x={x} y="1.2" textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5: ""}</text>
                      </g>
                  );
              })}
          </g>

          <g id="hashMarksY">
              {[...Array(11)].map((_, i) => {
                  const y = 2*i - 10;
                  return (
                      <g key={i}>
                      <line key={i} x1="-0.3" y1={y} x2="0.3" y2={y} stroke="black" strokeWidth="0.1" />
                      <text x="-1" y={y} textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5 : ""}</text>
                      </g>
                  );
              })}
          </g>

          <polyline
            points={[
              ...Array.from({ length: 100}, (_, i) => i).map(i => {
                const x = (i/10) - 5;
                const y =  (x**2) * (-1);
                return `${2*x} ${2*y}`;
              })
            ]}
            stroke="blue"
            fill="none"
            strokeWidth="0.2"
          />
        </svg>
      </div>
      <div>
        <p>Coordinate Plane</p>
          <svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">

          <defs>
              <marker id="arrow-left-up" markerWidth="3" markerHeight="3" refX="3" refY="1.5" orient="auto" markerUnits="strokeWidth">
              <path d="M3,0 L3,3 L0,1.5 z" fill="black" />
              </marker>
              <marker id="arrow-right-down" markerWidth="3" markerHeight="3" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,3 L3,1.5 z" fill="black" />
              </marker>
          </defs>

          <line x1="-10" y1="0" x2="10" y2="0" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />        
          <line x1="0" y1="-10" x2="0" y2="10" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />
          <line x1="-0.3" y1="-3" x2="0.3" y2="-3" stroke="black" strokeWidth="0.1" />
          <text x="10.6" y="-0.5" textAnchor="middle" fontSize="1.2">x</text>
          <text x="-0.5" y="-10.5" textAnchor="end" fontSize="1.2">f(x)</text>

          <g id="hashMarksX">
              {[...Array(7)].map((_, i) => {
                  const x = 3*i - 9;
                  if (x === 0) return null;
                  return (
                      <g key={i}>
                      <line key={i} x1={x} y1="-0.3" x2={x} y2="0.3" stroke="black" strokeWidth="0.15" />
                      <text x={x} y="1.3" textAnchor="middle" fontSize="1">{i-3}</text>
                      </g>
                  );
              })}
          </g>
          <g id="hashMarksY">
              {[...Array(7)].map((_, i) => {
                  const y = 3*i - 9;
                  if (y === 0) return null;
                  return (
                      <g key={i}>
                      <line key={i} x1="-0.3" y1={y} x2="0.3" y2={y} stroke="black" strokeWidth="0.15" />
                      <text x="-1.1" y={y+0.3} textAnchor="middle" fontSize="1">{i-3}</text>
                      </g>
                  );
              })}
          </g>
        </svg><br></br>
      </div>

          <p>Area of 1/x from 1 to e</p>
          <svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">

          <defs>
              <marker id="arrow-left-up" markerWidth="3" markerHeight="3" refX="3" refY="1.5" orient="auto" markerUnits="strokeWidth">
              <path d="M3,0 L3,3 L0,1.5 z" fill="black" />
              </marker>
              <marker id="arrow-right-down" markerWidth="3" markerHeight="3" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,3 L3,1.5 z" fill="black" />
              </marker>
          </defs>

          <line x1="-10" y1="0" x2="10" y2="0" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />        
          <line x1="0" y1="-10" x2="0" y2="10" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />
          <line x1="-0.3" y1="-3" x2="0.3" y2="-3" stroke="black" strokeWidth="0.1" />
          <text x="10.6" y="-0.5" textAnchor="middle" fontSize="1.2">x</text>
          <text x="-0.5" y="-10.5" textAnchor="end" fontSize="1.2">f(x)</text>

          <g id="hashMarksX">
              {[...Array(7)].map((_, i) => {
                  const x = 3*i - 9;
                  if (x === 0) return null;
                  return (
                      <g key={i}>
                      <line key={i} x1={x} y1="-0.3" x2={x} y2="0.3" stroke="black" strokeWidth="0.15" />
                      <text x={x} y="1.3" textAnchor="middle" fontSize="1">{i-3}</text>
                      </g>
                  );
              })}
          </g>
          <g id="hashMarksY">
              {[...Array(7)].map((_, i) => {
                  const y = 3*i - 9;
                  if (y === 0) return null;
                  return (
                      <g key={i}>
                      <line key={i} x1="-0.3" y1={y} x2="0.3" y2={y} stroke="black" strokeWidth="0.15" />
                      <text x="-1.1" y={y+0.3} textAnchor="middle" fontSize="1">{i-3}</text>
                      </g>
                  );
              })}
          </g>
          <path d={curvePath} stroke="blue" fill="none" strokeWidth="0.3" id="curve"></path>

          <line x1={3*2.71828} y1="-0.3" x2={3*2.71828} y2="0.3" stroke="black" strokeWidth="0.15" />
          <text x={3*2.71828} y="1.3" textAnchor="middle" fontSize="1">e</text>

          {/* <path
    d="M 3,0 L 3,-3 8.1,-1 8.1,0 Z" 

    fill="red"
     /> */}

<path
    d="M 3,0 L 3,-3 C 4.1,-1 5,-0.5 6,-0.2 L 8.1,0 Z" 

    fill="red"
     />


          </svg><br></br>

    <svg width="200" height="200">      
      <line x1={x3} y1={y3} x2 ={x4} y2 ={y4} stroke="black" strokeWidth="4"/>
      <path 
        id ="bezier-path"
        d={`M${startPoint.x},${startPoint.y} 
            C${controlPoint1.x},${controlPoint1.y} 
             ${controlPoint2.x},${controlPoint2.y}  
             ${endPoint.x},${endPoint.y}`} 
        fill="none" 
        stroke="black" 
        strokeWidth="4" />
         <path
    d={`M${startPoint.x},${startPoint.y} 
        C${controlPoint1.x},${controlPoint1.y} 
        ${controlPoint2.x},${controlPoint2.y}  
        ${endPoint.x},${endPoint.y} 
        L${endPoint.x},${105} 
        L${startPoint.x},${105} 
        Z`} // Z closes the path
    fill="red"
     />
      <circle cx="72" cy="73.5" r="5" fill="blue" />
      {/* <circle cx={startPoint.x} cy={startPoint.y} r="6" fill="blue">
    <animateMotion
      dur="5s" 
      repeatCount="indefinite" 
    >
      <mpath href="#bezier-path" /> 
    </animateMotion>
    </circle> */}
   
    </svg>
    <svg width="200" height="200">
      {/* <circle cx="100" cy="100" r={radius} fill="red" /> */}
      {/* <circle cx={x3} cy={y3} r="5" fill="blue" /> */}
      {/* <circle cx={x4} cy={y4} r="5" fill="blue" /> */}
      
      <line x1={x3} y1={y3} x2 ={x4} y2 ={y4} stroke="black" strokeWidth="4"/>
      <path 
        d={`M${startPoint.x},${startPoint.y} 
            C${controlPoint1.x},${controlPoint1.y} 
             ${controlPoint2.x},${controlPoint2.y}  
             ${endPoint.x},${endPoint.y}`} 
        fill="none" 
        stroke="black" 
        strokeWidth="4" />
      <circle cx="72" cy="73.5" r="6" fill="blue" />
    </svg>  
  <p> Complete Coordinate Plane with grid lines</p>
  <svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">

    <defs>
        <marker id="arrow-left-up" markerWidth="3" markerHeight="3" refX="3" refY="1.5" orient="auto" markerUnits="strokeWidth">
        <path d="M3,0 L3,3 L0,1.5 z" fill="black" />
        </marker>
        <marker id="arrow-right-down" markerWidth="3" markerHeight="3" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,3 L3,1.5 z" fill="black" />
        </marker>
    </defs>

    <line x1="-10" y1="0" x2="10" y2="0" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />        
    <line x1="0" y1="-10" x2="0" y2="10" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />

    <text x="10" y="-0.5" textAnchor="middle" fontSize="1.0">x</text>
    <text x="2" y="-10" textAnchor="end" fontSize="1.0">f(x)</text>

    <g id="gridLinesX">
      {[...Array(11)].map((_, i) => {
        const y = 2*(i - 5);
        return (
          <g key={i}>
            <line key={i} x1="-10" x2="10" y1={y} y2={y} stroke="gray" strokeWidth="0.05" />
          </g>
        );
      })}
    </g>

    <g id="gridLinesY">
      {[...Array(11)].map((_, i) => {
        const x = 2*(i - 5);
        return (
          <g key={i}>
            <line key={i} x1={x} x2={x} y1="-10" y2="10" stroke="gray" strokeWidth="0.05" />
          </g>
        );
      })}
    </g>


    <g id="hashMarksX">
        {[...Array(11)].map((_, i) => {
            const x = 2*i - 10;
            return (
                <g key={i}>
                <line key={i} x1={x} y1="-0.3" x2={x} y2="0.3" stroke="black" strokeWidth="0.1" />
                <text x={x} y="1.2" textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5: ""}</text>
                </g>
            );
        })}
    </g>

    <g id="hashMarksY">
        {[...Array(11)].map((_, i) => {
            const y = 2*i - 10;
            return (
                <g key={i}>
                <line key={i} x1="-0.3" y1={y} x2="0.3" y2={y} stroke="black" strokeWidth="0.1" />
                <text x="-1" y={y} textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5 : ""}</text>
                </g>
            );
        })}
    </g>
  </svg>
</div>            
  <p> Graph of Sine</p>
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


  <p> Graph of Cosine</p>
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
      const y = -2* (Math.cos(x * (Math.PI / 12)) * 3.5);
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

  <p> Graph of Tan (need to figure out how to handle undefined points)</p>
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
    d={Array.from({ length: 230 }, (_, i) => {
      const x = -1.5 + ((i+151) / 20);
      const y = -2* (Math.tan(x * (Math.PI / 12)) * 3.5);
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
            <svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">

                <defs>
                    <marker id="arrow-left-up" markerWidth="3" markerHeight="3" refX="3" refY="1.5" orient="auto" markerUnits="strokeWidth">
                    <path d="M3,0 L3,3 L0,1.5 z" fill="black" />
                    </marker>
                    <marker id="arrow-right-down" markerWidth="3" markerHeight="3" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,3 L3,1.5 z" fill="black" />
                    </marker>
                </defs>

                <line x1="-10" y1="0" x2="10" y2="0" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />        
                <line x1="0" y1="-10" x2="0" y2="10" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />

                <text x="10" y="-0.5" textAnchor="middle" fontSize="1.0">x</text>
                <text x="-0.5" y="-10" textAnchor="end" fontSize="1.0">f(x)</text>

                <path d="M -10 -10 Q -5 0 0 0" fill="none" stroke="blue" strokeWidth="0.4" />
                <path d="M 0 0 Q 5 0 10 -20" fill="none" stroke="blue" strokeWidth="0.4" />

                <g id="hashMarksX">
                    {[...Array(7)].map((_, i) => {
                        const x = 3*i - 9;
                        return (
                            <g key={i}>
                            <line key={i} x1={x} y1="-0.3" x2={x} y2="0.3" stroke="black" strokeWidth="0.1" />
                            <text x={x} y="1.2" textAnchor="middle" fontSize="1">{i-3}</text>
                            </g>
                        );
                    })}
                </g>
            </svg>

<p>Graph of 1/x</p>
<svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">

<defs>
    <marker id="arrow-left-up" markerWidth="3" markerHeight="3" refX="3" refY="1.5" orient="auto" markerUnits="strokeWidth">
    <path d="M3,0 L3,3 L0,1.5 z" fill="black" />
    </marker>
    <marker id="arrow-right-down" markerWidth="3" markerHeight="3" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
    <path d="M0,0 L0,3 L3,1.5 z" fill="black" />
    </marker>
</defs>

<line x1="-10" y1="0" x2="10" y2="0" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />        
<line x1="0" y1="-10" x2="0" y2="10" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />
<line x1="-0.3" y1="-3" x2="0.3" y2="-3" stroke="black" strokeWidth="0.1" />
<text x="10" y="-0.5" textAnchor="middle" fontSize="1.0">x</text>
<text x="-0.5" y="-10" textAnchor="end" fontSize="1.0">f(x)</text>

<g id="hashMarksX">
    {[...Array(7)].map((_, i) => {
        const x = 3*i - 9;
        return (
            <g key={i}>
            <line key={i} x1={x} y1="-0.3" x2={x} y2="0.3" stroke="black" strokeWidth="0.1" />
            <text x={x} y="1.2" textAnchor="middle" fontSize="1">{i-3}</text>
            </g>
        );
    })}
</g>
<path d={curvePath} stroke="blue" fill="none" strokeWidth="0.3" id="curve"></path>
<circle cx="3" cy="-3" r="0.35" fill="black" />
</svg>

<p>Chat GPTs improved coordinate plane</p>

<svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">

<defs>
    <marker id="arrow" markerWidth="5" markerHeight="5" refX="5" refY="2.5" orient="auto" markerUnits="strokeWidth">
    <path d="M5,0 L5,5 L0,2.5 z" fill="black" />
    </marker>
</defs>

<line x1="-10" y1="0" x2="10" y2="0" stroke="black" strokeWidth="0.2" markerEnd="url(#arrow)" />        
<line x1="0" y1="-10" x2="0" y2="10" stroke="black" strokeWidth="0.2" markerEnd="url(#arrow)" />

<text x="10" y="-0.5" textAnchor="middle" fontSize="1.0">x</text>
<text x="-0.5" y="-10" textAnchor="end" fontSize="1.0">f(x)</text>

<g id="hashMarksX">
    {[...Array(7)].map((_, i) => {
        const x = 3 * i - 9;
        return (
            <g key={i}>
            <line key={i} x1={x} y1="-0.3" x2={x} y2="0.3" stroke="black" strokeWidth="0.1" />
            <text x={x} y="1.2" textAnchor="middle" fontSize="1">{i - 3}</text>
            </g>
        );
    })}
</g>
</svg>


            <svg width="200" height="50" xmlns="http://www.w3.org/2000/svg">

  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
      <path d="M0,0 L10,5 L0,10" fill="black" />
    </marker>

    <marker id="arrowRight" markerWidth="10" markerHeight="10" refX="0" refY="5" orient="auto">
      <path d="M10,0 L0,5 L10,10" fill="black" />
    </marker>
  </defs>


  <line x1="20" y1="25" x2="180" y2="25" stroke="black" strokeWidth="2" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
</svg>

<svg width="200" height="50" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow-left" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
      <path d="M0,0 L10,5 L0,10" fill="black" />
    </marker>
    <marker id="arrow-right" markerWidth="10" markerHeight="10" refX="0" refY="5" orient="auto">
      <path d="M10,0 L0,5 L10,10" fill="black" />
    </marker>
  </defs>
  <line x1="20" y1="25" x2="180" y2="25" stroke="black" strokeWidth="2" markerEnd="url(#arrow-left)" markerStart="url(#arrow-right)" />
</svg>
<svg width="200" height="50" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow-left" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
      <path d="M0,0 L10,5 L0,10" />
    </marker>
    <marker id="arrow-right" markerWidth="10" markerHeight="10" refX="0" refY="5" orient="auto">
      <path d="M10,0 L0,5 L10,10" />
    </marker>
  </defs>
  <line x1="20" y1="25" x2="180" y2="25" stroke="black" strokeWidth="2" markerEnd="url(#arrow-left)" markerStart="url(#arrow-right)" />
</svg>
<div>
  <p> Complete Coordinate Plane with grid lines</p>
  <svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">

    <defs>
        <marker id="arrow-left-up" markerWidth="3" markerHeight="3" refX="3" refY="1.5" orient="auto" markerUnits="strokeWidth">
        <path d="M3,0 L3,3 L0,1.5 z" fill="black" />
        </marker>
        <marker id="arrow-right-down" markerWidth="3" markerHeight="3" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,3 L3,1.5 z" fill="black" />
        </marker>
    </defs>

    <line x1="-10" y1="0" x2="10" y2="0" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />        
    <line x1="0" y1="-10" x2="0" y2="10" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />

    <text x="10" y="-0.5" textAnchor="middle" fontSize="1.0">x</text>
    <text x="2" y="-10" textAnchor="end" fontSize="1.0">f(x)</text>

    <g id="gridLinesX">
      {[...Array(11)].map((_, i) => {
        const y = 2*(i - 5);
        return (
          <g key={i}>
            <line key={i} x1="-10" x2="10" y1={y} y2={y} stroke="gray" strokeWidth="0.05" />
          </g>
        );
      })}
    </g>

    <g id="gridLinesY">
      {[...Array(11)].map((_, i) => {
        const x = 2*(i - 5);
        return (
          <g key={i}>
            <line key={i} x1={x} x2={x} y1="-10" y2="10" stroke="gray" strokeWidth="0.05" />
          </g>
        );
      })}
    </g>


    <g id="hashMarksX">
        {[...Array(11)].map((_, i) => {
            const x = 2*i - 10;
            return (
                <g key={i}>
                <line key={i} x1={x} y1="-0.3" x2={x} y2="0.3" stroke="black" strokeWidth="0.1" />
                <text x={x} y="1.2" textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5: ""}</text>
                </g>
            );
        })}
    </g>

    <g id="hashMarksY">
        {[...Array(11)].map((_, i) => {
            const y = 2*i - 10;
            return (
                <g key={i}>
                <line key={i} x1="-0.3" y1={y} x2="0.3" y2={y} stroke="black" strokeWidth="0.1" />
                <text x="-1" y={y} textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5 : ""}</text>
                </g>
            );
        })}
    </g>
  </svg>
</div>

<div>
  <p>Graph of 1/x</p>
  <svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">

    <defs>
        <marker id="arrow-left-up" markerWidth="3" markerHeight="3" refX="3" refY="1.5" orient="auto" markerUnits="strokeWidth">
        <path d="M3,0 L3,3 L0,1.5 z" fill="black" />
        </marker>
        <marker id="arrow-right-down" markerWidth="3" markerHeight="3" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,3 L3,1.5 z" fill="black" />
        </marker>
    </defs>

    <line x1="-10" y1="0" x2="10" y2="0" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />        
    <line x1="0" y1="-10" x2="0" y2="10" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />

    <text x="10" y="-0.5" textAnchor="middle" fontSize="1.0">x</text>
    <text x="2" y="-10" textAnchor="end" fontSize="1.0">f(x)</text>

    <g id="gridLinesX">
      {[...Array(11)].map((_, i) => {
        const y = 2*(i - 5);
        return (
          <g key={i}>
            <line key={i} x1="-10" x2="10" y1={y} y2={y} stroke="gray" strokeWidth="0.05" />
          </g>
        );
      })}
    </g>

    <g id="gridLinesY">
      {[...Array(11)].map((_, i) => {
        const x = 2*(i - 5);
        return (
          <g key={i}>
            <line key={i} x1={x} x2={x} y1="-10" y2="10" stroke="gray" strokeWidth="0.05" />
          </g>
        );
      })}
    </g>


    <g id="hashMarksX">
        {[...Array(11)].map((_, i) => {
            const x = 2*i - 10;
            return (
                <g key={i}>
                <line key={i} x1={x} y1="-0.3" x2={x} y2="0.3" stroke="black" strokeWidth="0.1" />
                <text x={x} y="1.2" textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5: ""}</text>
                </g>
            );
        })}
    </g>

    <g id="hashMarksY">
        {[...Array(11)].map((_, i) => {
            const y = 2*i - 10;
            return (
                <g key={i}>
                <line key={i} x1="-0.3" y1={y} x2="0.3" y2={y} stroke="black" strokeWidth="0.1" />
                <text x="-1" y={y} textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5 : ""}</text>
                </g>
            );
        })}
    </g>

    <polyline
    points={[
      ...Array.from({ length: 99 }, (_, i) => i + 1).map(i => {
        const x =(i - 100) / 10;
        const y = (1 / (x/2)) *2
        return `${x} ${y}`;
      })
    ]}
    stroke="blue"
    fill="none"
    strokeWidth="0.1"
  />

  <polyline
      points={[
        ...Array.from({ length: 99 }, (_, i) => i + 1).map(i => {
          const x =((i+100) - 100) / 10;
          const y = x != 0 ? (1 / (x/2))*2 : 1000;
          return `${x} ${y}`;
        })
      ]}
      stroke="blue"
      fill="none"
      strokeWidth="0.1"
    />

  </svg>
</div>

<div>
  <p> Graph of 1n (x)</p>
  <svg width="400" height="400" viewBox="-3 -10 25 20" xmlns="http://www.w3.org/2000/svg">

    <defs>
        <marker id="arrow-left-up" markerWidth="3" markerHeight="3" refX="3" refY="1.5" orient="auto" markerUnits="strokeWidth">
        <path d="M3,0 L3,3 L0,1.5 z" fill="black" />
        </marker>
        <marker id="arrow-right-down" markerWidth="3" markerHeight="3" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,3 L3,1.5 z" fill="black" />
        </marker>
    </defs>

    <line x1="-2" y1="0" x2="20" y2="0" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />        
    <line x1="0" y1="-10" x2="0" y2="10" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />

    <text x="21" y="-0.5" textAnchor="middle" fontSize="1.0">x</text>
    <text x="2" y="-10" textAnchor="end" fontSize="1.0">f(x)</text>

    <g id="gridLinesX">
      {[...Array(11)].map((_, i) => {
        const y = 2*(i - 5);
        return (
          <g key={i}>
            <line key={i} x1="-2" x2="20" y1={y} y2={y} stroke="gray" strokeWidth="0.05" />
          </g>
        );
      })}
    </g>

    <g id="gridLinesY">
      {[...Array(12)].map((_, i) => {
        const x = 2*(i - 1);
        return (
          <g key={i}>
            <line key={i} x1={x} x2={x} y1="-10" y2="10" stroke="gray" strokeWidth="0.05" />
          </g>
        );
      })}
    </g>


    <g id="hashMarksX">
        {[...Array(12)].map((_, i) => {
            const x = 2*(i - 1);
            return (
                <g key={i}>
                <line key={i} x1={x} y1="-0.3" x2={x} y2="0.3" stroke="black" strokeWidth="0.1" />
                <text x={x} y="1.2" textAnchor="middle" fontSize="1">{i-1 != 0 ? i-1: ""}</text>
                </g>
            );
        })}
    </g>

    <g id="hashMarksY">
        {[...Array(11)].map((_, i) => {
            const y = 2*i - 10;
            return (
                <g key={i}>
                <line key={i} x1="-0.3" y1={y} x2="0.3" y2={y} stroke="black" strokeWidth="0.1" />
                <text x="-1" y={y} textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5 : ""}</text>
                </g>
            );
        })}

    <polyline
      points={[
        ...Array.from({ length: 1000 }, (_, i) => i + 1).map(i => {
          const x = (i * .01);
          const y = (Math.log(x) * (-1));
          return `${2*x} ${2*y}`;
        })
      ]}
      stroke="blue"
      fill="none"
      strokeWidth="0.2"
    />

    </g>
  </svg>
</div>


<div>
  <p> graph of e^x</p>
  <svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">

    <defs>
        <marker id="arrow-left-up" markerWidth="3" markerHeight="3" refX="3" refY="1.5" orient="auto" markerUnits="strokeWidth">
        <path d="M3,0 L3,3 L0,1.5 z" fill="black" />
        </marker>
        <marker id="arrow-right-down" markerWidth="3" markerHeight="3" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,3 L3,1.5 z" fill="black" />
        </marker>
    </defs>

    <line x1="-10" y1="0" x2="10" y2="0" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />        
    <line x1="0" y1="-10" x2="0" y2="10" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />

    <text x="10" y="-0.5" textAnchor="middle" fontSize="1.0">x</text>
    <text x="2" y="-10" textAnchor="end" fontSize="1.0">f(x)</text>

    <g id="gridLinesX">
      {[...Array(11)].map((_, i) => {
        const y = 2*(i - 5);
        return (
          <g key={i}>
            <line key={i} x1="-10" x2="10" y1={y} y2={y} stroke="gray" strokeWidth="0.05" />
          </g>
        );
      })}
    </g>

    <g id="gridLinesY">
      {[...Array(11)].map((_, i) => {
        const x = 2*(i - 5);
        return (
          <g key={i}>
            <line key={i} x1={x} x2={x} y1="-10" y2="10" stroke="gray" strokeWidth="0.05" />
          </g>
        );
      })}
    </g>


    <g id="hashMarksX">
        {[...Array(11)].map((_, i) => {
            const x = 2*i - 10;
            return (
                <g key={i}>
                <line key={i} x1={x} y1="-0.3" x2={x} y2="0.3" stroke="black" strokeWidth="0.1" />
                <text x={x} y="1.2" textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5: ""}</text>
                </g>
            );
        })}
    </g>

    <g id="hashMarksY">
        {[...Array(11)].map((_, i) => {
            const y = 2*i - 10;
            return (
                <g key={i}>
                <line key={i} x1="-0.3" y1={y} x2="0.3" y2={y} stroke="black" strokeWidth="0.1" />
                <text x="-1" y={y} textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5 : ""}</text>
                </g>
            );
        })}
    </g>

    <polyline
      points={[
        ...Array.from({ length: 100}, (_, i) => i).map(i => {
          const x = (i/10) - 5;
          const y = Math.exp(x) * (-1);
          return `${2*x} ${2*y}`;
        })
      ]}
      stroke="blue"
      fill="none"
      strokeWidth="0.2"
    />

  </svg>
</div>
<div>
  <p> Graph of x^3</p>
  <svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">

    <defs>
        <marker id="arrow-left-up" markerWidth="3" markerHeight="3" refX="3" refY="1.5" orient="auto" markerUnits="strokeWidth">
        <path d="M3,0 L3,3 L0,1.5 z" fill="black" />
        </marker>
        <marker id="arrow-right-down" markerWidth="3" markerHeight="3" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,3 L3,1.5 z" fill="black" />
        </marker>
    </defs>

    <line x1="-10" y1="0" x2="10" y2="0" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />        
    <line x1="0" y1="-10" x2="0" y2="10" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />

    <text x="10" y="-0.5" textAnchor="middle" fontSize="1.0">x</text>
    <text x="2" y="-10" textAnchor="end" fontSize="1.0">f(x)</text>

    <g id="gridLinesX">
      {[...Array(11)].map((_, i) => {
        const y = 2*(i - 5);
        return (
          <g key={i}>
            <line key={i} x1="-10" x2="10" y1={y} y2={y} stroke="gray" strokeWidth="0.05" />
          </g>
        );
      })}
    </g>

    <g id="gridLinesY">
      {[...Array(11)].map((_, i) => {
        const x = 2*(i - 5);
        return (
          <g key={i}>
            <line key={i} x1={x} x2={x} y1="-10" y2="10" stroke="gray" strokeWidth="0.05" />
          </g>
        );
      })}
    </g>


    <g id="hashMarksX">
        {[...Array(11)].map((_, i) => {
            const x = 2*i - 10;
            return (
                <g key={i}>
                <line key={i} x1={x} y1="-0.3" x2={x} y2="0.3" stroke="black" strokeWidth="0.1" />
                <text x={x} y="1.2" textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5: ""}</text>
                </g>
            );
        })}
    </g>

    <g id="hashMarksY">
        {[...Array(11)].map((_, i) => {
            const y = 2*i - 10;
            return (
                <g key={i}>
                <line key={i} x1="-0.3" y1={y} x2="0.3" y2={y} stroke="black" strokeWidth="0.1" />
                <text x="-1" y={y} textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5 : ""}</text>
                </g>
            );
        })}
    </g>

    <polyline
      points={[
        ...Array.from({ length: 100}, (_, i) => i).map(i => {
          const x = (i/10) - 5;
          const y =  (x**3) * (-1);
          return `${2*x} ${2*y}`;
        })
      ]}
      stroke="blue"
      fill="none"
      strokeWidth="0.2"
    />

  </svg>
</div>

<div>
  <p> Graph of x^3</p>
  <svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">

    <defs>
        <marker id="arrow-left-up" markerWidth="3" markerHeight="3" refX="3" refY="1.5" orient="auto" markerUnits="strokeWidth">
        <path d="M3,0 L3,3 L0,1.5 z" fill="black" />
        </marker>
        <marker id="arrow-right-down" markerWidth="3" markerHeight="3" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,3 L3,1.5 z" fill="black" />
        </marker>
    </defs>

    <line x1="-10" y1="0" x2="10" y2="0" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />        
    <line x1="0" y1="-10" x2="0" y2="10" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />

    <text x="10" y="-0.5" textAnchor="middle" fontSize="1.0">x</text>
    <text x="2" y="-10" textAnchor="end" fontSize="1.0">f(x)</text>

    <g id="gridLinesX">
      {[...Array(11)].map((_, i) => {
        const y = 2*(i - 5);
        return (
          <g key={i}>
            <line key={i} x1="-10" x2="10" y1={y} y2={y} stroke="gray" strokeWidth="0.05" />
          </g>
        );
      })}
    </g>

    <g id="gridLinesY">
      {[...Array(11)].map((_, i) => {
        const x = 2*(i - 5);
        return (
          <g key={i}>
            <line key={i} x1={x} x2={x} y1="-10" y2="10" stroke="gray" strokeWidth="0.05" />
          </g>
        );
      })}
    </g>


    <g id="hashMarksX">
        {[...Array(11)].map((_, i) => {
            const x = 2*i - 10;
            return (
                <g key={i}>
                <line key={i} x1={x} y1="-0.3" x2={x} y2="0.3" stroke="black" strokeWidth="0.1" />
                <text x={x} y="1.2" textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5: ""}</text>
                </g>
            );
        })}
    </g>

    <g id="hashMarksY">
        {[...Array(11)].map((_, i) => {
            const y = 2*i - 10;
            return (
                <g key={i}>
                <line key={i} x1="-0.3" y1={y} x2="0.3" y2={y} stroke="black" strokeWidth="0.1" />
                <text x="-1" y={y} textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5 : ""}</text>
                </g>
            );
        })}
    </g>

    <polyline
      points={[
        ...Array.from({ length: 100}, (_, i) => i).map(i => {
          const x = (i/10) - 5;
          const y =  (x**2) * (-1);
          return `${2*x} ${2*y}`;
        })
      ]}
      stroke="blue"
      fill="none"
      strokeWidth="0.2"
    />

  </svg>
</div>


</div>
    )
}
