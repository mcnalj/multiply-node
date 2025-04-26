export const fetchUserSkillsCompleted = async (userId, url, topics, setError, section, unit) => {
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
           
    } catch (error) {
        setError('Failed to fetchStatusIntegrationTopics. Please try again later');
        console.error('Fetch error:', error);
    }
};