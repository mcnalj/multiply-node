import React from "react";
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
export default function TrigonometricTopics() {
    return (
        <div className="row">
        <div className="col-12">
            <div className="m-2">
                <h1>Trigonometric Functions</h1>
                <h3>Unit Circle Practice</h3>
            </div>
            <div style={{display: "block"}} className="m-2">
                <NavLink to="/trigonometricFunctions/1000" >
                    <Button variant="primary" className="m-3">Essential Units Circle Facts</Button>
                </NavLink>
        
                <NavLink to="/trigonometricFunctions/1010" >
                    <Button variant="primary" className="m-2">Half the Unit Circle</Button>
                </NavLink>
            
                <NavLink to="/trigonometricFunctions/1020" >
                    <Button variant="primary" className="m-2">The Full Unit Circle</Button>
                </NavLink>

            </div>
        </div>
        </div>
    );
}