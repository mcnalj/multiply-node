import React, { useEffect } from 'react';
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { Button } from 'react-bootstrap';

import { config } from '../constants';

const url = config.url.API_URL;


// When we navigate back by clicking More of the Same,
// we get "There was an error calculating statistics." Why?
export default function SkillComplete({userId}) {

    const navigate = useNavigate();
    const location = useLocation();

    // Function to update user's streak in the database
    const updateStreak = async (userId) => {
        try {
            const response = await fetch(`${url}/users/updateStreak`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId }),
            });

            if (!response.ok) {
                throw new Error('Failed to update streak');
            }

            const result = await response.json();
            console.log('Streak updated successfully:', result);
            return result.progressStreak;
        } catch (error) {
            console.error('Error updating streak:', error);
            return null;
        }
    };

    // Function to update circus peanuts
    const updateCircusPeanuts = async (userId, peanutsToAdd) => {
        try {
            const response = await fetch(`${url}/users/updateCircusPeanuts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    userId: userId, 
                    circusPeanuts: peanutsToAdd 
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update circus peanuts');
            }

            const result = await response.json();
            console.log('Circus peanuts updated successfully:', result);
            return result;
        } catch (error) {
            console.error('Error updating circus peanuts:', error);
            return null;
        }
    };

    // Function to handle button click
    const handleClaimPeanuts = async () => {
        try {
            // Update circus peanuts
            await updateCircusPeanuts(userId, circusPeanuts);
            
            // Get current progress streak to determine navigation
            const streakResult = await updateStreak(userId);
            
            // Navigate based on streak increment
            if (streakResult && streakResult.currentStreak > 1) {
                // Progress streak has been incremented
                navigate('/progressStreak');
            } else {
                // Progress streak has not been incremented or is first streak
                navigate('/summerPrepTopics');
            }
        } catch (error) {
            console.error('Error in handleClaimPeanuts:', error);
            // Fallback navigation
            navigate('/summerPrepTopics');
        }
    };

    // Call updateStreak when component mounts (when user completes a skill)
    useEffect(() => {
        if (userId) {
            updateStreak(userId);
        }
    }, [userId]);

    let displayTime = "0:00";
    let displayPercent = "0%";
    let displayStreak = "0";
    let circusPeanuts = 0;
    try {
        const percentCorrect = Math.round((parseInt(location.state.questionsCorrect) / parseInt(location.state.questionsAttempted)) * 100).toString();
        displayPercent = percentCorrect + "%";

        const totalTime = parseInt(location.state.totalTime);
        const second = 1000;
        const minute = 60 * second;
        let seconds = 0;
        let minutes = 0;
        let secondsBlock = "00";
        let minutesBlock = "0";
        if (totalTime < (59 * minute * second)) {
            if (totalTime >= minute) {
                minutes = Math.floor(totalTime / minute);
                seconds = Math.floor((totalTime % minute)/1000);
                minutesBlock = minutes.toString();
            } else {
                seconds = Math.floor(totalTime / 1000);
            }
            seconds < 10 ? secondsBlock = "0" + seconds.toString() : secondsBlock = seconds.toString()
            displayTime = minutesBlock + ":" + secondsBlock;
        }
        displayStreak = location.state.questionsStreak.toString();
        const timeBonusRate = (totalTime < 60 * 1000) ? 0.5 : (totalTime < 90 * 1000) ? 0.3 : (totalTime < 120 * 1000) ? 0.2 : (totalTime < 180 * 1000) ? 0.1 : 0;
        const timeBonus = Math.round((parseInt(percentCorrect/4)) + (parseInt(location.state.questionsStreak) * timeBonusRate));
        circusPeanuts = Math.round((parseInt(percentCorrect/4)) + parseInt(location.state.questionsStreak) + timeBonus);
    } catch (error) {
        console.error("There was an error calculating statistics.")
    }


    const styleStatBox = {
        backgroundColor: "#E7E7E7",
        fontSize: "clamp(1.3rem, 3vw, 2.5rem)",
        fontFamily: "Nunito",
        padding: "1%",
        borderRadius: "10%", 
        color: "purple",  
    }

    const styleLabel = {
        paddingTop: "4%",
        paddingBottom: "0%",
        marginBottom: "-10%",
    }

    const styleStatistic = {
        backgroundColor: "purple",
        color: "#E7E7E7",
        margin: "5%",
        borderRadius: "10%",
        paddingTop: "7%",
    }

    return (
        <div>
            <div className="row">
                <div style={{fontSize: "2rem", marginTop: "2%",}}>
                    <p>Success!</p>
                </div>
            </div>
            <div className="row" style={{padding: "2%"}}>
                <div className="col-4">
                    <div className="statBox" style={styleStatBox}>
                        <div className="row" style={styleLabel}>
                            <p>SCORE</p>
                        </div>
                        <div className="row statistic" style={styleStatistic}>
                            <p>{displayPercent}</p>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="statBox" style={styleStatBox}>
                        <div className="row" style={styleLabel}>
                            <p>STREAK</p>
                        </div>
                        <div className="row statistic" style={styleStatistic}>
                            <p>{displayStreak}</p>
                        </div>
                    </div>
                </div>
                <div className="col-4 ">
                    <div className="statBox" style={styleStatBox}>
                        <div className="row" style={styleLabel}>
                            <p>SPEED</p>
                        </div>
                        <div className="row statistic" style={styleStatistic}>
                            <p>{displayTime}</p>
                        </div>
                    </div>                    
                </div>
            </div>
            <div className="row"style={{marginTop: "2%",}}>
                <NavLink>
                    <Button 
                        onClick={handleClaimPeanuts}            
                        variant="primary"
                        type="submit"
                        size="lg" 
                    >
                        Claim +{circusPeanuts} Circus Peanuts!
                    </Button>
                </NavLink>
            </div>
            <div className="row" id="elephentImage">
                <div style={{textAlign: 'center', marginTop: '20px'}}>
                    <a title="Vivekmesri, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Ele_pic.svg">
                        <img width="358" alt="Ele pic" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Ele_pic.svg/512px-Ele_pic.svg.png?20200727020720" />
                    </a>
                    <div style={{fontSize: '12px', color: '#666', marginTop: '10px'}}>
                        <a href="https://commons.wikimedia.org/wiki/File:Ele_pic.svg">Vivekmesri</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons
                    </div>
                </div>
            </div>
        </div>
    )

}