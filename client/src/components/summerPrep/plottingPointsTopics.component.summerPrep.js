import { React, useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';
import { FaCheckCircle, FaHourglassHalf, FaAdjust, FaSpinner, FaDotCircle } from 'react-icons/fa';

import { config} from '../constants';
var url = config.url.API_URL;

export default function PlottingPointsTopics({username}) {
    const [quizStatus, setQuizStatus] = useState({
        polynomial: null,
        sine: null,
        cosine: null
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchedStatus = async () => {
            try {
            const response = await fetch(`${url}/users/getProgress/summerPrep/functions/plottingPoints`, {
                method: "POST",
                mode: 'cors',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username: username})
            });
            const data = await response.json();
            let tempPolynomial = null;
            let tempSine = null;
            let tempCosine = null;
            if (data) {
                if (data.plottingPointsPolynomials) {
                    tempPolynomial = "inProgress";
                    for (let i = 0; i < data.plottingPointsPolynomials.length; i++) {
                        if (data.plottingPointsPolynomials[i].sessionData?.metStandard) {
                            tempPolynomial = "metStandard";
                        }
                    }
                }
                if (data.plottingPointsSine) {
                    tempSine = "inProgress";
                    for (let i = 0; i < data.plottingPointsSine.length; i++) {
                        if (data.plottingPointsSine[i].sessionData?.metStandard) {
                            tempSine = "metStandard";
                        }
                    }
                }
                if (data.plottingPointsCosine) {
                    tempCosine = "inProgress";
                    for (let i = 0; i < data.plottingPointsCosine.length; i++) {
                        if (data.plottingPointsCosine[i].sessionData?.metStandard) {
                            tempCosine = "metStandard";
                        }
                    }
                }
            }
            setQuizStatus({
                polynomial: tempPolynomial,
                sine: tempSine,
                cosine: tempCosine
            });
        } catch (error) {
            setError('Failed to fetch quiz status. Please try again later');
            console.error('Fetch error:', error);
        }
    };
        fetchedStatus();
    }, [username]);

    const buttonStyle = {
        position: 'relative',
        display: 'inline-block',
    };

    const iconStyle = {
        position: 'absolute',
        top: '0px',
        right: '0px',
    };

    const getIcon = (status) => {
        if (status === 'metStandard') {
            return <FaCheckCircle style={iconStyle} color="green" />;
        } else if (status === 'inProgress') {
            return <FaAdjust style={iconStyle} color="orange" />;
        }
        return null
    }

    return (
        <div className="col-12">
            <div className="mt-3">
                <h1>Plotting Points</h1>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="mt-3">
                <NavLink to="/plottingPointsPolynomials">
                    <div style={buttonStyle}>
                        <Button type="button" variant="primary" size="lg">Polynomial Function</Button>
                        {getIcon(quizStatus?.polynomial)}
                    </div>    
                </NavLink>
                <br /><br />                
                <NavLink to="/plottingPoints/Sine">
                    <div style={buttonStyle}>
                        <Button type="button" variant="primary" size="lg">Sine Function</Button>
                        {getIcon(quizStatus?.sine)}
                        {/* {hasRecord ? (metStandard ? <FaCheckCircle style={iconStyle} color="green" /> : <FaAdjust style={iconStyle} color="green" />) : null} */}
                    </div>    
                </NavLink>
                <br /><br />
                <NavLink to="/plottingPoints/Cosine">
                    <div style={buttonStyle}>
                        <Button type="button" variant="primary" size="lg">Cosine Function</Button>
                        {getIcon(quizStatus?.cosine)}
                    </div>    
                </NavLink>
                <br /><br />
                <NavLink to="/summerPrepTopics">
                    <Button type="button" variant="primary" size="lg">Back to Summer Prep</Button>
                </NavLink>                
            </div>
        </div>
    );
}
