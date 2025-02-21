import React, { useState, useRef, useEffect } from "react";
import { Button} from 'react-bootstrap';
import { addStyles, StaticMathField, EditableMathField } from 'react-mathquill'

import {
    getRandomCorrectMessage,
    getStreakMessage,
    getRandomIncorrectMessage,
} from '../../infrastructure/messages.js';

addStyles();
// This is a component that allows the user to type in an answer to a question.

// This is currently live with caculus.component.exponents2.js and integrationComponent
// TODO figure out what other components could be refactored to use it.
// TODO see if the parent could use this and the matching seamlessly.

// Here are the state variables that get passed from the parent component:
// const [topic, setTopic] = useState(parameter.topic);

// const [questionObject, setQuestionObject] = useState({
//     functionLatex: '',
//     xValue: '',
//     answerLatex: '',
//     answersArray: [] 
// })

// const [quizProgress, setQuizProgress] = useState({
//     questionsAttempted: 0,
//     questionsCorrect: 0,
//     questionsIncorrect: 0,
//     questionsStreak: 0,
//     questionsToMeet: 3,
//     progressBar: 0,
//     metStandard: false, 
//     getNextQuestion: next,
//     doneWithTopic: done,         
// });

// Currently this sticks on the same question if you get it incorrect, but we could 
// make that a flagged feature.

// The updateSitutation function also probably only applies to specific types of questions.

export function TypedInputAnswerForm({questionObject, quizProgress, setQuizProgress, topic}) {
    const mathFieldRef = useRef(null);
    
    useEffect(() => {
      if (mathFieldRef.current) {
        mathFieldRef.current.focus();
      }
    }, []);
  
    const [userAnswer, setUserAnswer] = useState('');
    const [answerMessage, setAnswerMessage] = useState('');

    const [isDisabled, setIsDisabled] = useState(false);
  
    const [boxStyle, setBoxStyle] = useState({backgroundColor: "white", color: "black", borderWidth: "0px", borderColor: "gray"})
  
    function updateSituation(value) {
      // This is the pattern when you're trying to do 1/(ln3). Does it affect anything else?
      let pattern = `\\frac{1}{\\left\(\\right\)}`;
      // This is a regex that removes MathQuill's default big parens \left and \right.
      let regex = /\\left\(\\right\)/g;
      if ( pattern == value.userAnswer) {
        let replacedString = `\\frac{1}{()}`;
        return setUserAnswer(replacedString);          
      }
      if ( regex.test(value.userAnswer)) {
        let beginning = regex.lastIndex - 13
        let trimmedString = value.userAnswer.slice(0, beginning);
        let replacedString = trimmedString + "()";
        return setUserAnswer(replacedString);
      } else {
          return setUserAnswer(value.userAnswer);
      }
  }
  
    const handleKeyDown = (event) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSubmit(event);
      }
    }
  
    // This will stay on the same question if you get it wrong.
    // I am now updating quizProgress after the pause.
    // That will cause the progress bar to fill in as you get a new question.
    // The progress bar will not fill in before you are taken to the next question component.
    // Add a setTimeout to update the progress bar after the met standard pause.
  
    function handleSubmit(event) {
  
      event.preventDefault();
      setIsDisabled(true);
  
      const CORRECT_PAUSE = 1500;
      const INCORRECT_PAUSE = 2000;
      const MEETS_STANDARD_PAUSE = 3000;
      const MIN_STREAK = 4;
      const DEFAULT_INPUT_BOX_STYLE = {backgroundColor:"white", color: "black", borderWidth: "0px", borderColor: "gray"}
      const CORRECT_INPUT_BOX_STYLE = {backgroundColor: "green", color:"white", borderWidth: "0px", borderColor: "gray"}
      const INCORRECT_INPUT_BOX_STYLE = {backgroundColor:"white", color: "red", borderWidth: "2px", borderColor: "red"}
  
      let isCorrect = false;
      let answerMessage = '';
      let pause = CORRECT_PAUSE;
      let answer = userAnswer.replace(/\s/g, '');
  
      const updateProgress = (correct, streak) => {
          setQuizProgress(prevState => ({
              ...prevState,
              questionsAttempted: prevState.questionsAttempted + 1,
              questionsCorrect: prevState.questionsCorrect + (correct ? 1 : 0),
              questionsIncorrect: prevState.questionsIncorrect + (correct ? 0 : 1),
              questionsStreak: streak,
              progressBar: Math.round(((prevState.questionsCorrect + (correct ? 1 : 0)) / prevState.questionsToMeet) * 100), 
              metStandard: prevState.questionsCorrect + (correct ? 1 : 0) >= prevState.questionsToMeet       
          }));
      };
  
      const handleCorrectAnswer = () => {
          setBoxStyle(CORRECT_INPUT_BOX_STYLE);
          const meetsStandard = quizProgress.questionsCorrect + 1 >= quizProgress.questionsToMeet;
          answerMessage = meetsStandard 
              ? "Success! You met the standard. Go to the Next Topic . . ."
              : quizProgress.questionsStreak + 1 < MIN_STREAK
              ? getRandomCorrectMessage()
              : getStreakMessage(quizProgress.questionsStreak + 1);
          pause = meetsStandard ? MEETS_STANDARD_PAUSE : CORRECT_PAUSE;
          setAnswerMessage(answerMessage);
      };
  
      const handleIncorrectAnswer = () => {
          setBoxStyle(INCORRECT_INPUT_BOX_STYLE);
          answerMessage = getRandomIncorrectMessage();
          setAnswerMessage(answerMessage);
          pause = INCORRECT_PAUSE;
      };
  
      if (questionObject.answersArray.includes(answer)) {
          isCorrect = true;
          handleCorrectAnswer();
      } else {
          handleIncorrectAnswer();
      }
  
      setTimeout(function() {
          setBoxStyle(DEFAULT_INPUT_BOX_STYLE)        
          if (isCorrect) {
            updateProgress(true, quizProgress.questionsStreak + 1);
            if (quizProgress.questionsCorrect + 1 >= quizProgress.questionsToMeet) {
                quizProgress.doneWithTopic();
            } else {
              quizProgress.getNextQuestion(topic);
            }
          } else {
            updateProgress(false, 0);
            // Turn this back on if you want a new question after a wrong answer.
            // quizProgress.getNextQuestion(topic);
  
          }
          setUserAnswer('');
          setAnswerMessage('');
          setIsDisabled(false);
      }, pause) // end of setTimeout
    } // end of handleSubmit    
  
    return (
      <form onSubmit={handleSubmit} method="post" action="#">
          <p className="col-12 text-center fs-2">
              <StaticMathField>{'f(' + questionObject.xValue + ') ='}</StaticMathField>
          </p>
          <div className="col-8 offset-2">
                  <EditableMathField
                      type="input"
                      id="answerInput"
                      className="form-control text-center fs-3"
                      style={boxStyle}
                      aria-describedby="answer input"
                      latex={userAnswer}
                      onChange={(mathField)=>updateSituation({userAnswer: mathField.latex()})}
                      mathquillDidMount={mathField => (mathFieldRef.current = mathField)}
                      onKeyDown={handleKeyDown}
                      disabled={isDisabled}
                  />
          </div>     
          <p className="col-12 text-center mt-3">{answerMessage}</p>
          <Button
              variant="primary"
              type="submit"
              id="submitBtn"
              size="lg"
              className="col-6 offset-3" 
              disabled={isDisabled}
            >
              SUBMIT
            </Button>
      </form>
    )
  }

  export function TypedInputAnswerFormCubesAndSquares({questionObject, quizProgress, setQuizProgress, topic}) {
    const mathFieldRef = useRef(null);
    
    useEffect(() => {
      if (mathFieldRef.current) {
        mathFieldRef.current.focus();
      }
    }, []);
  
    const [userAnswer, setUserAnswer] = useState('');
    const [answerMessage, setAnswerMessage] = useState('');
  
    const [boxStyle, setBoxStyle] = useState({backgroundColor: "white", color: "black", borderWidth: "0px", borderColor: "gray"})
  
    const [isDisabled, setIsDisabled] = useState(false);

    function updateSituation(value) {
      // This is the pattern when you're trying to do 1/(ln3). Does it affect anything else?
      let pattern = `\\frac{1}{\\left\(\\right\)}`;
      // This is a regex that removes MathQuill's default big parens \left and \right.
      let regex = /\\left\(\\right\)/g;
      if ( pattern == value.userAnswer) {
        let replacedString = `\\frac{1}{()}`;
        return setUserAnswer(replacedString);          
      }
      if ( regex.test(value.userAnswer)) {
        let beginning = regex.lastIndex - 13
        let trimmedString = value.userAnswer.slice(0, beginning);
        let replacedString = trimmedString + "()";
        return setUserAnswer(replacedString);
      } else {
          return setUserAnswer(value.userAnswer);
      }
  }
  
    const handleKeyDown = event => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSubmit(event);
      }
    }
  
    // This will stay on the same question if you get it wrong.
    // I am now updating quizProgress after the pause.
    // That will cause the progress bar to fill in as you get a new question.
    // The progress bar will not fill in before you are taken to the next question component.
    // Add a setTimeout to update the progress bar after the met standard pause.
  
    function handleSubmit(event) {
  
      event.preventDefault();
      setIsDisabled(true);
  
      const CORRECT_PAUSE = 1500;
      const INCORRECT_PAUSE = 4000;
      const MEETS_STANDARD_PAUSE = 3000;
      const MIN_STREAK = 4;
      const DEFAULT_INPUT_BOX_STYLE = {backgroundColor:"white", color: "black", borderWidth: "0px", borderColor: "gray"}
      const CORRECT_INPUT_BOX_STYLE = {backgroundColor: "green", color:"white", borderWidth: "0px", borderColor: "gray"}
      const INCORRECT_INPUT_BOX_STYLE = {backgroundColor:"white", color: "red", borderWidth: "2px", borderColor: "red"}
  
      let isCorrect = false;
      let answerMessage = '';
      let pause = CORRECT_PAUSE;
      let answer = userAnswer.replace(/\s/g, '');
  
      const updateProgress = (correct, streak) => {
          setQuizProgress(prevState => ({
              ...prevState,
              questionsAttempted: prevState.questionsAttempted + 1,
              questionsCorrect: prevState.questionsCorrect + (correct ? 1 : 0),
              questionsIncorrect: prevState.questionsIncorrect + (correct ? 0 : 1),
              questionsStreak: streak,
              progressBar: Math.round(((prevState.questionsCorrect + (correct ? 1 : 0)) / prevState.questionsToMeet) * 100), 
              metStandard: prevState.questionsCorrect + (correct ? 1 : 0) >= prevState.questionsToMeet       
          }));
      };
  
      const handleCorrectAnswer = () => {
          setBoxStyle(CORRECT_INPUT_BOX_STYLE);
          const meetsStandard = quizProgress.questionsCorrect + 1 >= quizProgress.questionsToMeet;
          answerMessage = meetsStandard 
              ? "Success! You met the standard. Go to the Next Topic . . ."
              : quizProgress.questionsStreak + 1 < MIN_STREAK
              ? getRandomCorrectMessage()
              : getStreakMessage(quizProgress.questionsStreak + 1);
          pause = meetsStandard ? MEETS_STANDARD_PAUSE : CORRECT_PAUSE;
          setAnswerMessage(answerMessage);
      };
  
      const handleIncorrectAnswer = () => {
          setBoxStyle(INCORRECT_INPUT_BOX_STYLE);
          answerMessage = getRandomIncorrectMessage();
          setAnswerMessage(answerMessage);
          pause = INCORRECT_PAUSE;
      };
      console.log(questionObject.answersArray);
      console.log(answer)
      if (questionObject.answersArray.includes(parseInt(answer))) {
          isCorrect = true;
          handleCorrectAnswer();
      } else {
          handleIncorrectAnswer();
      }
  
      setTimeout(function() {
          setBoxStyle(DEFAULT_INPUT_BOX_STYLE)        
          if (isCorrect) {
            updateProgress(true, quizProgress.questionsStreak + 1);
            if (quizProgress.questionsCorrect + 1 >= quizProgress.questionsToMeet) {
                quizProgress.doneWithTopic();
            } else {
              quizProgress.getNextQuestion();
            }
          } else {
            updateProgress(false, 0);
            // Turn this back on if you want an new question after a wrong answer.
            // quizProgress.getNextQuestion(topic);
  
          }
          setUserAnswer('');
          setAnswerMessage('');
          setIsDisabled(false);
      }, pause) // end of setTimeout
    } // end of handleSubmit    
  
    return (
      <form onSubmit={handleSubmit} method="post" action="#">
          <div className="col-6 offset-4">
            <div className="row">
              <p className="col-2 fs-2">
                <StaticMathField>{questionObject.questionLatex}</StaticMathField>
              </p>
              <p className="col-6">
                <EditableMathField
                    type="input"
                    id="answerInput"
                    className="form-control text-center fs-3"
                    style={boxStyle}
                    aria-describedby="answer input"
                    latex={userAnswer}
                    onChange={(mathField)=>updateSituation({userAnswer: mathField.latex()})}
                    mathquillDidMount={mathField => (mathFieldRef.current = mathField)}
                    onKeyDown={handleKeyDown}
                    disabled={isDisabled}
                />
              </p>
            </div>
          </div>     
          <p className="col-12 text-center mt-3">{answerMessage}</p>
          <Button
              variant="primary"
              type="submit"
              id="submitBtn"
              size="lg"
              className="col-6 offset-3"
              disabled={isDisabled} 
            >
              SUBMIT
            </Button>
      </form>
    )
  }
  
   
  
  
