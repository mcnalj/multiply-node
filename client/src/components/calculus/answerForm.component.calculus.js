import React, { useState, useRef, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { addStyles, StaticMathField, EditableMathField } from 'react-mathquill'
import '../../App.scss';
import '../../index.scss';
import './calculus.component.derivatives.scss';

import {
    correctMessages,
    incorrectMessages,
    streakMessages,
    getRandomCorrectMessage,
    getStreakMessage,
    getRandomIncorrectMessage,
  } from '../infrastructure/messages.js';

import {
    getRandomIntInclusive
} from '../math-scripts/utilities-scripts.js';  
  
import { config} from '../constants.js';
var url = config.url.API_URL;

addStyles();

function AnswerForm(props) {
    const mathFieldRef = useRef(null);
    
    useEffect(() => {
      if (mathFieldRef.current) {
        mathFieldRef.current.focus();
      }
    }, []);
  
    const [userObj, setUserAnswer] = useState({
      userAnswer: '',
      correctAnswer: '',
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

        let stateToLift = {
            questionsAttempted: props.questionState.questionsAttempted + 1,
            questionsCorrect: props.questionState.questionsCorrect,
            questionsStreak: props.questionState.questionsStreak,
            questionsIncorrect: props.questionState.questionsIncorrect,
            progressValue: 0,
        }
  
        let answerMessage = '';
        let pause = 1500;
        let answer = userObj.userAnswer.replace(/\s/g, '');
        
        if (props.questionState.answerArrayLatex.includes(answer)) {
            // correct answer handling
            setBoxStyle({backgroundColor: "green", color:"white", borderWidth: "0px", borderColor: "gray"})
            stateToLift.questionsStreak += 1;
            stateToLift.questionsCorrect += 1;
            
            const meetsStandard = stateToLift.questionsCorrect >= props.questionState.questionsToMeet
            answerMessage = meetsStandard 
                ? "Success! You met the standard. Go to the Next Topic . . ."
                : stateToLift.questionsStreak < 4
                ? getRandomCorrectMessage()
                : getStreakMessage(stateToLift.questionsStreak)
            
            pause = meetsStandard ? 3000 : 1500;

            updateSituation({answerMessage: answerMessage, correctAnswer: ''})
        } else {
            // incorrect answer handling
            setBoxStyle({backgroundColor:"white", color: "red", borderWidth: "2px", borderColor: "red"})
            answerMessage = getRandomIncorrectMessage;
            
            updateSituation({answerMessage: answerMessage, correctAnswer: props.questionState.answerArrayLatex[0]})
            
            stateToLift.questionsIncorrect += 1;
            stateToLift.questionsStreak = 0
            pause = 4000;
        }
        stateToLift.progressValue = Math.round((stateToLift.questionsCorrect/props.questionState.questionsToMeet)*100)
        // pause after grading
        setTimeout(function() {
            setBoxStyle({backgroundColor:"white", color: "black", borderWidth: "0px", borderColor: "gray"})        
            if (stateToLift.questionsCorrect >= props.questionState.questionsToMeet) {
                props.questionState.doneWithTopic(stateToLift);
                stateToLift.questionsAttempted = 0;
                stateToLift.questionsCorrect = 0;
                stateToLift.questionsIncorrect = 0;
                stateToLift.questionsStreak = 0;
                stateToLift.progressValue = 100;
            }
            updateSituation({answerMessage: '', userAnswer: '', correctAnswer: ''})
            props.questionState.getNextQuestion(stateToLift);
        }, pause) // end of setTimeout
    } // end of handleSubmit
  
    return (
      <div className="row">
        <div className="col-12 m-0 p-0 mt-3">
          <div className="row">
            <div className="col-12 text-center m-0 p-0">
              <p id="answerFeedback">{userObj.answerMessage}<StaticMathField>{userObj.correctAnswer}</StaticMathField></p>   
            </div>
          </div>
          <form id="questionArea" onSubmit={handleSubmit} method="post" action="#">
            <div className="row">
              <div className="col-4 fs-2 text-end m-0 p-0">
                  <StaticMathField>f'(x) = </StaticMathField>
              </div>
              <div className="col-5 m-0 p-0">
                  <EditableMathField
                    type="input"
                    id="answerInput"
                    className="form-control text-center fs-3"
                    style={boxStyle}
                    aria-describedby="answer input"
                    latex={userObj.userAnswer}
                    // value={userObj.userAnswer} // does nothing?
                    placeholder={userObj.userAnswer} //does nothing?
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

  // the only different between these two is the prompt stem
  function IntegrationAnswerForm(props) {
    const mathFieldRef = useRef(null);
    
    useEffect(() => {
      if (mathFieldRef.current) {
        mathFieldRef.current.focus();
      }
    }, []);
  
    const [userObj, setUserAnswer] = useState({
      userAnswer: '',
      correctAnswer: '',
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

        let stateToLift = {
            questionsAttempted: props.quizProgress.questionsAttempted + 1,
            questionsCorrect: props.quizProgress.questionsCorrect,
            questionsStreak: props.quizProgress.questionsStreak,
            questionsIncorrect: props.quizProgress.questionsIncorrect,
            progressValue: 0,
        }
  
        let answerMessage = '';
        let pause = 1500;
        let answer = userObj.userAnswer.replace(/\s/g, '');
        
        if (props.questionObject.answerArrayLatex.includes(answer)) {
            // correct answer handling
            setBoxStyle({backgroundColor: "green", color:"white", borderWidth: "0px", borderColor: "gray"})
            stateToLift.questionsStreak += 1;
            stateToLift.questionsCorrect += 1;
            
            const meetsStandard = stateToLift.questionsCorrect >= props.quizProgress.questionsToMeet
            answerMessage = meetsStandard 
                ? "Success! You met the standard. Go to the Next Topic . . ."
                : stateToLift.questionsStreak < 4
                ? getRandomCorrectMessage()
                : getStreakMessage(stateToLift.questionsStreak)
            
            pause = meetsStandard ? 3000 : 1500;

            updateSituation({answerMessage: answerMessage, correctAnswer: ''})
        } else {
            // incorrect answer handling
            setBoxStyle({backgroundColor:"white", color: "red", borderWidth: "2px", borderColor: "red"})
            answerMessage = getRandomIncorrectMessage;
            
            updateSituation({answerMessage: answerMessage, correctAnswer: props.questionObject.answerArrayLatex[0]})
            
            stateToLift.questionsIncorrect += 1;
            stateToLift.questionsStreak = 0
            pause = 4000;
        }
        stateToLift.progressValue = Math.round((stateToLift.questionsCorrect/props.quizProgress.questionsToMeet)*100)
        // pause after grading
        setTimeout(function() {
            setBoxStyle({backgroundColor:"white", color: "black", borderWidth: "0px", borderColor: "gray"})        
            if (stateToLift.questionsCorrect >= props.quizProgress.questionsToMeet) {
                props.quizProgress.doneWithTopic(stateToLift);
                stateToLift.questionsAttempted = 0;
                stateToLift.questionsCorrect = 0;
                stateToLift.questionsIncorrect = 0;
                stateToLift.questionsStreak = 0;
                stateToLift.progressValue = 100;
            }
            updateSituation({answerMessage: '', userAnswer: '', correctAnswer: ''})
            props.quizProgress.getNextQuestion(stateToLift);
        }, pause) // end of setTimeout
    } // end of handleSubmit
  
    return (
      <div className="row">
        <div className="col-12 m-0 p-0 mt-3">
          <div className="row">
            <div className="col-12 text-center m-0 p-0">
              <p id="answerFeedback">{userObj.answerMessage}<StaticMathField>{userObj.correctAnswer}</StaticMathField></p>   
            </div>
          </div>
          <form id="questionArea" onSubmit={handleSubmit} method="post" action="#">
            <div className="row">
              <div className="col-4 fs-2 text-end m-0 p-0">
                  {/* <p>∫ f'(x) = </p> */}
                  <StaticMathField>{`\\int_\\quad^\\quad f(x)\\quad`}</StaticMathField>
              </div>
              <div className="col-5 m-0 p-0">
                  <EditableMathField
                    type="input"
                    id="answerInput"
                    className="form-control text-center fs-3"
                    style={boxStyle}
                    aria-describedby="answer input"
                    latex={userObj.userAnswer}
                    // value={userObj.userAnswer} // does nothing?
                    placeholder={userObj.userAnswer} //does nothing?
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

export {
  AnswerForm,
  IntegrationAnswerForm
}
