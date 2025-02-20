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

import {
  multipleChoiceQuestions,
  shuffleArray
} from '../questionBank/multipleChoiceQuestions.js';

import MultipleChoiceButtons from './answerComponents/multipleChoiceButtons.component.answerComponent.js';


addStyles();

export default function ExponentsVariety({username}) {

    // These are for the matching component
    const [isFinished, setIsFinished] = useState(false);
    const [leftOptions, setLeftOptions] = useState([]);
    const [rightOptions, setRightOptions] = useState([]);

    // These are for the multiple choice component
    const [multipleChoiceQuestionIndex, setMultipleChoiceQuestionIndex] = useState(0);
    const [multipleChoiceQuestionObject, setMultipleChoiceQuestionObject] = useState({
        questionData: '',
        answersArray: []
    });
    const [multipleChoiceQuestionsArray, setMultipleChoiceQuestionsArray] = useState(shuffleArray([...multipleChoiceQuestions]));
        
    const [answerMessage, setAnswerMessage] = useState('');

    // These are for the typed input component
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
        questionsToMeet: 11,
        progressBar: 0,
        metStandard: false, 
        getNextQuestion: next,
        doneWithTopic: done,         
    });

    function handleIncrementFromMultipleChoice() {
        if (quizProgress.questionsCorrect >= quizProgress.questionsToMeet - 1) {
            done();
        } else {
            nextMultipleChoice();
        }    
    }

    function nextMultipleChoice() {
        setMultipleChoiceQuestionIndex(prevIndex => prevIndex + 1);
    }

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
          // this answer needs to be parsed as an integer
            let tempAnswer = Math.pow(xValue, 1/power)
            tempAnswer = Math.round(tempAnswer);
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
        const [answerLatex, answersArray] = setAnswer(xValue, power, engine, xChoice);

        setQuestionObject(
            {
              functionLatex: functionLatex,
              xValue: xValue,
              answerLatex: answerLatex,
              answersArray: answersArray
            }
          );   
    }

    const startTime = useRef(new Date());

    useEffect(() => {
        let includeLevel1 = false;
        let includeLevel2 = false;
        let includeLevel3 = false;
        let includeLevel4 = false;
        let filteredMultipleChoiceQuestions;
        navigate(`/exponentsVariety/${topic}`);
        if (topic === "positive") {
          includeLevel1 = true;
          filteredMultipleChoiceQuestions = multipleChoiceQuestions.filter(q => q.level === 1);
        } else if (topic === "negative") {
          includeLevel2 = true;
          filteredMultipleChoiceQuestions = multipleChoiceQuestions.filter(q => q.level === 2);
        } else if (topic === "fractional") {
          includeLevel3 = true;
          filteredMultipleChoiceQuestions = multipleChoiceQuestions.filter(q => q.level === 3); 
        } else if (topic === "negativeFractional") {
          includeLevel4 = true;
          filteredMultipleChoiceQuestions = multipleChoiceQuestions.filter(q => q.level === 4);
        } else {
          includeLevel1 = true;
          includeLevel2 = true;
          includeLevel3 = true;
          includeLevel4 = true;
          filteredMultipleChoiceQuestions = multipleChoiceQuestions;
        }
        questionEngine(topic);
        const randomizedQuestionArray = populateQuestionArray(matchObjects, 5, includeLevel1, includeLevel2, includeLevel3, includeLevel4);
        const options = setOptions(randomizedQuestionArray);
        setLeftOptions(options.leftOptions);
        setRightOptions(options.rightOptions);

        setMultipleChoiceQuestionsArray(shuffleArray([...filteredMultipleChoiceQuestions]));
        setMultipleChoiceQuestionIndex(0);      
        // setMultipleChoiceQuestionsArray(shuffleArray([...multipleChoiceQuestions]));
    }, [topic]);

    useEffect(() => {
      getMultipleChoiceQuestion();
  }, [multipleChoiceQuestionIndex, multipleChoiceQuestionsArray]);

  function getMultipleChoiceQuestion() {
    if (multipleChoiceQuestionsArray.length > 0) {
      const tempMultipleChoiceQuestionObject = multipleChoiceQuestionsArray[multipleChoiceQuestionIndex];
      const answersArray = shuffleArray(Object.values(tempMultipleChoiceQuestionObject.answers));

      setMultipleChoiceQuestionObject({
          questionData: tempMultipleChoiceQuestionObject,
          answersArray: answersArray
      });
    }
  }

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
            // console.log(result.msg);      
        } catch (error) {
            console.error("Failed to record progress: ", error);
            // Show a message to the user
        }
    };

    const navigate = useNavigate()

    function summerPrep() {  
      navigate("/summerPrepTopics");
    }

    function exponentsTopics() {
      navigate("/exponentsTopics");
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
              {/* <Button variant="primary" onClick={nextTopic} className="col-8 offset-2 mt-2" size="lg">NEXT TOPIC</Button>
              <Button variant="primary" onClick={sameTopic} className="col-8 offset-2 mt-2" size="lg">MORE OF THE SAME</Button> */}
              <Button variant="primary" onClick={exponentsTopics} className="col-8 offset-2 mt-2" size="lg">BACK TO EXPONENTS TOPICS</Button>
              <Button variant="primary" onClick={summerPrep} className="col-8 offset-2 mt-2" size="lg">BACK TO SUMMER PREP</Button>
            </div>
        </div>
      )
    } else {
    return (
      <div className="col-12">
        {
            quizProgress.questionsCorrect === 5 ? (
                <>
                    <div className="row">
                        <p className="col-12 text-center fs-5">
                          Match an expression in the opposite column.
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
            ) : quizProgress.questionsCorrect < 2 || quizProgress.questionsCorrect > 8 ?
              ( 
                <div>
                    <div className="row">
                      <div className="col-12">
                          <ProgressBar variant="primary" style={{borderRadius: '0', backgroundColor: "LightGray"}}now={quizProgress.progressBar} label={`${quizProgress.progressBar}%`} max='100'/>
                      </div>
                    </div>
                    <p className="fs-5">Evaluate the exponential term.</p>
                    <div>
                        <p className="fs-2">
                            <StaticMathField>{multipleChoiceQuestionObject.questionData.question}</StaticMathField>
                            =
                        </p>
                    </div>

                    <MultipleChoiceButtons
                        questionObject={multipleChoiceQuestionObject}
                        handleIncrement={handleIncrementFromMultipleChoice}
                        setQuizProgress={setQuizProgress}
                        quizProgress={quizProgress}
                        setAnswerMessage={setAnswerMessage}
                        startTime={startTime}
                    />
                </div>
  

            ) : (
              <>
              <div className="row">
                <div className="progressBar col-12">
                  <ProgressBar now={quizProgress.progressBar} label={`${quizProgress.progressBar}%`} max='100'/>
                </div>
              </div>
              <div className="row">
                  <p className="col-12 text-center fs-2">
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
        <div>
            <p className="fs-3">{answerMessage}</p>
        </div>
        <Link to="/exponentsTopics">
          <button type="button" className="btn btn-success mt-5">BACK TO EXPONENTS TOPICS</button><br /><br />
        </Link>
      </div>
    )
  }
};
