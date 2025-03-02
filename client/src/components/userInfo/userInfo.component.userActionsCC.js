import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { config} from '../constants';
var url = config.url.API_URL;

export default function UserActionsCC({userId, userDataObj})  {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;

    if (!user) {
        return <p>Sorry, no actions were found. <button onClick={() => navigate(-1)}>Go Back</button></p>;
    }

    return (
        <div>
            <h2>{user.name}'s Actions</h2>
            <button onClick={() => navigate(-1)}>Go Back</button>
            <ul>
                {user.actions.length > 0 ? (
                    user.actions.map((action, index) => {
                        let tempTime = action.details.totalTime / 1000;
                        let tempMin = 0;
                        let tempSec = 0;
                        let textMin = "0";
                        let textSec ="00";
                        tempMin = Math.lower(tempTime / 60);
                        if (tempMin > 59) {
                            if (tempMin > 9) {
                                textMin = tempMin.toString();
                            } else {
                                textMin = "0" + tempMin.toString();
                            }
                        } else {
                            textMin = tempMin.toString();
                        }

                        return (
                        <li key={index}>
                            <strong>{action.details.topic}</strong> - {new Date(action.timeStamp).toLocaleString()}
                        </li>
                    )})
                ) : (
                    <p>No actions found.</p>
                )}
            </ul>
        </div>
    );
}
