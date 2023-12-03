import React, { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';

export default function ProgressChoices({username}) {

    const [cookies, setCookie] = useCookies(['username']);
        
    useEffect(() => {
        const sessionValue = cookies.username;
        // console.log('Session value:' + sessionValue);
    }, [cookies]);

    return (
        <div className="col-12">
            <div className="mt-3">
                <h1>View your progress in . . .</h1>
            </div>
            <div className="mt-3">
                <NavLink to="/exponentsTopics">
                    <Button type="button" variant="primary" size="lg">Exponents</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/derivativesTopics">
                    <Button type="button" variant="primary" size="lg">Derivatives</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/trigonometricTopics">
                    <Button type="button" variant="primary" size="lg">Trigonometric Functions</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/naturalTopics">
                    <Button type="button" variant="primary" size="lg">Natural Exponential/Log</Button>
                </NavLink>
            </div>
        </div>
    );
}
