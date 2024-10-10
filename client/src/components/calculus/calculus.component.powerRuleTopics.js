import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';
import { FaCheckCircle, FaHourglassHalf, FaAdjust, FaSpinner, FaDotCircle } from 'react-icons/fa';
import { fetchStatus, fetchStatusObject } from '../infrastructure/fetchStatus';
import { config} from '../constants';
var url = config.url.API_URL;

export default function PowerRuleTopics({username}) {
    const topics = [
        {
            topicName: "integerExponents", buttonText: "Power Rule with Integer Exponents", path: "/powerRuleSkills/integerExponents"         
        },
        {
            topicName: "negativeExponents", buttonText: "Power Rule with Negative Exponents", path: "/powerRuleSkills/negativeExponents"
        },
        {
            topicName: "fractionalExponents", buttonText: "Power Rule with Fractional Exponents", path: "/powerRuleSkills/fractionalExponents"
        },
        {
            topicName: "negativeFractionalExponents", buttonText: "Power Rule with Negative Fractional Exponents", path: "/powerRuleSkills/negativeFractionalExponents"
        },
        {
            topicName: "powerRuleMix", buttonText: "Power Rule Mix", path: "/derivatives/330"
        },
    ];

    const integerExponentsSkills = ["simplePowerRule", "simplePowerRuleWithIntegerCoefficient", "simplePowerRuleWithFractionalCoefficient"];
    const negativExponentsSkills = ["simplePowerRuleWithNegativeExponent", "simplePowerRuleWithNegativeExponentAndIntegerCoefficient", "simplePowerRuleWithNegativeExponentAndFractionalCoefficient"];
    const fractionalExponentsSkills = ["simplePowerRuleWithFractionalExponent", "simplePowerRuleWithFractionalExponentAndIntegerCoefficient", "simplePowerRuleWithFractionalExponentAndFractionalCoefficient"];
    const negativeFractionalExponentsSkills = ["simplePowerRuleWithNegativeFractionalExponent", "simplePowerRuleWithNegativeExponentAndIntegerCoefficient", "simplePowerRuleWithNegativeExponentAndFractionalCoefficient"];
    const powerRuleMixSkills = ["powerRuleMix"];

    // const section = "summerPrep";
    const section = "calculus";

    const [integerExponentsStatus, setIntegerExponentsStatus] = useState();
    const [negativeExponentsStatus, setNegativeExpontentsStatus] = useState();
    const [fractionalExponentsStatus, setFractionalExponentsStatus] = useState();
    const [negativeFractionalExponentsStatus, setNegativeFractionalExponentsStatus] = useState();
    const [powerRuleMixStatus, setPowerRuleMixStatus] = useState();
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetchStatusObject(url, username, integerExponentsSkills, setIntegerExponentsStatus, setError, section, "derivatives");
        fetchStatusObject(url, username, negativExponentsSkills, setNegativeExpontentsStatus, setError, section, "derivatives");
        fetchStatusObject(url, username, fractionalExponentsSkills, setFractionalExponentsStatus, setError, section, "derivatives");
        fetchStatusObject(url, username, negativeFractionalExponentsSkills, setNegativeFractionalExponentsStatus, setError, section, "derivatives");
        fetchStatusObject(url, username, powerRuleMixSkills, setPowerRuleMixStatus, setError, section, "derivatives");
    }, [username, section]);

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
            return <FaAdjust style={iconStyle} color="green" />;
        }
        return null;
    }
    // can I use TopicsProgress here (from Summer Prep) like is do in powerRuleSkills?
    return (
        <div className="col-12">
            <div className="mt-3">
                <h1>Get Ready for AP Calculus!</h1>
            </div>
            <div className="mt-3">
                <div style={buttonStyle}>
                    <NavLink to="/powerRuleSkills/integerExponents">
                        <Button type="button" variant="primary" size="lg">Power Rule with Integer Exponents</Button>
                        {getIcon(integerExponentsStatus)}
                    </NavLink>
                </div>
                <br /><br />
                <div style={buttonStyle}>
                    <NavLink to="/powerRuleSkills/negativeExponents">
                        <Button type="button" variant="primary" size="lg">Power Rule with Negative Exponents</Button>
                        {getIcon(negativeExponentsStatus)}
                    </NavLink>
                </div>
                <br /><br />
                <div style={buttonStyle}>
                    <NavLink to="/powerRuleSkills/fractionalExponents">
                        <Button type="button" variant="primary" size="lg">Power Rule with Fractional Exponents</Button>
                        {getIcon(fractionalExponentsStatus)}
                    </NavLink>
                </div>
                <br /><br />
                <div style={buttonStyle}>
                    <NavLink to="/powerRuleSkills/negativeFractionalExponents">
                        <Button type="button" variant="primary" size="lg">Power Rule with Negative Fractional Exponents</Button>
                        {getIcon(negativeFractionalExponentsStatus)}
                    </NavLink>
                </div>
                <br /><br />
                <div style={buttonStyle}>
                    <NavLink to="/derivatives/330">
                        <Button type="button" variant="primary" size="lg">Power Rule Mix</Button>
                        {getIcon(powerRuleMixStatus)}
                    </NavLink>
                </div>
                <br /><br />
                <div style={buttonStyle}>
                    <NavLink to="/calculus">
                        <Button type="button" variant="primary" size="lg">Back to Calculus Topics</Button>
                    </NavLink>
                </div>
                <br /><br />                

                <br /><br />
            </div>
        </div>
    );
}
