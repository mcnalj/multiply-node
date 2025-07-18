import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import topicsPathwayArray from '../infrastructure/topicsPathwayArray';
import { Container, Row, Col } from 'react-bootstrap';
import { UNIT_COLORS_ARRAY } from './shared/pathwayColors';

const SectionHome = () => {
  // Filter for calculusSkills section
  const calculusSkillsData = topicsPathwayArray.filter(item => item.section === 'calculusSkills');
   
  // Navigation hook
  const navigate = useNavigate();
  const location = useLocation();
  
  // State to manage click animation
//   const [isClicked, setIsClicked] = useState(false);
const [isShrunk, setIsShrunk] = useState(false);
const [animateKey, setAnimateKey] = useState(0); // Key to reset animation
const [isHovered, setIsHovered] = useState(false);
const [showFloatingText, setShowFloatingText] = useState(false);

const units = ["Summer Prep", "Limits", "Derivatives", "Integrals"];
const unitKeys = ["summerPrep", "limits", "derivatives", "integrals"]; // URL-friendly versions
const topics = ["Multiplication", "Exponents", "Functions", "Factoring Quadratics", "Unit Circle"];

  // Check if we should start in shrunk state (coming from topics page)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('shrunk') === 'true') {
      setIsShrunk(true);
    }
  }, [location]);

  // Show floating text after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFloatingText(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Handle circle click
  const handleCircleClick = () => {
    setIsShrunk(prev => !prev);
    setAnimateKey(prev => prev + 1); // Change key to reset animation
  };

  // Handle unit circle click
  const handleUnitClick = (unitIndex) => {
    const unitKey = unitKeys[unitIndex];
    navigate(`/topicsHome/${unitKey}`);
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: 'clamp(10px, 3vw, 20px)',
      boxSizing: 'border-box'
    }}>
      {/* Title */}
      {!isShrunk && (
        <h3 style={{ 
          color: '#333',
          fontFamily: 'inherit',
          fontWeight: 'normal',
          marginBottom: '20px',
          fontSize: 'clamp(24px, 5vw, 48px)'
        }}>
          Calculus Skills
        </h3>
      )}

      {/* Clickable circus tent image - full size */}
      {!isShrunk && (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/3/3f/599-circus-tent.svg"
            alt="circus tent"
            style={{ 
              width: 'clamp(250px, 40vw, 350px)',
              height: 'clamp(250px, 40vw, 350px)',
              cursor: 'pointer',
              userSelect: 'none',
              animation: 'tentPulse 3s ease-in-out infinite',
              transform: isHovered ? 'scale(1.05) rotate(2deg)' : 'scale(1)',
              transition: 'transform 0.3s ease',
              filter: isHovered ? 'brightness(1.1) drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))' : 'none'
            }}
            onClick={handleCircleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
          
          {/* Floating "Start the show!" text - below tent with 3s delay */}
          {showFloatingText && (
            <div style={{
              position: 'absolute',
              bottom: 'clamp(-70px, -8vw, -60px)',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(255, 215, 0, 0.9)',
              color: '#333',
              padding: 'clamp(6px 12px, 1.5vw 3vw, 8px 16px)',
              borderRadius: '20px',
              fontSize: 'clamp(12px, 2.5vw, 16px)',
              fontWeight: 'bold',
              animation: 'floatText 2s ease-in-out infinite',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              border: '2px solid #FFD700',
              whiteSpace: 'nowrap'
            }}>
              Start the show!
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes tentPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        @keyframes floatText {
          0%, 100% { 
            transform: translateX(-50%) translateY(0px);
            opacity: 0.8;
          }
          50% { 
            transform: translateX(-50%) translateY(-10px);
            opacity: 1;
          }
        }
      `}</style>

      {/* SVG for the four unit circles when shrunk */}
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 700 700" 
        style={{ 
          maxWidth: 'min(90vw, 90vh, 700px)', 
          maxHeight: 'min(90vw, 90vh, 700px)',
          minWidth: '300px',
          minHeight: '300px'
        }}
      >
        
        {/* Clickable circus tent image - shrunk size in center */}
        {isShrunk && (
          <foreignObject x="290" y="290" width="120" height="120">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/3/3f/599-circus-tent.svg"
              alt="circus tent"
              width="120"
              height="120"
              style={{ 
                cursor: 'pointer',
                userSelect: 'none',
                filter: isHovered ? 'brightness(1.1) drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))' : 'none',
                transition: 'filter 0.3s ease'
              }}
              onClick={handleCircleClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </foreignObject>
        )}

        {/* COMMENTED OUT: Original blue circle with star and gold ring */}
        {/* 
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

        <circle
          cx="350"
          cy="350"
          r={isShrunk ? 70 : 180} 
          fill="#007bff"
          strokeWidth="2"
          style={{ cursor: 'pointer' }}
          onClick={handleCircleClick}
        >
            {animateKey > 0 && (
              <animate
                attributeName="r"
                values={isShrunk ? "180;70" : "70;180"}
                dur="1s"
                fill="freeze"
                key={animateKey}
              />
            )}
        </circle>

        <g transform="translate(350, 350)">
          <g>
              {animateKey > 0 && (
                <animateTransform
                  key={animateKey}
                  attributeName="transform"
                  type="scale"
                  values={isShrunk ? "1;0.5" : "0.5;1"}
                  dur="1s"
                  fill="freeze"
                />
              )}
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
        */}

        {/* Four additional circles when shrunk */}
        {isShrunk && (
          <>
            {/* Northeast Circle - Limits (Purple) */}
            <g transform="translate(550, 150)">
              <circle r="72.5" fill="none" stroke="gold" strokeWidth="5" />
              <circle 
                r="70" 
                fill={UNIT_COLORS_ARRAY[1]}
                strokeWidth="2" 
                style={{ cursor: 'pointer' }}
                onClick={() => handleUnitClick(1)}
              />
              <polygon
                points="0,-50 8,-20 38,-20 15,0 23,30 0,10 -23,30 -15,0 -38,-20 -8,-20"
                fill="white"
                stroke="white"
                strokeWidth="1"
                style={{ cursor: 'pointer' }}
                onClick={() => handleUnitClick(1)}
              />
            </g>
            <text
              x="550"
              y="60"
              textAnchor="middle"
              fill="#333"
              fontSize="clamp(12, 2.2vw, 16)"
              fontWeight="bold"
            >
              {units[1]}
            </text>

            {/* Northwest Circle - Summer Prep (Green) */}
            <g transform="translate(150, 150)">
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
                fill={UNIT_COLORS_ARRAY[0]}
                strokeWidth="2" 
                style={{ cursor: 'pointer' }}
                onClick={() => handleUnitClick(0)}
              />
              <polygon
                points="0,-50 8,-20 38,-20 15,0 23,30 0,10 -23,30 -15,0 -38,-20 -8,-20"
                fill="white"
                stroke="white"
                strokeWidth="1"
                style={{ cursor: 'pointer' }}
                onClick={() => handleUnitClick(0)}
              />
            </g>
            <text
              x="150"
              y="60"
              textAnchor="middle"
              fill="#333"
              fontSize="clamp(12, 2.2vw, 16)"
              fontWeight="bold"
            >
              {units[0]}
            </text>

            {/* Southwest Circle - Integrals (Dark Orange) */}
            <g transform="translate(150, 550)">
              <circle r="72.5" fill="none" stroke="gold" strokeWidth="5" />
              <circle 
                r="70" 
                fill={UNIT_COLORS_ARRAY[3]}
                strokeWidth="2" 
                style={{ cursor: 'pointer' }}
                onClick={() => handleUnitClick(3)}
              />
              <polygon
                points="0,-50 8,-20 38,-20 15,0 23,30 0,10 -23,30 -15,0 -38,-20 -8,-20"
                fill="white"
                stroke="white"
                strokeWidth="1"
                style={{ cursor: 'pointer' }}
                onClick={() => handleUnitClick(3)}
              />
            </g>
            <text
              x="150"
              y="460"
              textAnchor="middle"
              fill="#333"
              fontSize="clamp(12, 2.2vw, 16)"
              fontWeight="bold"
            >
              {units[3]}
            </text>

            {/* Southeast Circle - Derivatives (Darker Blue) */}
            <g transform="translate(550, 550)">
              <circle r="72.5" fill="none" stroke="gold" strokeWidth="5" />
              <circle 
                r="70" 
                fill={UNIT_COLORS_ARRAY[2]}
                strokeWidth="2" 
                style={{ cursor: 'pointer' }}
                onClick={() => handleUnitClick(2)}
              />
              <polygon
                points="0,-50 8,-20 38,-20 15,0 23,30 0,10 -23,30 -15,0 -38,-20 -8,-20"
                fill="white"
                stroke="white"
                strokeWidth="1"
                style={{ cursor: 'pointer' }}
                onClick={() => handleUnitClick(2)}
              />
            </g>
            <text
              x="550"
              y="460"
              textAnchor="middle"
              fill="#333"
              fontSize="clamp(12, 2.2vw, 16)"
              fontWeight="bold"
            >
              {units[2]}
            </text>
          </>
        )}
      </svg>




    </div>
  );
};

export default SectionHome;