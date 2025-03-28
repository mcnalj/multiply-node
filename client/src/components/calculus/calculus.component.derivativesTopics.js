import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { config} from '../constants';
var url = config.url.API_URL;

// This is deprecated. It has been replaced by powerRuleSubtopics and powerRuleSkills.
// I can delete it after the badge system on pwerRuleSubtopics is working.

export default function DerivativesTopics() {
    let backgroundColorObject = {
        simplePowerRule: "info",
        simplePowerRuleWithIntegerCoefficient: "info",
        simplePowerRuleWithFractionalCoefficient: "info",
        simplePowerRuleWithNegativeExponent: "info",
        simplePowerRuleWithNegativeExponentAndIntegerCoefficient: "info",
        simplePowerRuleWithNegativeExponentAndFractionalCoefficient: "info",
        simplePowerRuleWithFractionalExponent: "info",
        simplePowerRuleWithFractionalExponentAndIntegerCoefficient: "info",
        simplePowerRuleWithFractionalExponentAndFractionalCoefficient: "info",
        simplePowerRuleWithNegativeFractionalExponent: "info",
        simplePowerRuleWithNegativeFractionalExponentAndIntegerCoefficient: "info",
        simplePowerRuleWithNegativeFractionalExponentAndFractionalCoefficient: "info",
        powerRuleMix: "info",
    }            
    const [backgroundColors, setBackgroundColors] = useState(backgroundColorObject);
    useEffect(() => {
        // Why doesn't this work if a I delete setBackgroundColors
       // seems like this is a promise and its working once it's resolved?
       
        let returnObj = fetchSkillsArray(backgroundColorObject);
        console.log(returnObj);
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
        console.log(resultData)
        if (resultData) {
            resultData.completedSkillsArrayDerivatives.forEach((skill) => {
                if (backgroundColorObject[skill] == "info") {
                    backgroundColorObject[skill] = "primary";
                }
            })
            // Why isn't this enough to set the colors and why do I need it if I'm doing it after the return.
            setBackgroundColors(backgroundColorObject)
        }
        return backgroundColorObject;
        // this works if I just return nothing. I think?
    }
    return (
        <div className="row">
            <div className="col-12">
                <div className="m-2">
                    <h1>Derivatives</h1>
                    <h3>Power Rule Practice</h3>
                </div>
                <div style={{display: "block"}} className="m-2">
                    <NavLink to="/derivatives/210" >
                        <Button variant={backgroundColors.simplePowerRule} className="m-3">Plain Power Rule</Button>
                    </NavLink>
            
                    <NavLink to="/derivatives/220" >
                        <Button variant={backgroundColors.simplePowerRuleWithIntegerCoefficient} className="m-2">Power Rule with Integer Coefficients</Button>
                    </NavLink>
                
                    <NavLink to="/derivatives/230" >
                        <Button variant={backgroundColors.simplePowerRuleWithFractionalCoefficient} className="m-2">Power Rule with Fractional Coefficients</Button>
                    </NavLink>
                                
                    <NavLink to="/derivatives/240" >
                        <Button variant={backgroundColors.simplePowerRuleWithNegativeExponent} className="m-2">Power Rule with Negative Exponents</Button>
                    </NavLink>
                
                    <NavLink to="/derivatives/250" >
                        <Button variant={backgroundColors.simplePowerRuleWithNegativeExponentAndIntegerCoefficient} className="m-2">Power Rule with Negative Exponents and Integer Coefficients</Button>
                    </NavLink>
                
                    <NavLink to="/derivatives/260" >
                        <Button variant={backgroundColors.simplePowerRuleWithNegativeExponentAndFractionalCoefficient} className="m-2">Power Rule with Negative Exponents and Fractional Coefficients</Button>
                    </NavLink>
                                
                    <NavLink to="/derivatives/270" >
                        <Button variant={backgroundColors.simplePowerRuleWithFractionalExponent} className="m-2">Power Rule with Fractional Exponents</Button>
                    </NavLink>
                
                    <NavLink to="/derivatives/280" >
                        <Button variant={backgroundColors.simplePowerRuleWithFractionalExponentAndIntegerCoefficient} className="m-2">Power Rule with Fractional Exponents and Integer Coefficients</Button>
                    </NavLink>
                
                    <NavLink to="/derivatives/290" >
                        <Button variant={backgroundColors.simplePowerRuleWithFractionalExponentAndFractionalCoefficient} className="m-2">Power Rule with Fractional Exponents and Fractional Coefficients</Button>
                    </NavLink>
                                                
                    <NavLink to="/derivatives/300" >
                        <Button variant={backgroundColors.simplePowerRuleWithNegativeFractionalExponent} className="m-2">Power Rule with Negative Fractional Exponents</Button>
                    </NavLink>
                
                    <NavLink to="/derivatives/310" >
                        <Button variant={backgroundColors.simplePowerRuleWithNegativeFractionalExponentAndIntegerCoefficient} className="m-2">Power Rule with Negative Fractional Exponents and Integer Coefficients</Button>
                    </NavLink>
                
                    <NavLink to="/derivatives/320" >
                        <Button variant={backgroundColors.simplePowerRuleWithNegativeFractionalExponentAndFractionalCoefficient} className="m-2">Power Rule with Negative Fractional Exponents and Fractional Coefficients</Button>
                    </NavLink>
                                                
                    <NavLink to="/derivatives/330" >
                        <Button variant={backgroundColors.powerRuleMix} className="m-2">Power Rule Mix</Button>
                    </NavLink>
                    <br />
                    <NavLink to="/powerRuleIntegerExponentsTopics" >
                        <Button variant="primary" className="m-2">Power Rule with Integer Exponents</Button>
                    </NavLink>
                    <br />
                    <NavLink to="/powerRuleSubtopics" >
                        <Button variant="primary" className="m-2">Power Rule Subtopics</Button>
                    </NavLink>
                    <br />
                    <NavLink to="/calculus" >
                        <Button variant="success" className="m-2">Back to Calculus</Button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}