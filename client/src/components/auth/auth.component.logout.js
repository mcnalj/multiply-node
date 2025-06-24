import React, { useState } from "react";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import './auth.component.styles.scss';
import { config } from '../constants.js';
var url = config.url.API_URL;

// export default function LogOut({setUsername, removeCookie })  {
export default function LogOut({setIsAuthenticated, setUserId})  {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleClick = async function() {
        try {
            const response = await fetch(`${url}/record/navLogout`, {    
                method: "POST",
                credentials: 'include',
            })

            if (!response.ok) {
                throw new Error("Logout failed");
            }

            const responseData = await response.json();
            // depracated by login with Google
            // setUsername("");
            // removeCookie('username');
            navigate("/")
        } catch(error) {
            setError('logout failed.');
        }
    }
    const handleLogout = async function() {
        fetch(`${url}/users/logout`, {
            method: 'POST',
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            setIsAuthenticated(false);
            setUserId("");
            navigate("/")
        })
        .catch(error => console.error("Logout error:", error));
    }
    
    return (
        <div className="col-12">
            <div className="row">
                <div className="auth-inner mt-2 p-3 p-sm-5 col-10 offset-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3">
                    <div>
                        {/* <Button variant="info" onClick={handleClick}>Logout</Button> */}
                        <Button variant="info" onClick={handleLogout}>Logout</Button>
                    </div>
                        { error ? (<p>An error ocurred: {error}</p>) : (<p></p>)}
                </div>
            </div>
        </div>
    )
};