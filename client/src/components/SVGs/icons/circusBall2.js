import React from 'react';

export default function CircusBall2({ width = 200, height = 200 }) {
    return (
        <svg width={width} height={height} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                {/* Define gradient for 3D effect */}
                <radialGradient id="ballGradient" cx="0.3" cy="0.3" r="0.7">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.8)"/>
                    <stop offset="100%" stopColor="rgba(0,0,0,0.2)"/>
                </radialGradient>
            </defs>
            
            {/* Simple red circle */}
            <circle cx="100" cy="100" r="80" fill="#FF0000"/>
            
            {/* Curved white stripe across the ball */}
            <path d="M 35 135 Q 100 80 165 65" stroke="white" strokeWidth="48" fill="none" strokeLinecap="round"/>
            
            {/* Red five-pointed star in the center */}
            <polygon 
                points="100,72 104.8,88 121.6,88 108.8,97.6 113.6,113.6 100,104 86.4,113.6 91.2,97.6 78.4,88 95.2,88" 
                fill="#FF0000"
                transform="rotate(-25 100 100)"
            />
            
            {/* Second red five-pointed star on the white stripe */}
            {/* <polygon 
                points="75,100 79.8,116 96.6,116 83.8,125.6 88.6,141.6 75,132 61.4,141.6 66.2,125.6 53.4,116 70.2,116" 
                fill="#FF0000"
                transform="rotate(-25 5 118)"
            /> */}
            
            {/* Background color doughnut shape to cover protruding stripe ends */}
            <circle cx="100" cy="100" r="88" fill="transparent" stroke="#A5FEAD" strokeWidth="25"/>
            
            {/* Highlight for 3D effect */}
            <circle cx="100" cy="100" r="80" fill="url(#ballGradient)"/>
        </svg>
    );
}
