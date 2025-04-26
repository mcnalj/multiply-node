import React from 'react';
import { TopicsProgressDetails } from './topicsProgressDetails.component.summerPrep';

export default function FactoringQuadraticsTopics({ userId }) {
    const topicsObjects = [
        {
            topicName: "differenceOfSquares", buttonText: "Difference of Squares", path: "/factoringQuadratics/differenceOfSquares"
        },
        {
            topicName: "factoringQuadratics", buttonText: "Factoring Quadratics", path: "/factoringQuadratics/factoringQuadratics"         
        },
    ];
    
    const section = "summerPrep";
    
    const unit = "quadratics";
    
    const backLink = "/summerPrepTopics";
    
    const backLinkText = "Back to Summer Prep";

    return (
        <>
            <div>
                <h1>Quadratics Topics</h1>
            </div>
            <TopicsProgressDetails
                userId={userId}
                topicsObjects={topicsObjects}
                section={section}
                unit={unit}
                backLink={backLink}
                backLinkText={backLinkText} />
        </>
    );
}


// import React from "react";
// import { NavLink } from 'react-router-dom';
// import { Button } from 'react-bootstrap';

// export default function FactoringQuadraticsTopics({username}) {
//     return (
//         <div className="col-12">
//             <div className="mt-3">
//                 <h1>Factoring Quadratics</h1>
//             </div>
//             <div className="mt-3">
//                 <NavLink to="/factoringQuadratics/differenceOfSquares">
//                     <Button type="button" variant="primary" size="lg">Difference of Squares</Button>
//                 </NavLink>
//                 <br /><br />
//                 <NavLink to="/factoringQuadratics/factoringQuadratics">
//                     <Button type="button" variant="primary" size="lg">FactoringQuadratics</Button>
//                 </NavLink>
//                 <br /><br />
//                 <NavLink to="/summerPrepTopics">
//                     <Button type="button" variant="primary" size="lg">Back to Summer Prep</Button>
//                 </NavLink>                
//             </div>
//         </div>
//     );
// }
