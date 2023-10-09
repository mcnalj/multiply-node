import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from "react-router-dom";
import { ProgressBar, Button, Offcanvas} from 'react-bootstrap';
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

function UnitCircle({username, pointChoice}) {

    
    const svgWidth = 400;
    const svgHeight = 400;
    const radius = svgWidth / 3;
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;

    // Calculate the coordinates of each point
    const points = [
    { angle: 0, label: '0, 2π', sin: '0', cos: '1', sinOffset: -15, cosOffset: 20, hypotenuseColor: 'blue' },
    { angle: Math.PI / 6, label: 'π/6', sin: '1/2', cos: '√3/2', sinOffset: 5, cosOffset: 20, hypotenuseColor: 'black' },
    { angle: Math.PI / 4, label: 'π/4', sin: '√2/2', cos: '√2/2', sinOffset: 5, cosOffset: 20, hypotenuseColor: 'black' },
    { angle: Math.PI / 3, label: 'π/3', sin: '√3/2', cos: '1/2', sinOffset: 5, cosOffset: 20, hypotenuseColor: 'black' },
    { angle: Math.PI / 2, label: 'π/2', sin: '1', cos: '0', sinOffset: 5, cosOffset: 20, hypotenuseColor: 'green' },
    { angle: ( 2 * Math.PI ) / 3, label: '2π/3', sin: '√3/2', cos: '-1/2', sinOffset: -35, cosOffset: 20, hypotenuseColor: 'black' },
    { angle: ( 3 * Math.PI ) / 4, label: '3π/4', sin: '√2/2', cos: '-√2/2', sinOffset: -35, cosOffset: 20, hypotenuseColor: 'black' },
    { angle: ( 5 * Math.PI ) / 6, label: '5π/6', sin: '1/2', cos: '-√3/2', sinOffset: -35, cosOffset: 20, hypotenuseColor: 'black' },
    { angle: Math.PI, label: 'π', sin: '0', cos: '-1', sinOffset: 5, cosOffset: 20, hypotenuseColor: 'blue' },
    { angle: ( 7 * Math.PI ) / 6, label: '2π/3', sin: '-√3/2', cos: '-1/2', sinOffset: -45, cosOffset: -10, hypotenuseColor: 'black' },
    { angle: ( 5 * Math.PI ) / 4, label: '3π/4', sin: '-√2/2', cos: '-√2/2', sinOffset: -40, cosOffset: -10, hypotenuseColor: 'black' },
    { angle: ( 4 * Math.PI ) / 3, label: '5π/6', sin: '-1/2', cos: '-√3/2', sinOffset: -35, cosOffset: -10, hypotenuseColor: 'black' },
    { angle: ( 3 * Math.PI ) / 2, label: 'π', sin: '-1', cos: '0', sinOffset: 5, cosOffset: -10, hypotenuseColor: 'green' },
    { angle: ( 5 * Math.PI ) / 3, label: 'π/6', sin: '1/2', cos: '√3/2', sinOffset: 5, cosOffset: -10, hypotenuseColor: 'black' },
    { angle: ( 7 * Math.PI ) / 4, label: 'π/4', sin: '√2/2', cos: '√2/2', sinOffset: 5, cosOffset: -10, hypotenuseColor: 'black' },
    { angle: ( 11 * Math.PI ) / 6, label: 'π/3', sin: '√3/2', cos: '1/2', sinOffset: 5, cosOffset: -10, hypotenuseColor: 'black' },
    { angle: 2 * Math.PI, label: '0, 2π', sin: '0', cos: '1', sinOffset: -15, cosOffset: 20, hypotenuseColor: 'blue' },

    ];
    const pointIndex = pointChoice
    const angle = points[pointIndex].angle
    const blueLineX = centerX + (radius * Math.cos(angle));
    const blueLineY = centerY

    //   const greenLineX = (centerX + (radius * Math.cos(angle)));
    const greenLineX = blueLineX;
    const greenLineY = (centerY - ( radius * Math.sin(angle)));

    console.log(points[pointIndex]["sinOffset"])
    console.log(points[pointIndex].label)

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
}

export default function TrigonometricFunctions({username}) {
    const angles = [
        { angle: 0, label: '0, 2π', sin: '0', cos: '1', tan: '0' },
        { angle: Math.PI / 6, label: '\frac{\π}{6}', sin: '\frac{1}{2}', cos: '√3/2', tan: '0' },
        { angle: Math.PI / 4, label: 'π/4', sin: '\frac{\sqrt{2}}{2}', cos: '\frac{\sqrt{2}}{2}', tan: '0' },
        { angle: Math.PI / 3, label: 'π/3', sin: '\frac{\sqrt{3}}{2}', cos: '\frac{1}{2}', tan: '0' },
        { angle: Math.PI / 2, label: 'π/2', sin: '1', cos: '0', tan: '0' },
        { angle: ( 2 * Math.PI ) / 3, label: '2π/3', sin: '√3/2', cos: '-1/2', tan: '0' },
        { angle: ( 3 * Math.PI ) / 4, label: '3π/4', sin: '√2/2', cos: '-√2/2', tan: '0' },
        { angle: ( 5 * Math.PI ) / 6, label: '5π/6', sin: '1/2', cos: '-√3/2', tan: '0' },
        { angle: Math.PI, label: 'π', sin: '0', cos: '-1', tan: '0' },
        { angle: ( 7 * Math.PI ) / 6, label: '2π/3', sin: '-√3/2', cos: '-1/2', tan: '0' },
        { angle: ( 5 * Math.PI ) / 4, label: '3π/4', sin: '-√2/2', cos: '-√2/2', tan: '0' },
        { angle: ( 4 * Math.PI ) / 3, label: '5π/6', sin: '-1/2', cos: '-√3/2', tan: '0' },
        { angle: ( 3 * Math.PI ) / 2, label: 'π', sin: '-1', cos: '0', tan: '0' },
        { angle: ( 5 * Math.PI ) / 3, label: 'π/6', sin: '1/2', cos: '√3/2', tan: '0' },
        { angle: ( 7 * Math.PI ) / 4, label: 'π/4', sin: '√2/2', cos: '√2/2', tan: '0' },
        { angle: ( 11 * Math.PI ) / 6, label: 'π/3', sin: '√3/2', cos: '1/2', tan: '0' },
        { angle: 2 * Math.PI, label: '0, 2π', sin: '0', cos: '1', sinOffset: -15, tan: '0' },
    ];    
    const mathFieldRef = useRef(null);
    const [pointChoice, setPointChoice] = useState(0);
    const [questionLatex, setQuestionLatex] = useState('sin(' + angles[0].label + ')');
    const [answerLatex, setAnswerLatex] = useState('0'); 
  
    useEffect(() => {
        setQuestion();
        if (mathFieldRef.current) {
            mathFieldRef.current.focus();
        }
    }, []);

    const [responseObj, setResponseObj] = useState({
        userAnswer: `\\frac{\\pi}{2}`,
        correctAnswer: '',
        answerMessage: ''
      });
    const mathLat = `\\frac{1}{2}`
    const mathLat2 = `sin (\\pi) = `
    const mathLat3 = `sin (\\frac{1}{2})`
    const [boxStyle, setBoxStyle] = useState({backgroundColor: "white", color: "black", borderWidth: "0px", borderColor: "gray", padding:0})



    function setQuestion() {
        let questionLatex = '';
        let pickTrig = getRandomIntInclusive(1,10);
        if (pickTrig >= 6) {
            questionLatex = 'sin(' 
        } else if (pickTrig >=3) {
            questionLatex = 'cos('
        } else {
            questionLatex = 'tan('
        }
        let pick = getRandomIntInclusive(0, 16);
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
        } else if (pickTrig >=3) {
            answerLatex = angles[pick].cos;
        } else {
            answerLatex = angles[pick].tan;
        }
        return answerLatex;
    }
    function updateSituation(value) {
        return setResponseObj((prev) => {
            console.log(value);
          return {...prev, ...value}
        });
      }

    const handleKeyDown = event => {
        if (event.key == 'Enter') {
            event.preventDefault();
            handleSubmit(event);
        }
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        console.log(responseObj.userAnswer);
        // here's where is check responseObj.userAnswer against answerLatex
        // then get the next question
    }
    return (
        <>
        <div className="row m-0 p-0">
            <div className="col-3 mt-2 fs-5">
                <StaticMathField>{mathLat2}</StaticMathField>
            </div>
            <div className="col-9 mt-2">
                <form onSubmit={handleSubmit} method="post" action="#">
                    <div className="row mt-0 p-0">
                        <div className="col-8 m-0 p-0">
                        <EditableMathField
                            type="input"
                            id="answerInput"
                            className="form-control text-center fs-3"
                            style={boxStyle}
                            aria-describedby="answer input"
                            latex={responseObj.userAnswer}
                            onChange={(mathField)=>updateSituation({userAnswer: mathField.latex()})}
                            mathquillDidMount={mathField => (mathFieldRef.current = mathField)}
                            onKeyDown={handleKeyDown}
                        />
                        </div>
                        <div className="col-4 m-0 p-0">
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
        <UnitCircle 
            pointChoice={6}
        />
        </>
    )
}


