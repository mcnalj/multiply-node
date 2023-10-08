import React from "react";
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
export default function DerivativesTopics() {
    return (
        <div className="row">
        <div className="col-12">
            <div className="m-2">
                <h1>Derivatives</h1>
                <h3>Power Rule Practice</h3>
            </div>
            <div style={{display: "block"}} className="m-2">
                <NavLink to="/derivatives/210" >
                    <Button variant="primary" className="m-3">Plain Power Rule</Button>
                </NavLink>
        
                <NavLink to="/derivatives/220" >
                    <Button variant="primary" className="m-2">Power Rule with Integer Coefficients</Button>
                </NavLink>
            
                <NavLink to="/derivatives/230" >
                    <Button variant="primary" className="m-2">Power Rule with Fractional Coefficients</Button>
                </NavLink>
                            
                <NavLink to="/derivatives/240" >
                    <Button variant="primary" className="m-2">Power Rule with Negative Exponents</Button>
                </NavLink>
            
                <NavLink to="/derivatives/250" >
                    <Button variant="primary" className="m-2">Power Rule with Negative Exponents and Integer Coefficients</Button>
                </NavLink>
            
                <NavLink to="/derivatives/260" >
                    <Button variant="primary" className="m-2">Power Rule with Negative Exponents and Fractional Coefficients</Button>
                </NavLink>
                            
                <NavLink to="/derivatives/270" >
                    <Button variant="primary" className="m-2">Power Rule with Fractional Exponents</Button>
                </NavLink>
            
                <NavLink to="/derivatives/280" >
                    <Button variant="primary" className="m-2">Power Rule with Fractional Exponents and Integer Coefficients</Button>
                </NavLink>
            
                <NavLink to="/derivatives/290" >
                    <Button variant="primary" className="m-2">Power Rule with Fractional Exponents and Fractional Coefficients</Button>
                </NavLink>
                                            
                <NavLink to="/derivatives/300" >
                    <Button variant="primary" className="m-2">Power Rule with Negative Fractional Exponents</Button>
                </NavLink>
            
                <NavLink to="/derivatives/310" >
                    <Button variant="primary" className="m-2">Power Rule with Negative Fractional Exponents and Integer Coefficients</Button>
                </NavLink>
            
                <NavLink to="/derivatives/320" >
                    <Button variant="primary" className="m-2">Power Rule with Negative Fractional Exponents and Fractional Coefficients</Button>
                </NavLink>
                                            
                <NavLink to="/derivatives/330" >
                    <Button variant="primary" className="m-2">Power Rule Mix</Button>
                </NavLink>
            </div>
        </div>
        </div>
    );
}