import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CourseHome = () => {
  // Navigation hook
  const navigate = useNavigate();
  
  // State to manage click animation
  const [isShrunk, setIsShrunk] = useState(false);
  const [animateKey, setAnimateKey] = useState(0); // Key to reset animation

  // Handle circle click
  const handleCircleClick = () => {
    setIsShrunk(prev => !prev);
    setAnimateKey(prev => prev + 1); // Change key to reset animation
  };

  // Handle course click to navigate to sectionHome
  const handleCourseClick = () => {
    navigate('/sectionHome');
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      backgroundColor: '#f8f9fa' 
    }}>
      {/* Title */}
      {!isShrunk && (
        <h3 className="fs-3 fs-md-2 fs-lg-1 text-center mb-3" style={{ 
          color: '#333', 
          fontWeight: 'normal' 
        }}>
          Courses
        </h3>
      )}
      
      {/* Blue Circle with White Star */}
      <svg width="700" height="700" viewBox="0 0 700 700">
        {/* Ring - only show if not clicked */}
        {!isShrunk && (
          <circle
            cx="350"
            cy="350"
            r="185"
            fill="none"
            stroke="gold"
            strokeWidth="10"
          >
            <animate attributeName="r" values="185;200;185" dur="2s" repeatCount="indefinite" />
            <animate attributeName="stroke-width" values="10;20;10" dur="2s" repeatCount="indefinite" />
          </circle>
        )}
        {isShrunk && (
          <circle
            cx="350"
            cy="350"
            r="72.5"
            fill="none"
            stroke="gold"
            strokeWidth="5"
          />
        )}

        {/* Blue Circle */}
        <circle
          cx="350"
          cy="350"
          r={isShrunk ? 70 : 180} 
          fill="#007bff"
          strokeWidth="2"
          style={{ cursor: 'pointer' }}
          onClick={handleCircleClick}
        >
          <animate
            attributeName="r"
            values={isShrunk ? "180;70" : "70;180"}
            dur="1s"
            fill="freeze"
            key={animateKey}
          />
        </circle>

        {/* White Star - centered at (350, 350) and scaled when clicked */}
        <g transform="translate(350, 350)">
          <g>
            <animateTransform
              key={animateKey}
              attributeName="transform"
              type="scale"
              values={isShrunk ? "1;0.5" : "0.5;1"}
              dur="1s"
              fill="freeze"
            />
            <polygon
              points="0,-100 16,-40 76,-40 30,0 46,60 0,20 -46,60 -30,0 -76,-40 -16,-40"
              fill="white"
              stroke="white"
              strokeWidth="1"
              style={{ cursor: 'pointer' }}
              onClick={handleCircleClick}
            />
          </g>
        </g>

        {/* Course circle when shrunk */}
        {isShrunk && (
          <>
            {/* AP Calculus AB Circle */}
            <g transform="translate(350, 150)">
              <circle r="72.5" fill="none" stroke="gold" strokeWidth="5">
                {/* Animate the radius */}
                <animate
                  attributeName="r"
                  values="72.5;80;72.5"
                  dur="2s"
                  repeatCount="indefinite"
                />
                {/* Animate the stroke width */}
                <animate
                  attributeName="stroke-width"
                  values="5;10;5"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle 
                r="70" 
                fill="#007bff" 
                strokeWidth="2" 
                style={{ cursor: 'pointer' }}
                onClick={handleCourseClick}
              />
              <polygon
                points="0,-50 8,-20 38,-20 15,0 23,30 0,10 -23,30 -15,0 -38,-20 -8,-20"
                fill="white"
                stroke="white"
                strokeWidth="1"
                style={{ cursor: 'pointer' }}
                onClick={handleCourseClick}
              />
            </g>
            <text
              x="350"
              y="60"
              textAnchor="middle"
              fill="#333"
              fontSize="16"
              fontWeight="bold"
            >
              AP Calculus AB
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

export default CourseHome;
