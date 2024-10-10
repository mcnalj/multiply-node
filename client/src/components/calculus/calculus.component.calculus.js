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
        <div className="col-12">
            <div className="mt-3">
                <h1>Calculus Page</h1>
            </div>
            <div className="mt-3">
                {/* <NavLink to="/exponentsTopics">
                    <Button type="button" variant="primary" size="lg">Exponents</Button>
                </NavLink>
                <br /><br /> */}
                {/* <NavLink to="/limitsGraphs">
                    <Button type="button" variant="primary" size="lg">Limits</Button>
                </NavLink>
                <br /><br />                 */}
                <NavLink to="/powerRuleTopics">
                    <Button type="button" variant="primary" size="lg">Derivatives</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/trigonometricTopics">
                    <Button type="button" variant="primary" size="lg">Trigonometric</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/naturalTopics">
                    <Button type="button" variant="primary" size="lg">Natural Exponential/Log</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/integrationTopics">
                    <Button type="button" variant="primary" size="lg">Integration</Button>
                </NavLink>
                <br /><br />                
                <NavLink to="/tutorialTopics">
                    <Button type="button" variant="warning" size="lg">Tutorials and Quizzes (BETA)</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/standardsCategories">
                    <Button type="button" variant="warning" size="lg">Track Progress (BETA)</Button>
                </NavLink>
                {/* <NavLink to="/markdown">
                    <Button type="button" variant="primary" size="lg">Markdown</Button>
                </NavLink> */}
            </div>
        </div>
    );
}
