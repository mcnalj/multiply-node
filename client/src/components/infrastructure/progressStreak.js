import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { config } from '../constants';

const url = config.url.API_URL;

export default function ProgressStreak() {
    const navigate = useNavigate();
    const [currentStreak, setCurrentStreak] = useState(1);
    const [displayStreak, setDisplayStreak] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [showContinueButton, setShowContinueButton] = useState(false);
    const [showFlagComponents, setShowFlagComponents] = useState(false);

    useEffect(() => {
        // Fetch the current user's progress streak
        const fetchProgressStreak = async () => {
            try {
                const response = await fetch(`${url}/users/getCurrentUser`, {
                    method: 'GET',
                    credentials: 'include',
                });
                
                if (response.ok) {
                    const data = await response.json();
                    const streak = data.progressStreak?.currentStreak || 1;
                    setCurrentStreak(streak);
                    setDisplayStreak(streak - 1);
                    
                    // Start animation after a brief delay
                    setTimeout(() => {
                        animateStreak(streak - 1, streak);
                    }, 1000);
                }
            } catch (error) {
                console.error('Error fetching progress streak:', error);
                // Default animation if fetch fails
                setTimeout(() => {
                    animateStreak(0, 1);
                }, 1000);
            }
        };

        fetchProgressStreak();
    }, []);

    const animateStreak = (from, to) => {
        setIsAnimating(true);
        
        setTimeout(() => {
            setDisplayStreak(to);
            setIsAnimating(false);
            setAnimationComplete(true);
            
            // Show flag components after number animation completes
            setTimeout(() => {
                setShowFlagComponents(true);
            }, 100);
            
            // Show continue button after flag components appear
            setTimeout(() => {
                setShowContinueButton(true);
            }, 800);
        }, 600);
    };

    const CircusFlagSVG = () => (
        <svg width="300" height="300" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
            {/* Background circle */}
            <circle cx="100" cy="150" r="150" fill="#FFC107" />

            {/* Flag pole */}
            {showFlagComponents && (
                <rect x="40" y="55" width="10" height="170" fill="#C4C4C4" stroke="#3D3D3D" strokeWidth="2"/>
            )}
            
            {/* Flag stand base */}
            {showFlagComponents && (
                <ellipse cx="45" cy="230" rx="25" ry="8" fill="#C0C0C0" stroke="#3D3D3D" strokeWidth="2"/>
            )}
            
            {/* Flag top star */}
            {showFlagComponents && (
                <polygon 
                    points="45,28 49.25,41.75 62.5,41.75 52.625,50.25 56.875,64 45,55 33.125,64 37.375,50.25 27.5,41.75 40.75,41.75" 
                    fill="#C0C0C0" 
                    // stroke="#808080"
                    stroke="#3D3D3D" 
                    strokeWidth="2"
                />
            )}

            {/* Flag triangular pennant */}
            {showFlagComponents && (
                <polygon 
                    points="50,60 50,150 210,105" 
                    fill="#FF1744" 
                    stroke="#D50000" 
                    strokeWidth="0"
                />
            )}
            
            {/* Pennant vertical white stripes */}
            {showFlagComponents && (
                <>
                    <polygon points="90,71 90,139 210,105" fill="rgb(255,255,255)" />
                    <polygon points="110,76 110,133 210,105" fill="#FF1744" />
                    <polygon points="150,87 150,122 210,105" fill="rgb(255,255,255)" />
                    <polygon points="170,93 170,117 210,105" fill="#FF1744" />
                </>
            )}
            
            {/* Alternate pennant colors and decorative elements remain commented */}
        </svg>
    );

    const containerStyle = {
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: 'Nunito, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const streakNumberStyle = {
        fontSize: '4rem',
        fontWeight: 'bold',
        color: '#6f42c1',
        position: 'relative',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    };

    const oldNumberStyle = {
        color: '#6f42c1',
        position: 'absolute',
        transition: 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out',
        transform: (isAnimating || animationComplete) ? 'translateY(-100px)' : 'translateY(0)',
        opacity: (isAnimating || animationComplete) ? 0 : 1,
    };

    const newNumberStyle = {
        color: '#6f42c1',
        position: 'absolute',
        transition: 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out',
        transform: (isAnimating || animationComplete) ? 'translateY(0)' : 'translateY(100px)',
        opacity: (isAnimating || animationComplete) ? 1 : 0,
    };

    const titleStyle = {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#495057',
        textAlign: 'center'
    };

    const subtitleStyle = {
        fontSize: '1.2rem',
        color: '#6c757d',
        textAlign: 'center'
    };

    const buttonContainerStyle = {
        opacity: showContinueButton ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out'
    };

    return (
        <Container fluid style={containerStyle}>
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    {/* <Row className="mb-4">
                        <Col>
                            <div style={titleStyle}>
                                🎪 Streak Updated! 🎪
                            </div>
                        </Col>
                    </Row> */}
                    
                    <Row className="mb-4">
                        <Col className="text-center">
                            <CircusFlagSVG />
                        </Col>
                    </Row>
                    
                    <Row className="mb-3">
                        <Col>
                            <div style={streakNumberStyle}>
                                <span style={oldNumberStyle}>
                                    {currentStreak - 1}
                                </span>
                                <span style={newNumberStyle}>
                                    {currentStreak}
                                </span>
                            </div>
                        </Col>
                    </Row>
                    
                    {/* <Row className="mb-4">
                        <Col>
                            <div style={subtitleStyle}>
                                Day{currentStreak !== 1 ? 's' : ''} in a row!
                            </div>
                        </Col>
                    </Row> */}
                    
                    <Row>
                        <Col className="text-center">
                            <div style={buttonContainerStyle}>
                                {showContinueButton && (
                                    <Button 
                                        variant="primary" 
                                        size="lg"
                                        onClick={() => navigate('/summerPrepTopics')}
                                    >
                                        Continue Learning
                                    </Button>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
