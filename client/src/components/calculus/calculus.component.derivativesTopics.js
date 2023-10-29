import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { config} from '../constants';
var url = config.url.API_URL;

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
        fetchSkillsArray()
    }, []);

    async function fetchSkillsArray() {
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
            resultData.completedSkillsArray.forEach((skill) => {
                backgroundColorObject[skill] = "primary";
            })
            setBackgroundColors(backgroundColorObject)
        }
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
                </div>
            </div>
        </div>
    );
}