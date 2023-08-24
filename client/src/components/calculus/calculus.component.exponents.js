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
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { ProgressBar, Button, Offcanvas} from 'react-bootstrap';
import { addStyles, StaticMathField, EditableMathField } from 'react-mathquill'

import {
    getSimplifiedFraction,
    getRandomIntInclusive,
    generateReducedFraction,
    maybeNegativeCoefficient,
    maybeNegativeCoefficientWithAlreadyNegativeCoefficient,
    applyRegexFixes,
    getReducedFraction,
    findGreatestCommonFactor
  } from '../math-scripts/utilities-scripts.js';
import '../../App.scss';
import '../../index.scss';
import './styles.component.calculus.scss';

import { config} from '../constants.js';
var url = config.url.API_URL;

addStyles();

export default function Exponents({username}) {

    const parameter = useParams()
    console.log("Getting the parameter to set topic.")
    let topic = parameter.topic;
    console.log(topic);
    
  
    function setFunction(typeOfExponent) {
      // typeOfExponent can be positive, negative, fractional
      let min = 1;
      typeOfExponent == "positive" ? min = 0 : min = 1;

      const rando = getRandomIntInclusive(min,19)
      let power = 2;
      let functionLatex = 'f(x) = x^0';
      if (rando < 11) {
          power = 2;
          if (typeOfExponent == "positive") {
            functionLatex = 'f(x) = x^2'
          } else if (typeOfExponent == "negative") {
            functionLatex = 'f(x) = x^{-2}'
          } else if (typeOfExponent == "fractional"){
            functionLatex = 'f(x) = x^{\\frac{1}{2}}'
          } else if (typeOfExponent == "negativeFractional") {
            functionLatex = 'f(x) = x^{-\\frac{1}{2}}'
          }
      } else if (rando >=11 && rando <=15) {
          power = 3;
          if (typeOfExponent == "positive") {
            functionLatex = 'f(x) = x^3'
          } else if (typeOfExponent == "negative") {
            functionLatex = 'f(x) = x^{-3}'
          } else if (typeOfExponent == "fractional"){
            functionLatex = 'f(x) = x^{\\frac{1}{3}}'
          } else if (typeOfExponent == "negativeFractional") {
            functionLatex = 'f(x) = x^{-\\frac{1}{3}}'
          }
      } else if (rando >= 16 && rando <= 17) {
          power = 4;
          if (typeOfExponent == "positive") {
            functionLatex = 'f(x) = x^4'
          } else if (typeOfExponent == "negative") {
            functionLatex = 'f(x) = x^{-4}'
          } else if (typeOfExponent == "fractional"){
            functionLatex = 'f(x) = x^{\\frac{1}{4}}'
          } else if (typeOfExponent == "negativeFractional") {
            functionLatex = 'f(x) = x^{-\\frac{1}{4}}'
          }
      } else if (rando == 18) {
          power = 5;
          if (typeOfExponent == "positive") {
            functionLatex = 'f(x) = x^5'
          } else if (typeOfExponent == "negative") {
            functionLatex = 'f(x) = x^{-5}'
          } else if (typeOfExponent == "fractional"){
            functionLatex = 'f(x) = x^{\\frac{1}{5}}'
          } else if (typeOfExponent == "negativeFractional") {
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
        if (typeOfExponent == "positive" || typeOfExponent == "negative") {
          if (power == 2) {
              xValue = getRandomIntInclusive(2, 9);
          } else if (power == 3) {
              xValue = getRandomIntInclusive(2, 5);
          }  else if (power == 4) {
              xValue = getRandomIntInclusive(2, 3);
          } else if (power == 5) {
              xValue = 2;
          }
        } else if (typeOfExponent == "fractional" || typeOfExponent == "negativeFractional"){
          if (power == 2) {
            xChoice = getRandomIntInclusive(2, 9);
            xValue = xChoice ** power;
          } else if (power == 3) {
              xChoice = getRandomIntInclusive(2, 5);
              xValue = xChoice ** power;
          }  else if (power == 4) {
              xChoice = getRandomIntInclusive(2, 3);
              xValue = xChoice ** power
          } else if (power == 5) {
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
      if (typeOfExponent == "positive") {
        // return xValue ** power;
        let tempAnswer = xValue ** power;
        const answerLatex = tempAnswer.toString();
        return answerLatex;
      } else if(typeOfExponent == "negative"){
        const denom = xValue ** power;
        const answerLatex = '\\frac{1}{' + denom + '}';
        return answerLatex;
      } else if (typeOfExponent == "fractional") {
        return xChoice;
      } else if (typeOfExponent == "negativeFractional") {
        const answerLatex = '\\frac{1}{' + xChoice + '}';
        return answerLatex;
      }
    }

    function questionEngine(topic) {
        let engine = "positive";
        if (topic == "mixed") {
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
    console.log("Running question engine in the main body.");
    let [functionLatex, xValue, answer] = questionEngine(topic);
    console.log("Value returned from questionEngine.");
    console.log("functionLatex: " + functionLatex);
    console.log("xValue: " + xValue);
    console.log("answer " + answer);

// hardcoded to eliminate errors
    const startTime = new Date();
    console.log("resetting start time");
    const standard = 3;
    

    function next(liftedState){
      // let [questionLatex, answerLatex] = questionEngine();
      let [functionLatex, xValue, answer] = questionEngine(topic); 
      console.log("Setting question object in next.");
      console.log("fucntionLatex: " + functionLatex);
      console.log("xValue: " + xValue);
      console.log("answer: " + answer);
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
      console.log(answer.msg);
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
      console.log("continue");  
      navigate("/calculus");
    }

    function sameTopic() {
      console.log("same");
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
      console.log("This is topic: " + topic);
      console.log("next");
      if (topic == "mixed") {
        topic = "mixed";
      } if (topic == "negativeFractional") {
        topic = "mixed";
      } if (topic == "fractional") {
        topic = "negativeFractional";
      } if (topic == "negative") {
        topic = "fractional"
      } if (topic == "positive") {
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
  

    console.log("At initial question Object")
    console.log("functionLatex: " + functionLatex);
    console.log("xValue: " + xValue);
    console.log("answer: " + answer);

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
    console.log("This is met standards: " + questionObject.metStandard);
    if (questionObject.metStandard) {
      return (
        <div className="col-sm-12 mt-3">
            <div className="row">
                <h1>Exponents</h1>
            </div>
            <div className="row">
                <h2 className="text-center mt-4">Excellent!</h2>
                <p className="col-sm-12">You met the standard for!</p>
            </div>
            <div className="row">
              <button onClick={nextTopic} className="btn btn-success col-4 offset-4">NEXT TOPIC</button>
              <button onClick={sameTopic} className="btn btn-success col-4 offset-4">MORE OF THE SAME</button>
              <button onClick={calculus} className="btn btn-success col-4 offset-4">BACK TO CALCULUS</button>
            </div>
        </div>
      )
    }
    return (
      <div className="col-sm-12 mt-3">
        <div className="row">
            <h1>Exponents</h1>
        </div>
        <div className="row">
            <h2 className="text-center mt-4">Simple Powers</h2>
                <p className="col-sm-12">Evaluate each exponential term for the given value.</p>
        </div>
        <div className="row">
            <p className="col-sm-8 offset-2 text-center mt-2">
            <StaticMathField>{questionObject.functionLatex}</StaticMathField>
            </p>
        </div>
        <AnswerForm
            questionObj={questionObject}
        />
        <div className="progressBar mt-4 mb-4 col-8 offset-2">
            <ProgressBar now={questionObject.progressBar} label={`${questionObject.progressBar}%`} max='100'/>
        </div>
      </div>
    )
};

function AnswerForm({questionObj}) {
  console.dir(questionObj);
  const [userObj, setUserAnswer] = useState({
    userAnswer: '',
    answerMessage: ''
  });

  function updateSituation(value) {
    return setUserAnswer((prev) => {
      return {...prev, ...value}
    });
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
      `Yes, ${questionObj.answer} is correct!`,
      `Great, ${questionObj.answer} is a correct answer.`,
      `Exactly!`,
      `Yup, that's right . . .`,
      `You got it! ${questionObj.answer} is right.`,
      `Boom!!`,
      `Ka-ching. that's right!`,
      `Exacto!`,
      `Superb! ${questionObj.answer} is a correct answer`,
      `Right on! ${questionObj.answer} is a correct answer`,
      `Uh, huh, You got it. ${questionObj.answer} works.`,
      `That's it. ${questionObj.answer} is right. Keep it up!`,
    ];

    let incorrectMessages = [
      `Sorry, it's ${questionObj.answer}.`,
      `${questionObj.answer} is the answer I was looking for.`,
      `Not exactly. ${questionObj.answer} is a correct answer.`,
      `You got this! ${questionObj.answer} is what I was looking for.`,
      `This one was ${questionObj.answer}. You'll get the next one.`,
      `I was thinking, ${questionObj.answer}, but no sweat. You'll get it.`,
      `It's ${questionObj.answer}, but no worries, your moment is coming!`,
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
    if (userObj.userAnswer == questionObj.answer) {
        stateToLift.questionsStreak = stateToLift.questionsStreak + 1;
        console.log(stateToLift.questionsStreak);
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
    <div className="row col-sm-12">
    <form onSubmit={handleSubmit} method="post" action="#" role="form">
      <div className="row col-sm-6 offset-4">    
        <div className="col-sm-2">
            <StaticMathField>{'f(' + questionObj.xValue + ') ='}</StaticMathField>
        </div>
        <div className="col-sm-4">
                <EditableMathField
                    className="form-control text-center"
                    aria-describedby="answer input"
                    latex={userObj.userAnswer}
                    onChange={(mathField)=>updateSituation({userAnswer: mathField.latex()})}
                />
        </div>
            
      </div>
      <div className="row">
        <p className="col-sm-12 text-center mt-3">{userObj.answerMessage}</p>
      </div>
      <div className="row">
        <button type="submit" className="btn btn-success col-4 offset-4">SUBMIT</button>
      </div>
    </form>
    </div>
  )
}



