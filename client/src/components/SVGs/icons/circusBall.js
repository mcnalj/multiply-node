import React from 'react';

export default function CircusBall({ width = 200, height = 200 }) {
    return (
        <svg width={width} height={height} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                {/* Define pattern for curved vertical stripes */}
                <pattern id="stripes" patternUnits="userSpaceOnUse" width="40" height="100">
                    <path d="M 0 0 Q 10 50 0 100" stroke="#FF0000" strokeWidth="20" fill="none"/>
                    <path d="M 20 0 Q 30 50 20 100" stroke="#FFFFFF" strokeWidth="20" fill="none"/>
                    <path d="M 40 0 Q 30 50 40 100" stroke="#FF0000" strokeWidth="20" fill="none"/>
                </pattern>
                
                {/* Define gradient for 3D effect */}
                <radialGradient id="ballGradient" cx="0.3" cy="0.3" r="0.7">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.8)"/>
                    <stop offset="100%" stopColor="rgba(0,0,0,0.2)"/>
                </radialGradient>
            </defs>
            
            {/* Main ball circle with stripes */}
            <circle cx="100" cy="100" r="80" fill="url(#stripes)"/>
            
            {/* Highlight for 3D effect */}
            <circle cx="100" cy="100" r="80" fill="url(#ballGradient)"/>
            
            {/* Shine highlight */}
            <ellipse cx="75" cy="75" rx="15" ry="20" fill="rgba(255,255,255,0.6)" transform="rotate(-20 75 75)"/>
        </svg>
    );
}
