import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

export default class Splash extends Component {
    render() {
        return (
            <div>
                <h3 className="mt-3">Calculus Class</h3>
                <div>
                    <NavLink to="/login">
                        <Button
                            variant="primary"
                            type="submit"
                            id="submitBtn"
                            size="lg"  
                        >Login
                        </Button>
                    </NavLink>
                    <NavLink to="/register">
                        <Button
                            variant="primary"
                            type="submit"
                            id="submitBtn"
                            size="lg"  
                        >Register
                        </Button>
                    </NavLink><br /><br />
                </div>
                <div>
                    {/* <NavLink to="/multiply">
                        <button type="button" className="btn btn-lg btn-success">Practice Multiplication</button><br /><br />
                    </NavLink>
                    <NavLink to="/categories">
                        <button type="button" className="btn btn-lg btn-success">Play Trivia</button>
                    </NavLink> */}
                </div>
            </div>
        );
    }
}