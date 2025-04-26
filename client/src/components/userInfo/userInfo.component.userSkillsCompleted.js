import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { config} from '../constants';
import { fetchUserSkillsCompleted } from '../infrastructure/fetchUserSkillsCompleted';

var url = config.url.API_URL;

export default function UserSkillsCompleted({userId}) {
    const [error, setError] = useState(null);

    const topicsObjects = [
        {
            topicName: "positive", buttonText: "Simple Exponents", path: "/exponentsVariety/positive"         
        },
        {
            topicName: "negative", buttonText: "Negative Exponents", path: "/exponentsVariety/negative"
        },
        {
            topicName: "fractional", buttonText: "Fractional Exponents", path: "/exponentsVariety/fractional"
        },
        {
            topicName: "negativeFractional", buttonText: "Negative Fractional Exponents", path: "/exponentsVariety/negativeFractional"
        },
        {
            topicName: "mixed", buttonText: "Mix of All Types", path: "/exponentsVariety/mixed"
        },        
    ];
    const topics = topicsObjects.map(topic => topic.topicName);

        const section = "summerPrep";
        
        const unit = "exponents";
        
        const backLink = "/summerPrepTopics";
        
        const backLinkText = "Back to Summer Prep";

        // have to send topics

        useEffect(() => {
            fetchUserSkillsCompleted(userId, url, topics, setError, section, unit);
        }, [userId, section, unit]);
    
        return (
            <>
                <div>
                    <h1>Exponents Topics Completed</h1>
                </div>
                <div className="col-12 p-3">
                    <div className="mt-3">
                        <div>
                            <p>Exponents skills table</p>    
                        </div>
                        <NavLink to={backLink}>
                            <Button type="button" variant="primary" size="lg">{backLinkText}</Button>
                        </NavLink>
                    </div>
                </div>
            </>
        );
}
