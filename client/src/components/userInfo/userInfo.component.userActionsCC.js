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
            <Button onClick={() => navigate(-1)}>Go Back</Button>
            <ul>
                {user.actions.length > 0 ? (
                    user.actions.map((action, index) => {
                        let tempTime = Math.floor(action.details.totalTime / 1000);
                        let tempMin = Math.floor(tempTime / 60);
                        let tempSec = tempTime % 60;
                        let textTime = `${tempMin}:${tempSec.toString().padStart(2, "0")}`;


                        const words = action.details.topic.split(/(?=[A-Z])/)
                        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
                        const topicString = words.join(" ");
                        const topicTime = new Date(action.timeStamp).toLocaleString(undefined,
                            {
                                hour: '2-digit',
                                minute: '2-digit',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }
                        )



                        return (
                        <li key={index}>
                            <strong>{topicString}</strong> ({textTime}) - {topicTime}
                        </li>
                    )})
                ) : (
                    <p>No actions found.</p>
                )}
            </ul>
        </div>
    );
}
