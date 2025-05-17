import React, { useState } from 'react';
import { TopicsProgress } from '../summerPrep/topicsProgress.component.summerPrep';
import { useParams } from 'react-router-dom';

export default function PowerRuleSkills({ username }) {

    const integerExponentSkills = [
        {
            topicId: 210, topicName: "simplePowerRule", buttonText: "No Coefficients", path: "/derivatives/210"         
        },
        {
            topicId: 220, topicName: "simplePowerRuleWithIntegerCoefficient", buttonText: "Integer Coefficients", path: "/derivatives/220"
        },
        {
            topicId: 230, topicName: "simplePowerRuleWithFractionalCoefficient", buttonText: "Fractional Coefficients", path: "/derivatives/230"
        }
    ];
    const negativeExponentSkills = [
        {
            topicId: 240, topicName: "simplePowerRuleWithNegativeExponent", buttonText: "Negative Exponents", path: "/derivatives/240"         
        },
        {
            topicId: 250, topicName: "simplePowerRuleWithNegativeExponentAndIntegerCoefficient", buttonText: "Negative Exponents and Integer Coefficients", path: "/derivatives/250"
        },
        {
            topicId: 260, topicName: "simplePowerRuleWithNegativeExponentAndFractionalCoefficient", buttonText: "Negative Exponents and Fractional Coefficients", path: "/derivatives/260"
        }
    ];

    const fractionalExponentSkills = [
        {
            topicId: 270, topicName: "simplePowerRuleWithFractionalExponent", buttonText: "Fractional Exponents", path: "/derivatives/270"         
        },
        {
            topicId: 280, topicName: "simplePowerRuleWithFractionalExponentAndIntegerCoefficient", buttonText: "Fractional Exponents and Integer Coefficients", path: "/derivatives/280"
        },
        {
            topicId: 290, topicName: "simplePowerRuleWithFractionalExponentAndFractionalCoefficient", buttonText: "Fractional Exponents and Fractional Coefficients", path: "/derivatives/290"
        }
    ];

    const negativeFractionalExponentSkills = [
        {
            topicId: 300, topicName: "simplePowerRuleWithNegativeFractionalExponent", buttonText: "Negative Exponents", path: "/derivatives/300"         
        },
        {
            topicId: 310, topicName: "simplePowerRuleWithNegativeExponentAndIntegerCoefficient", buttonText: "Negative Exponents and Integer Coefficients", path: "/derivatives/310"
        },
        {
            topicId: 320, topicName: "simplePowerRuleWithNegativeExponentAndFractionalCoefficient", buttonText: "Negative Exponents and Fractional Coefficients", path: "/derivatives/320"
        }
    ];

    const parameter = useParams()
    var skills = [];
    console.log(parameter);
    if (parameter.skill === "integerExponents") {
        console.log("got here")
        skills = integerExponentSkills;
    } else if (parameter.skill === "negativeExponents") {
        skills = negativeExponentSkills;
    } else if (parameter.skill === "fractionalExponents") {
        skills = fractionalExponentSkills;
    } else if (parameter.skill === "negativeFractionalExponents") {
        skills = negativeFractionalExponentSkills;
    } 
    const [skillsArray, setSkillsArray] = useState(skills);
    
    const section = "calculus";
    
    const unit = "derivatives";
    
    const backLink = "/powerRuleTopics";
    
    const backLinkText = "Back to Power Rule Topics";

    return (
        <>
            <div>
                <h1>Power Rule With Integer Exponents</h1>
            </div>
            <TopicsProgress username={username} topics={skills} section={section} unit={unit} backLink={backLink} backLinkText={backLinkText} />
        </>
    );
}
