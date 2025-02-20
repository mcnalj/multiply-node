import React from 'react';
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { Button } from 'react-bootstrap';

// When we navigate back by clicking More of the Same,
// we get "There was an error calculating statistics." Why?
export default function SkillComplete({userId}) {

    const navigate = useNavigate();
    const location = useLocation();

    let displayTime = "0:00";
    let displayPercent = "0%";
    let displayStreak = "0";
    try {
        console.dir(location.state);
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
    } catch (error) {
        console.error("There was an error calculating statistics.")
    }


    const styleStatBox = {
        backgroundColor: "#E7E7E7",
        fontSize: "1.5rem",
        fontFamily: "Nunito",
        padding: "5%",
        borderRadius: "10%", 
        color: "purple",  
    }

    const styleStatistic = {
        backgroundColor: "purple",
        color: "#E7E7E7",
        margin: "5%",
        borderRadius: "10%",
        paddingTop: "5%",
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
                        <div className="row statLabel">
                            <p>SCORE</p>
                        </div>
                        <div className="row statistic" style={styleStatistic}>
                            <p>{displayPercent}</p>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="statBox" style={styleStatBox}>
                        <div className="row statLabel">
                            <p>STREAK</p>
                        </div>
                        <div className="row statistic" style={styleStatistic}>
                            <p>{displayStreak}</p>
                        </div>
                    </div>
                </div>
                <div className="col-4 ">
                    <div className="statBox" style={styleStatBox}>
                        <div className="row statLabel">
                            <p>SPEED</p>
                        </div>
                        <div className="row statistic" style={styleStatistic}>
                            <p>{displayTime}</p>
                        </div>
                    </div>                    
                </div>
            </div>
            <div style={{marginTop: "2%",}}>
                <NavLink>
                    <Button 
                        onClick={() => navigate(-1)}            
                        variant="primary"
                        type="submit"
                        size="lg" 
                    >
                        BACK TO MORE OF THE SAME
                    </Button>
                </NavLink>
                <br></br>
                <br></br>
                <NavLink to="/integrationTopics">
                    <Button 
                        variant="primary"
                        type="submit"
                        size="lg" 
                    >
                        OTHER TOPICS
                    </Button>
                </NavLink>
            </div>
        </div>
    )

}