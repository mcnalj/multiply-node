//TODO fix the unit depending on type of Exponent
// maybe add simple polynomials
// Makes sure all the questions to the 0 power are correct.
// Deploy
// Fix the look
// Put a timer on the screen or give some kind of time option to exceed.
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams, Link } from "react-router-dom";
import { ProgressBar, Button} from 'react-bootstrap';
import { addStyles, StaticMathField, EditableMathField } from 'react-mathquill'

import '../../App.scss';
import '../../index.scss';
import './styles.component.calculus.scss';

import {
    getRandomIntInclusive,
  } from '../math-scripts/utilities-scripts.js';

import {
    setSessionData,
    recordProgress
} from '../infrastructure/recordProgress.js';

import {
    getRandomCorrectMessage,
    getStreakMessage,
    getRandomIncorrectMessage,
} from '../infrastructure/messages.js';

import {
  TypedInputAnswerForm
} from './answerComponents/typedInputAnswerInput.component.answerCompoments.js';

// import { config} from '../constants.js';
// var url = config.url.API_URL;

addStyles();

export default function Exponents2({username}) {

    const parameter = useParams()

    const [topic, setTopic] = useState(parameter.topic);

    const [questionObject, setQuestionObject] = useState({
        functionLatex: '',
        xValue: '',
        answerLatex: '',
        answersArray: [] 
    })

    const [quizProgress, setQuizProgress] = useState({
        questionsAttempted: 0,
        questionsCorrect: 0,
        questionsIncorrect: 0,
        questionsStreak: 0,
        questionsToMeet: 7,
        progressBar: 0,
        metStandard: false, 
        getNextQuestion: next,
        doneWithTopic: done,         
    });
  
    function setFunction(typeOfExponent) {
      // typeOfExponent can be positive, negative, fractional
      // Looks like if exponent is positive, getRandomIntInclusive(0, 19)
      let min = 1;
      typeOfExponent === "positive" ? min = 0 : min = 1;

      const rando = getRandomIntInclusive(min,19);
      let power = 2;
      let functionLatex = 'f(x) = x^0';

      if (rando < 11) {
          power = 2;
          if (typeOfExponent === "positive") {
            functionLatex = 'f(x) = x^2'
          } else if (typeOfExponent === "negative") {
            functionLatex = 'f(x) = x^{-2}'
          } else if (typeOfExponent === "fractional"){
            functionLatex = 'f(x) = x^{\\frac{1}{2}}'
          } else if (typeOfExponent === "negativeFractional") {
            functionLatex = 'f(x) = x^{-\\frac{1}{2}}'
          }
      } else if (rando >=11 && rando <=15) {
          power = 3;
          if (typeOfExponent === "positive") {
            functionLatex = 'f(x) = x^3'
          } else if (typeOfExponent === "negative") {
            functionLatex = 'f(x) = x^{-3}'
          } else if (typeOfExponent === "fractional"){
            functionLatex = 'f(x) = x^{\\frac{1}{3}}'
          } else if (typeOfExponent === "negativeFractional") {
            functionLatex = 'f(x) = x^{-\\frac{1}{3}}'
          }
      } else if (rando >= 16 && rando <= 17) {
          power = 4;
          if (typeOfExponent === "positive") {
            functionLatex = 'f(x) = x^4'
          } else if (typeOfExponent === "negative") {
            functionLatex = 'f(x) = x^{-4}'
          } else if (typeOfExponent === "fractional"){
            functionLatex = 'f(x) = x^{\\frac{1}{4}}'
          } else if (typeOfExponent === "negativeFractional") {
            functionLatex = 'f(x) = x^{-\\frac{1}{4}}'
          }
      } else if (rando === 18) {
          power = 5;
          if (typeOfExponent === "positive") {
            functionLatex = 'f(x) = x^5'
          } else if (typeOfExponent === "negative") {
            functionLatex = 'f(x) = x^{-5}'
          } else if (typeOfExponent === "fractional"){
            functionLatex = 'f(x) = x^{\\frac{1}{5}}'
          } else if (typeOfExponent === "negativeFractional") {
            functionLatex = 'f(x) = x^{-\\frac{1}{5}}'
          }
      } else {
          power = 0;
          if (typeOfExponent === "positive") {
            functionLatex = 'f(x) = x^0';
          } else if (typeOfExponent === "negative") {
            power = 2;
            functionLatex = 'f(x) = x^{-2}'
          } else if (typeOfExponent === "fractional"){
            power = 2;
            functionLatex = 'f(x) = x^{\\frac{1}{2}}'
          } else if (typeOfExponent === "negativeFractional") {
            power = 2;
            functionLatex = 'f(x) = x^{-\\frac{1}{2}}'
          }
      }
      return [power, functionLatex];
    }

    function setXValue(power, typeOfExponent) {
        let xValue = 2;
        let xChoice = 2;
        if (typeOfExponent === "positive" || typeOfExponent === "negative") {
          if (power === 2) {
            xValue = getRandomIntInclusive(2, 9);
          } else if (power === 3) {
            xValue = getRandomIntInclusive(2, 5);
          }  else if (power === 4) {
            xValue = getRandomIntInclusive(2, 3);
          } else if (power === 5) {
            xValue = 2;
          } else if (power === 0) {
            xValue = getRandomIntInclusive(2, 9);
          }
        } else if (typeOfExponent === "fractional" || typeOfExponent === "negativeFractional"){
          if (power === 2) {
            xChoice = getRandomIntInclusive(2, 9);
            xValue = xChoice ** power;
          } else if (power === 3) {
              xChoice = getRandomIntInclusive(2, 5);
              xValue = xChoice ** power;
          }  else if (power === 4) {
              xChoice = getRandomIntInclusive(2, 3);
              xValue = xChoice ** power
          } else if (power === 5) {
              xChoice = 2;
              xValue = xChoice ** power
          }
        }
        xValue = xValue.toString();
        console.log("xValue: " + xValue);
        console.log("xChoice: " + xChoice);
        return [xValue, xChoice];
    }

    function setAnswer(xValue, power, typeOfExponent, xChoice) {
        let answersArray = [];
        xValue = parseInt(xValue);
        if (typeOfExponent === "positive") {
        // return xValue ** power;
            let tempAnswer = xValue ** power;
            const answerLatex = tempAnswer.toString();
            answersArray.push(answerLatex);
            return [answerLatex, answersArray];
        } else if(typeOfExponent === "negative"){
            const denom = xValue ** power;
            const answerLatex = '\\frac{1}{' + denom + '}';
            answersArray.push(answerLatex);
            return [answerLatex, answersArray];
        } else if (typeOfExponent === "fractional") {
            let tempAnswer = Math.pow(xValue, 1/power)
            const answerLatex = tempAnswer.toString();
            answersArray.push(answerLatex);
            return [answerLatex, answersArray];
        } else if (typeOfExponent === "negativeFractional") {
            const answerLatex = '\\frac{1}{' + xChoice + '}';
            answersArray.push(answerLatex);
            return [answerLatex, answersArray];
        }
    }

    function questionEngine(topic) {
        let engine = "positive";
        if (topic === "mixed") {
          let engineArray = ["positive", "negative", "fractional", "negativeFractional"];
          let num = getRandomIntInclusive(0, 3);
          engine = engineArray[num];

        } else {
          engine = topic;
        }
        const [power, functionLatex] = setFunction(engine);
        const [xValue, xChoice] = setXValue(power, engine);
        console.log("xValue: " + xValue + ", power: " + power + ", engine: " + engine + ", xChoice: " + xChoice);
        const [answerLatex, answersArray] = setAnswer(xValue, power, engine, xChoice);
        console.log("answerLatex: " + answerLatex + ", answersArray: " + answersArray)

        setQuestionObject(
            {
              functionLatex: functionLatex,
              xValue: xValue,
              answerLatex: answerLatex,
              answersArray: answersArray
            }
          );   
    }

    const startTime = new Date();

    useEffect(() => {
        navigate(`/exponents2/${topic}`);
        questionEngine(topic);
    }, [topic]);

    function next(topic){
      questionEngine(topic); 
    }
    
    // This function needs to know what the topic is.
    // This changes if it's not "summerPrep", "calculus"
    async function done(){
        try {
            const endTime = new Date()
            const totalTime = endTime - startTime;
            const sessionData = setSessionData(quizProgress, startTime, totalTime, "summerPrep", "exponents", topic, username); 
            const result = await recordProgress(sessionData, "summerPrep");
            // What should we do with this result?
            console.log(result.msg);      
        } catch (error) {
            console.error("Failed to record progress: ", error);
            // Show a message to the user
        }
    };

    const navigate = useNavigate()

    function calculus() {  
      navigate("/calculus");
    }

    function sameTopic() {
        setQuizProgress(prevState => ({
            ...prevState,
            questionsAttempted: 0,
            questionsCorrect: 0,
            questionsIncorrect: 0,
            questionsStreak: 0,
            progressBar: 0,
            metStandard: false,
        }));          
    }
  
    function nextTopic() {
      if (topic === "mixed") {
          setTopic("mixed");
        } if (topic === "negativeFractional") {
          setTopic("mixed");
        } if (topic === "fractional") {
          setTopic("negativeFractional");
        } if (topic === "negative") {
          setTopic("fractional")
        } if (topic === "positive") {
          setTopic("negative");
        }

      setQuizProgress(prevState => ({
        ...prevState,
        questionsAttempted: 0,
        questionsCorrect: 0,
        questionsIncorrect: 0,
        questionsStreak: 0,
        progressBar: 0,
        metStandard: false,
        getNextQuestion: next,
        doneWithTopic: done,        
      }));          
    }

    if (quizProgress.metStandard) {
      return (
        <div className="col-12 mt-3">
            <div className="row">
                <h1>Exponents</h1>
            </div>
            <div className="row">
                <p className="col-sm-12 fs-5">Excellent! You met the standard!</p>
            </div>
            <div className="row">
              <Button variant="primary" onClick={nextTopic} className="col-8 offset-2 mt-2" size="lg">NEXT TOPIC</Button>
              <Button variant="primary" onClick={sameTopic} className="col-8 offset-2 mt-2" size="lg">MORE OF THE SAME</Button>
              <Button variant="primary" onClick={calculus} className="col-8 offset-2 mt-2" size="lg">BACK TO CALCULUS</Button>
            </div>
        </div>
      )
    } else {
    return (
      <div className="col-12 mt-3">
        <div className="row">
            <p className="col-12 text-center fs-2 mt-2">
            <StaticMathField>{questionObject.functionLatex}</StaticMathField>
            </p>
        </div>
        <TypedInputAnswerForm
            questionObject={questionObject}
            quizProgress={quizProgress}
            setQuizProgress={setQuizProgress}
            topic={topic}
        />
        <div className="progressBar mt-4 mb-4 col-10 offset-1">
            <ProgressBar now={quizProgress.progressBar} label={`${quizProgress.progressBar}%`} max='100'/>
        </div>
        <Link to="/exponentsTopics">
          <button type="button" className="btn btn-lg btn-success mt-3">OTHER TOPICS</button><br /><br />
        </Link>
        <div className="row">
            <h4>EXPONENTS</h4>
        </div>
        <div className="row">
            <p className="col-12 text-center">Evaluate each exponential term for the x-value provided.</p>
        </div>
      </div>
    )
  }
};

function AnswerForm({questionObject, quizProgress, setQuizProgress, topic}) {
  const mathFieldRef = useRef(null);
  
  useEffect(() => {
    if (mathFieldRef.current) {
      mathFieldRef.current.focus();
    }
  }, []);

  const [userAnswer, setUserAnswer] = useState('');
  const [answerMessage, setAnswerMessage] = useState('');

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

  const handleKeyDown = event => {
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
          // Turn this back on if you want an new question after a wrong answer.
          // quizProgress.getNextQuestion(topic);

        }
        setUserAnswer('');
        setAnswerMessage('');
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
                />
        </div>     
        <p className="col-12 text-center mt-3">{answerMessage}</p>
        <Button
            variant="primary"
            type="submit"
            id="submitBtn"
            size="lg"
            className="col-6 offset-3" 
          >
            SUBMIT
          </Button>
    </form>
  )
}

 


