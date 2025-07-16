import React from 'react';
import { TopicsProgressDetails } from '../summerPrep/topicsProgressDetails.component.summerPrep';
import { config} from '../constants';

var url = config.url.API_URL;

export default function ExponentsTopics({userId}) {
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

    const section = "summerPrep";
    
    const unit = "exponents";
    
    const backLink = "/summerPrepTopics";
    
    const backLinkText = "Back to Summer Prep";

    return (
        <>
            <div>
                <h1>Exponents Topics</h1>
            </div>
            <TopicsProgressDetails
                userId={userId}
                topicsObjects={topicsObjects}
                section={section}
                unit={unit}
                backLink={backLink}
                backLinkText={backLinkText} />
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <a title="Vincent Le Moign, CC BY 4.0 &lt;https://creativecommons.org/licenses/by/4.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:599-circus-tent.svg">
                    <img width="171" alt="599-circus-tent" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/599-circus-tent.svg/512px-599-circus-tent.svg.png?20180429190026" />
                </a>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                    Vincent Le Moign, CC BY 4.0 &lt;https://creativecommons.org/licenses/by/4.0&gt;, via Wikimedia Commons
                </p>
            </div>
        </>
    );
}
