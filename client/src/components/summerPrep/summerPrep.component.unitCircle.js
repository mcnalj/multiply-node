import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { ProgressBar, Button, Form} from 'react-bootstrap';
import { addStyles, StaticMathField, EditableMathField } from 'react-mathquill';
import {
    getRandomIntInclusive,
  } from '../math-scripts/utilities-scripts.js';

import '../../App.scss';
import '../../index.scss';
import './summerPrep.component.unitCircle.scss';
// import './derivatives.component.derivatives.scss';

import {
  setAction,
  recordAction
} from '../infrastructure/recordProgress.js';

import { config} from '../constants.js';
var url = config.url.API_URL;

addStyles();

const questionTopics = {
    "trigonometricFunctions": [
        {
            topicId: 100,
            topicName:  "unitCircleWarmUpFirstQuadrant",
            questionsToMeet: 15
        },
        {
            topicId: 120,
            topicName:  "unitCircleWarmUpSecondQuadrant",
            questionsToMeet: 12
        },
        {
            topicId: 140,
            topicName:  "unitCircleWarmUpThirdQuadrant",
            questionsToMeet: 12
        },
        {
            topicId: 160,
            topicName:  "unitCircleWarmUpFourthQuadrant",
            questionsToMeet: 12
        },        
        {
            topicId: 200,
            topicName:  "unitCircleSineFirstQuadrant",
            questionsToMeet: 8
        },                
        {
            topicId: 220,
            topicName:  "unitCircleSineFirstHalf",
            questionsToMeet: 12
        },
        {
            topicId: 240,
            topicName:  "unitCircleSineFullCircle",
            questionsToMeet: 16
        },
        {
            topicId: 300,
            topicName:  "unitCircleCosineFirstQuadrant",
            questionsToMeet: 8
        },                
        {
            topicId: 320,
            topicName:  "unitCircleCosineFirstHalf",
            questionsToMeet: 12
        },
        {
            topicId: 340,
            topicName:  "unitCircleCosineFullCircle",
            questionsToMeet: 16
        },
        {
            topicId: 400,
            topicName:  "unitCircleTangentFirstQuadrant",
            questionsToMeet: 8
        },                
        {
            topicId: 420,
            topicName:  "unitCircleTangentFirstHalf",
            questionsToMeet: 12
        },
        {
            topicId: 440,
            topicName:  "unitCircleTangentFullCircle",
            questionsToMeet: 16
        },                        
        {
            topicId: 1001,
            topicName:  "unitCircleFirstQuadrant",
            questionsToMeet: 12
        },                                                        
        {
            topicId: 1020,
            topicName:  "unitCircleFirstHalf",
            questionsToMeet: 12
        },
        {
            topicId: 1040,
            topicName:  "unitCircleFullCircle",
            questionsToMeet: 12
        },
        {
            topicId: 1000,
            topicName:  "essentialUnitCircle",
            questionsToMeet: 12
        }, 
    ]
}

function UnitCircleImage({pointChoice, hideTriangle, showTextValues = true}) {

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
            {/* <div className="mx-auto" style={{ maxWidth: "500px", width: "100%", marginTop: '-5%'}} > */}
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
                    >
                        {points[pointIndex].cos}
                    </text>
                    <text 
                        x={blueLineX + points[pointIndex].sinOffset}
                        y={centerY - (( radius * Math.sin(angle))/2)}
                        textAnchor="start"
                        fill="green"
                        fontWeight="bold"
                    >
                        {points[pointIndex].sin}
                    </text>
                </svg>
            </div>
        </div>
  );
    } else {
        return (
            <div className="row m-0 p-0">
                {/* <div className="col-12 m-0 p-0"> */}
                <div className="mx-auto" style={{ maxWidth: "500px", width: "100%"}} >
                    <svg
                        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                        width="100%"
                        height="100%"
                        style={{display: 'block'}}
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
                    {/* Conditionally show text values when showTextValues is true */}
                    {showTextValues && (
                        <>
                            <text 
                                x={centerX + (radius * Math.cos(angle)/2)}
                                y={blueLineY + points[pointIndex].cosOffset}
                                textAnchor="middle"
                                fill="blue"
                                fontWeight="bold"
                            >
                                {points[pointIndex].cos}
                            </text>
                            <text 
                                x={blueLineX + points[pointIndex].sinOffset}
                                y={centerY - (( radius * Math.sin(angle))/2)}
                                textAnchor="start"
                                fill="green"
                                fontWeight="bold"
                            >
                                {points[pointIndex].sin}
                            </text>
                        </>
                    )}
                    </svg>
                </div>
            </div>
      );

    }
}

export default function UnitCircle({userId}) {

    const parameter = useParams()
    let initialTopic = 120
    initialTopic = parseInt(parameter.topic);
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
    const [questionLatex, setQuestionLatex] = useState('sin(' + angles[0].label + ')=');
    const [answerLatex, setAnswerLatex] = useState('0'); 
    const [quizState, setQuizState] = useState(quizStateObj);
    const [currentTopic, setCurrentTopic] = useState(initialTopic);

    const [startTime, setStartTime] = useState(useRef(new Date()));
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [count, setCount] = useState(0);
    const [pointChoice, setPointChoice] = useState(0);
    const [hideTriangle, setHideTriangle] = useState(false);
    // const [questionParametersObject, setQuestionParameters] = useState(
    //     {
    //         trigonometricFunction: 'sin(',
    //         angleArray: angles.slice(0, 5),
    //         pointIndexArray: [0, 1, 2, 3, 4],
    //         isCyclical: false,
    //     }
    // );

    const questionParametersObject = useMemo(() => {
        return setQuestionParametersObject(initialTopic);
    }, [initialTopic, currentTopic]);

    useEffect(() => {
        // const params = setQuestionParametersObject(initialTopic)
        // setQuestionParameters(params);

        let tempTopicObj = questionTopics.trigonometricFunctions.find(
                (name) => name.topicId == currentTopic
        );
        quizStateObj.questionsToMeet = tempTopicObj.questionsToMeet;
        setQuizState(quizStateObj);
        setQuestion(count);
        if (mathFieldRef.current) {
            mathFieldRef.current.focus();
        }
    }, [initialTopic,currentTopic]);

    // Handle hideTriangle side effect separately
    useEffect(() => {
        if (currentTopic < 200) {
            setHideTriangle(false);
        } else if (currentTopic >= 200 && currentTopic < 1000) {
            setHideTriangle(false);
        } else if (currentTopic >= 1000) {
            setHideTriangle(true);
        }
    }, [currentTopic]);

    const [responseObj, setResponseObj] = useState({
        userAnswer: '',
        correctAnswer: '',
        answerMessage: ''
      });
    const [boxStyle, setBoxStyle] = useState({backgroundColor: "white", color: "black", borderWidth: "0px", borderColor: "gray", padding:0})
    

    async function recordSuccess (quizStateObj) {
        try {
            const {
                questionsAttempted,
                questionsCorrect,
                questionsIncorrect,
                questionsStreak,
            } = quizStateObj;

            const currentTopicObj = questionTopics.trigonometricFunctions.find(
                (name) => name.topicId == currentTopic
            );
            if (!currentTopicObj) {
                throw new Error(`Invalid topicId: ${currentTopic}`)
            }

            const topicName = currentTopicObj.topicName;
            const totalTime = new Date() - startTime.current;
            
            const actionDetails = {
                section: "summerPrep",
                unit: "unitCircle",
                topic: topicName,
                metStandard: true,
                questionsAttempted,
                questionsCorrect,
                questionsIncorrect,
                questionsStreak,
                datetimeStarted: startTime.current,
                totalTime,
            }
            const action = setAction("skillCompleted", actionDetails, userId);
            const result = await recordAction(action);
            navigate("/skillComplete", {state: actionDetails});
        } catch (error) {    
            if (error.name === "TypeError") {
                console.error("Network error or issue with recording progress:", error);
                setErrorMessage("We are unable to record your progress. Please check your inernet connection.");
            } else {
                console.error("Error processing request:", error);
                setErrorMessage(error.message || "Sorry, there was an error recording your progress. Please try again later.");
            }
        }
    }    

    // function setQuestionParametersObject(topicId) {
    //     let trigonometricFunction = ''
    //     let isCyclical = false;
    //     if (topicId < 200) {
    //         setHideTriangle(false);
    //         trigonometricFunction = 'sin(';
    //         isCyclical = true;
    //     }
    //     if (topicId >= 200 && topicId < 300) {
    //         trigonometricFunction = 'sin(';
    //     } else if (topicId >= 300 && topicId < 400) {
    //         trigonometricFunction = 'cos(';
    //     } else if (topicId >= 400 && topicId < 500) {
    //         trigonometricFunction = 'tan(';
    //     } else if (topicId >= 1000 && topicId < 1100) {
    //         trigonometricFunction = 'mix';
    //     } 
    //     let angleArray = [];
    //     let pointIndexArray = [];
    //     if (topicId == 100 || topicId == 200 || topicId == 300 || topicId == 400 || topicId == 1001) {
    //         angleArray = angles.slice(0, 5);
    //         pointIndexArray = [0, 1, 2, 3, 4];
    //     } else if (topicId == 120) {
    //         angleArray = angles.slice(4, 9);
    //         pointIndexArray = [4, 5, 6, 7, 8];
    //     } else if (topicId == 140){
    //         angleArray = angles.slice(9, 14);
    //         pointIndexArray = [9, 10, 11, 12, 13];
    //     } else if (topicId == 160) {
    //         angleArray = angles.slice(14, 19);
    //         pointIndexArray = [14, 15, 16, 17, 18];
    //     } else if (topicId == 220 || topicId == 320 || topicId == 420 || topicId == 1020) {
    //         angleArray = angles.slice(0, 9);
    //         pointIndexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    //     } else if (topicId == 240 || topicId == 340 || topicId == 440 || topicId == 1040) {
    //         angleArray = angles.slice(0, 19);
    //         pointIndexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    //     } else if (topicId == 1000) {
    //         angleArray = angles.slice(0, 5) + angles.slice(9, 10).concat(angles.slice(14, 15)).concat(angles.slice(19, 20));
    //         pointIndexArray = [0, 1, 2, 3, 4, 9, 10, 14, 15, 19];  
    //     }
    //     if (topicId >= 1000) {
    //         angleArray = shuffleArray(angleArray);
    //         // how do we keep these synched?
    //         pointIndexArray = shuffleArray(pointIndexArray);
    //     }
    //     return {
    //         trigonometricFunction: trigonometricFunction,
    //         angleArray: angleArray,
    //         pointIndexArray: pointIndexArray,
    //         isCyclical: isCyclical,
    //     }
    // }

    function setQuestionParametersObject(topicId) {
        const trigFunction =
            topicId < 200
            ? 'sin('
            : topicId < 300
            ? 'sin('
            : topicId < 400
            ? 'cos('
            : topicId < 500
            ? 'tan('
            : topicId < 1100
            ? 'mix'
            : '';
        const isCyclical = topicId < 200;

        const ranges = {
            100: { slice: [0, 5], indexes: [0, 1, 2, 3, 4] },
            200: { slice: [0, 5], indexes: [0, 1, 2, 3, 4] },
            300: { slice: [0, 5], indexes: [0, 1, 2, 3, 4] },
            400: { slice: [0, 5], indexes: [0, 1, 2, 3, 4] },
            1001: { slice: [0, 5], indexes: [0, 1, 2, 3, 4] },
            120: { slice: [4, 9], indexes: [4, 5, 6, 7, 8] },
            140: { slice: [8, 14], indexes: [8, 9, 10, 11, 12] },
            160: { slice: [12, 17], indexes: [12, 13, 14, 15, 16] },
            220: { slice: [0, 9], indexes: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
            320: { slice: [0, 9], indexes: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
            420: { slice: [0, 9], indexes: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
            1020: { slice: [0, 9], indexes: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
            240: {
                slice: [0, 19],
                indexes: Array.from({ length: 19 }, (_, i) => i),
            },
            340: {
                slice: [0, 19],
                indexes: Array.from({ length: 19 }, (_, i) => i),
            },
            440: {
                slice: [0, 19],
                indexes: Array.from({ length: 19 }, (_, i) => i),
            },
            1040: {
                slice: [0, 19],
                indexes: Array.from({ length: 19 }, (_, i) => i),
            },
            1000: {
                custom: true,
                angles: [0, 1, 2, 3, 4, 9, 10, 14, 15, 19],
            },
        };
        
        let angleArray = [];
        let pointIndexArray = [];
        if (ranges[topicId]) {
            const range = ranges[topicId];
            console.log("range: ", range);
            if (range.custom) {
                pointIndexArray = range.angles;
                angleArray = range.angles.map((i) => angles[i]);
            } else {
                angleArray = angles.slice(...range.slice);
                console.log("angleArray: ", angleArray);
                pointIndexArray = range.indexes;
            }
        }

        if (topicId >= 1000) {
            const combined = angleArray.map((a, i) => ({ angle: a, index: pointIndexArray[i] }));
            const shuffled = shuffleArray(combined);
            angleArray = shuffled.map((item) => item.angle);
            pointIndexArray = shuffled.map((item) => item.index);
        }

        return {
            trigonometricFunction: trigFunction,
            angleArray,
            pointIndexArray,
            isCyclical,
        };
    }

    function shuffleArray(array) {
        const shuffled = [...array]; // copy the array
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // pick a random index
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // swap
        }
        return shuffled;
    }

    function setQuestion(count) {
        let questionLatex = questionParametersObject.trigonometricFunction;
        if (questionLatex == 'mix') {
            let pickTrig = getRandomIntInclusive(1,10);
            if (pickTrig >= 6) {
                questionLatex = 'sin('
            } else if (pickTrig >=2) {
                questionLatex = 'cos('
            } else {
                questionLatex = 'tan('
            }
        } 
        // if (questionParametersObject.isCyclical && count >= questionParametersObject.angleArray.length) {
            if (questionParametersObject.isCyclical && count >= questionParametersObject.pointIndexArray.length) {  
            count = 0;
            setCount(0);
            // setQuestionParametersObject((prev) => {
            
            //     if (prev.trigonometricFunction === 'sin(') {
            //         questionLatex = 'cos(';
            //     }
            //     else if (prev.trigonometricFunction === 'cos(') {
            //         questionLatex = 'tan(';
            //     }
            //     else if (prev.trigonometricFunction === 'tan(') {
            //         count = 15;
            //     }
            //     return {
            //         ...prev,
            //         trigonometricFunction: questionLatex,
            //     }
            // })
            if (questionParametersObject.trigonometricFunction == 'sin(') {
                questionLatex = 'cos(';
                questionParametersObject.trigonometricFunction = 'cos(';
            } else if (questionParametersObject.trigonometricFunction == 'cos(') {
                questionLatex = 'tan(';
                questionParametersObject.trigonometricFunction = 'tan(';
            } else if (questionParametersObject.trigonometricFunction == 'tan(') {
                count = 15
            }
        }
        let angles = questionParametersObject.angleArray;
        console.dir(angles);
        let labelLatex = angles[count].label + ')=';
        questionLatex = questionLatex + labelLatex;
        let answerLatex = buildAnswerLatex(questionLatex, count);
        console.log("count: " + count);
        console.log("questionLatex: " + questionLatex);
        console.log("answerLatex: " + answerLatex);

        setPointChoice(questionParametersObject.pointIndexArray[count]);
        setQuestionLatex(questionLatex);
        setAnswerLatex(answerLatex);
    }

    function buildAnswerLatex(questionLatex, count) {
        let answerLatex;
        if (questionLatex.startsWith('sin')) {
            answerLatex = questionParametersObject.angleArray[count].sin;
        } else if (questionLatex.startsWith('cos')) {
            answerLatex = questionParametersObject.angleArray[count].cos;
        } else if (questionLatex.startsWith('tan')) {
            answerLatex = questionParametersObject.angleArray[count].tan;
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
    
    // function handleSubmit(event) {
    //     if (event) {
    //         event.preventDefault();
    //         console.log("handleSubmit called");
    //     }
        
    //     let metStandard = false;
        
    //     let answerMessage = '';
    //     const updatedState = {
    //         ...quizState,
    //         questionsAttempted: quizState.questionsAttempted + 1,
    //         questionsStreak: quizState.questionsStreak,
    //         questionsCorrect: quizState.questionsCorrect,
    //         questionsIncorrect: quizState.questionsIncorrect,
    //         questionsToMeet: quizState.questionsToMeet,
    //         progressPct: Math.round(((quizState.questionsCorrect + 1)/ quizState.questionsToMeet) * 100),
    //         progressValue: Math.round(((quizState.questionsCorrect + 1)/ quizState.questionsToMeet) * 100),
    //     };
    //     if (responseObj.userAnswer === answerLatex) {
    //         setBoxStyle({backgroundColor: "green", color:"white", borderWidth: "0px", borderColor: "gray"})
    //         updatedState.questionsStreak = quizState.questionsStreak + 1;
    //         updatedState.questionsCorrect = quizState.questionsCorrect + 1;
    //         if (updatedState.questionsCorrect >= quizState.questionsToMeet) {    
    //             answerMessage = "Success! You met the standard. Go to the next topic.";
    //             metStandard = true;              
    //         }
    //         answerMessage = "Correct!";
    //         setCount(count + 1);
    //     } else {
    //         setBoxStyle({backgroundColor:"white", color: "red", borderWidth: "2px", borderColor: "red"})
    //         updatedState.questionsStreak = 0;
    //         updatedState.questionsIncorrect = quizState.questionsIncorrect + 1;
    //         answerMessage = "Sorry, that's not it.";           
    //     }
    //     updateSituation({answerMessage: answerMessage});
    //     updatedState.progressPct = Math.round(((quizState.questionsCorrect + 1) / quizState.questionsToMeet) * 100);
    //     updatedState.progressValue = quizStateObj.progressPct;
    //     console.dir(quizStateObj);
    //     setQuizState(quizStateObj);
    //     setTimeout(function() {
    //         // if (metStandard && hideTriangle) {
    //         if (metStandard) {
    //             console.log("recording success")
    //             recordSuccess(updatedState);
    //             setStartTime(new Date());
    //             updatedState = {
    //                 questionsAttempted: 0,
    //                 questionsCorrect: 0,
    //                 questionsStreak: 0,
    //                 questionsIncorrect: 0,
    //                 progressValue: 0,
    //                 progressPct: 0,
    //                 questionsToMeet: quizState.questionsToMeet,
    //          }
    //             setQuizState(updatedState);
    //         }
    //         updateSituation({answerMessage: '', userAnswer: ''})
    //         setBoxStyle({backgroundColor:"white", color: "black", borderWidth: "0", borderColor: "gray"})
    //         setQuestion(count + 1);
    //     }, 1500);
    
    // }

    function handleSubmit(event) {
        event.preventDefault();
        
        let metStandard = false;

        const isCorrect = responseObj.userAnswer === answerLatex;

        const updatedState = {
            ...quizState,
            questionsAttempted: quizState.questionsAttempted + 1,
            questionsStreak: isCorrect ? quizState.questionsStreak + 1 : 0,
            questionsCorrect: isCorrect ? quizState.questionsCorrect + 1 : quizState.questionsCorrect,
            questionsIncorrect: !isCorrect ? quizState.questionsIncorrect + 1 : quizState.questionsIncorrect,
            questionsToMeet: quizState.questionsToMeet,
            progressPct: Math.round(
                ((isCorrect ? quizState.questionsCorrect + 1 : quizState.questionsCorrect) /
                    quizState.questionsToMeet) *
                    100
            ),
            progressValue: Math.round(
                ((isCorrect ? quizState.questionsCorrect + 1 : quizState.questionsCorrect) /
                    quizState.questionsToMeet) *
                    100
            ),
        };

        let answerMessage = isCorrect ? "Correct!" : "Sorry, that's not it.";
        if (isCorrect && updatedState.questionsCorrect >= updatedState.questionsToMeet) {
            answerMessage = "Success! You met the standard. Go to the next topic.";
            metStandard = true;
        }

        setBoxStyle(isCorrect
            ? {backgroundColor: "green", color: "white", borderWidth: "0px", borderColor: "gray"}
            : {backgroundColor: "white", color: "red", borderWidth: "2px", borderColor: "red"}
        );
        updateSituation({answerMessage});

        setQuizState({ ...updatedState }); // Final state updated

        setTimeout(() => {
            if (metStandard) {
                console.log("recording success");
                recordSuccess(updatedState);
                setStartTime(new Date());
                setQuizState({
                    questionsAttempted: 0,
                    questionsCorrect: 0,
                    questionsStreak: 0,
                    questionsIncorrect: 0,
                    progressValue: 0,
                    progressPct: 0,
                    questionsToMeet: updatedState.questionsToMeet,
                });
            }
            updateSituation({answerMessage: '', userAnswer: ''});
            setBoxStyle({backgroundColor: "white", color: "black", borderWidth: "0", borderColor: "gray"});
            setCount(count + 1);
            
            //Update the question for the next round
            setQuestion(count + 1);
            // Reset the math field focus
            if (mathFieldRef.current) {
                setTimeout(() => mathFieldRef.current.focus(), 10);
            }
        }, 1500);
    }

    function appendLatex(latex) {
      setResponseObj((prev) => ({
        ...prev,
        userAnswer: (prev.userAnswer || "") + latex,
      }));
      if (mathFieldRef.current) {
        setTimeout(() => mathFieldRef.current.focus(), 0);
      }
    }

    function makeNegative() {
      setResponseObj((prev) => {
        const currentAnswer = prev.userAnswer || "";
        let negativeAnswer;
        
        if (currentAnswer === "") {
          negativeAnswer = "-";
        } else if (currentAnswer.startsWith("-")) {
          // If already negative, remove the negative sign
          negativeAnswer = currentAnswer.substring(1);
        } else {
          // Add negative sign
          negativeAnswer = "-" + currentAnswer;
        }
        
        return {
          ...prev,
          userAnswer: negativeAnswer,
        };
      });
      if (mathFieldRef.current) {
        setTimeout(() => mathFieldRef.current.focus(), 0);
      }
    }

    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <ProgressBar variant="primary3x^2" style={{borderRadius: '0', backgroundColor: "LightGray"}}now={quizState.progressValue} label={`${quizState.progressPct}%`} max='100'/>
                </div>
            </div>
            <div className="row d-flex justify-content-center m-0 p-0">
                <div className="col-4 mt-2 formColumn">
                    <div className="row">
                        <div className="m-0 p-0 fs-3">
                            <StaticMathField>{questionLatex}</StaticMathField>
                        </div>
                    </div>
                    <form key={count} onSubmit={handleSubmit} method="post" action="#">
                        <div className="row mt-3 p-0">
                            <div className="m-0 p-0">
                                <EditableMathField
                                    type="input"
                                    id="answerInput"
                                    className="form-control text-center fs-4 p-0"
                                    style={boxStyle}
                                    aria-describedby="answer input"
                                    latex={responseObj.userAnswer}
                                    onChange={(mathField)=>updateSituation({userAnswer: mathField.latex()})}
                                    mathquillDidMount={mathField => (mathFieldRef.current = mathField)}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                        </div>
                        <div className="row mt-0 p-0">
                            <div className="mt-2 p-0">
                                {/* <input
                                    type="text"
                                    style={{position: "absolute", left: "-9999px"} }
                                    value={responseObj.userAnswer}
                                    readOnly
                                >
                                </input> */}
                                <Button
                                    variant="primary"
                                    type="submit"
                                    size="md"
                                >
                                    SUBMIT
                                </Button>
                            </div>
                        </div>
                        <div className="row m-0 p-0 fs-4">
                            <p className="m-0 p-0">{responseObj.answerMessage}</p>
                        </div>
                    </form>
                </div>
                <div className="col-4 p-2 buttonsColumn">
                    {
                        [
                            ["0", "1", "undefined"],
                            ["\\frac{1}{2}", "\\frac{\\sqrt{2}}{2}", "\\frac{\\sqrt{3}}{2}"],
                            ["\\frac{\\sqrt{3}}{3}", "\\sqrt{3}", "neg"],
                        ].map((row, rowIndex)=> (
                        <div className="row" key={rowIndex}>
                            <div className="col-12 d-flex gap-2 mb-2">
                                {row.map((value, colIndex) => (
                                    <Button
                                        key={`${rowIndex}-${colIndex}`}
                                        variant="primary"
                                        size="sm"
                                        className="math-button"
                                        onClick={() => value === "neg" ? makeNegative() : appendLatex(value)}
                                    >
                                        <StaticMathField>{value === "neg" ? "±" : value}</StaticMathField>
                                    </Button>
                                ))}
                            </div>
                        </div>
                        ))
                    }
                </div>
            </div>
            {/* <div className="row mt-2 p-0">
                <div className="col-8 offset-2">
                    <Form.Check
                        type="switch"
                        label="hide triangle"
                        className="fs-6"
                        checked={hideTriangle}
                        onChange={handleCheckChange}
                    />
                </div>
            </div>             */}
            <UnitCircleImage 
                pointChoice={pointChoice}
                hideTriangle={hideTriangle}
                showTextValues={currentTopic < 200}
            />  
            <div className="row">
                <NavLink to="/unitCircleTopics" >
                    <Button variant="primary" size="lg">Unit Circle Topics</Button>
                </NavLink>
            </div>
        </div>
    )
}