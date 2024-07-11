/// we need to parameterize topics and set up a choice page

import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ProgressBar, Button} from 'react-bootstrap';
import { addStyles, StaticMathField, EditableMathField } from 'react-mathquill'

import '../../App.scss';
import '../../index.scss';

import {
    getRandomIntInclusive,
  } from '../math-scripts/utilities-scripts.js';

import {
    setSessionData,
    recordProgress
} from '../infrastructure/recordProgress.js';

import {
    correctMessages,
    incorrectMessages,
    streakMessages,
    getRandomCorrectMessage,
    getStreakMessage,
    getRandomIncorrectMessage,
  } from '../infrastructure/messages.js';

// import { IntegrationAnswerForm } from '../calculus/answerForm.component.calculus.js';

addStyles();

export default function EquationsOfLines({username}) {

    const [questionObject, setQuestionObject] = useState({
        yIntercept: 0,
        slope: 0, 
        answersArray: []
    });
    const [quizProgress, setQuizProgress] = useState({  
        questionsAttempted: 0,
        questionsCorrect: 0,
        questionsIncorrect: 0,
        questionsStreak: 0,
        questionsToMeet: 2,
        progressBar: 0,
        metStandard: false,
        getNextQuestion: next,
        doneWithTopic: done     
    })

    // function getNewLine() {
    //     const slopeArray = [-3, -2, -1, -0.5, -0.33, -0.25, 0, 0.25, 0.33, 0.5, 1, 2, 3];
    //     const slopeAnswersArray = [`-3`, `-2`, `-1`, `-\\frac{1}{2}`, `-\\frac{1}{3}`, `-\\frac{1}{4}`, `0`, `\\frac{1}{4}`, `\\frac{1}{3}`, `\\frac{1}{2}`, `1`, `2`, `3`];
    //     const slope = slopeArray[Math.floor(Math.random() * slopeArray.length)];
    //     const slopeAnswersIndex = slopeArray.indexOf(slope);
    //     const yIntercept = getRandomIntInclusive(-5, 5);
    //     const answerCoordinatesArray = [];
    //     const xIncrementer = slope >=1 ? 1 : Math.round(1/slope);
    //     for (let i = -5; i<= 5; i++) {
    //         let xAnswer = Math.round(i*xIncrementer);
    //         let yAnswer = Math.round(slope*xAnswer + yIntercept);
    //         if (xAnswer < 0) {
    //             xAnswer = `+${Math.abs(xAnswer)}`;
    //         } else if (xAnswer === 0) {
    //             xAnswer = '';   
    //         } else  {
    //             xAnswer = `-${Math.abs(xAnswer)}`;
    //         }
    //         if (yAnswer < 0) {
    //             yAnswer = `+${Math.abs(yAnswer)}`;
    //         } else if (yAnswer === 0) {
    //             yAnswer = '';
    //         } else {
    //             yAnswer = `-${Math.abs(yAnswer)}`;
    //         }
    //         if (xAnswer <= 5 && yAnswer <= 5 && xAnswer >= -5 && yAnswer >= -5) {
    //             answerCoordinatesArray.push(`y${yAnswer}=${slopeAnswersArray[slopeAnswersIndex]}(x${xAnswer})`);
    //             // is xAnswer is "", we don't need parentheses around xAnswer
    //             if (xAnswer === '') {
    //               answerCoordinatesArray.push(`y${yAnswer}=${slopeAnswersArray[slopeAnswersIndex]}x${xAnswer}`);
    //               if (slopeAnswersArray[slopeAnswersIndex] === '1') {
    //                 answerCoordinatesArray.push(`y${yAnswer}=x${xAnswer}`);
    //               }
    //               if (slopeAnswersArray[slopeAnswersIndex] === '-1') {
    //                 answerCoordinatesArray.push(`y${yAnswer}=-x${xAnswer}`);
    //               }
    //             }
    //             // If the slope is 1 or -1, we don't need parentheses
    //             if (slopeAnswersArray[slopeAnswersIndex] === '1') {
    //               answerCoordinatesArray.push(`y${yAnswer}=x${xAnswer}`);
    //             }
    //             // slice off the first character and replace it
    //             if (slopeAnswersArray[slopeAnswersIndex] === '-1') {
    //               if (xAnswer[0] === '+') {
    //                 // xAnswer[0] = '-';
    //                 xAnswer = '-' + xAnswer.slice(1);
    //                 answerCoordinatesArray.push(`y${yAnswer}=-x${xAnswer}`);
    //               } else if (xAnswer[0] === '-') {
    //                 // xAnswer[0] = '+';
    //                 xAnswer = '+' + xAnswer.slice(1);
    //                 answerCoordinatesArray.push(`y${yAnswer}=-x${xAnswer}`);
    //               }
                  
    //             }
    //         }
    //         console.log(answerCoordinatesArray);
    //     }

    //     setQuestionObject({
    //         yIntercept: yIntercept,
    //         slope: slope,
    //         answersArray: answerCoordinatesArray
    //     });
    // }

    // this is chat GPTs simplified version of the function above
    function getNewLine() {
      const slopeArray = [-3, -2, -1, -0.5, -0.33, -0.25, 0, 0.25, 0.33, 0.5, 1, 2, 3];
      const slopeAnswersArray = ['-3', '-2', '-1', '-\\frac{1}{2}', '-\\frac{1}{3}', '-\\frac{1}{4}', '0', '\\frac{1}{4}', '\\frac{1}{3}', '\\frac{1}{2}', '1', '2', '3'];
      const slope = slopeArray[Math.floor(Math.random() * slopeArray.length)];
      const slopeAnswersIndex = slopeArray.indexOf(slope);
      const yIntercept = getRandomIntInclusive(-5, 5);
      const answerCoordinatesArray = [];
  
      const xIncrementer = slope >= 1 || slope <= -1 ? 1 : Math.round(1 / Math.abs(slope));
  
      for (let i = -5; i <= 5; i++) {
          const xAnswer = i * xIncrementer;
          const yAnswer = Math.round(slope * xAnswer + yIntercept);
  
          if (xAnswer < -5 || xAnswer > 5 || yAnswer < -5 || yAnswer > 5) continue;
  
          const xAnswerStr = xAnswer === 0 ? '' : (xAnswer > 0 ? `-${xAnswer}` : `+${Math.abs(xAnswer)}`);
          const yAnswerStr = yAnswer === 0 ? '' : (yAnswer > 0 ? `-${yAnswer}` : `+${Math.abs(yAnswer)}`);
          const slopeStr = slopeAnswersArray[slopeAnswersIndex];
  
          answerCoordinatesArray.push(`y${yAnswerStr}=${slopeStr}(x${xAnswerStr})`);
          if (xAnswer === 0) {
              answerCoordinatesArray.push(`y${yAnswerStr}=${slopeStr}x`);
          }
          if (slopeStr === '1') {
              answerCoordinatesArray.push(`y${yAnswerStr}=x${xAnswerStr}`);
          } else if (slopeStr === '-1') {
              answerCoordinatesArray.push(`y${yAnswerStr}=-x${xAnswerStr}`);
          }
      }
  
      console.log(answerCoordinatesArray);
  
      setQuestionObject({
          yIntercept: yIntercept,
          slope: slope,
          answersArray: answerCoordinatesArray
      });
  }

    const startTime = new Date();

    useEffect(() => {
        getNewLine();
    }, []);
    
    function next(){
        getNewLine();
    }

    async function done(){
        console.log("done")
        try {
            const endTime = new Date();
            const totalTime = endTime - startTime;
            const sessionData = setSessionData(quizProgress, startTime, totalTime, "summerPrep", "functions", "equationsOfLines", username);
            const result = await recordProgress(sessionData, "summerPrep");
            // what should we do with this result?
            console.log(result.msg);
            getNewLine();
        } catch (error) {
            console.error("Failed to record progress: ", error);
            // Show a message to the user
        }
    }

    return (
        <div className="col-12">
            <div className="progressBar col-12">
              <ProgressBar now={quizProgress.progressBar} label={`${quizProgress.progressBar}%`} max='100'/>
            </div>
            <div>
                <StraightLineGraph
                    yIntercept={questionObject.yIntercept}
                    slope={questionObject.slope}
                />
            </div>
          <div className="row">
              <p className="col-12 text-center fs-5">
                Write an equation for the blue line in the form: 
                <StaticMathField>{`y - y_1 = m (x - x_1)`}</StaticMathField>
              </p>
          </div>
          <EquationOfLineAnswerForm
              questionObject={questionObject}
              quizProgress={quizProgress}
              setQuizProgress={setQuizProgress}
              startTime={startTime}
          />
          <Link to="/summerPrepTopics">
            <button type="button" className="btn btn-lg btn-success mt-3">BACK TO SUMMER PREP</button><br /><br />
          </Link>
        </div>
      )
}

function EquationOfLineAnswerForm({questionObject, quizProgress, setQuizProgress, startTime}) {
    const mathFieldRef = useRef(null);
    
    useEffect(() => {
      if (mathFieldRef.current) {
        mathFieldRef.current.focus();
      }
    }, []);
  
    const [userObj, setUserAnswer] = useState({
      userAnswer: '',
      answerMessage: ''
    });

    const [boxStyle, setBoxStyle] = useState({backgroundColor: "white", color: "black", borderWidth: "0px", borderColor: "gray"})
    
    function updateSituation(value) {
        // This is the pattern when you're trying to do 1/(ln3). Does it affect anything else?
        let pattern = `\\frac{1}{\\left\(\\right\)}`;
        // This is a regex that removes MathQuill's default big parens \left and \right.
        let regex = /\\left\(\\right\)/g;
        if ( pattern == value.userAnswer) {
          let replacedString = `\\frac{1}{()}`;
          return setUserAnswer((prev) => {
              return {...prev, ...{userAnswer: replacedString}}
          })          
        }
        if ( regex.test(value.userAnswer)) {
          let beginning = regex.lastIndex - 13
          let trimmedString = value.userAnswer.slice(0, beginning);
          let replacedString = trimmedString + "()";
          return setUserAnswer((prev) => {
              return {...prev, ...{userAnswer: replacedString}}
          })
        } else {
            return setUserAnswer((prev) => {
                return {...prev, ...value}
            })
        }
    }

    const handleKeyDown = event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        // did adding return here do anything?
        return handleSubmit(event);
      }
    }
  
    function handleSubmit(event) {

        event.preventDefault();

        const CORRECT_PAUSE = 1500;
        const INCORRECT_PAUSE = 4000;
        const MEETS_STANDARD_PAUSE = 3000;
        const MIN_STREAK = 4;

        let answerMessage = '';
        let pause = CORRECT_PAUSE;
        let answer = userObj.userAnswer.replace(/\s/g, '');

        const updateProgress = (correct, streak) => {
          setQuizProgress(prevState => ({
            ...prevState,
            questionsAttempted: prevState.questionsAttempted + 1,
            questionsCorrect: prevState.questionsCorrect + (correct ? 1 : 0),
            questionsIncorrect: prevState.questionsIncorrect + (correct ? 0 : 1),
            questionsStreak: streak,
            progressBar: Math.round(((prevState.questionsCorrect + (correct ? 1 : 0)) / prevState.questionsToMeet) * 100), 
          }));
        };

        const handleCorrectAnswer = () => {
          setBoxStyle({backgroundColor: "green", color:"white", borderWidth: "0px", borderColor: "gray"});
          const meetsStandard = quizProgress.questionsCorrect + 1 >= quizProgress.questionsToMeet;
          answerMessage = meetsStandard 
              ? "Success! You met the standard. Go to the Next Topic . . ."
              : quizProgress.questionsStreak + 1 < MIN_STREAK
              ? getRandomCorrectMessage()
              : getStreakMessage(quizProgress.questionsStreak + 1);
          pause = meetsStandard ? MEETS_STANDARD_PAUSE : CORRECT_PAUSE;
          updateProgress(true, quizProgress.questionsStreak + 1);
          updateSituation({answerMessage: answerMessage, correctAnswer: ''});
        };

        const handleIncorrectAnswer = () => {
          setBoxStyle({backgroundColor:"white", color: "red", borderWidth: "2px", borderColor: "red"});
          answerMessage = getRandomIncorrectMessage;
          updateSituation({answerMessage: answerMessage, correctAnswer: questionObject.answersArray[0]});
          updateProgress(false, 0);
          pause = INCORRECT_PAUSE;
        };
        
        if (questionObject.answersArray.includes(answer)) {
            handleCorrectAnswer();
        } else {
            handleIncorrectAnswer();
        }
        
        // pause after grading
        setTimeout(function() {
            setBoxStyle({backgroundColor:"white", color: "black", borderWidth: "0px", borderColor: "gray"})        
            if (quizProgress.questionsCorrect >= quizProgress.questionsToMeet) {
                quizProgress.doneWithTopic();
            }
            updateSituation({answerMessage: '', userAnswer: '', correctAnswer: ''})
            quizProgress.getNextQuestion();
        }, pause) // end of setTimeout
    } // end of handleSubmit
  
    return (
      <div className="row">
        <div className="col-12 m-0 p-0">
          <div className="row">
            <div className="col-12 text-center m-0 p-0">
              <p id="answerFeedback">{userObj.answerMessage}</p>   
            </div>
          </div>
          <form id="questionArea" onSubmit={handleSubmit} method="post" action="#">
            <div className="row">
              <div className="col-8 offset-2">
                  <EditableMathField
                    type="input"
                    id="answerInput"
                    className="form-control text-center fs-3"
                    style={boxStyle}
                    aria-describedby="answer input"
                    latex={userObj.userAnswer}
                    onChange={(mathField)=>updateSituation({userAnswer: mathField.latex()})}
                    mathquillDidMount={mathField => (mathFieldRef.current = mathField)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
            </div>
            <div className="row">
              <div className="col-12 mt-4">
                <Button
                  variant="primary"
                  type="submit"
                  size="lg" 
                >
                  SUBMIT
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
  
export function StraightLineGraph({yIntercept, slope}) {
    return (
      <svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">
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
                  <text x={x} y="1.2" textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5: ""}</text>
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
                  <text x="-1" y={y*-1} textAnchor="middle" fontSize="1">{i-5 != 0 ? i-5 : ""}</text>
                  </g>
              );
          })}
      </g>
  
      <polyline
        points={[
          ...Array.from({ length: 100}, (_, i) => i).map(i => {
            const x = (i/10) - 5;
            const y =  ((slope*-1)*x - yIntercept);
            return `${2*x} ${2*y}`;
          })
        ]}
        stroke="blue"
        fill="none"
        strokeWidth="0.2"
      />
  
    </svg>
    )
  }
  
  
