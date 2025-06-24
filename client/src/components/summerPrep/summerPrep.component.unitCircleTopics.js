import React, {useEffect, useState} from "react";
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { config} from '../constants';
var url = config.url.API_URL;

export default function UnitCircleTopics({ userId }) {
    let backgroundColorObject = {
        basicEvaluation: "info",
        halfCircleEvaluation: "info",
        fullCircleEvaluation: "info",
    }

    const [backgroundColors, setBackgroundColors] = useState(backgroundColorObject);

    useEffect(() => {
        let returnObj = fetchSkillsArray(backgroundColorObject);
        setBackgroundColors(returnObj);
    }, []);

    async function fetchSkillsArray(backgroundColorObject) {
        const result = await fetch(`${url}/record/skillsCompleted`, {
            method: "POST",
            mode: 'cors',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .catch(error => {
            console.error(error);
            return;
        });
        let resultData = await result.json()
        if (resultData.completedSkillsArrayTrigonometric) {
            resultData.completedSkillsArrayTrigonometric.forEach((skill) => {
                if (backgroundColorObject[skill] == "info") {
                    backgroundColorObject[skill] = "primary";
                }
            })
            setBackgroundColors(backgroundColorObject)
        }
        return backgroundColorObject;
    }

    return (
        <div className="row">
        <div className="col-12">
            <div className="m-2">
                <h1>The Unit Circke</h1>
            </div>
            <div style={{display: "block"}} className="m-2">
                <NavLink to="/trigonometricFunctions/1000" >
                    <Button variant={backgroundColors.basicEvaluation} className="m-3">Essential Unit Circle</Button>
                </NavLink>
        
                <NavLink to="/trigonometricFunctions/1010" >
                    <Button variant={backgroundColors.halfCircleEvaluation} className="m-2">Half the Unit Circle</Button>
                </NavLink>
            
                <NavLink to="/trigonometricFunctions/1020" >
                    <Button variant={backgroundColors.fullCircleEvaluation} className="m-2">The Full Unit Circle</Button>
                </NavLink>
            </div>
            <div className="row fs-6">
                <p>Practice with the triangle helper.</p>
                <p>Get 12 correct without the triangle helper to meet.</p>
                <p>Type \sqrt and then a number to get the radical symbol</p>
                <p>Make sure you move out of the radical and enter / to go to the denominator.</p>
            </div>
            <div>
                <NavLink to="/summerPrepTopics" >
                    <Button variant="primary" className="m-2">Back to Summer Prep</Button>
                </NavLink>
            </div>                     
        </div>
        </div>
    );
}