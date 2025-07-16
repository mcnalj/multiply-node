import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';
import { FaCheckCircle, FaHourglassHalf, FaAdjust, FaSpinner, FaDotCircle } from 'react-icons/fa';
import { fetchStatus, fetchStatusObject } from '../infrastructure/fetchStatus';
import { config} from '../constants';
import CircusBall2 from '../SVGs/icons/circusBall2';
var url = config.url.API_URL;

export default function SummerPrepTopics({username}) {
    const topics = [
        {
            topicName: "multiplication", buttonText: "Multiplication", path: "/multiplicationTopics"         
        },
        {
            topicName: "functions", buttonText: "Functions", path: "/plottingPointsTopics"
        },
        {
            topicName: "exponents", buttonText: "Exponents", path: "/exponentsTopics"
        },
        {
            topicName: "quadratics", buttonText: "FactoringQuadratics", path: "/factoringQuadraticsTopics"
        },
        {
            topicName: "unitCircle", buttonText: "The Unit Circle", path: "/unitCircleTopics"
        }        
    ];

    const multiplicationSkills = ["squares", "cubes", "mixed"];
    const functionsSkills = ["functionNotation", "plottingPointsPolynomials", "plottingPointsSine", "plottingPointsCosine", "identifyingFunctions", "equationsOfLines"];
    const exponentsSkills = ["positive", "negative", "fractional", "negativeFractional", "mixed"];
    const quadraticsSkills = ["differenceOfSquares", "factoringQuadratics"];
    const unitCircleSkills = ["essentialUnitCircle", "halfUnitCircle", "fullUnitCircle"];

    const section = "summerPrep";

    const [multiplicationTopicsStatus, setMultiplicationTopicsStatus] = useState();
    const [functionsTopicsStatus, setFunctionsTopicsStatus] = useState();
    const [exponentsTopicsStatus, setExponentsTopicsStatus] = useState();
    const [quadraticsTopicsStatus, setQuadraticsTopicsStatus] = useState();
    const [unitCircleTopicsStatus, setUnitCircleTopicsStatus] = useState();
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetchStatusObject(url, username, multiplicationSkills, setMultiplicationTopicsStatus, setError, section, "multiplication");
        fetchStatusObject(url, username, exponentsSkills, setExponentsTopicsStatus, setError, section, "exponents");
        fetchStatusObject(url, username, functionsSkills, setFunctionsTopicsStatus, setError, section, "functions");
        fetchStatusObject(url, username, quadraticsSkills, setQuadraticsTopicsStatus, setError, section, "quadratics");
        fetchStatusObject(url, username, unitCircleSkills, setUnitCircleTopicsStatus, setError, section, "unitCircle");
    }, [username, section]);

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
            return <FaAdjust style={iconStyle} color="green" />;
        }
        return null;
    }
    
    return (
        <div className="col-12">
            <div className="mt-3">
                <h1>Get Ready for AP Calculus!</h1>
            </div>
            <div className="mt-3">
                <div style={buttonStyle}>
                    <NavLink to="/multiplicationTopics">
                        <Button type="button" variant="primary" size="lg">Multiplication</Button>
                        {getIcon(multiplicationTopicsStatus)}
                    </NavLink>
                </div>
                <br /><br />
                <div style={buttonStyle}>
                    <NavLink to="/plottingPointsTopics">
                        <Button type="button" variant="primary" size="lg">Functions</Button>
                        {getIcon(functionsTopicsStatus)}
                    </NavLink>
                </div>
                <br /><br />
                <div style={buttonStyle}>
                    <NavLink to="/exponentsTopics">
                        <Button type="button" variant="primary" size="lg">Exponents</Button>
                        {getIcon(exponentsTopicsStatus)}
                    </NavLink>
                </div>
                <br /><br />
                <div style={buttonStyle}>
                    <NavLink to="/factoringQuadraticsTopics">
                        <Button type="button" variant="primary" size="lg">Factoring Quadratics</Button>
                        {getIcon(quadraticsTopicsStatus)}
                    </NavLink>
                </div>
                <br /><br />
                <div style={buttonStyle}>
                    <NavLink to="/unitCircleTopics">
                        <Button type="button" variant="primary" size="lg">The Unit Circle</Button>
                        {getIcon(unitCircleTopicsStatus)}
                    </NavLink>
                </div>
                <br /><br />


                {/* <NavLink to="/multiplicationTopics">
                    <Button type="button" variant="primary" size="lg">Multiplication</Button>
                </NavLink>
                <br /><br /> */}
                {/* <NavLink to="/exponentsSummerGPT">
                    <Button type="button" variant="primary" size="lg">Exponents</Button>
                </NavLink> */}
                {/* <NavLink to="/exponentsTopics">
                    <Button type="button" variant="primary" size="lg">Exponents</Button>
                </NavLink>
                <br /><br /> */}
                {/* <NavLink to="/functionNotation">
                    <Button type="button" variant="primary" size="lg">Function Notation</Button>
                </NavLink>
                <br /><br />              
                <NavLink to="/plottingPointsTopics">
                    <Button type="button" variant="primary" size="lg">Plotting Points</Button>
                </NavLink>
                <br /><br /> */}
                {/* <NavLink to="/graphingFunctions">
                    <Button type="button" variant="primary" size="lg">Graphing Functions</Button>
                </NavLink> */}
                {/* <br /><br /> */}
                {/* <NavLink to="/identifyingFunctions">
                    <Button type="button" variant="primary" size="lg">Identifying Functions</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/equationsOfLines">
                    <Button type="button" variant="primary" size="lg">Equations of Lines</Button>
                </NavLink>
                <br /><br />                 */}
                {/* <NavLink to="/plottingPointsTopics">
                    <Button type="button" variant="primary" size="lg">Functions</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/factoringQuadraticsTopics">
                    <Button type="button" variant="primary" size="lg">Factoring Quadratics</Button>
                </NavLink>
                <br /><br /> */}
                {/* <NavLink to="#">
                    <Button type="button" variant="primary" size="lg">Trigonometry</Button>
                </NavLink>
                <br /><br />                
                <NavLink to="#">
                    <Button type="button" variant="primary" size="lg">Logarithms</Button>
                </NavLink>
                <br /><br />
                <NavLink to="#">
                    <Button type="button" variant="primary" size="lg">Fraction Review</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/svgGraphs">
                    <Button type="button" variant="primary" size="lg">SVG Graphs</Button>
                </NavLink> */}
                <br /><br />
            </div>
            <div id ="SVG Div">
                <CircusBall2 />
            </div>
        </div>
    );
}
