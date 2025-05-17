
import React from 'react';
import { TopicsProgressDetails } from './topicsProgressDetails.component.summerPrep';

export default function MultiplicationTopics({ userId }) {
    const topicsObjects = [
        {
            topicName: "squares", buttonText: "Squares", path: "/cubesAndSquares/squares"         
        },
        {
            topicName: "cubes", buttonText: "Cubes", path: "/cubesAndSquares/cubes"
        },
        {
            topicName: "mixed", buttonText: "Mixed Squares and Cubes", path: "/cubesAndSquares/mixed"
        }
    ];
    
    const section = "summerPrep";
    
    const unit = "multiplication";
    
    const backLink = "/summerPrepTopics";
    
    const backLinkText = "Back to Summer Prep";

    return (
        <>
            <div>
                <h1>Multiplication Topics</h1>
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

// function TopicsProgress({ username, topics, section, unit, backLink, backLinkText }) {

//     const [quizStatus, setQuizStatus] = useState({});
//     const [error, setError] = useState(null);
    
//     useEffect(() => {
//         fetchStatus(url, username, setQuizStatus, setError, section, unit);
//     }, [username, section, unit]);

//     const buttonStyle = {
//         position: 'relative',
//         display: 'inline-block',
//     };

//     const iconStyle = {
//         position: 'absolute',
//         top: '0px',
//         right: '0px',
//     };

//     const getIcon = (status) => {
//         if (status === 'metStandard') {
//             return <FaCheckCircle style={iconStyle} color="green" />;
//         } else if (status === 'inProgress') {
//             return <FaAdjust style={iconStyle} color="orange" />;
//         }
//         return null;
//     }

//     return (
//         <div className="col-12 p-3">
//             <div>
//                 <h1>{unit} Topics</h1>
//             </div>
//             {error && <Alert variant="danger">{error}</Alert>}
//             <div className="mt-3">
//                 {topics.map((topic, index) => (
//                     <div key={index}>
//                         <NavLink to={topic.path}>
//                             <div style={buttonStyle}>
//                                 <Button type="button" variant="primary" size="lg">{topic.buttonText}</Button>
//                                 {getIcon(quizStatus[topic.topicName])}
//                             </div>
//                         </NavLink>
//                         <br /><br />
//                     </div>
//                 ))}
//                 <NavLink to={backLink}>
//                     <Button type="button" variant="primary" size="lg">{backLinkText}</Button>
//                 </NavLink>
//             </div>
//         </div>
//     );
// }

