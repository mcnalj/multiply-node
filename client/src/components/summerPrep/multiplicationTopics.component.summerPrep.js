import React from "react";
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function MultiplicationTopics({username}) {
    return (
        <div className="col-12 p-3">
            <div>
                <h1>Multiplication Topics</h1>
            </div>
            <div className="mt-3">
                <NavLink to="/cubesAndSquares/squares">
                    <Button type="button" variant="primary" size="lg">Squares</Button>
                </NavLink>
                <br /><br />                
                <NavLink to="/cubesAndSquares/cubes">
                    <Button type="button" variant="primary" size="lg">Cubes</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/cubesAndSquares/mixed">
                    <Button type="button" variant="primary" size="lg">Mixed Sqares and Cubes</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/summerPrepTopics">
                    <Button type="button" variant="primary" size="lg">Back to Summer Prep</Button>
                </NavLink>                
            </div>
        </div>
    );
}