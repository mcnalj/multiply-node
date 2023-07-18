import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
export default class Splash extends Component {
    render() {
        return (
            <div>
                <div>
                    <h1>Calcuyes</h1>
                    <NavLink to="/login" activeclassname="active">Login</NavLink><br />
                    <NavLink to="/register">Register</NavLink><br /><br />
                </div>
                <div>
                    <NavLink to="/multiply">
                        <button type="button" className="btn btn-lg btn-success">Practice Multiplication</button><br /><br />
                    </NavLink>
                    <NavLink to="/categories">
                        <button type="button" className="btn btn-lg btn-success">Play Trivia</button>
                    </NavLink>
                </div>
            </div>
        );
    }
}