import React, { useState } from "react";
import { Cookies } from 'react-cookie';
import Button from "react-bootstrap/Button";
import './styles.component.auth.scss';
export default function LogOut({setUsername, removeCookie })  {
    let x = document.cookie;
    console.log("Here is the cookie:");
    console.log(x);
    const handleClick = async function() {
        // let response = await fetch("http://localhost:5000/record/navLogout");
        // response = await response.json();
        // setUsername("");
        // removeCookie('username');
        // console.log(response);
        let response = await fetch("http://localhost:5000/record/navLogout", {
            method: "POST",
            //mode: 'no-cors',
            mode: 'cors',
            credentials: 'include',
            // I needed to include credentials to get the cookie that was set on the server to show up
            headers: {
              "Content-Type": "application/json",
            }
        })
        .catch(error => {
            window.alert(error);
            return;
        });
        response = await response.json();
        setUsername("");
        removeCookie('username');
        console.log(response);
    }
    

    return (
        <div className="auth-inner">
            <div>
                <Button variant="info" onClick={handleClick}>Logout</Button>
            </div>
        </div>
    )
};