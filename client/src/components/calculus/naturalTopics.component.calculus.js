import React, {useEffect, useState} from "react";
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { config} from '../constants';
var url = config.url.API_URL;

export default function NaturalTopics() {
    let backgroundColorObject = {
        naturalExponential: "info",
        complexNaturalExponential: "info", 
        simpleNaturalLog: "info",
        //complexNaturalLog : "info",
        comlexNaturalLog: "info",
        mixNaturalExponentialAndLog: "info",
        exponentialFunctionsBaseA: "info",
        logFunctionsBaseA: "info",
    }            
    
    const [backgroundColors, setBackgroundColors] = useState(backgroundColorObject);

    useEffect(() => {
        const fetchData = async (backgroundColorObject) => {
            try {
                const result = await fetch(`${url}/record/skillsCompleted`, {
                    method: "POST",
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const resultData = await result.json()
                const updatedBackgroundColors = { ...backgroundColorObject }
                if (resultData) {   
                    for (var i = 0; i < resultData.completedSkillsArrayNatural.length; i++) {
                        if (backgroundColorObject[resultData.completedSkillsArrayNatural[i]] == "info") {
                            backgroundColorObject[resultData.completedSkillsArrayNatural[i]] = "primary";
                        }
                    }
                }
                setBackgroundColors(updatedBackgroundColors);
            } catch(error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData(backgroundColorObject);
    }, []);
    
    return (
        <div className="row">
            <div className="col-12">
                <div className="m-2">
                    <h1>Natural Exponential and Natural Log</h1>
                    <h3>Derivatives</h3>
                </div>
                <div style={{display: "block"}} className="m-2">
                    <NavLink to="/naturalDerivatives/500" >
                        <Button variant={backgroundColors.naturalExponential} className="m-3">Natural Exponential</Button>
                    </NavLink>
                    <br />
                    <NavLink to="/naturalDerivatives/520" >
                        <Button variant={backgroundColors.simpleNaturalLog} className="m-3">Natural Log</Button>
                    </NavLink>
                    <br />
                    <NavLink to="/naturalDerivatives/530" >
                        <Button variant={backgroundColors.comlexNaturalLog} className="m-3">Natural Log (Complex)</Button>
                    </NavLink>  
                    <br />
                    <NavLink to="/naturalDerivatives/550" >
                        <Button variant={backgroundColors.exponentialFunctionsBaseA} className="m-3">General Exponential Functions</Button>
                    </NavLink>
                    <br />
                    <NavLink to="/naturalDerivatives/560" >
                        <Button variant={backgroundColors.logFunctionsBaseA} className="m-3">General Log Functions</Button>
                    </NavLink>
                    <br />
                    <NavLink to="/calculus" >
                        <Button variant="primary" className="m-2">Back to Caculus</Button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}