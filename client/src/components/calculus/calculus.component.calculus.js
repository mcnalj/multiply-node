import React from "react";
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function Calculus() {
    return (
        <div>
            <div>
                <h1>Calculus Page</h1>
            </div>
            <div>
                <NavLink to="/exponentsTopics">
                    <Button type="button" variant="primary" size="lg">Exponents</Button><br /><br />
                </NavLink>
                <NavLink to="/derivativesTopics">
                    <Button type="button" variant="primary" size="lg">Derivatives</Button><br /><br />
                </NavLink>
                <NavLink to="/markdown">
                    <Button type="button" variant="primary" size="lg">Markdown</Button>
                </NavLink>
            </div>
        </div>
    );
}
