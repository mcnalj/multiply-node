import React from "react";
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
export default function NaturalTopics() {
    return (
        <div className="row">
        <div className="col-12">
            <div className="m-2">
                <h1>Natural Exponential and Natural Log</h1>
                <h3>Derivatives</h3>
            </div>
            <div style={{display: "block"}} className="m-2">
                <NavLink to="/naturalDerivatives/500" >
                    <Button variant="info" className="m-3">Natural Exponential</Button>
                </NavLink>
        
                {/* <NavLink to="/naturalDerivatives/510" >
                    <Button variant="primary" className="m-2">Natural Exponential (Complex)</Button>
                </NavLink>
            
                <NavLink to="/naturalDerivatives/520" >
                    <Button variant="primary" className="m-2">Natural Log</Button>
                </NavLink>

                <NavLink to="/naturalDerivatives/530" >
                    <Button variant="primary" className="m-2">Natural Log (Complex)</Button>
                </NavLink>

                <NavLink to="/naturalDerivatives/540" >
                    <Button variant="primary" className="m-2">Natural Exponential and Log Mix</Button>
                </NavLink> */}
                <br /><br />
                <NavLink to="/calculus" >
                    <Button variant="primary" className="m-2">Back to Caculus</Button>
                </NavLink>
            </div>
        </div>
        </div>
    );
}