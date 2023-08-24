import React from "react";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import './styles.component.auth.scss';
import { config} from '../constants.js';
var url = config.url.API_URL;

export default function LogOut({setUsername, removeCookie })  {
    const navigate = useNavigate();
    const handleClick = async function() {
        let response = await fetch(`${url}/record/navLogout`, {    
            method: "POST",
            credentials: 'include',
        })
        .catch(error => {
            window.alert(error);
            return;
        });
        response = await response.json();
        setUsername("");
        removeCookie('username');
        console.log(response.msg);
        navigate("/")
    }
    
    return (
        <div className="auth-inner">
            <div>
                <Button variant="info" onClick={handleClick}>Logout</Button>
            </div>
        </div>
    )
};