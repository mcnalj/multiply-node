import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';
import { FaCheckCircle, FaHourglassHalf, FaAdjust, FaSpinner, FaDotCircle } from 'react-icons/fa';
import { fetchStatus } from '../infrastructure/fetchStatus';
import { config} from '../constants';
var url = config.url.API_URL;


export function TopicsProgress({ username, topics, section, unit, backLink, backLinkText }) {

    const [quizStatus, setQuizStatus] = useState({});
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetchStatus(url, username, setQuizStatus, setError, section, unit);
    }, [username, section, unit]);

    const buttonStyle = {
        position: 'relative',
        display: 'inline-block',
    };

    const iconStyle = {
        position: 'absolute',
        top: '0px',
        right: '0px',
    };

    const getIcon = (status) => {
        if (status === 'metStandard') {
            return <FaCheckCircle style={iconStyle} color="green" />;
        } else if (status === 'inProgress') {
            return <FaAdjust style={iconStyle} color="orange" />;
        }
        return null;
    }

    return (
        <div className="col-12 p-3">
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="mt-3">
                {topics.map((topic, index) => (
                    <div key={index}>
                        <NavLink to={topic.path}>
                            <div style={buttonStyle}>
                                <Button type="button" variant="primary" size="lg">{topic.buttonText}</Button>
                                {getIcon(quizStatus[topic.topicName])}
                            </div>
                        </NavLink>
                        <br /><br />
                    </div>
                ))}
                <NavLink to={backLink}>
                    <Button type="button" variant="primary" size="lg">{backLinkText}</Button>
                </NavLink>
            </div>
        </div>
    );
}