import React from 'react';

const PathwayCircle = ({ 
  title, 
  onClick, 
  isActive = true, 
  showAnimation = false,
  size = 200,
  level = null 
}) => {
  const radius = size / 2;
  const centerPoint = radius;
  const goldRingRadius = radius * 0.85; // Increased from 0.475 to contain star
  const blueCircleRadius = radius * 0.75; // Increased from 0.425 to contain star
  const strokeWidth = size * 0.04; // 8/200
  const blueStrokeWidth = size * 0.015; // 3/200
  
  // Scale star points proportionally - made slightly smaller to fit better
  const starScale = size / 200 * 0.8; // Reduced star size by 20%
  const starPoints = `${centerPoint},${centerPoint - 70 * starScale} ${centerPoint + 10 * starScale},${centerPoint - 30 * starScale} ${centerPoint + 50 * starScale},${centerPoint - 30 * starScale} ${centerPoint + 20 * starScale},${centerPoint + 5 * starScale} ${centerPoint + 30 * starScale},${centerPoint + 35 * starScale} ${centerPoint},${centerPoint + 15 * starScale} ${centerPoint - 30 * starScale},${centerPoint + 35 * starScale} ${centerPoint - 20 * starScale},${centerPoint + 5 * starScale} ${centerPoint - 50 * starScale},${centerPoint - 30 * starScale} ${centerPoint - 10 * starScale},${centerPoint - 30 * starScale}`;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center' 
    }}>
      {/* Title */}
      <div
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '15px',
          textAlign: 'center',
          maxWidth: `${size}px`
        }}
      >
        {title}
      </div>
      
      {/* Circle SVG */}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Gold Ring */}
        <circle
          cx={centerPoint}
          cy={centerPoint}
          r={goldRingRadius}
          fill="none"
          stroke="gold"
          strokeWidth={strokeWidth}
        >
          {showAnimation && (
            <>
              <animate
                attributeName="r"
                values={`${goldRingRadius};${goldRingRadius + 7.5 * starScale};${goldRingRadius}`}
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-width"
                values={`${strokeWidth};${strokeWidth * 2};${strokeWidth}`}
                dur="2s"
                repeatCount="indefinite"
              />
            </>
          )}
        </circle>
        
        {/* Blue Circle */}
        <circle
          cx={centerPoint}
          cy={centerPoint}
          r={blueCircleRadius}
          fill={isActive ? "#007bff" : "#6c757d"}
          strokeWidth={blueStrokeWidth}
          stroke={isActive ? "#0056b3" : "#495057"}
          style={{ cursor: 'pointer', opacity: isActive ? 1 : 0.7 }}
          onClick={onClick}
        />
        
        {/* White Star */}
        <polygon
          points={starPoints}
          fill="white"
          stroke="white"
          strokeWidth={size * 0.01}
          style={{ cursor: 'pointer', opacity: isActive ? 1 : 0.7 }}
          onClick={onClick}
        />
        
        {/* Level indicator (if provided) */}
        {level && (
          <text
            x={centerPoint}
            y={centerPoint + radius * 0.75}
            textAnchor="middle"
            fill="#666"
            fontSize={size * 0.06}
            fontWeight="bold"
          >
            Level {level}
          </text>
        )}
      </svg>
    </div>
  );
};

export default PathwayCircle;
