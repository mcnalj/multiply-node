import React, { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';

export default function TutorialTopics({username}) {

    const [cookies, setCookie] = useCookies(['username']);
        
    useEffect(() => {
        const sessionValue = cookies.username;
    }, [cookies]);

    return (
        <div className="col-12">
            <div className="mt-3">
                <h1>Differentiation</h1>
            </div>
            <div className="mt-3">
                <NavLink to="/quizTutorial">
                    <Button type="button" variant="primary" size="lg">Derivatives Tutorials</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/quizBaseImages">
                    <Button type="button" variant="primary" size="lg">Derivatives Quizzes</Button>
                </NavLink>
                <br /><br />
                <NavLink to="/calculus">
                    <Button type="button" variant="primary" size="lg">Back to Calculus</Button>
                </NavLink>
                <br /><br />
            </div>
        </div>
    );
}