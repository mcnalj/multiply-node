//TODO fix the unit depending on type of Exponent
// figure out how to save it to the database with different units. DONE
// Fix it so that it doesn't keep saving each question after we've met the standard. DONE
// Add a mix it up option. DONE
// maybe add simple polynomials
// Add user ability to choose which type of questions. DONE
// Makes sure all the questions to the 0 power are correct.
// Deploy
// Fix the look
// Put a timer on the screen or give some kind of time option to exceed.
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams, Link } from "react-router-dom";
import { ProgressBar, Button} from 'react-bootstrap';
import { addStyles, StaticMathField, EditableMathField } from 'react-mathquill'

import {
    getRandomIntInclusive,
  } from '../math-scripts/utilities-scripts.js';
import '../../App.scss';
import '../../index.scss';
import './styles.component.calculus.scss';

import { config} from '../constants.js';
var url = config.url.API_URL;

addStyles();

export default function Exponents({username}) {

    const parameter = useParams()
    let topic = parameter.topic;
  
    function setFunction(typeOfExponent) {
      // typeOfExponent can be positive, negative, fractional
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
          functionLatex = 'f(x) = x^0';    
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
        return [xValue, xChoice];
    }

    function setAnswer(xValue, power, typeOfExponent, xChoice) {
      xValue = parseInt(xValue);
      // It's a problem that this returns different types depending on the typeOfExponent.
      if (typeOfExponent === "positive") {
        // return xValue ** power;
        let tempAnswer = xValue ** power;
        const answerLatex = tempAnswer.toString();
        return answerLatex;
      } else if(typeOfExponent === "negative"){
        const denom = xValue ** power;
        const answerLatex = '\\frac{1}{' + denom + '}';
        return answerLatex;
      } else if (typeOfExponent === "fractional") {
        return xChoice;
      } else if (typeOfExponent === "negativeFractional") {
        const answerLatex = '\\frac{1}{' + xChoice + '}';
        return answerLatex;
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
        const answer = setAnswer(xValue, power, engine, xChoice);
        return [functionLatex, xValue, answer]
    }
    let [functionLatex, xValue, answer] = questionEngine(topic);
// hardcoded to eliminate errors
    const startTime = new Date();
    const standard = 7;
    

    function next(liftedState){
      // let [questionLatex, answerLatex] = questionEngine();
      let [functionLatex, xValue, answer] = questionEngine(topic); 
      setQuestionObject(
        {
          questionEngine: questionEngine,
          //   questionLatex: questionLatex,
          functionLatex: functionLatex,
          //   answerLatex: answerLatex,
          answer: answer,
          xValue: xValue,
          getNextQuestion: next,
          questionsAttempted: liftedState.questionsAttempted,
          questionsCorrect: liftedState.questionsCorrect,
          questionsIncorrect: liftedState.questionsIncorrect,
          questionsStreak: liftedState.questionsStreak,
          questionsToMeet: questionObject.questionsToMeet,
          progressBar: Math.round((liftedState.questionsCorrect/questionObject.questionsToMeet)*100),
          doneWithTopic: done,
          questionTopic: questionObject.questionTopic,
          questionPrompt: questionObject.questionPrompt,
          metStandard: false
        }
      );
    }
  
    // We have to reset things to zero after we update.
    async function done(liftedState){
      // Maybe it's in here that we have to call setQuestionObject to end the streak.
      // Need logic in here to change the engine if we have met the standard.
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
        // progress: {
        //     calculus: {
        //         exponents: {
        //             [topic]: {
        //               sessionsData: sessionObj
        //             }
        //         }
        //     }        
        // }
        progress: {
          calculus: {
              exponents: {
                  skillData: {
                    skill: topic,
                    sessionsData: sessionObj
                  }
              }
          }        
      }
      }
      const response = await fetch(`${url}/record/metStandard`, {
        method: "POST",
        // mode: 'cors',
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
      setQuestionObject(
        {
          questionEngine: questionEngine,
          functionLatex: functionLatex,
          answer: answer,
          xValue: xValue,
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
    };

    const navigate = useNavigate()

    function calculus() {  
      navigate("/calculus");
    }

    function sameTopic() {
      let stateToLift = {
        questionsAttempted: 0,
        questionsCorrect: 0,
        questionsStreak: 0,
        questionsIncorrect: 0,
      }
      next(stateToLift);
      // navigate(`/exponents/${topic}`);
    }
    function nextTopic() {
      if (topic === "mixed") {
        topic = "mixed";
      } if (topic === "negativeFractional") {
        topic = "mixed";
      } if (topic === "fractional") {
        topic = "negativeFractional";
      } if (topic === "negative") {
        topic = "fractional"
      } if (topic === "positive") {
        topic = "negative";
      }
      navigate(`/exponents/${topic}`);
      let stateToLift = {
        questionsAttempted: 0,
        questionsCorrect: 0,
        questionsStreak: 0,
        questionsIncorrect: 0,
      }
      next(stateToLift);
    }
  
    const [questionObject, setQuestionObject] = useState({
        questionEngine: questionEngine,
        functionLatex: functionLatex,
        xValue: xValue,
        answer: answer, 
        getNextQuestion: next,
        questionsAttempted: 0,
        questionsCorrect: 0,
        questionsIncorrect: 0,
        questionsStreak: 0,
        questionsToMeet: standard,
        progressBar: 0,
        doneWithTopic: done,
        metStandard: false,       
    })
    if (questionObject.metStandard) {
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
    }
    return (
      <div className="col-12 mt-3">
        <div className="row">
            <p className="col-12 text-center fs-2 mt-2">
            <StaticMathField>{questionObject.functionLatex}</StaticMathField>
            </p>
        </div>
        <AnswerForm
            questionObj={questionObject}
        />
        <div className="progressBar mt-4 mb-4 col-10 offset-1">
            <ProgressBar now={questionObject.progressBar} label={`${questionObject.progressBar}%`} max='100'/>
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
};

function AnswerForm({questionObj}) {
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

  function updateSituation(value) {
    return setUserAnswer((prev) => {
      return {...prev, ...value}
    });
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    let stateToLift = {
      questionsAttempted: questionObj.questionsAttempted + 1,
      questionsCorrect: questionObj.questionsCorrect,
      questionsStreak: questionObj.questionsStreak,
      questionsIncorrect: questionObj.questionsIncorrect,
    }

    let correctMessages = [
      `Yes, that is correct!`,
      `Great answer!`,
      `Exactly!`,
      `Yup, that's right . . .`,
      `You got it!`,
      `Boom!!`,
      `Ka-ching. that's right!`,
      `Exacto!`,
      `Superb! That is a correct answer`,
      `Right on! Correct answer!`,
      `Uh, huh, You got it.`,
      `That's it. Keep it up!`,
    ];

    // let incorrectMessages = [
    //   `Sorry, it's ${questionObj.answer}.`,
    //   `${questionObj.answer} is the answer I was looking for.`,
    //   `Not exactly. ${questionObj.answer} is a correct answer.`,
    //   `You got this! ${questionObj.answer} is what I was looking for.`,
    //   `This one was ${questionObj.answer}. You'll get the next one.`,
    //   `I was thinking, ${questionObj.answer}, but no sweat. You'll get it.`,
    //   `It's ${questionObj.answer}, but no worries, your moment is coming!`,
    // ];
    let incorrectMessages = [
      `Sorry, that's not the answer.`,
      `That's not the answer we were looking for.`,
      `Not exactly.`,
      `That's not right, but you got this!`,
      `You'll get the next one.`,
      `Not exactly, but no sweat. You'll get it.`,
      `Sorry, that's not it. But no worries, your moment is coming!`,
    ];

    let streakMessages = [
      `You are on a roll!`,
      `Keep it going . . .`,
      `Smoking hot!`,
      `You. Are. On. Fire!`,
      `Too good!!`,
      `OK, seems like you got this.`,
    ]


    let answerMessage = '';
    if (userObj.userAnswer === questionObj.answer) {
        stateToLift.questionsStreak = stateToLift.questionsStreak + 1;
        if (stateToLift.questionsStreak < 4) {
          let index = getRandomIntInclusive(0, ((correctMessages.length)))
          answerMessage = correctMessages[index];
        } else {
          let index = stateToLift.questionsStreak - 4;
          answerMessage = streakMessages[index];
          if (index >= streakMessages.length) {
            stateToLift.questionsStreak = 0;
          }
        }
        stateToLift.questionsCorrect = stateToLift.questionsCorrect + 1;

    } else {
      let index = getRandomIntInclusive(0, ((incorrectMessages.length)))
      answerMessage = incorrectMessages[index];

      stateToLift.questionsInorrect = stateToLift.questionsIncorrect + 1;
      stateToLift.questionsStreak = 0
    }
    updateSituation({answerMessage: answerMessage, userAnswer: ''})
    
    if (stateToLift.questionsCorrect >= questionObj.questionsToMeet) {
      questionObj.doneWithTopic(stateToLift);
    } else {
      questionObj.getNextQuestion(stateToLift);
    }
  }



  return (
    <form onSubmit={handleSubmit} method="post" action="#">
        <p className="col-12 text-center fs-2">
            <StaticMathField>{'f(' + questionObj.xValue + ') ='}</StaticMathField>
        </p>
        <div className="col-8 offset-2">
                <EditableMathField
                    className="form-control text-center fs-3"
                    aria-describedby="answer input"
                    latex={userObj.userAnswer}
                    onChange={(mathField)=>updateSituation({userAnswer: mathField.latex()})}
                    mathquillDidMount={mathField => (mathFieldRef.current = mathField)}
                    onKeyDown={handleKeyDown}
                />
        </div>     
        <p className="col-12 text-center mt-3">{userObj.answerMessage}</p>
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



