import React from 'react';
import { TopicsProgressDetails } from './topicsProgressDetails.component.summerPrep';

export default function UnitCircleTopics({userId}) {

    const topicsObjects = [
        {
            topicName: "unitCircleWarmUpFirstQuadrant", buttonText: "Warm Up: First Quadrant", path: "/unitCircle/100"
        },
        {
            topicName: "unitCircleWarmUpSecondQuadrant", buttonText: "Warm Up: Second Quadrant", path: "/unitCircle/120"
        },
        {
            topicName: "unitCircleWarmUpThirdQuadrant", buttonText: "Warm Up: Third Quadrant", path: "/unitCircle/140"
        },
        {
            topicName: "unitCircleWarmUpFourthQuadrant", buttonText: "Warm Up: Fourth Quadrant", path: "/unitCircle/160"
        },
        {
            topicName: "unitCircleSineFirstQuadrant", buttonText: "Practice: Sine - First Quadrant", path: "/unitCircle/200" 
        },
        {
            topicName: "unitCircleSineFirstHalf", buttonText: "Practice: Sine - First Half", path: "/unitCircle/220"
        },
        {
            topicName: "unitCircleSineFullCircle", buttonText: "Practice: Sine - Full Circle", path: "/unitCircle/240"
        },
        {
            topicName: "unitCircleCosineFirstQuadrant", buttonText: "Practice: Cosine - First Quadrant", path: "/unitCircle/300"
        },
        {
            topicName: "unitCircleCosineFirstHalf", buttonText: "Practice: Cosine - First Half", path: "/unitCircle/320"
        },
        {
            topicName: "unitCircleCosineFullCircle", buttonText: "Practice: Cosine - Full Circle", path: "/unitCircle/340"
        },
        {
            topicName: "unitCircleTangentFirstQuadrant", buttonText: "Practice: Tangent - First Quadrant", path: "/unitCircle/400"
        },
        {
            topicName: "unitCircleTangentFirstHalf", buttonText: "Practice: Tangent - First Half", path: "/unitCircle/420"
        },
        {
            topicName: "unitCircleTangentFullCircle", buttonText: "Practice: Tangent - Full Circle", path: "/unitCircle/440"
        },
        {
            topicName: "unitCircleFirstQuadrant", buttonText: "Test: First Quadrant", path: "/unitCircle/1001"
        },
        {
            topicName: "unitCircleFirstHalf", buttonText: "Test: First Half", path: "/unitCircle/1020"
        },
        {
            topicName: "unitCircleFullCircle", buttonText: "Test: Full Circle", path: "/unitCircle/1040"
        },
        {
            topicName: "essentialUnitCircle", buttonText: "The Absolute Essentials", path: "/unitCircle/1000"
        },                         
    ];
    
    const section = "summerPrep";
    
    const unit = "unitCircle";
    
    const backLink = "/summerPrepTopics";
    
    const backLinkText = "Back to Summer Prep";

    return (
        <>
            <div>
                <h1>Unit Circle Topics</h1>
            </div>
            <TopicsProgressDetails
                userId={userId}
                topicsObjects={topicsObjects}
                section={section}
                unit={unit}
                backLink={backLink}
                backLinkText={backLinkText}
            />
        </>
    );
}





// import React, {useEffect, useState} from "react";
// import { NavLink } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import { config} from '../constants';
// var url = config.url.API_URL;

// export default function UnitCircleTopics({ userId }) {
//     let backgroundColorObject = {
//         warmUpFirstQuadrant: "info",
//         warmUpSecondQuadrant: "info",
//         warmUpThirdQuadrant: "info",
//         warmUpFourthQuadrant: "info",
//         practiceFirstQuadrant: "info",
//         practiceSecondQuadrant: "info",
//         practiceFullCircle: "info",
//         basicEvaluation: "info",
//         halfCircleEvaluation: "info",
//         fullCircleEvaluation: "info",
//     }

//     const [backgroundColors, setBackgroundColors] = useState(backgroundColorObject);

//     useEffect(() => {
//         let returnObj = fetchSkillsArray(backgroundColorObject);
//         setBackgroundColors(returnObj);
//     }, []);

//     async function fetchSkillsArray(backgroundColorObject) {
//         const result = await fetch(`${url}/record/skillsCompleted`, {
//             method: "POST",
//             mode: 'cors',
//             credentials: 'include',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })
//         .catch(error => {
//             console.error(error);
//             return;
//         });
//         let resultData = await result.json()
//         if (resultData.completedSkillsArrayTrigonometric) {
//             resultData.completedSkillsArrayTrigonometric.forEach((skill) => {
//                 if (backgroundColorObject[skill] == "info") {
//                     backgroundColorObject[skill] = "primary";
//                 }
//             })
//             setBackgroundColors(backgroundColorObject)
//         }
//         return backgroundColorObject;
//     }

//         const buttonStyle = {
//         position: 'relative',
//         display: 'inline-block',
//     };

//     const iconStyle = {
//         position: 'absolute',
//         top: '0px',
//         right: '0px',
//     };


//     return (
//         <div className="row">
//         <div className="col-12">
//             <div className="m-2">
//                 <h1>The Unit Circle</h1>
//             </div>
//             <div className="mt-3">
//                 <div style={buttonStyle}>
//                     <NavLink to="/trigonometricFunctions/1000" >
//                         <Button type="button" variant="primary" size="lg">Essential Unit Circle</Button>
//                         {getSelection(essentialUnitCircleStatus)} 
//                     </NavLink>
//                 </div>
//                 <br /><br />
        
//                 <NavLink to="/trigonometricFunctions/1010" >
//                     <Button variant={backgroundColors.halfCircleEvaluation} className="m-2">Half the Unit Circle</Button>
//                 </NavLink>
            
//                 <NavLink to="/trigonometricFunctions/1020" >
//                     <Button variant={backgroundColors.fullCircleEvaluation} className="m-2">The Full Unit Circle</Button>
//                 </NavLink>
//             </div>
//             <div className="row fs-6">
//                 <p>Practice with the triangle helper.</p>
//                 <p>Get 12 correct without the triangle helper to meet.</p>
//                 <p>Type \sqrt and then a number to get the radical symbol</p>
//                 <p>Make sure you move out of the radical and enter / to go to the denominator.</p>
//             </div>
//             <div>
//                 <NavLink to="/summerPrepTopics" >
//                     <Button variant="primary" className="m-2">Back to Summer Prep</Button>
//                 </NavLink>
//             </div>                     
//         </div>
//         </div>
//     );
// }