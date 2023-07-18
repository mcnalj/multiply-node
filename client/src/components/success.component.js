import React, { Component, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';
function Success() {
        const [cookies, setCookie] = useCookies(['username']);
        
        useEffect(() => {
            const sessionValue = cookies.username;
            console.log('Session value:' + sessionValue);
        }, [cookies]);
        
        return (
            <div>
                <div>
                    <h1>Success</h1>
                    <h3>Welcome {cookies.username}</h3>
                </div>
                <div>
                    <a href="/">Home</a><br />
                    <a href='/login'>Login</a><br />
                    <a href='/register'>Register</a><br /><br />
                </div>
            </div>
        );
    }

export default Success