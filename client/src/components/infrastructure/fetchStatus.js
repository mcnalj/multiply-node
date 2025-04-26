export const fetchStatus = async (url, username, setQuizStatus, setError, section, unit) => {
    // for some reason calculus has sessions data (plural) while summerPrep has sessionData (singular)
    try {
        const response = await fetch(`${url}/users/getProgress/${section}/${unit}`, {
            method: "POST",
            mode: 'cors',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: username})
        });
        const data = await response.json();
        console.log(data);

        let quizStatus = {};

        // this is to account for the fact that calculus has sessionsData and summerPrep has sessionData
        if (section === "calculus") {
            if (data) {
                Object.keys(data).forEach(skill => {
                    if (data[skill]?.length > 0) {
                        let tempStatus = "inProgress";
                        for (let i = 0; i < data[skill].length; i++) {
                            if (data[skill][i].sessionsData?.metStandard) {
                                tempStatus = "metStandard";
                                break; // Stop checking further if the standard is met
                            }
                        }
                        quizStatus[skill] = tempStatus;
                    }
                });
           }
           
        } else {
            if (data) {
                Object.keys(data).forEach(skill => {
                    if (data[skill]?.length > 0) {
                        let tempStatus = "inProgress";
                        for (let i = 0; i < data[skill].length; i++) {
                            if (data[skill][i].sessionData?.metStandard) {
                                tempStatus = "metStandard";
                                break; // Stop checking further if the standard is met
                            }
                        }
                        quizStatus[skill] = tempStatus;
                    }
                });
            }
        }
        
        setQuizStatus(quizStatus);

    } catch (error) {
        setError('Failed to fetch quiz status1. Please try again later');
        console.error('Fetch error:', error);
    }
};

export const fetchStatusDetails = async (url, username, topics, setQuizStatus, setError, section, unit) => {
    // for some reason calculus has sessions data (plural) while summerPrep has sessionData (singular)
    console.log(topics);
    try {
        // const response = await fetch(`${url}/getProgressDetails/${section}/${unit}`, {
        const response = await fetch(`${url}/users/getProgressDetails/calculus/integration`, {
            method: "POST",
            mode: 'cors',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: 'mcnalj', skills: topics })
        });
        const data = await response.json();
        console.log(data);

        let quizStatus = {};

        // this is to account for the fact that calculus has sessionsData and summerPrep has sessionData
        if (section === "calculus") {
            console.log("Section:" + section);
            if (data) {
                console.log(data);
                data.data.forEach(datum => {
                    if (datum.details.length > 0) {
                        let tempStatus = "inProgress";
                        for (let i = 0; i < datum.details.length; i++) {
                            if (datum.details[i].metStandard) {
                                tempStatus = "metStandard";
                                break; // Stop checking further if the standard is met
                            }
                        }
                        quizStatus[datum.topic] = tempStatus;
                    }
                });
           }
           
        } else {
            if (data) {
                Object.keys(data).forEach(skill => {
                    if (data[skill]?.length > 0) {
                        let tempStatus = "inProgress";
                        for (let i = 0; i < data[skill].length; i++) {
                            if (data[skill][i].sessionData?.metStandard) {
                                tempStatus = "metStandard";
                                break; // Stop checking further if the standard is met
                            }
                        }
                        quizStatus[skill] = tempStatus;
                    }
                });
            }
        }
        
        setQuizStatus(quizStatus);

    } catch (error) {
        setError('Failed to fetch quiz status2. Please try again later');
        console.error('Fetch error:', error);
    }
};

export const fetchStatusObject = async (url, username, skillList, setButtonStatus, setError, section, unit) => {
    try {
        const response = await fetch(`${url}/users/getProgress/${section}/${unit}`, {
            method: "POST",
            mode: 'cors',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: username})
        });
        const data = await response.json();
        console.log(data);

        let quizStatus = {};
        if (section === "summerPrep") {
            if (data) {
                Object.keys(data).forEach(skill => {
                    console.log(skill);
                    if (data[skill]?.length > 0) {
                        let tempStatus = "inProgress";
                        for (let i = 0; i < data[skill].length; i++) {
                            if (data[skill][i].sessionData?.metStandard) {
                                tempStatus = "metStandard";
                                break; // Stop checking further if the standard is met
                            }
                        }
                        quizStatus[skill] = tempStatus;
                    }
                });
            }
        } else {
            if (data) {
                Object.keys(data).forEach(skill => {
                    console.log(skill);
                    if (data[skill]?.length > 0) {
                        let tempStatus = "inProgress";
                        for (let i = 0; i < data[skill].length; i++) {
                            if (data[skill][i].sessionsData?.metStandard) {
                                tempStatus = "metStandard";
                                break; // Stop checking further if the standard is met
                            }
                        }
                        quizStatus[skill] = tempStatus;
                    }
                });
            }
        }
        const allSkillsMetStandard = skillList.every(skill => quizStatus[skill] === 'metStandard');
        if (allSkillsMetStandard) {
            setButtonStatus('metStandard');
        } else {
            const atLeastOneMetStandard = skillList.some(skill => quizStatus[skill] === 'metStandard');
            const notAllMetStandard = skillList.some(skill => quizStatus[skill] !== 'metStandard');
            const someButNotAllMetStandard = atLeastOneMetStandard && notAllMetStandard;
            if (someButNotAllMetStandard){
                setButtonStatus('inProgress');
            } else {
                setButtonStatus(null);
            }
        }
    } catch (error) {
        setError('Failed to fetch quiz status3. Please try again later');
        console.error('Fetch error:', error);
    }
};


export const fetchStatusObjectDetails = async (url, username, skillList, setButtonStatus, setError, section, unit) => {
    try {
        const response = await fetch(`${url}/users/getProgressDetails/${section}/${unit}`, {
            method: "POST",
            mode: 'cors',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: username})
        });
        const data = await response.json();
        console.log(data);

        let quizStatus = {};
        if (section === "summerPrep") {
            if (data) {
                Object.keys(data).forEach(skill => {
                    console.log(skill);
                    if (data[skill]?.length > 0) {
                        let tempStatus = "inProgress";
                        for (let i = 0; i < data[skill].length; i++) {
                            if (data[skill][i].sessionData?.metStandard) {
                                tempStatus = "metStandard";
                                break; // Stop checking further if the standard is met
                            }
                        }
                        quizStatus[skill] = tempStatus;
                    }
                });
            }
        } else {
            if (data) {
                Object.keys(data).forEach(skill => {
                    console.log(skill);
                    if (data[skill]?.length > 0) {
                        let tempStatus = "inProgress";
                        for (let i = 0; i < data[skill].length; i++) {
                            if (data[skill][i].sessionsData?.metStandard) {
                                tempStatus = "metStandard";
                                break; // Stop checking further if the standard is met
                            }
                        }
                        quizStatus[skill] = tempStatus;
                    }
                });
            }
        }
        const allSkillsMetStandard = skillList.every(skill => quizStatus[skill] === 'metStandard');
        if (allSkillsMetStandard) {
            setButtonStatus('metStandard');
        } else {
            const atLeastOneMetStandard = skillList.some(skill => quizStatus[skill] === 'metStandard');
            const notAllMetStandard = skillList.some(skill => quizStatus[skill] !== 'metStandard');
            const someButNotAllMetStandard = atLeastOneMetStandard && notAllMetStandard;
            if (someButNotAllMetStandard){
                setButtonStatus('inProgress');
            } else {
                setButtonStatus(null);
            }
        }
    } catch (error) {
        setError('Failed to fetch quiz status4. Please try again later');
        console.error('Fetch error:', error);
    }
};

export const fetchStatusIntegrationTopics = async (userId, url, topics, setQuizStatus, setError, section, unit) => {
    // for some reason calculus has sessions data (plural) while summerPrep has sessionData (singular)
    console.log(topics);
    console.log(userId);
    try {
        // const response = await fetch(`${url}/getProgressDetails/${section}/${unit}`, {
        const response = await fetch(`${url}/users/getProgressIntegrationTopics/calculus/${unit}`, {
            method: "POST",
            mode: 'cors',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify({ username: 'mcnalj', skills: topics })
            body: JSON.stringify({ userId: userId, skills: topics })
        });
        const data = await response.json();
        console.log(data);

        let quizStatus = {};
        if (!data.success) {
            console.log(data.message);
            return;            
        }

        // this is to account for the fact that calculus has sessionsData and summerPrep has sessionData
        // if (section === "calculus") {
            console.log("Section:" + section);
            if (data) {
                console.log(data);
                topics.forEach(topic => {
                    let tempStatus = null;
                    data.data.forEach(datum => {
                        if (datum && datum.topic === topic && tempStatus !== "metStandard") {
                            tempStatus = "inProgress";
                            //datum.details is actually an array
                            if (datum.details.metStandard) {
                                tempStatus = "metStandard";
                            }
                        }
                    }) 
                    quizStatus[topic] = tempStatus;
                })


                data.data.forEach(datum => {
                    if (datum.details.length > 0) {
                        let tempStatus = "inProgress";
                        for (let i = 0; i < datum.details.length; i++) {
                            if (datum.details[i].metStandard) {
                                tempStatus = "metStandard";
                                break; // Stop checking further if the standard is met
                            }
                        }
                        quizStatus[datum.topic] = tempStatus;
                    }
                });
           }
           
        // } else {
        //     if (data) {
        //         Object.keys(data).forEach(skill => {
        //             if (data[skill]?.length > 0) {
        //                 let tempStatus = "inProgress";
        //                 for (let i = 0; i < data[skill].length; i++) {
        //                     if (data[skill][i].sessionData?.metStandard) {
        //                         tempStatus = "metStandard";
        //                         break; // Stop checking further if the standard is met
        //                     }
        //                 }
        //                 quizStatus[skill] = tempStatus;
        //             }
        //         });
        //     }
        // }
        
        setQuizStatus(quizStatus);

    } catch (error) {
        setError('Failed to fetchStatusIntegrationTopics. Please try again later');
        console.error('Fetch error:', error);
    }
};