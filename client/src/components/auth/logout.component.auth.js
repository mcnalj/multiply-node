import React, { useState } from "react";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import './styles.component.auth.scss';
import { config } from '../constants.js';
var url = config.url.API_URL;

export default function LogOut({setUsername, removeCookie })  {
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
            setUsername("");
            removeCookie('username');
            navigate("/")
        } catch(error) {
            setError('logout failed.');
        }
    }
    
    return (
        <div className="auth-inner">
            <div>
                <Button variant="info" onClick={handleClick}>Logout</Button>
            </div>
            { error ? (<p>An error ocurred: {error}</p>) : (<p></p>)}
        </div>
    )
};