import React from 'react';
import { TopicsProgress } from '../summerPrep/topicsProgress.component.summerPrep';

export default function ExponentsTopics({username}) {
    const topics = [
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
    
    const section = "summerPrep";
    
    const unit = "exponents";
    
    const backLink = "/summerPrepTopics";
    
    const backLinkText = "Back to Summer Prep";

    return (
        <>
            <div>
                <h1>Exponents Topics</h1>
            </div>
            <TopicsProgress username={username} topics={topics} section={section} unit={unit} backLink={backLink} backLinkText={backLinkText} />
        </>
    );
}
