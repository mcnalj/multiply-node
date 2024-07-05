import React, { useState, useRef, useEffect } from "react";
import { config } from '../constants.js';
var url = config.url.API_URL;


// startTime, liftedState(questionsAttempted, questionsCorrect, questionsIncorrect, questionsStrek)
// username
// progress.summerPrep.quadratics.skillData{skill=topic,sessionsData=sessionObj }
// we have to get the endTime in the parent
// const endTime = new Date()
export function setSessionData(liftedState, startTime, totalTime, domain, unit, topic, username) {
    console.log("Total time in import: " + totalTime);
    let sessionObj = {
      "metStandard": true,
      "questionsAttempted": liftedState.questionsAttempted,
      "questionsCorrect": liftedState.questionsCorrect,
      "questionsIncorrect": liftedState.questionsIncorrect,
      "questionsStreak": liftedState.questionsStreak,
      "datetimeStarted": startTime,
      "totalTime": totalTime,
    }
    let sessionData = {
      userData: {
          username: username,
          questionsAttempted: liftedState.questionsAttempted,
          questionsCorrect: liftedState.questionsCorrect,
      },
      progress: {
        [domain]: {
            [unit]: {
                skillData: {
                  skill: topic,
                  sessionsData: sessionObj
                }
            }
        }        
      },
      progressDomain: [domain],
      progressUnit: [unit],
      skillData: {skill: topic, sessionData: sessionObj}
    }
    return sessionData;
}

export async function recordProgress(sessionData, domain) {
    try {
        const response = await fetch(`${url}/record/metStandard/${domain}`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sessionData),
        });

        if (!response.ok) {
            throw new Error('HTTP error! status: ${response.status}');
        }

        const result = await response.json()
        return result;
    } catch (error) {
        console.error('Error recording progress:', error);
        throw error;
    }
}    
