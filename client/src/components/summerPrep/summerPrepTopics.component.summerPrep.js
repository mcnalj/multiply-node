import React from "react";
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function SummerPrepTopics({username}) {
    return (
        <div className="col-12">
            <div className="mt-3">
                <h1>Get Ready for AP Calculus!</h1>
            </div>
            <div className="mt-3">
                <NavLink to="/multiplicationTopics">
                    <Button type="button" variant="primary" size="lg">Multiplication Topics</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/exponentsSummerGPT">
                    <Button type="button" variant="primary" size="lg">Exponents</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/functionNotation">
                    <Button type="button" variant="primary" size="lg">Function Notation</Button>
                </NavLink>
                <br /><br />              
                <NavLink to="/plottingPointsTopics">
                    <Button type="button" variant="primary" size="lg">Plotting Points</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/graphingFunctions">
                    <Button type="button" variant="primary" size="lg">Graphing Functions</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/identifyingFunctionsExtractAnswers">
                    <Button type="button" variant="primary" size="lg">Identifying Functions</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/equationsOfLines">
                    <Button type="button" variant="primary" size="lg">Slopes / Equations of Lines</Button>
                </NavLink>
                <br /><br />                
                <NavLink to="/factoringQuadraticsTopics">
                    <Button type="button" variant="primary" size="lg">Factoring Quadratics</Button>
                </NavLink>
                <br /><br />
                <NavLink to="#">
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
                </NavLink>
                <br /><br />
            </div>
        </div>
    );
}
