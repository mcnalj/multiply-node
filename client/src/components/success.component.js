import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { config} from './constants';
var url = config.url.API_URL;


export default function Success({username}) {
        const [cookies, setCookie] = useCookies(['username']);
        const [classData, setClassData] = useState([]);
        const [visibleClasses, setVisibleClasses] = useState({calculus:false, mockTrial:false, theCode:false, advancedCoding:false, crew:false, quiz:false});
        
        useEffect(() => {
            const sessionValue = cookies.username;
            console.log('Session value:' + sessionValue);
            fetchClassData();
        }, [cookies]);

        async function fetchClassData() {
            let visibleObj = {
                calculus:false,
                mockTrial:false,
                theCode:false,
                advancedCoding:false,
                crew:false,
                quiz:false
            }
            await fetch(`${url}/record/listClasses`, {
                method: "POST",
                mode: 'cors',
                credentials: 'include',
            }).then((result) => {
                return result.json()
            }).then((result) => {
                console.log(result);
                result.usersData.includes("CALC23") ? visibleObj.calculus = true : visibleObj.calculus = false;
                result.usersData.includes("CALC24") ? visibleObj.calculus = true : visibleObj.calculus = false;
                result.usersData.includes("MT2023") ? visibleObj.mockTrial = true : visibleObj.mockTrial = false;
                result.usersData.includes("CODE23") ? visibleObj.theCode = true : visibleObj.theCode = false;
                result.usersData.includes("CREW23") ? visibleObj.crew = true : visibleObj.crew = false;
                result.usersData.includes("ADVC23") ? visibleObj.advancedCoding = true : visibleObj.advancedCoding = false;
                result.usersData.includes("QUIZ23") ? visibleObj.quiz = true : visibleObj.quiz = false;
                setVisibleClasses(visibleObj);
                setClassData(result.usersData);
            })
            .catch(error => {
                console.error(error);
                return;
            });
        }
        {
            if (!classData || classData.length === 0) {
                return (
                    <div className="auth-inner">
                        <p className="m-5">Fetching classes . . .</p>
                    </div>
                )
            } else {
                return (
                    <div className="auth-inner">
                        <div>
                            <h3>Your Classes</h3>
                        </div>
                        {
                            visibleClasses.calculus &&
                                (
                                    <NavLink to="/summerPrepTopics">
                                        <Button className="mt-2">Calculus</Button>
                                    </NavLink>
                                    
                                )
                        }
                        <br></br>
                        {
                            visibleClasses.mockTrial &&
                                (
                                    <NavLink to="/calculus">
                                        <Button className="mt-2">Mock Trial</Button>
                                    </NavLink>
                                )
                        }
                        {
                            visibleClasses.theCode &&
                                (
                                    <NavLink to="/calculus">
                                        <Button className="mt-2">The Code</Button>
                                    </NavLink>
                                )
                        }
                        {
                            visibleClasses.advancedCoding &&
                                (
                                    <NavLink to="/calculus">
                                        <Button className="mt-2">Advanced Coding</Button>
                                    </NavLink>
                                )
                        }
                        {
                            visibleClasses.crew &&
                                (
                                    <NavLink to="/calculus">
                                        <Button className="mt-2">Crew</Button>
                                    </NavLink>
                                )
                        }
                        {
                            visibleClasses.quiz &&
                                (
                                    <NavLink to="/categories">
                                        <Button className="mt-2">Quizzes</Button>
                                    </NavLink>
                                )
                        }                                                
                    </div>
                );
            }
        }
}     
        // return (
        //     <div>
        //         <div>
        //             <h3 className="m-3">Welcome {cookies.username}</h3>
        //         </div>
        //         <div>
        //         <NavLink to="/exponentsTopics">
        //                 <Button
        //                     variant="primary"
        //                     type="submit"
        //                     id="submitBtn"
        //                     size="lg"  
        //                 >Exponents Skills
        //                 </Button>
        //             </NavLink>
        //             <NavLink to="/derivativesTopics">
        //                 <Button
        //                     variant="primary"
        //                     type="submit"
        //                     id="submitBtn"
        //                     size="lg"  
        //                 >Derivatives Skills
        //                 </Button>
        //             </NavLink>
        //         </div>
        //     </div>
        // );
