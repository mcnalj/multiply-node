import React from 'react';
import { TopicsProgress } from './topicsProgress.component.summerPrep';

export default function PlottingPointsTopics({username}) {

    const topics = [
        {
            topicName: "functionNotation", buttonText: "Function Notation", path: "/functionNotation"
        },
        {
            topicName: "plottingPointsPolynomials", buttonText: "Polynomial Function", path: "/plottingPointsPolynomials"         
        },
        {
            topicName: "plottingPointsSine", buttonText: "Sine Function", path: "/plottingPoints/Sine"
        },
        {
            topicName: "plottingPointsCosine", buttonText: "Cosine Function", path: "/plottingPoints/Cosine"
        },
        {
            topicName: "identifyingFunctions", buttonText: "Identifying Functions", path: "/identifyingFunctions"
        },
        {
            topicName: "equationsOfLines", buttonText: "Equations of Lines", path: "/equationsOfLines"
        },                        
    ];
    
    const section = "summerPrep";
    
    const unit = "functions";
    
    const backLink = "/summerPrepTopics";
    
    const backLinkText = "Back to Summer Prep";

    return (
        <>
            <div>
                <h1>Functions Topics</h1>
            </div>
            <TopicsProgress username={username} topics={topics} section={section} unit={unit} backLink={backLink} backLinkText={backLinkText} />
        </>
    );
}