import React from "react";
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function FactoringQuadraticsTopics({username}) {
    return (
        <div className="col-12">
            <div className="mt-3">
                <h1>Factoring Quadratics</h1>
            </div>
            <div className="mt-3">
                <NavLink to="/factoringQuadratics/differenceOfSquares">
                    <Button type="button" variant="primary" size="lg">Difference of Squares</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/factoringQuadratics/factoringQuadratics">
                    <Button type="button" variant="primary" size="lg">FactoringQuadratics</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/summerPrepTopics">
                    <Button type="button" variant="primary" size="lg">Back to Summer Prep</Button>
                </NavLink>                
            </div>
        </div>
    );
}
