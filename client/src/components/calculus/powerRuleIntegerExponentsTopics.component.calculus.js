import React from 'react';
import { TopicsProgress } from '../summerPrep/topicsProgress.component.summerPrep';

export default function PowerRuleIntegerExponentsTopics({ username }) {
    const topics = [
        {
            topicName: "simplePowerRule", buttonText: "No Coefficients", path: "/derivatives/210"         
        },
        {
            topicName: "simplePowerRuleWithIntegerCoefficient", buttonText: "Integer Coefficients", path: "/derivatives/220"
        },
        {
            topicName: "simplePowerRuleWithFractionalCoefficient", buttonText: "Fractional Coefficients", path: "/derivatives/230"
        }
    ];
    
    const section = "calculus";
    
    const unit = "derivatives";
    
    const backLink = "/derivativesTopics";
    
    const backLinkText = "Back to Derivatives";

    return (
        <>
            <div>
                <h1>Power Rule With Integer Exponents</h1>
            </div>
            <TopicsProgress username={username} topics={topics} section={section} unit={unit} backLink={backLink} backLinkText={backLinkText} />
        </>
    );
}
