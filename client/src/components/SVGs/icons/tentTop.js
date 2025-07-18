import React from 'react';

export default function TentTop({ width = 800, height = 600 }) {
    return (
        <svg width={width} height={height} viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            <defs>
                {/* Gradient for flag */}
                <linearGradient id="flagGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF4444"/>
                    <stop offset="50%" stopColor="#FF0000"/>
                    <stop offset="100%" stopColor="#CC0000"/>
                </linearGradient>
                
                {/* Gradient for tent panels */}
                <linearGradient id="redPanelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF4444"/>
                    <stop offset="100%" stopColor="#CC0000"/>
                </linearGradient>
                
                <linearGradient id="whitePanelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF"/>
                    <stop offset="100%" stopColor="#F0F0F0"/>
                </linearGradient>
            </defs>
            
            {/* Flag pole */}
            <rect x="395" y="50" width="10" height="200" fill="#FFD700"/>
            
            {/* Flag */}
            <path d="M 405 60 L 580 60 Q 570 80 580 100 L 405 100 Z" fill="url(#flagGradient)"/>
            
            {/* Flag pole top circle */}
            <circle cx="400" cy="50" r="15" fill="#FFD700"/>
            
            {/* Tent center point */}
            <circle cx="400" cy="250" r="8" fill="#CC0000"/>
            
            {/* Tent panels - 8 alternating red and white panels */}
            
            {/* Panel 1 - Red (leftmost) */}
            <path d="M 50 550 L 400 250 L 150 550 Z" fill="url(#redPanelGradient)" stroke="#CC0000" strokeWidth="2"/>
            
            {/* Panel 2 - White */}
            <path d="M 150 550 L 400 250 L 250 550 Z" fill="url(#whitePanelGradient)" stroke="#DDD" strokeWidth="2"/>
            
            {/* Panel 3 - Red */}
            <path d="M 250 550 L 400 250 L 350 550 Z" fill="url(#redPanelGradient)" stroke="#CC0000" strokeWidth="2"/>
            
            {/* Panel 4 - White */}
            <path d="M 350 550 L 400 250 L 450 550 Z" fill="url(#whitePanelGradient)" stroke="#DDD" strokeWidth="2"/>
            
            {/* Panel 5 - Red */}
            <path d="M 450 550 L 400 250 L 550 550 Z" fill="url(#redPanelGradient)" stroke="#CC0000" strokeWidth="2"/>
            
            {/* Panel 6 - White */}
            <path d="M 550 550 L 400 250 L 650 550 Z" fill="url(#whitePanelGradient)" stroke="#DDD" strokeWidth="2"/>
            
            {/* Panel 7 - Red */}
            <path d="M 650 550 L 400 250 L 750 550 Z" fill="url(#redPanelGradient)" stroke="#CC0000" strokeWidth="2"/>
            
            {/* Tent bottom scalloped edge */}
            <path d="M 50 550 
                     Q 75 530 100 550 
                     Q 125 530 150 550 
                     Q 175 530 200 550 
                     Q 225 530 250 550 
                     Q 275 530 300 550 
                     Q 325 530 350 550 
                     Q 375 530 400 550 
                     Q 425 530 450 550 
                     Q 475 530 500 550 
                     Q 525 530 550 550 
                     Q 575 530 600 550 
                     Q 625 530 650 550 
                     Q 675 530 700 550 
                     Q 725 530 750 550 
                     L 750 580 
                     L 50 580 Z" 
                  fill="url(#redPanelGradient)" stroke="#CC0000" strokeWidth="2"/>
            
            {/* Add some shading lines to the red panels for depth */}
            <path d="M 100 550 L 400 280" stroke="#AA0000" strokeWidth="1" opacity="0.5"/>
            <path d="M 300 550 L 400 280" stroke="#AA0000" strokeWidth="1" opacity="0.5"/>
            <path d="M 500 550 L 400 280" stroke="#AA0000" strokeWidth="1" opacity="0.5"/>
            <path d="M 700 550 L 400 280" stroke="#AA0000" strokeWidth="1" opacity="0.5"/>
            
            {/* Add highlight lines to white panels */}
            <path d="M 200 550 L 400 280" stroke="#E0E0E0" strokeWidth="1" opacity="0.7"/>
            <path d="M 400 550 L 400 280" stroke="#E0E0E0" strokeWidth="1" opacity="0.7"/>
            <path d="M 600 550 L 400 280" stroke="#E0E0E0" strokeWidth="1" opacity="0.7"/>
        </svg>
    );
}
