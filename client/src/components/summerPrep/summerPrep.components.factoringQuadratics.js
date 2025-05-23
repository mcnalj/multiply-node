/// we need to parameterize topics and set up a choice page

import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
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
    setAction,
    recordAction
} from '../infrastructure/recordProgress.js';


addStyles();

export default function FactoringQuadratics({userId}) {
    const parameter = useParams()
    const topic = parameter.topic;
    const [errorMessage, setErrorMessage] = useState(null);    

    function getDifferenceOfSquares() {
        let factor1 = getRandomIntInclusive(1, 9);
        let factor1IsNegative = Math.random() > 0.5 ? true : false;
        factor1 = factor1IsNegative ? factor1 * -1 : factor1;
        let factor2 = factor1 * -1;
        return [factor1, factor2]; 
    }

    function getFactors() {
        let factor1 = getRandomIntInclusive(1, 9);
        let factor1IsNegative = Math.random() > 0.5 ? true : false;
        factor1 = factor1IsNegative ? factor1 * -1 : factor1;
        let factor2 = 1;
        if (Math.abs(factor1)> 5) {
            factor2 = getRandomIntInclusive(1, 5);    
        } else {
            factor2 = getRandomIntInclusive(1, 9);
        }
        
        let factor2IsNegative = Math.random() > 0.5 ? true : false;
        factor2 = factor2IsNegative ? factor2 * -1 : factor2;
        return [factor1, factor2]
    }

    function getQuadraticParameters() {
        let [factor1, factor2] = getFactors();
//        This is not implemented becasue it needs a checkbox and connection to database.
        if (topic == "differenceOfSquares") {
            [factor1, factor2] = getDifferenceOfSquares();
        }
        let a = 1;
        let b = factor1 + factor2;
        let c = factor1 * factor2;
        let firstZero = factor1 * -1;
        let secondZero = factor2 * -1;
        let quadraticParameters = {
            a: a,
            b: b,
            c: c,
            firstZero: firstZero,
            secondZero: secondZero
        }
        return quadraticParameters;
    }

    let quadraticParameters = getQuadraticParameters();

    function setFunction(quadraticParameters) {
        let firstTerm = quadraticParameters.a == 1 ? 'x^2': quadraticParameters.a + 'x^2';
        let secondTerm  = Math.abs(quadraticParameters.b) > 1 ? (quadraticParameters.b > 0 ? '+' + quadraticParameters.b + 'x': quadraticParameters.b + 'x') : quadraticParameters.b > 0 ? '+ x' : '- x';
        let thirdTerm = quadraticParameters.c > 0 ? '+' + quadraticParameters.c: quadraticParameters.c;
        let functionLatex = 'f(x) = ' + firstTerm + secondTerm + thirdTerm;
        if (quadraticParameters.b == 0) {
            functionLatex = 'f(x) = ' + firstTerm + thirdTerm;
        } 
        return functionLatex
    }

    let functionLatex = setFunction(quadraticParameters);

    const [questionObject, setQuestionObject] = useState({
        functionLatex: functionLatex,
        quadraticParams: quadraticParameters, 
        getNextQuestion: next,
        questionsAttempted: 0,
        questionsCorrect: 0,
        questionsIncorrect: 0,
        questionsStreak: 0,
        questionsToMeet: 8,
        progressBar: 0,
        doneWithTopic: done,
        metStandard: false,       
    })

    const startTime = useRef(new Date());

    function next(liftedState){
        let quadraticParameters = getQuadraticParameters();
        let functionLatex = setFunction(quadraticParameters);
        setQuestionObject(
          {
            functionLatex: functionLatex,
            quadraticParams: quadraticParameters,
            getNextQuestion: next,
            questionsAttempted: liftedState.questionsAttempted,
            questionsCorrect: liftedState.questionsCorrect,
            questionsIncorrect: liftedState.questionsIncorrect,
            questionsStreak: liftedState.questionsStreak,
            questionsToMeet: questionObject.questionsToMeet,
            progressBar: Math.round((liftedState.questionsCorrect/questionObject.questionsToMeet)*100),
            doneWithTopic: done,
            metStandard: false
          }
        );
    }

    async function done(liftedState, startTime){
        try {
            const endTime = new Date();
            const totalTime = endTime - startTime.current;
            const section = "summerPrep";
            const unit = "quadratics";
            let topicName = topic;

            const actionDetails = {
            section: section,
            unit: unit,
            topic: topicName,
            "metStandard": true,
            "questionsAttempted": liftedState.questionsAttempted,
            "questionsCorrect": liftedState.questionsCorrect,
            "questionsIncorrect": liftedState.questionsIncorrect,
            "questionsStreak": liftedState.questionsStreak,
            "datetimeStarted": startTime.current,
            "totalTime": totalTime,
            }
    
            const action = setAction("skillCompleted", actionDetails, userId)
            const result = await recordAction(action);            



            // const sessionData = setSessionData(liftedState, startTime, totalTime, "summerPrep", "quadratics", topic, username);
            // // we are going to need to pass url information if we're not in summerPrep
            // const result = await recordProgress(sessionData, "summerPrep");
            // what should we do with this result?
            let quadraticParameters = getQuadraticParameters();
            let functionLatex = setFunction(quadraticParameters);
            setQuestionObject(
              {
                functionLatex: functionLatex,
                quadraticParams: quadraticParameters,
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
    if (questionObject.metStandard) {
        return (
            <div className="col-12">
                <div className="row">
                    <p className="col-12 text-center fs-2 mt-2">
                        Great work!
                    </p>
                </div>
                <div className="row">
                    <p className="col-12 text-center fs-2 mt-2">
                        You met the standard. Happy factoring!
                    </p>
                </div>                
                <Link to="/factoringQuadraticsTopics">
                    <button type="button" className="btn btn-lg btn-success mt-3">BACK TO QUADRATICS TOPICS</button><br /><br />
                </Link>
            </div>
        )
    } else {
    return (
        <div className="col-12">
            <div className="progressBar mb-2">
              <ProgressBar now={questionObject.progressBar} label={`${questionObject.progressBar}%`} max='100'/>
          </div>  
          <div className="row">
              <p className="col-12 text-center fs-2 mt-2">
              <StaticMathField>{questionObject.functionLatex}</StaticMathField>
              </p>
          </div>
          <AnswerForm
              questionObj={questionObject}
              startTime={startTime}
          />
        {errorMessage && (
            <div className="alert alert-danger mt-3" role="alert">
                {errorMessage}
            </div>    
        )}          
          <Link to="/factoringQuadraticsTopics">
            <button type="button" className="btn btn-lg btn-success mt-3">BACK TO QUADRATICS TOPICS</button><br /><br />
          </Link>
        </div>
      )
    }
}

function AnswerForm({questionObj, startTime}) {
    const mathFieldRef = useRef(null);
    const firstSign = questionObj.quadraticParams.firstZero > 0 ? '-': '+';
    const secondSign = questionObj.quadraticParams.secondZero > 0 ? '-': '+';
    const firstPart = '0 = (x ' + firstSign;
    const secondPart = ') (x ' + secondSign;
  
    useEffect(() => {
      if (mathFieldRef.current) {
        mathFieldRef.current.focus();
      }
    }, []);

    const [firstAnswer, setFirstAnswer] = useState("");
    const [secondAnswer, setSecondAnswer] = useState("");
    const [answerMessage, setAnswerMessage] = useState("");
   
    function handleChange1(event) {
        setFirstAnswer(event.target.value);
    }

    function handleChange2(event) {
        setSecondAnswer(event.target.value);
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
        let answerIsCorrect = false;
        if ((firstAnswer == Math.abs(questionObj.quadraticParams.firstZero) && secondAnswer == Math.abs(questionObj.quadraticParams.secondZero)) || ((firstSign === secondSign) && (firstAnswer == Math.abs(questionObj.quadraticParams.secondZero) && secondAnswer == Math.abs(questionObj.quadraticParams.firstZero)))) {
            answerIsCorrect = true;
        }
        if (answerIsCorrect) { 
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
            answerMessage = "Sorry the correct answers were " + questionObj.quadraticParams.firstZero + " and " + questionObj.quadraticParams.secondZero;
            stateToLift.questionsIncorrect = stateToLift.questionsIncorrect + 1;
            stateToLift.questionsStreak = 0
        }
        setAnswerMessage(answerMessage);
        
        if (stateToLift.questionsCorrect >= questionObj.questionsToMeet) {
            questionObj.doneWithTopic(stateToLift, startTime);
        } else {
            questionObj.getNextQuestion(stateToLift);
        }
        setFirstAnswer("");
        setSecondAnswer("");
    }

    return (
        <form onSubmit={handleSubmit} method="post" action="#">
            <div className="fs-2">
                <p>
                    {firstPart}
                    <input
                        id="answer1"
                        className="text-center"
                        aria-describedby="answer input"
                        type="text"
                        onKeyDown={handleKeyDown}
                        onChange={handleChange1}
                        style={{width: '25px'}}
                        value={firstAnswer}
                    />
                    {secondPart}
                
                    <input
                    id="answer2"
                    className="text-center"
                    aria-describedby="answer input"
                    type="text"
                    onKeyDown={handleKeyDown}
                    onChange={handleChange2}
                    style={{width: '25px'}}
                    value={secondAnswer}
                 />
                )
                </p>
            </div>
   
            <p className="col-12 text-center mt-3 fs-3">{answerMessage}</p>
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
