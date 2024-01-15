import React, { useState, useEffect } from "react";
// import './styles.component.auth.scss';
import { config} from '../constants';
var url = config.url.API_URL;

export default function UserProgress({username})  {
    const [userData, setUserData] = useState({exponentsDataArray: [], derivativesDataArray: [], trigonometricFunctionsDataArray: [], naturalExponentialLogDataArray: [], tutorialsDataArray: []});
    useEffect(()=> {    
        fetchUserData();
    }, []);

    async function fetchUserData() {
        let data = {};
        let exponentsDataArray = [];
        let derivativesDataArray = [];
        let trigonometricFunctionsDataArray = [];
        let naturalExponentialLogDataArray = [];
        let tutorialsDataArray = [];
        const result = await fetch(`${url}/users/userProgress`, {
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
        console.log(data)
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
        if (data.trigonometricFunctions) {
            console.log(data.trigonometricFunctions)
            for (let i=0; i < data.trigonometricFunctions.length; i++) {
                let dataObject = {
                    skill: data.trigonometricFunctions[i].skill,
                    time: changeTimeToMinutesAndSeconds(data.trigonometricFunctions[i].sessionsData.totalTime),
                    date: changeDateStringToDate(data.trigonometricFunctions[i].sessionsData.datetimeStarted),
                    correct: data.trigonometricFunctions[i].sessionsData.questionsCorrect,
                    attempted: data.trigonometricFunctions[i].sessionsData.questionsAttempted,
                    streak: data.trigonometricFunctions[i].sessionsData.questionsStreak,
                    keyId: i,
                }
                trigonometricFunctionsDataArray.push(dataObject);
            }
        }
        if (data.naturalExponentialLog) {
            console.log(data.naturalExponentialLog)
            for (let i=0; i < data.naturalExponentialLog.length; i++) {
                let dataObject = {
                    skill: data.naturalExponentialLog[i].skill,
                    time: changeTimeToMinutesAndSeconds(data.naturalExponentialLog[i].sessionsData.totalTime),
                    date: changeDateStringToDate(data.naturalExponentialLog[i].sessionsData.datetimeStarted),
                    correct: data.naturalExponentialLog[i].sessionsData.questionsCorrect,
                    attempted: data.naturalExponentialLog[i].sessionsData.questionsAttempted,
                    streak: data.naturalExponentialLog[i].sessionsData.questionsStreak,
                    keyId: i,
                }
                naturalExponentialLogDataArray.push(dataObject);
            }
        }
        if (data.tutorials) {
            for (let i=0; i < data.tutorials.length; i++) {
                let dataObject = {
                    skill: data.tutorials[i].skill,
                    time: changeTimeToMinutesAndSeconds(data.tutorials[i].sessionsData.totalTime),
                    date: changeDateStringToDate(data.tutorials[i].sessionsData.datetimeStarted),
                    keyId: i,
                }
                tutorialsDataArray.push(dataObject);
            }
        }                                                        
        setUserData({exponentsDataArray: exponentsDataArray, derivativesDataArray: derivativesDataArray, trigonometricFunctionsDataArray: trigonometricFunctionsDataArray, naturalExponentialLogDataArray: naturalExponentialLogDataArray, tutorialsDataArray: tutorialsDataArray});
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

    {
        if (userData.exponentsDataArray.length === 0 && userData.derivativesDataArray.length === 0 && userData.trigonometricFunctionsDataArray.length === 0) {
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
                          #tableHeading {
                              font-size: 0.6rem;
                              font-weight: bold;
                          }
                          .tableData {
                              font-size: 0.6rem;
                          }
                      `}
                  </style>
                  <p>Progress for {username}:</p>
                  <div>
                    <p>Exponents</p>
                      <div id="tableHeading" className="row tableHeading">
                          <p className="col-4">SKILL</p>
                          <p className="col-2">CORRECT</p>
                          <p className="col-2">ATTEMPTED</p>
                          <p className="col-2">STREAK</p>
                          <p className="col-1">TIME</p>
                          <p className="col-1">DATE</p>
                      </div>           
                      {userData.exponentsDataArray.map((datum) => (
                          <div className="row tableData" key={datum.keyId}>
                              <p className="col-4">
                                  {datum.skill}
                              </p>
                              <p className="col-2">
                                  {datum.correct}
                              </p>
                              <p className="col-2">
                                  {datum.attempted}
                              </p>
                              <p className="col-2">
                                  {datum.streak}
                              </p>   
                              <p className="col-1">
                                  {datum.time}
                              </p>
                              <p className="col-1">
                                  {datum.date}
                              </p>
                          </div>
                      ))}
                    <p>Derivatives</p>
                      <div id="tableHeading" className="row tableHeading">
                          <p className="col-4">SKILL</p>
                          <p className="col-2">CORRECT</p>
                          <p className="col-2">ATTEMPTED</p>
                          <p className="col-2">STREAK</p>
                          <p className="col-1">TIME</p>
                          <p className="col-1">DATE</p>
                      </div>           
                      {userData.derivativesDataArray.map((datum) => (
                          <div className="row tableData" key={datum.keyId}>
                              <p className="col-4">
                                  {datum.skill}
                              </p>
                              <p className="col-2">
                                  {datum.correct}
                              </p>
                              <p className="col-2">
                                  {datum.attempted}
                              </p>
                              <p className="col-2">
                                  {datum.streak}
                              </p>   
                              <p className="col-1">
                                  {datum.time}
                              </p>
                              <p className="col-1">
                                  {datum.date}
                              </p>
                          </div>
                      ))}
                    <p>Trigonometric Functions</p>
                      <div id="tableHeading" className="row tableHeading">
                          <p className="col-4">SKILL</p>
                          <p className="col-2">CORRECT</p>
                          <p className="col-2">ATTEMPTED</p>
                          <p className="col-2">STREAK</p>
                          <p className="col-1">TIME</p>
                          <p className="col-1">DATE</p>
                      </div>           
                      {userData.trigonometricFunctionsDataArray.map((datum) => (
                          <div className="row tableData" key={datum.keyId}>
                              <p className="col-4">
                                  {datum.skill}
                              </p>
                              <p className="col-2">
                                  {datum.correct}
                              </p>
                              <p className="col-2">
                                  {datum.attempted}
                              </p>
                              <p className="col-2">
                                  {datum.streak}
                              </p>   
                              <p className="col-1">
                                  {datum.time}
                              </p>
                              <p className="col-1">
                                  {datum.date}
                              </p>
                          </div>
                      ))}
                    <p>Natural Exponential and Natural Log</p>
                      <div id="tableHeading" className="row tableHeading">
                          <p className="col-4">SKILL</p>
                          <p className="col-2">CORRECT</p>
                          <p className="col-2">ATTEMPTED</p>
                          <p className="col-2">STREAK</p>
                          <p className="col-1">TIME</p>
                          <p className="col-1">DATE</p>
                      </div>           
                      {userData.naturalExponentialLogDataArray.map((datum) => (
                          <div className="row tableData" key={datum.keyId}>
                              <p className="col-4">
                                  {datum.skill}
                              </p>
                              <p className="col-2">
                                  {datum.correct}
                              </p>
                              <p className="col-2">
                                  {datum.attempted}
                              </p>
                              <p className="col-2">
                                  {datum.streak}
                              </p>   
                              <p className="col-1">
                                  {datum.time}
                              </p>
                              <p className="col-1">
                                  {datum.date}
                              </p>
                          </div>
                      ))}                      
                    <p>Tutorials</p>
                      <div id="tableHeading" className="row tableHeading">
                          <p className="col-4">SKILL</p>
                          <p className="col-2"></p>
                          <p className="col-2"></p>
                          <p className="col-2"></p>
                          <p className="col-1">TIME</p>
                          <p className="col-1">DATE</p>
                      </div>           
                      {userData.tutorialsDataArray.map((datum) => (
                          <div className="row tableData" key={datum.keyId}>
                              <p className="col-4">
                                  {datum.skill}
                              </p>
                              <p className="col-2">
                                  
                              </p>
                              <p className="col-2">
                                  
                              </p>
                              <p className="col-2">
                                  
                              </p>   
                              <p className="col-1">
                                  {datum.time}
                              </p>
                              <p className="col-1">
                                  {datum.date}
                              </p>
                          </div>
                      ))}                     
                  </div>
                </div>
              );
        }
    }
}
