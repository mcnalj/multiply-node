import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
// import './styles.component.auth.scss';
import { config} from '../constants';
import Table from 'react-bootstrap/Table';
var url = config.url.API_URL;

export default function ClassProgress({username})  {
    const exponentsSkills = [
        {skillId: 10, skillName: "Simple Exponents"},
        {skillId: 20, skillName: "Negative Exponents"},
        {skillId: 30, skillName: "Fractional Exponents"},
        {skillId: 40, skillName: "Negative Fractional Exponents"},
        {skillId: 50, skillName: "Exponents Mix"},
    ]
    const derivativesSkills = [
        {skillId: 100, skillName: "Power Rule"},
        {skillId: 103, skillName: "Integer Coef"},
        {skillId: 105, skillName: "Fractional Coef"},
        {skillId: 110, skillName: "Negative Exponents"},
        {skillId: 113, skillName: "Neg Exp + Int Coef"},
        {skillId: 115, skillName: "Neg Exp + Frac Coef"},
        {skillId: 120, skillName: "Fractional Exponents"},
        {skillId: 123, skillName: "Frac Exp +  Int Coef"},
        {skillId: 125, skillName: "Frac Exp + Frac Coef"},
        {skillId: 130, skillName: "Neg Frac Exp"},
        {skillId: 133, skillName: "Neg Frac Exp + Int Coef"},
        {skillId: 135, skillName: "Neg Frac Exp + Frac Coef"},
        {skillId: 140, skillName: "Power Rule Mix"},
    ]
    const [userData, setUserData] = useState({exponentsDataArray: [], derivativesDataArray: []});
    const [questionList, setQuestionList] = useState([]);
    const [usersData, setUsersData] = useState([]);
    useEffect(()=> {    
        fetchUserData();
    }, []);

    async function fetchUserData() {
        let data = {};
        let exponentsDataArray = [];
        let derivativesDataArray = [];
        const result = await fetch(`${url}/users/classProgress`, {
            method: "GET",
            mode: 'cors',
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            }
        })
        .catch(error => {
            console.error(error);
            return;
        });
        data = await result.json()
        if (data.exponents) {
            for (var i=0; i < data.exponents.length; i++) {
                let dataObject = {
                    skill: data.exponents[i].skill,
                    time: changeTimeToMinutesAndSeconds(data.exponents[i].sessionsData.totalTime),
                    date: changeDateStringToDate(data.exponents[i].sessionsData.datetimeStarted),
                    correct: data.exponents[i].sessionsData.questionsCorrect,
                    attempted: data.exponents[i].sessionsData.questionsAttempted,
                    streak: data.exponents[i].sessionsData.questionsStreak,
                    keyId: i,
                }
                exponentsDataArray.push(dataObject);
            }
        }
        if (data.derivatives) {
            for (let i=0; i < data.derivatives.length; i++) {
                let dataObject = {
                    skill: data.derivatives[i].skill,
                    time: changeTimeToMinutesAndSeconds(data.derivatives[i].sessionsData.totalTime),
                    date: changeDateStringToDate(data.derivatives[i].sessionsData.datetimeStarted),
                    correct: data.derivatives[i].sessionsData.questionsCorrect,
                    attempted: data.derivatives[i].sessionsData.questionsAttempted,
                    streak: data.derivatives[i].sessionsData.questionsStreak,
                    keyId: i,
                }
                derivativesDataArray.push(dataObject);
            }
        }
        const questionTopics = data.questionTopics;
        setUserData({exponentsDataArray: exponentsDataArray, derivativesDataArray: derivativesDataArray});
        let questionList = []
        for (let i = 0; i < questionTopics.derivatives.length; i++) {
            questionList.push(questionTopics.derivatives[i].topicName);
        }         
        setQuestionList([questionList]);
        setUsersData(data.usersData);
        return
    }

    function changeTimeToMinutesAndSeconds(milliseconds) {
        let totalSeconds= Math.round(milliseconds/1000);
        let minutesText = (Math.floor(totalSeconds/60)).toString();
        let seconds = totalSeconds % 60;
        let secondsText = seconds.toString();
        if (seconds < 9) {
            secondsText = "0" + secondsText;
        }        
        let timeText = `${minutesText}:${secondsText}`;
        return timeText;
    }

    function changeDateStringToDate(dateString) {
        let d = new Date(dateString);
        let date = d.getDate();
        let month = d.getMonth() + 1;
        let dayMonth = `${month}/${date}`;
        return dayMonth;
    }

    const navigate = useNavigate();

    {
        if (userData.length === 0) {
            return (
                <div>
                    <p className="m-5">Sorry, there is no progress data for user: <strong>{username}</strong>.</p>
                </div>
            )
        } else {
            return (
                <div>
                  <style type="text/css">
                      {`
                          th {
                              font-size: 0.6rem;
                              font-weight: bold;
                          }
                          tr {
                              font-size: 0.6rem;
                          }
                      `}
                  </style>
                  <p>Progress for Class:</p>
                  <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>USER</th>
                        <th>Logins</th>
                        <th>Questions</th>
                        {derivativesSkills.map((skill) => (
                                <th key={skill.skillId}>{skill.skillName}</th>
                            ))
                        }
                        </tr>
                    </thead>
                    <tbody>
                        {usersData.map((user) => (
                            <tr key={user.username}>
                                <td>{user.username}</td>
                                <td>{user.logins}</td>
                                <td>{user.totalQuestions}</td>
                                {user.userSuccessArray.map((success) =>(
                                    <td>{success}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              );
        }
    }
}