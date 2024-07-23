import React from "react";
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function PlottingPointsTopics({username}) {
    return (
        <div className="col-12">
            <div className="mt-3">
                <h1>Plotting Points</h1>
            </div>
            <div className="mt-3">
                <NavLink to="/plottingPointsPolynomials">
                    <Button type="button" variant="primary" size="lg">Polynomial Functions</Button>
                </NavLink>
                <br /><br />                
                <NavLink to="/plottingPoints/Sine">
                    <Button type="button" variant="primary" size="lg">Sine Function</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/plottingPoints/Cosine">
                    <Button type="button" variant="primary" size="lg">Cosine Function</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/summerPrepTopics">
                    <Button type="button" variant="primary" size="lg">Back to Summer Prep</Button>
                </NavLink>                
            </div>
        </div>
    );
}