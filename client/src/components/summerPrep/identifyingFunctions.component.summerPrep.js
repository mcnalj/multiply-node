import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { Button, ProgressBar } from 'react-bootstrap';
import { addStyles, StaticMathField } from 'react-mathquill'

import '../../App.scss';
import '../../index.scss';
import './identifyingFunctions.component.summerPrep.scss';

import {
    SinGraph
 } from '../SVGs/graphs/sinGraph.component.graphs.js';

 import {
    CosGraph
 } from '../SVGs/graphs/cosGraph.component.graphs.js';
 
 import {
    XSquaredGraph,
    XCubedGraph,
    EXGraph,
    LnXGraph,
    OverXGraph,
    AbsoluteValueGraph  
 } from '../SVGs/graphs/svgGraphs.component.graphs.js';

 import {
    setSessionData,
    recordProgress
} from '../infrastructure/recordProgress.js';

import {
    setAction,
    recordAction
  } from '../infrastructure/recordProgress.js';

addStyles();

const sineFunction = 
     {
            graphSVG: <SinGraph />,
            answers: {
                correctAnswer: `\\sin(x)`,
                distractor1: `\\cos(x)`,
                distractor2: `x^2 + 3x + 4`,
                distractor3: `\\ln(x)`,
            }
    }
const cosineFunction =     
    {
        graphSVG: <CosGraph />,
        answers: {
            correctAnswer: `\\cos(x)`,
            distractor1: `\\sin(x)`,
            distractor2: `e^x`,
            distractor3: `\\ln(x)`,
        }
    }
const xSquaredFunction = 
    {
        graphSVG: <XSquaredGraph />,
        answers: {
            correctAnswer: `x^2`,
            distractor1: `x^3`,
            distractor2: `e^x`,
            distractor3: `\\ln(x)`,
        }
    }

const xCubedFunction = 
    {
        graphSVG: <XCubedGraph />,
        answers: {
            correctAnswer: `x^3`,
            distractor1: `x^2`,
            distractor2: `\\tan(x)`,
            distractor3: `\\ln(x)`,
        }
    }    

const eXFunction = 
    {
        graphSVG: <EXGraph />,
        answers: {
            correctAnswer: `e^x`,
            distractor1: `\\frac{1}{x}`,
            distractor2: `\\cos(x)`,
            distractor3: `\\ln(x)`,
        }
    }
    
const lnXFunction = 
    {
        graphSVG: <LnXGraph />,
        answers: {
            correctAnswer: `ln(x)`,
            distractor1: `\\frac{1}{x}`,
            distractor2: `\\cos(x)`,
            distractor3: `e^x`,
        }
    }    

const overXFunction = 
    {
        graphSVG: <OverXGraph />,
        answers: {
            correctAnswer: `\\frac{1}{x}`,
            distractor1: `ln(x)`,
            distractor2: `\\cos(x)`,
            distractor3: `e^x`,
        }
    }    

const absoluteValueFunction = 
    {
        graphSVG: <AbsoluteValueGraph />,
        answers: {
            correctAnswer: `|x|`,
            distractor1: `ln(x)`,
            distractor2: `\\frac{1}{x}`,
            distractor3: `e^x`,
        }
    }    

    const graphDataArray = [sineFunction, cosineFunction, xSquaredFunction, xCubedFunction, eXFunction, lnXFunction, overXFunction, absoluteValueFunction];
    
    function shuffleArray(array) {
        for(let i = array.length -1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i - 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledGraphDataArray = shuffleArray([...graphDataArray]);


export default function IdentifyingFunctions({userId}) {

    const [graphIndex, setGraphIndex] = useState(0);
    const [questionObject, setQuestionObject] = useState({
        questionData: '',
        answersArray: []
    });
    const [quizProgress, setQuizProgress] = useState({
            questionsAttempted: 0,
            questionsCorrect: 0,
            questionsIncorrect: 0,
            questionsStreak: 0,
            questionsToMeet: 8,
            progressBar: 0,
            metStandard: false,            
    });
        
    const [answerMessage, setAnswerMessage] = useState('');
    const [buttonClass, setButtonClass] = useState({button0: '', button1: '', button2: '', button3: ''});
    const [isFinished, setIsFinished] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const graphQuestionObject = shuffledGraphDataArray[graphIndex];
        const answersArray = shuffleArray(Object.values(graphQuestionObject.answers));

        setQuestionObject({
            questionData: graphQuestionObject,
            answersArray: answersArray
        });
    }, [graphIndex]);

    const startTime = useRef(new Date());

    function next() {
        setGraphIndex(prevState => (
            prevState + 1
        ));
    }

    async function done() {
        try {
            const endTime = new Date();
            const totalTime = endTime - startTime.current;
            const section = "summerPrep";
            const unit = "functions";
            let topicName = "identifyingFunctions";

            const actionDetails = {
            section: section,
            unit: unit,
            topic: topicName,
            "metStandard": true,
            "questionsAttempted": quizProgress.questionsAttempted,
            "questionsCorrect": quizProgress.questionsCorrect,
            "questionsIncorrect": quizProgress.questionsIncorrect,
            "questionsStreak": quizProgress.questionsStreak,
            "datetimeStarted": startTime.current,
            "totalTime": totalTime,
            }
    
            const action = setAction("skillCompleted", actionDetails, userId)
            const result = await recordAction(action);
            // what should we do with this result?
            setGraphIndex(0);
            setIsFinished(true);
        } catch (error) {
            if (error.name === "TypeError") {
                console.error("Newtwork error or issue with recording progress:", error);
                setErrorMessage("We are unable to record your progress. Please check your internet connection.")
          
              } else {
                console.error("Error processing request:", error);
                setErrorMessage("error.message" || "Sorry, there was an error recording your progress. Please try again later.")
              }
        }
    }

    function handleClick(value) {
        let buttonClicked = "button" + questionObject.answersArray.indexOf(value);
        if (value == questionObject.questionData.answers.correctAnswer) {
            setAnswerMessage("Correct!");
            setButtonClass({[buttonClicked]: 'matched'});
            setQuizProgress(prevState => ({
                ...prevState,
                questionsAttempted: prevState.questionsAttempted + 1,
                questionsCorrect: prevState.questionsCorrect + 1,
                questionsStreak: prevState.questionsStreak + 1,
                progressBar: Math.round((prevState.questionsCorrect/prevState.questionsToMeet)*100)
            }));
        } else {
            setAnswerMessage("Incorrect!");
            setButtonClass({[buttonClicked]: 'incorrect'});
            setQuizProgress(prevState => ({
                ...prevState,
                questionsAttempted: prevState.questionsAttempted + 1,
                questionsIncorrect: prevState.questionsIncorrect + 1,
                questionsStreak: 0,
            }));        }
        setTimeout(function() {
            setAnswerMessage('');
            setButtonClass({[buttonClicked]: ''});
            if (graphIndex == quizProgress.questionsToMeet - 1) {
                done();
            } else {
                next();
            }    
        }, 1500);
    }

    if (isFinished) {   
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <h1>Great job!</h1>
                        <p>You've completed the identifying functions quiz.</p>
                        <Link to="/summerPrepTopics" className="btn btn-primary">Summer Prep Topics</Link>
                    </div>
                </div>
            </div>
        )
    } else {
    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <ProgressBar variant="primary" style={{borderRadius: '0', backgroundColor: "LightGray"}}now={quizProgress.progressBar} label={`${quizProgress.progressBar}%`} max='100'/>
                </div>
            </div>
            <p className="fs-5">Identify the graphed function</p>
            <div>
                {questionObject.questionData.graphSVG}
            </div>
            <div>
                <p>{answerMessage}</p>
            </div>
            {errorMessage && (
              <div className="alert alert-danger mt-3" role="alert">
                {errorMessage}
              </div>    
            )}
            <div className="matching p-2">
                <div className="row">
                    <div className="col-6 text-center mt-2">
                        <Button onClick={() =>handleClick(questionObject.answersArray[0])} variant="outline-light" className={`col-12 fs-3 p-1 box ${buttonClass.button0}`}><StaticMathField>{questionObject.answersArray[0]}</StaticMathField></Button>
                    </div>
                    <div className="col-6 text-center mt-2">
                        <Button onClick={() =>handleClick(questionObject.answersArray[1])} variant="outline-light" className={`col-12 fs-3 p-1 box ${buttonClass.button1} `}><StaticMathField>{questionObject.answersArray[1]}</StaticMathField></Button>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-6 text-center mt-2">
                    <Button onClick={() =>handleClick(questionObject.answersArray[2])} variant="outline-light" className={`col-12 fs-3 p-1 box ${buttonClass.button2} `}><StaticMathField>{questionObject.answersArray[2]}</StaticMathField></Button>
                    </div>
                    <div className="col-6 text-center mt-2">
                    <Button onClick={() =>handleClick(questionObject.answersArray[3])} variant="outline-light" className={`col-12 fs-3 p-1 box ${buttonClass.button3} `}><StaticMathField>{questionObject.answersArray[3]}</StaticMathField></Button>
                    </div>
                </div>
            </div>
            <Link to="/plottingPointsTopics">
                <button type="button" className="btn btn-lg btn-success mt-3">Back to Functions Topics</button><br /><br />
          </Link>
        </div>
    )
    }
}
