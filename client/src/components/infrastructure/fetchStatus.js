export const fetchStatus = async (url, username, setQuizStatus, setError, section, unit) => {
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

        let quizStatus = {};

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

        setQuizStatus(quizStatus);

    } catch (error) {
        setError('Failed to fetch quiz status. Please try again later');
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

        let quizStatus = {};

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
        setError('Failed to fetch quiz status. Please try again later');
        console.error('Fetch error:', error);
    }
};