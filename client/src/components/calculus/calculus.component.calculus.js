import React, { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';

export default function Calculus({username}) {

    const [cookies, setCookie] = useCookies(['username']);
        
    useEffect(() => {
        const sessionValue = cookies.username;
        // console.log('Session value:' + sessionValue);
    }, [cookies]);

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
                {/* <NavLink to="/markdown">
                    <Button type="button" variant="primary" size="lg">Markdown</Button>
                </NavLink> */}
            </div>
        </div>
    );
}
