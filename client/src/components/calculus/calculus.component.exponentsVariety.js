//TODO fix the unit depending on type of Exponent
// maybe add simple polynomials
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
    matchObjects
} from './answerComponents/matchObjects.js';

import {
    MatchingComponent
} from './answerComponents/matchingComponent.component.answerComponents.js'; 

import {
    populateQuestionArray,
    setOptions
} from './answerComponents/matchingParentUtilityFunctions.js'; 

import {
  TypedInputAnswerForm
} from './answerComponents/typedInputAnswerInput.component.answerCompoments.js';


addStyles();

export default function ExponentsVariety({username}) {

    // These are for the matching component
    const [isFinished, setIsFinished] = useState(false);
    const [leftOptions, setLeftOptions] = useState([]);
    const [rightOptions, setRightOptions] = useState([]);
  


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
        navigate(`/exponentsVariety/${topic}`);
        questionEngine(topic);
        const randomizedQuestionArray = populateQuestionArray(matchObjects, 5, true, false, false);
        const options = setOptions(randomizedQuestionArray);
        setLeftOptions(options.leftOptions);
        setRightOptions(options.rightOptions); 
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
        {
            quizProgress.questionsAttempted === 4 ? (
                <>
                    <div className="row">
                        <p className="col-12 text-center fs-2 mt-2">
                        </p>
                    </div>
                    <MatchingComponent
                        matchObjects={matchObjects}
                        leftOptions={leftOptions}
                        rightOptions={rightOptions}
                        setQuizProgress={setQuizProgress}
                        setIsFinished={setIsFinished}
                    />
                </>
            ) : (
                <>
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
                </>
            )
        }
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
