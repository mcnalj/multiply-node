import React, { Component, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

function Success() {
        const [cookies, setCookie] = useCookies(['username']);
        
        useEffect(() => {
            const sessionValue = cookies.username;
            console.log('Session value:' + sessionValue);
        }, [cookies]);
        
        return (
            <div>
                <div>
                    <h3 className="m-3">Welcome {cookies.username}</h3>
                </div>
                <div>
                <NavLink to="/exponentsTopics">
                        <Button
                            variant="primary"
                            type="submit"
                            id="submitBtn"
                            size="lg"  
                        >Exponents Skills
                        </Button>
                    </NavLink>
                    <NavLink to="/derivativesTopics">
                        <Button
                            variant="primary"
                            type="submit"
                            id="submitBtn"
                            size="lg"  
                        >Derivatives Skills
                        </Button>
                    </NavLink>
                </div>
            </div>
        );
    }

export default Success