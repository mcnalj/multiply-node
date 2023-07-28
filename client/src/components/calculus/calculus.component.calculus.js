import React from "react";
import { NavLink } from 'react-router-dom';
export default function Calculus() {
    return (
        <div>
            <div>
                <h1>Calculus Page</h1>
            </div>
            <div>
                <NavLink to="/exponentsTopics">
                    <button type="button" className="btn btn-lg btn-success">Exponents</button><br /><br />
                </NavLink>
                <NavLink to="/derivatives">
                    <button type="button" className="btn btn-lg btn-success">Derivatives</button>
                </NavLink>
                <NavLink to="/markdown">
                    <button type="button" className="btn btn-lg btn-success">Markdown</button>
                </NavLink>
            </div>
        </div>
    );
}
