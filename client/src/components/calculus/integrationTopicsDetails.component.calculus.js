import React, { useEffect, useState } from 'react';
import { IntegrationProgressDetails } from '../summerPrep/integrationProgressDetails.component.summerPrep';
import { useNavigate } from 'react-router-dom';
import { config} from '../constants';

var url = config.url.API_URL;

export default function IntegrationTopicsDetails({username}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${url}/record/checkAuth`, {
            method: 'GET',
            credentials: 'include',
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.authenticated) {
                setIsAuthenticated(true);
                setUserId(data.userId);
            } else {
                setIsAuthenticated(false);
                navigate("/loginWithGoogle");
            }
        })
        .catch((error) => {
            console.error("Error checking authentication:", error);
            setIsAuthenticated(false);
            navigate("/loginWithGoogle");
        });
    }, [navigate]);
    
    // useEffect(() => {
    //     if (isAuthenticated) {
    //         let returnObj = fetchSkillsArray(backgroundColorObject);
    //         setBackgroundColors(returnObj);
    //     }
    // }, [isAuthenticated]);

    const topicsObjects = [
        {
            topicName: "indefiniteIntegralsSingleTerm", buttonText: "Single Term Integration", path: "/integration/3010"
        },
        {
            topicName: "indefiniteIntegralsBinomial", buttonText: "Binomial Integration", path: "/integration/3020"         
        },
        {
            topicName: "indefiniteIntegralsPolynomial", buttonText: "Polynomial Integration", path: "/integration/3030"
        },
        {
            topicName: "indefiniteIntegralsTrigonometric", buttonText: "Trigonometric Integration", path: "/integration/3040"
        },
        {
            topicName: "indefiniteIntegralsNaturalExponential", buttonText: "Natural Exponential Integration", path: "/integration/3050"
        },
        {
            topicName: "indefiniteIntegralsNaturalLog", buttonText: "Natural Log Integration", path: "/integration/3060"
        },
        {
            topicName: "indefiniteIntegralsNaturalLogBinomial", buttonText: "Binomial Natural Log Integration", path: "/integration/3070"
        },                                                
    ];
    const topics = topicsObjects.map(topic => topic.topicName);
    
    const section = "calculus";
    
    const unit = "integration";
    
    const backLink = "/calculus";
    
    const backLinkText = "Back to Calculus";
    // changed topics={topics} to topicsObjects={topicsObjects}
    console.log(topicsObjects);
    return (
        <>
            <div>
                <h1>Integration Topics</h1>
            </div>
            <IntegrationProgressDetails userId={userId} username={username} topicsObjects={topicsObjects} section={section} unit={unit} backLink={backLink} backLinkText={backLinkText} />
        </>
    );
}