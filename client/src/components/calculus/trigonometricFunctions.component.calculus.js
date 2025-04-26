import React, { useState, useEffect, useRef } from 'react';
import { useParams, NavLink } from "react-router-dom";
import { ProgressBar, Button, Form} from 'react-bootstrap';
import { addStyles, StaticMathField, EditableMathField } from 'react-mathquill';
import {
    getRandomIntInclusive,
  } from '../math-scripts/utilities-scripts.js';

import '../../App.scss';
import '../../index.scss';
import './calculus.component.derivatives.scss';
import { config} from '../constants.js';
var url = config.url.API_URL;

addStyles();

// const startTime = new Date();

const questionTopics = {
    "trigonometricFunctions": [
        {
            topicId: 1000,
            topicName:  "basicEvaluation",
            questionEngine: "basicEvaluation",
        },
        {
            topicId: 1010,
            topicName:  "halfCircleEvaluation",
            questionEngine: "halfCircleEvaluation",
        },
        {
            topicId: 1020,
            topicName:  "fullCircleEvaluation",
            questionEngine: "fullCircleEvaluation",
        },
        {
            topicId: 1030,
            topicName:  "symbolicDerivatives",
            questionEngine: "symbolicDerivatives",
        },        
        {
            topicId: 1040,
            topicName:  "basicDerivativesEvaluation",
            questionEngine: "basicDerivativesEvaluation",
        },
        {
            topicId: 1050,
            topicName:  "halfDerivativesEvaluation",
            questionEngine: "halfDerivativesEvaluation",
        },
        {
            topicId: 1060,
            topicName:  "fullDerivativesEvaluation",
            questionEngine: "fullDerivativesEvaluation",
        },                        
    ]
}

function UnitCircle({username, pointChoice, hideTriangle}) {

    const svgWidth = 400;
    const svgHeight = 400;
    const radius = svgWidth / 3;
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;

    // Calculate the coordinates of each point
    const points = [
    { angle: 0, label: '0', sin: '0', cos: '1', sinOffset: -15, cosOffset: 20, hypotenuseColor: 'blue' },
    { angle: Math.PI / 6, label: 'π/6', sin: '1/2', cos: '√3/2', sinOffset: 5, cosOffset: 20, hypotenuseColor: 'black' },
    { angle: Math.PI / 4, label: 'π/4', sin: '√2/2', cos: '√2/2', sinOffset: 5, cosOffset: 20, hypotenuseColor: 'black' },
    { angle: Math.PI / 3, label: 'π/3', sin: '√3/2', cos: '1/2', sinOffset: 5, cosOffset: 20, hypotenuseColor: 'black' },
    { angle: Math.PI / 2, label: 'π/2', sin: '1', cos: '0', sinOffset: 5, cosOffset: 20, hypotenuseColor: 'green' },
    { angle: ( 2 * Math.PI ) / 3, label: '2π/3', sin: '√3/2', cos: '-1/2', sinOffset: -35, cosOffset: 20, hypotenuseColor: 'black' },
    { angle: ( 3 * Math.PI ) / 4, label: '3π/4', sin: '√2/2', cos: '-√2/2', sinOffset: -35, cosOffset: 20, hypotenuseColor: 'black' },
    { angle: ( 5 * Math.PI ) / 6, label: '5π/6', sin: '1/2', cos: '-√3/2', sinOffset: -35, cosOffset: 20, hypotenuseColor: 'black' },
    { angle: Math.PI, label: 'π', sin: '0', cos: '-1', sinOffset: 5, cosOffset: 20, hypotenuseColor: 'blue' },
    { angle: ( 7 * Math.PI ) / 6, label: '7π/6', sin: '-1/2', cos: '-√3/2', sinOffset: -45, cosOffset: -10, hypotenuseColor: 'black' },
    { angle: ( 5 * Math.PI ) / 4, label: '5π/4', sin: '-√2/2', cos: '-√2/2', sinOffset: -40, cosOffset: -10, hypotenuseColor: 'black' },
    { angle: ( 4 * Math.PI ) / 3, label: '4π/3', sin: '-√3/2', cos: '-1/2', sinOffset: -35, cosOffset: -10, hypotenuseColor: 'black' },
    { angle: ( 3 * Math.PI ) / 2, label: '3π/2', sin: '-1', cos: '0', sinOffset: 5, cosOffset: -10, hypotenuseColor: 'green' },
    { angle: ( 5 * Math.PI ) / 3, label: '5π/3', sin: '-√3/2', cos: '1/2', sinOffset: 5, cosOffset: -10, hypotenuseColor: 'black' },
    { angle: ( 7 * Math.PI ) / 4, label: '7π/4', sin: '-√2/2', cos: '√2/2', sinOffset: 5, cosOffset: -10, hypotenuseColor: 'black' },
    { angle: ( 11 * Math.PI ) / 6, label: '11π/6', sin: '-1/2', cos: '√3/2', sinOffset: 5, cosOffset: -10, hypotenuseColor: 'black' },
    { angle: 2 * Math.PI, label: '', sin: '0', cos: '1', sinOffset: -15, cosOffset: 20, hypotenuseColor: 'blue' },

    ];
    const pointIndex = pointChoice
    const angle = points[pointIndex].angle
    const blueLineX = centerX + (radius * Math.cos(angle));
    const blueLineY = centerY

    //   const greenLineX = (centerX + (radius * Math.cos(angle)));
    const greenLineX = blueLineX;
    const greenLineY = (centerY - ( radius * Math.sin(angle)));
    if (!hideTriangle) {
  return (
        <div className="row m-0 p-0">
            {/* <div className="col-12 m-0 p-0"> */}
            <div className="mx-auto" style={{ maxWidth: "500px", width: "100%"}} >
                <svg
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg">
                {/* Circle */}
                <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="black" />

                {/* Angle Measures */}
                {points.map((point, index) => (
                    <g key={index}>
                    <text
                        x={centerX + radius * 1.15 * Math.cos(point.angle)}
                        y={centerY - radius * 1.15 * Math.sin(point.angle)}
                        textAnchor = "middle"
                    >
                        {point.label}
                    </text>
                    <circle
                        cx={centerX + radius * Math.cos(point.angle)}
                        cy={centerY - radius * Math.sin(point.angle)}
                        r="3"
                        fill="black"
                    />
                    </g>
                ))}
                    <line x1={centerX} y1={centerY} x2={blueLineX} y2={blueLineY} stroke="blue" strokeWidth="3"/>
                    <line x1={blueLineX} y1={blueLineY} x2={greenLineX} y2={greenLineY} stroke="green" strokeWidth="3"/>
                    <line x1={centerX} y1={centerY} x2={greenLineX} y2={greenLineY} stroke={points[pointIndex].hypotenuseColor} strokeWidth="3"/>

                    <text 
                        x={centerX + (radius * Math.cos(angle)/2)}
                        y={blueLineY + points[pointIndex].cosOffset}
                        textAnchor="middle"
                        fill="blue"
                        fontWeight="bold"
                    >{points[pointIndex].cos}</text>
                    <text 
                        x={blueLineX + points[pointIndex].sinOffset}
                        y={centerY - (( radius * Math.sin(angle))/2)}
                        textAnchor="start"
                        fill="green"
                        fontWeight="bold"
                    >{points[pointIndex].sin}</text>
                </svg>
            </div>
        </div>
  );
    } else {
        return (
            <div className="row m-0 p-0">
                <div className="col-12 m-0 p-0">
                    <svg
                        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                        width="100%"
                        height="100%"
                        xmlns="http://www.w3.org/2000/svg">
                    {/* Circle */}
                    <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="black" />
    
                    {/* Angle Measures */}
                    {points.map((point, index) => (
                        <g key={index}>
                        <text
                            x={centerX + radius * 1.15 * Math.cos(point.angle)}
                            y={centerY - radius * 1.15 * Math.sin(point.angle)}
                            textAnchor = "middle"
                        >
                            {point.label}
                        </text>
                        <circle
                            cx={centerX + radius * Math.cos(point.angle)}
                            cy={centerY - radius * Math.sin(point.angle)}
                            r="3"
                            fill="black"
                        />
                        </g>
                    ))}
                    </svg>
                </div>
            </div>
      );

    }
}

export default function TrigonometricFunctions({username}) {

    const parameter = useParams()
    let initialTopic = parseInt(parameter.topic);
    const angles = [
        { angle: 0, label: '0', sin: '0', cos: '1', tan: '0' },
        { angle: Math.PI / 6, label: 'π/6', sin: '\\frac{1}{2}', cos: '\\frac{\\sqrt{3}}{2}', tan: '\\frac{\\sqrt{3}}{3}' },
        { angle: Math.PI / 4, label: 'π/4', sin: '\\frac{\\sqrt{2}}{2}', cos: '\\frac{\\sqrt{2}}{2}', tan: '1' },
        { angle: Math.PI / 3, label: 'π/3', sin: '\\frac{\\sqrt{3}}{2}', cos: '\\frac{1}{2}', tan: '\\sqrt{3}' },
        { angle: Math.PI / 2, label: 'π/2', sin: '1', cos: '0', tan: 'undefined' },
        { angle: ( 2 * Math.PI ) / 3, label: '2π/3', sin: '\\frac{\\sqrt{3}}{2}', cos: '-\\frac{1}{2}', tan: '-\\sqrt{3}' },
        { angle: ( 3 * Math.PI ) / 4, label: '3π/4', sin: '\\frac{\\sqrt{2}}{2}', cos: '-\\frac{\\sqrt{2}}{2}', tan: '-1' },
        { angle: ( 5 * Math.PI ) / 6, label: '5π/6', sin: '\\frac{1}{2}', cos: '-\\frac{\\sqrt{3}}{2}', tan: '-\\frac{\\sqrt{3}}{3}' },
        { angle: Math.PI, label: 'π', sin: '0', cos: '-1', tan: '0' },
        { angle: ( 7 * Math.PI ) / 6, label: '7π/6', sin: '-\\frac{1}{2}', cos: '-\\frac{\\sqrt{3}}{2}', tan: '\\sqrt{3}' },
        { angle: ( 5 * Math.PI ) / 4, label: '5π/4', sin: '-\\frac{\\sqrt{2}}{2}', cos: '-\\frac{\\sqrt{2}}{2}', tan: '1' },
        { angle: ( 4 * Math.PI ) / 3, label: '4π/3', sin: '-\\frac{\\sqrt{3}}{2}', cos: '-\\frac{1}{2}', tan: '\\sqrt{3}' },
        { angle: ( 3 * Math.PI ) / 2, label: '3π/2', sin: '-1', cos: '0', tan: 'undefined' },
        { angle: ( 5 * Math.PI ) / 3, label: '5π/3', sin: '=\\frac{\\sqrt{3}}{2}', cos: '\\frac{1}{2}', tan: '-\\sqrt{3}' },
        { angle: ( 7 * Math.PI ) / 4, label: '7π/4', sin: '-\\frac{\\sqrt{2}}{2}', cos: '\\frac{\\sqrt{2}}{2}', tan: '-1' },
        { angle: ( 11 * Math.PI ) / 6, label: '11π/6', sin: '-\\frac{1}{2}', cos: '\\frac{\\sqrt{3}}{2}', tan: '-\\frac{\\sqrt{3}}{3}' },
        { angle: 2 * Math.PI, label: '2π', sin: '0', cos: '1', sinOffset: -15, tan: '0' },
    ];
    let quizStateObj = {
        questionsAttempted: 0,
        questionsCorrect: 0,
        questionsStreak: 0,
        questionsIncorrect: 0,
        progressValue: 0,
        progressPct: 0,
        questionsToMeet: 12,
    }    
    const mathFieldRef = useRef(null);
    const [pointChoice, setPointChoice] = useState(0);
    const [questionLatex, setQuestionLatex] = useState('sin(' + angles[0].label + ')');
    const [answerLatex, setAnswerLatex] = useState('0'); 
    const [quizState, setQuizState] = useState(quizStateObj);
    const [currentTopic, setCurrentTopic] = useState(initialTopic);
    // this could be in quizState, right?
    const [startTime, setStartTime] = useState(new Date());
    useEffect(() => {
        setQuizState(quizStateObj);
        console.log("I just set the quizStateObj to this: ");
        console.dir(quizStateObj);
        setQuestion();
        if (mathFieldRef.current) {
            mathFieldRef.current.focus();
        }
    }, []);

    const [responseObj, setResponseObj] = useState({
        userAnswer: '',
        correctAnswer: '',
        answerMessage: ''
      });
    const mathLat = `\\frac{1}{2}`
    const mathLat2 = `sin (\\pi) = `
    const mathLat3 = `sin (\\frac{1}{2})`
    const [boxStyle, setBoxStyle] = useState({backgroundColor: "white", color: "black", borderWidth: "0px", borderColor: "gray", padding:0})
    const [hideTriangle, setHideTriangle] = useState(false);
    function setQuestionEngine(topicId) {
        let engineArray = questionTopics["trigonometricFunctions"];
        let engine = engineArray.find((engine) => engine.topicId == topicId)
        // TODO Need proper error handling.
        if (engine) {
          return(engine.questionEngine);
        } else {
          return("We could not find that engine!");
        }
      }
    let questionEngine = setQuestionEngine(initialTopic);
    
    async function recordSuccess (quizStateObj) {
        let currentTopicObj = questionTopics.trigonometricFunctions.find((name) => name.topicId == currentTopic);
        let topicName = currentTopicObj.topicName;
        let totalTime = new Date() - startTime;
        setStartTime(new Date());
        let sessionData = {
            userData: {
                username: username,
                questionsAttempted: quizStateObj.questionsAttempted,
                questionsCorrect: quizStateObj.questionsCorrect,
            },
            progress: {
                calculus: {
                    trigonometricFunctions: {
                        skillData: {
                            skill: topicName,
                            sessionsData: {
                                metStandard: true,
                                questionsAttempted: quizStateObj.questionsAttempted,
                                questionsCorrect: quizStateObj.questionsCorrect,
                                questionsIncorrect: quizStateObj.questionsIncorrect,
                                questionsStreak: quizStateObj.questionsStreak,
                                datetimeStarted: startTime,
                                totalTime: totalTime,
                            }
                        }
                    }
                }
            }
        }
        const response = await fetch(`${url}/record/metStandard/trigonometricFunctions`, {
            method: "POST",
            mode: 'cors',
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
          quizStateObj = {
            questionsAttempted: 0,
            questionsCorrect: 0,
            questionsStreak: 0,
            questionsIncorrect: 0,
            progressValue: 0,
            progressPct: 0,
            questionsToMeet: 12,
        }
        setQuizState(quizStateObj);    
    };

    function setQuestion(questionEngine) {
        let questionLatex = '';
        let pickTrig = getRandomIntInclusive(1,10);
        if (pickTrig >= 6) {
            questionLatex = 'sin(' 
        } else if (pickTrig >=2) {
            questionLatex = 'cos('
        } else {
            questionLatex = 'tan('
        }
        let pick = 0;
        if (questionEngine == "basicEvaluation") {
            let pickChoices = [0, 1, 2, 3, 4, 8, 12, 16]
            pick = pickChoices[getRandomIntInclusive(0, 7)];
        } else if (questionEngine == "halfCircleEvaluation") {
            let pickChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8]
            pick = pickChoices[getRandomIntInclusive(0, 8)];
        } else if (questionEngine == "fullCircleEvaluation") {
            pick = getRandomIntInclusive(0, 16);
        }
        console.log(pick)
        let labelLatex = angles[pick].label + ')';
        questionLatex = questionLatex + labelLatex;
        let answerLatex = buildAnswerLatex(pickTrig, pick);
        setPointChoice(pick);
        setQuestionLatex(questionLatex);
        setAnswerLatex(answerLatex);
    }

    function buildAnswerLatex(pickTrig, pick) {
        let answerLatex;
        if (pickTrig >= 6) {
            answerLatex = angles[pick].sin;
        } else if (pickTrig >=2) {
            answerLatex = angles[pick].cos;
        } else {
            answerLatex = angles[pick].tan;
        }
        return answerLatex;
    }
    function updateSituation(value) {
        return setResponseObj((prev) => {
          return {...prev, ...value}
        });
      }

    const handleKeyDown = event => {
        if (event.key == 'Enter') {
            event.preventDefault();
            handleSubmit(event);
        }
    }
    const handleCheckChange = (e) => {
        setHideTriangle(e.target.checked);
        let quizStateObject = {
            questionsAttempted: 0,
            questionsCorrect: 0,
            questionsStreak: 0,
            questionsIncorrect: 0,
            progressValue: 0,
            progressPct: 0,
            questionsToMeet: 12,
        }        
        setQuizState(quizStateObject);
    }
    
    function handleSubmit(event) {
        let metStandard = false;
        event.preventDefault();
        let answerMessage = '';
        quizStateObj = quizState;
        quizStateObj.questionsAttempted = quizState.questionsAttempted + 1;
        if (responseObj.userAnswer === answerLatex) {
            setBoxStyle({backgroundColor: "green", color:"white", borderWidth: "0px", borderColor: "gray"})
            quizStateObj.questionsStreak = quizState.questionsStreak + 1;
            quizStateObj.questionsCorrect = quizState.questionsCorrect + 1;
            if (quizStateObj.questionsCorrect >= quizState.questionsToMeet) {    
                answerMessage = "Success! You met the standard. Go to the next topic.";
            metStandard = true;              
            }
            answerMessage = "Correct";
        } else {
            setBoxStyle({backgroundColor:"white", color: "red", borderWidth: "2px", borderColor: "red"})
            quizStateObj.questionsStreak = 0;
            quizStateObj.questionsIncorrect = quizState.questionsIncorrect + 1;
            answerMessage = "Sorry, that's not it.";           
        }
        updateSituation({answerMessage: answerMessage});
        quizStateObj.progressPct = Math.round(((quizState.questionsCorrect + 1) / quizState.questionsToMeet) * 100);
        quizStateObj.progressValue = quizStateObj.progressPct;
        console.dir(quizStateObj);
        setQuizState(quizStateObj);
        setTimeout(function() {
            if (metStandard && hideTriangle) {
                console.log("recording success")
                recordSuccess(quizStateObj);
            }
            updateSituation({answerMessage: '', userAnswer: ''})
            setBoxStyle({backgroundColor:"white", color: "black", borderWidth: "0", borderColor: "gray"})
            setQuestion(questionEngine);
        }, 1500);
    }
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <ProgressBar variant="primary3x^2" style={{borderRadius: '0', backgroundColor: "LightGray"}}now={quizState.progressValue} label={`${quizState.progressPct}%`} max='100'/>
                </div>
            </div>
            <div className="row m-0 p-0 fs-6">
                <p className="m-0 p-0">{responseObj.answerMessage}</p>
            </div>
            <div className="row m-0 p-0">
                <div className="col-5 mt-3 fs-6">
                    <p><StaticMathField>{questionLatex}</StaticMathField>=</p>
                </div>
                <div className="col-7 mt-2">
                    <form onSubmit={handleSubmit} method="post" action="#">
                        <div className="row mt-0 p-0">
                            <div className="col-5 m-0 p-0">
                            <EditableMathField
                                type="input"
                                id="answerInput"
                                className="form-control text-center fs-4 p-2"
                                style={boxStyle}
                                aria-describedby="answer input"
                                latex={responseObj.userAnswer}
                                onChange={(mathField)=>updateSituation({userAnswer: mathField.latex()})}
                                mathquillDidMount={mathField => (mathFieldRef.current = mathField)}
                                onKeyDown={handleKeyDown}
                            />
                            </div>
                            <div className="col-3 m-1 p-0">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    size="sm"
                                >
                                    SUBMIT
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row mt-2 p-0">
                <div className="col-8 offset-2">
                    <Form.Check
                        type="switch"
                        label="hide triangle"
                        className="fs-6"
                        checked={hideTriangle}
                        onChange={handleCheckChange}
                    />
                </div>
            </div>            
            <UnitCircle 
                pointChoice={pointChoice}
                hideTriangle={hideTriangle}
            />  
            <div className="row">
                <NavLink to="/trigonometricTopics" >
                    <Button variant="primary" size="lg">Unit Circle Topics</Button>
                </NavLink>
            </div>
        </>
    )
}


