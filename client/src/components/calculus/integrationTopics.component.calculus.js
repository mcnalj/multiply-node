import React, {useEffect, useState} from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { config} from '../constants';

import { fetchStatusObjectDetails } from '../infrastructure/fetchStatus';
import { fetchStatusDetails } from '../infrastructure/fetchStatus';
var url = config.url.API_URL;

export default function IntegrationTopics() {

    // I think this is depracated and replaced by IntegrationTopicsDetails
    let backgroundColorObject = {
        indefiniteIntegralsSingleTerm: "info",
        indefiniteIntegralsBinomial: "info",
        indefiniteIntegralsPolynomial: "info", 
        indefiniteIntegralsTrigonometric: "info",
        indefiniteIntegralsNaturalExponential: "info",
        indefiniteIntegralsNaturalLog: "info",
        indefiniteIntegralsNaturalLogBinomial: "info",
        definiteIntegrals: "info",
    }            
    
    const [backgroundColors, setBackgroundColors] = useState(backgroundColorObject);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${url}/record/checkAuth`, {
            method: 'GET',
            credentials: 'include',
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.authenticated) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                navigate("/loginWithGoogle");
            }
        })
        .catch((error) => {
            console.error("Error checking authentication:", error);
            setIsAuthenticated(false);
            navigate("/loginWithGoogle");
        });
    }, [navigate]);
    
    useEffect(() => {
        if (isAuthenticated) {
            let returnObj = fetchSkillsArray(backgroundColorObject);
            setBackgroundColors(returnObj);
        }
    }, [isAuthenticated]);

    // async function fetchSkillsArray(backgroundColorObject) {
    //     const result = await fetch(`${url}/record/skillsCompleted`, {
    //         method: "POST",
    //         mode: 'cors',
    //         credentials: 'include',
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //     .catch(error => {
    //         console.error(error);
    //         return;
    //     });
    //     let resultData = await result.json()
    //     if (resultData) {
    //         resultData.completedSkillsArrayIntegration?.forEach((skill) => {
    //             if (backgroundColorObject[skill] == "info") {
    //                 backgroundColorObject[skill] = "primary";
    //             }
    //         })
    //         setBackgroundColors(backgroundColorObject)
    //     }
    //     return backgroundColorObject;
    // }


    async function fetchSkillsArray(backgroundColorObject) {
        const result = await fetch(`${url}/record/skillsCompletedDetails`, {
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
        if (resultData) {
            resultData.completedSkillsArrayIntegration?.forEach((skill) => {
                if (backgroundColorObject[skill] == "info") {
                    backgroundColorObject[skill] = "primary";
                }
            })
            setBackgroundColors(backgroundColorObject)
        }
        return backgroundColorObject;
    }
    if (!isAuthenticated) {
        return (
            <div>Something went wrong</div>
        );
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="m-2">
                    <h1>Integration Topics</h1>
                </div>
                <div style={{display: "block"}} className="m-2">
                    <NavLink to="/integration/3010" >
                        <Button variant={backgroundColors.indefiniteIntegralsSingleTerm} className="m-3">Single Term Integration</Button>
                    </NavLink>
                    <br />
                    <NavLink to="/integration/3020" >
                        <Button variant={backgroundColors.indefiniteIntegralsBinomial} className="m-3">Binomial Integration</Button>
                    </NavLink>
                    <br />
                    <NavLink to="/integration/3030" >
                        <Button variant={backgroundColors.indefiniteIntegralsPolynomial} className="m-3">Polynomial Integration</Button>
                    </NavLink>  
                    <br />
                    <NavLink to="/integration/3040" >
                        <Button variant={backgroundColors.indefiniteIntegralsTrigonometric} className="m-3">Trigonometric Integration</Button>
                    </NavLink>
                    <br />
                    <NavLink to="/integration/3050" >
                        <Button variant={backgroundColors.indefiniteIntegralsNaturalExponential} className="m-3">Natural Exponential Integration</Button>
                    </NavLink>
                    <br />
                    <NavLink to="/integration/3060" >
                        <Button variant={backgroundColors.indefiniteIntegralsNaturalLog} className="m-3">Natural Log Integration</Button>
                    </NavLink>
                    <br />
                    <NavLink to="/integration/3070" >
                        <Button variant={backgroundColors.indefiniteIntegralsNaturalLogBinomial} className="m-3">Binomial Natural Log Integration</Button>
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