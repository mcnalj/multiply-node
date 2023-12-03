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
                    <Button variant="primary" className="m-3">Essential Unit Circle</Button>
                </NavLink>
        
                <NavLink to="/trigonometricFunctions/1010" >
                    <Button variant="primary" className="m-2">Half the Unit Circle</Button>
                </NavLink>
            
                <NavLink to="/trigonometricFunctions/1020" >
                    <Button variant="primary" className="m-2">The Full Unit Circle</Button>
                </NavLink>

                <NavLink to="/trigonometricDerivatives/1100" >
                    <Button variant="primary" className="m-2">Trig Derivatives</Button>
                </NavLink>

                <NavLink to="/trigonometricDerivatives/1110" >
                    <Button variant="primary" className="m-2">Chain Rule Trig Derivatives</Button>
                </NavLink>
            </div>
            <div className="row fs-6">
                <p>Practice with the triangle helper.</p>
                <p>Get 12 correct without the triangle helper to meet.</p>
                <p>Type \sqrt and then a number to get the radical symbol</p>
                <p>Make sure you move out of the radical and enter / to go to the denominator.</p>
            </div>                      
        </div>
        </div>
    );
}