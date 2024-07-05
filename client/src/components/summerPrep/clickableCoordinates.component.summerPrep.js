import React, { useState }from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { addStyles, StaticMathField } from 'react-mathquill';

import {
  correctMessages,
  incorrectMessages,
  streakMessages,
  getRandomCorrectMessage,
  getRandomIncorrectMessage,
  getRandomStreakMessage
} from '../infrastructure/messages.js';

import { config} from '../constants.js';
var url = config.url.API_URL;

addStyles();

export default function ClickableCoordinates({username}) {

    const [coordinates, setCoordinates] = useState(null);
    const [answerCoordinates, setAnswerCoordinates] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const questionArray = [
        {
            functionLatex: `f(x) = 2x-1`,
            x:-2,
            y:-5,
            questionLatex: `( -2, f(-2) )`
        },
        {
            functionLatex: `f(x) = 2x-1`,
            x:-1,
            y:-3,
            questionLatex: `( -1, f(-1) )`
        },
        {
            functionLatex: `f(x) = 2x-1`,
            x:0,
            y:-1,
            questionLatex: `( 0, f(0) )`
        },
        {
            functionLatex: `f(x) = 2x-1`,
            x:1,
            y:1,
            questionLatex: `( 1, f(1) )`
        },
        {
            functionLatex: `f(x) = 2x-1`,
            x:2,
            y:3,
            questionLatex: `( 2, f(2) )`
        },
        {
            functionLatex: `f(x) = 2x-1`,
            x:3,
            y:5,
            questionLatex: `( 3, f(3) )`
        },
    ];

    const [answerMessage, setAnswerMessage] = useState("");
    
    const [questionObject, setQuestionObject] = useState({
      questionData: questionArray[questionIndex], 
      getNextQuestion: next,
      questionsAttempted: 0,
      questionsCorrect: 0,
      questionsIncorrect: 0,
      questionsStreak: 0,
      questionsToMeet: 3,
      progressBar: 0,
      doneWithTopic: done,
      metStandard: false,       
  })

  const startTime = new Date();

  function next(liftedState) {
    console.log("Calling next");
    setQuestionIndex("1");
    console.log(questionIndex);
    setQuestionObject(
      {
        questionData: questionArray[questionIndex],
        getNextQuestion: next,
        questionsAttempted: liftedState.questionsAttempted,
        questionsCorrect: liftedState.questionsCorrect,
        questionsIncorrect: liftedState.questionsIncorrect,
        questionsStreak: liftedState.questionsStreak,
        questionsToMeet: questionObject.questionsToMeet,
        progressBar: Math.round((liftedState.questionsCorrect/questionObject.questionsToMeet)*100),
        doneWithTopic: done,
        metStandard: false
      }
    );    
  }

  async function done(liftedState) {
    const endTime = new Date()
    const totalTime = endTime - startTime;
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
        summerPrep: {
            graphing: {
                skillData: {
                  skill: "graphingCoordinates",
                  sessionsData: sessionObj
                }
            }
        }        
      }
    }
    const response = await fetch(`${url}/record/metStandard/summerPrep`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sessionData),
    })
    .catch(error => {
      window.alert(error);
      return;
    });
    const answer = await response.json();
    setQuestionIndex(questionIndex + 1);
    setQuestionObject(
      {
        questionData: questionArray[questionIndex],
        getNextQuestion: next,
        questionsAttempted: 0,
        questionsCorrect: 0,
        questionsIncorrect: 0,
        questionsStreak: 0,
        questionsToMeet: questionObject.questionsToMeet,
        progressBar: 0,
        doneWithTopic: done,
        questionTopic: questionObject.questionTopic,
        questionPrompt: questionObject.questionPrompt,
        metStandard: true,
      }
    );    

  }


    const handleClick = (event) => {
        const svg = event.currentTarget;
        const point = svg.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());
        const nearestGridPoint = getNearestGridPoint(svgPoint);
        setCoordinates(nearestGridPoint);
        console.log(nearestGridPoint);
    };

    const getNearestGridPoint = (point) => {
        const gridSize = 2;
        const x = Math.round(point.x /gridSize) *gridSize;
        const y = Math.round(point.y /gridSize) *gridSize;
        return {x, y}
    };

    function handleSubmit(event) {
        console.log("calling handle submit")
        console.log("question x: " + questionObject.questionData.x + " , question y: " + questionObject.questionData.y);
        event.preventDefault();

        let stateToLift = {
          questionsAttempted: questionObject.questionsAttempted + 1,
          questionsCorrect: questionObject.questionsCorrect,
          questionsStreak: questionObject.questionsStreak,
          questionsIncorrect: questionObject.questionsIncorrect,
        }

        let answerMessage = '';
        let answerIsCorrect = false;
        console.log("answer x: " + coordinates.x + " , answer y: " + coordinates.y);
        if (coordinates.x == (questionObject.questionData.x * 2) && coordinates.y == (questionObject.questionData.y * -2)) {
            answerIsCorrect = true;
        }
        if (answerIsCorrect) { 
          stateToLift.questionsStreak = stateToLift.questionsStreak + 1;
          if (stateToLift.questionsStreak < 4) {
            answerMessage = getRandomCorrectMessage();
              // let index = getRandomIntInclusive(0, ((correctMessages.length)))
              // answerMessage = correctMessages[index];
          } else {
              let index = stateToLift.questionsStreak - 4;
              // answerMessage = streakMessages[index];
              answerMessage = streakMessages(stateToLift.questionsStreak);
              if (index >= streakMessages.length) {
              stateToLift.questionsStreak = 0;
              }
          }
          stateToLift.questionsCorrect = stateToLift.questionsCorrect + 1;

      } else {
          // let index = getRandomIntInclusive(0, ((incorrectMessages.length)))
          // answerMessage = "Sorry the correct answers were " + questionObject.quadraticParams.firstZero + " and " + questionObj.quadraticParams.secondZero;
          answerMessage = getRandomIncorrectMessage();
          stateToLift.questionsIncorrect = stateToLift.questionsIncorrect + 1;
          stateToLift.questionsStreak = 0
      }
      setAnswerMessage(answerMessage);
      
      if (stateToLift.questionsCorrect >= questionObject.questionsToMeet) {
          questionObject.doneWithTopic(stateToLift);
      } else {
          questionObject.getNextQuestion(stateToLift);
      } 
    }
    
  return (
    <div>
      <p>
        <StaticMathField>{questionObject.questionData.functionLatex}</StaticMathField>
      </p>
      <p>Plot the point 
        <StaticMathField>{questionObject.questionData.questionLatex}</StaticMathField>
      </p>
      <form id="answerForm" onSubmit={handleSubmit} method="post" action="#">
        <Button
            variant="primary"
            type="submit"
            size="lg" 
        >
            SUBMIT
        </Button>
        <p>{answerMessage}</p>
      </form>
      <div>
        <svg
            width="400"
            height="400"
            viewBox="-12 -12 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleClick}
        >
          <defs>
              <marker id="arrow-left-up" markerWidth="3" markerHeight="3" refX="3" refY="1.5" orient="auto" markerUnits="strokeWidth">
              <path d="M3,0 L3,3 L0,1.5 z" fill="black" />
              </marker>
              <marker id="arrow-right-down" markerWidth="3" markerHeight="3" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,3 L3,1.5 z" fill="black" />
              </marker>
          </defs>

          <line x1="-10" y1="0" x2="10" y2="0" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />        
          <line x1="0" y1="-10" x2="0" y2="10" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />

          <text x="10" y="-0.5" textAnchor="middle" fontSize="1.0">x</text>
          <text x="2" y="-10" textAnchor="end" fontSize="1.0">f(x)</text>

          <g id="gridLinesX">
            {[...Array(11)].map((_, i) => {
              const y = 2*(i - 5);
              return (
                <g key={i}>
                  <line key={i} x1="-10" x2="10" y1={y} y2={y} stroke="gray" strokeWidth="0.05" />
                </g>
              );
            })}
          </g>

          <g id="gridLinesY">
            {[...Array(11)].map((_, i) => {
              const x = 2*(i - 5);
              return (
                <g key={i}>
                  <line key={i} x1={x} x2={x} y1="-10" y2="10" stroke="gray" strokeWidth="0.05" />
                </g>
              );
            })}
          </g>

          <g id="hashMarksX">
              {[...Array(11)].map((_, i) => {
                  const x = 2*i - 10;
                  return (
                      <g key={i}>
                      <line key={i} x1={x} y1="-0.3" x2={x} y2="0.3" stroke="black" strokeWidth="0.1" />
                      <text x={x} y="1.2" textAnchor="middle" fontSize="1">{i-5 !== 0 ? i-5: ""}</text>
                      </g>
                  );
              })}
          </g>

          <g id="hashMarksY">
              {[...Array(11)].map((_, i) => {
                  const y = 2*i - 10;
                  return (
                      <g key={i}>
                      <line key={i} x1="-0.3" y1={y} x2="0.3" y2={y} stroke="black" strokeWidth="0.1" />
                      <text x="-1" y={y} textAnchor="middle" fontSize="1">{i-5 !== 0 ? 5-i : ""}</text>
                      </g>
                  );
              })}
          </g>
          {coordinates && <circle cx={coordinates.x} cy={coordinates.y} r="0.3" fill="red" />}
        </svg>
      </div> 
      <Link to="/summerPrepTopics">
            <button type="button" className="btn btn-lg btn-success mt-3">BACK TO SUMMER TOPICS</button><br /><br />
      </Link>     
    </div>
    )
}
