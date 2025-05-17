import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, NavLink, useNavigate } from "react-router-dom";
import { ProgressBar, Button, Container, Row, Col} from 'react-bootstrap';
import { addStyles, StaticMathField } from 'react-mathquill'

import '../../App.scss';
import '../../index.scss';
import './integration.component.integration.scss';

import IndefiniteIntegralSingleTerm from '../explanations/integration.component.explanations.js'
import { 
    IndefiniteIntegralsBinomial,
    IndefiniteIntegralsPolynomial,
    IndefiniteIntegralsTrigonometric,
    IndefiniteIntegralsNaturalExponential,
    IndefiniteIntegralsNaturalLog,
    IndefiniteIntegralsNaturalLogBinomial,
    DefiniteIntegrals }
from '../explanations/integration.component.explanations.js'

import { IntegrationAnswerForm } from './integration.component.answerForm.js';

import {
  questionTopics
} from '../infrastructure/question-topics.js';

import {
  setAction,
  recordAction
} from '../infrastructure/recordProgress.js';

import {
  matchObjectsIntegrals,
  matchObjectsIntegrals2,
  matchObjectsIntegrals3,
  matchObjectsIntegrals4,
  matchObjectsIntegrals5,
  matchObjectsIntegrals6,
  matchObjectsIntegrals7,
} from '../infrastructure/answerComponents/matchObjects.js';

import {
  MatchingComponent
} from '../infrastructure/answerComponents/matchingComponent.component.answerComponents.js';

import {
  populateQuestionArray,
  setOptions
} from '../infrastructure/answerComponents/matchingParentUtilityFunctions.js';

import {
  multipleChoiceQuestionsIntegration,
  multipleChoiceQuestionsIntegration2,
  multipleChoiceQuestionsIntegration3,
  multipleChoiceQuestionsIntegration4,
  multipleChoiceQuestionsIntegration5,
  multipleChoiceQuestionsIntegration6,
  multipleChoiceQuestionsIntegration7,
  shuffleArray
} from '../questionBank/multipleChoiceQuestions.js';

import MultipleChoiceButtons from '../infrastructure/answerComponents/multipleChoiceButtons.component.answerComponent.js';

import { config } from '../constants.js';
var url = config.url.API_URL;

addStyles();

function setQuestionEngine(topicId) {
  let engineArray = questionTopics["integrals"];
  let engine = engineArray.find((engine) => engine.topicId === topicId)
  // TODO Need proper error handling.
  if (engine) {
    return(engine.questionEngine);
  } else {
    return("We could not find that engine!");
  }
}

export default function Integration({userId}) {
  const startTime = useRef(new Date());
  const parameter = useParams()
  const navigate = useNavigate();

  var initialTopic = parseInt(parameter.topic);

  let matchObjects = [];
  let multipleChoiceQuestions = [];
  if (initialTopic === 3010) {
    matchObjects = matchObjectsIntegrals;
    multipleChoiceQuestions = multipleChoiceQuestionsIntegration;
  }
  else if (initialTopic === 3020) {
    matchObjects = matchObjectsIntegrals2; 
    multipleChoiceQuestions = multipleChoiceQuestionsIntegration2; 
  }
  else if (initialTopic === 3030) {
    matchObjects = matchObjectsIntegrals3;
    multipleChoiceQuestions = multipleChoiceQuestionsIntegration3;
  }
  else if (initialTopic === 3040) {
    matchObjects = matchObjectsIntegrals4;
    multipleChoiceQuestions = multipleChoiceQuestionsIntegration4;
  }
  else if (initialTopic === 3050) {
    matchObjects = matchObjectsIntegrals5;
    multipleChoiceQuestions = multipleChoiceQuestionsIntegration5;
  }
  else if (initialTopic === 3060) {
    matchObjects = matchObjectsIntegrals6;
    multipleChoiceQuestions = multipleChoiceQuestionsIntegration6;
  }
  else if (initialTopic === 3070) {
    matchObjects = matchObjectsIntegrals7;
    multipleChoiceQuestions = multipleChoiceQuestionsIntegration7;
  }

  const [multipleChoiceQuestionsArray, setMultipleChoiceQuestionsArray] = useState(shuffleArray([...multipleChoiceQuestions]));
  const [matchObjectsState, setMatchObjects] = useState(matchObjects);

  const [currentTopic, setCurrentTopic] = useState(initialTopic);

  useEffect(() => {
    setMultipleChoiceQuestionsArray(shuffleArray([...multipleChoiceQuestions]));
  }, [multipleChoiceQuestions]);

  return (
    <>
      <Integrals
        currentTopic={currentTopic}
        setCurrentTopic={setCurrentTopic}
        questionTopics={questionTopics.integrals}
        userId={userId}
        startTime={startTime}
        matchObjectsIntegrals={matchObjectsState}
        populateQuestionArray={populateQuestionArray}
        setOptions={setOptions}
        multipleChoiceQuestionsArray={multipleChoiceQuestionsArray}
        MultipleChoiceButtons={MultipleChoiceButtons}
      />
    </>
  );
}

function Integrals({userId, currentTopic, setCurrentTopic, questionTopics, startTime, matchObjectsIntegrals, populateQuestionArray, setOptions, multipleChoiceQuestionsArray, MultipleChoiceButtons}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // this is for the matchingComponent
  const [leftOptions, setLeftOptions] = useState([]);
  const [rightOptions, setRightOptions] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  // this is for the multipleChoiceComponent
  const [multipleChoiceQuestionIndex, setMultipleChoiceQuestionIndex] = useState(0)
  const [multipleChoiceQuestionObject, setMultipleChoiceQuestionObject] = useState({
    questionData: '',
    answersArray: []
  })

  const [answerMessage, setAnswerMessage] = useState('');

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

  let unit = "integrals";
  let standard = 10;
  let absoluteValue = false;
  if (currentTopic === 3060 || currentTopic === 3070) {
    absoluteValue = true;
  }

  let questionEngine = setQuestionEngine(currentTopic);

  const [questionObject, setQuestionObject] = useState({
    questionEngine: questionEngine,
    questionLatex: '',
    answerArrayLatex: [],
    questionTopic: '',
    questionPrompt: '',
  })

  const [quizProgress, setQuizProgress] = useState({
    questionsAttempted: 0,
    questionsCorrect: 0,
    questionsIncorrect: 0,
    questionsStreak: 0,
    questionsToMeet: standard,
    progressBar: 0,
    metStandard: false,
    getNextQuestion: next,
    doneWithTopic: done,
  })

  function handleIncrementFromMultipleChoice(liftedState) {
    if (quizProgress.questionsCorrect >= quizProgress.questionsToMeet-1) {
        done(liftedState);
    } else {
        nextMultipleChoice();
    }    
  }

  function nextMultipleChoice() {
      if (multipleChoiceQuestionIndex === multipleChoiceQuestionsArray.length - 1) {
          setMultipleChoiceQuestionIndex(0);
      } else {
          setMultipleChoiceQuestionIndex(prevIndex => prevIndex + 1);
      }
  }
  
  useEffect(() => {
    async function getTopics() {
      let questionEngine = setQuestionEngine(currentTopic);
      let [questionLatex, answerArrayLatex] = questionEngine();
      questionLatex = "f(x) = " + questionLatex;

      setQuestionObject({
        questionEngine: questionEngine,
        questionLatex: questionLatex,
        answerArrayLatex: answerArrayLatex,
        questionTopic: "Integrals",
        questionPrompt: "f(x)",
      });

      setQuizProgress({
        questionsAttempted: 0,
        questionsCorrect: 0,
        questionsIncorrect: 0,
        questionsStreak: 0,
        questionsToMeet: standard,
        progressBar: 0,
        metStandard: false,
        getNextQuestion: next,
        doneWithTopic: done,
      })

      const randomizedQuestionArray = populateQuestionArray(matchObjectsIntegrals, 5, true, false, false, false);
      const options = setOptions(randomizedQuestionArray);
      setLeftOptions(options.leftOptions);
      setRightOptions(options.rightOptions);

    }
    getTopics(unit);
    return;
  }, [currentTopic]);

  function next(liftedState){
      let questionEngine = setQuestionEngine(currentTopic);
      
      let [questionLatex, answerArrayLatex] = questionEngine();
      questionLatex = "f(x) = " + questionLatex;
      setQuestionObject({
        questionEngine: questionEngine,
        questionLatex: questionLatex,
        answerArrayLatex: answerArrayLatex,
        questionTopic: questionObject.questionTopic,
        questionPrompt: questionObject.questionPrompt,
      })

      setQuizProgress({
        questionsAttempted: liftedState.questionsAttempted,
        questionsCorrect: liftedState.questionsCorrect,
        questionsIncorrect: liftedState.questionsIncorrect,
        questionsStreak: liftedState.questionsStreak,
        questionsToMeet: quizProgress.questionsToMeet,
        progressBar: liftedState.progressValue,
        metStandard: false,
        getNextQuestion: next,
        doneWithTopic: done,
      });
  }

  async function done(liftedState){
    try {
      const endTime = new Date()
      const totalTime = endTime - startTime.current;
      // Determine topic name;
      const currentTopicObj = questionTopics.find((name) => name.topicId === currentTopic)
      const topicName = currentTopicObj?.topicName || "errantName";

      // I kept this so we can us the success Page, but revise.
      const actionDetails = {
        section: "summerPrep",
        unit: "multiplication",
        topic: topicName,
        "metStandard": true,
        "questionsAttempted": liftedState.questionsAttempted,
        "questionsCorrect": liftedState.questionsCorrect,
        "questionsIncorrect": liftedState.questionsIncorrect,
        "questionsStreak": liftedState.questionsStreak,
        "datetimeStarted": startTime.current,
        "totalTime": totalTime,
      }


      const action = setAction("skillCompleted", actionDetails, userId);
      const result = await recordAction(action);

      // when me navigate back by clicking more of the same, we get "There was an error calculating statistics." Why?
      navigate("/skillComplete", {state: actionDetails}); 
    } catch(error) {
      if (error.name === "TypeError") {
        console.error("Newtwork error or issue with recording progress:", error);
        setErrorMessage("We are unable to record your progress. Please check your internet connection.")

      } else {
        console.error("Error processing request:", error);
        setErrorMessage("error.message" || "Sorry, there was an error recording your progress. Please try again later.")
      }
    }
  }

  return (
    <div>
        {
    quizProgress.questionsCorrect === 5 ? (
        <>
            <div className="row">
                <p className="col-12 text-center fs-5">
                  Match an expression in the opposite column.
                </p>
            </div>
            <MatchingComponent
                matchObjects={matchObjectsIntegrals}
                leftOptions={leftOptions}
                rightOptions={rightOptions}
                setQuizProgress={setQuizProgress}
                quizProgress={quizProgress}
                setIsFinished={setIsFinished}
            />
            {/* <Link to="/integrationTopics">
              <button type="button" className="btn btn-lg btn-success mt-3">OTHER TOPICS</button><br /><br />
            </Link> */}
        </>
    ) : quizProgress.questionsCorrect < 2 || quizProgress.questionsCorrect > 7 ? (
      <div>
          <div className="row">
            <div className="col-12">
                <ProgressBar variant="primary" style={{borderRadius: '0', backgroundColor: "LightGray"}}now={quizProgress.progressBar} label={`${quizProgress.progressBar}%`} max='100'/>
            </div>
          </div>
          <p className="fs-5">Evaluate the integral.</p>
          <div>
              <p className="fs-2">
                  <StaticMathField>{multipleChoiceQuestionObject.questionData.question}</StaticMathField>
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
          <div className="col-12">
            <ProgressBar variant="primary" style={{borderRadius: '0', backgroundColor: "LightGray"}}now={quizProgress.progressBar} label={`${quizProgress.progressBar}%`} max='100'/>
          </div>
        </div>
        <div className="row">      
          <div className="col-12 d-flex justify-content-end">
            <ModalComponent
              currentTopic={currentTopic}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center" style={{fontSize: '2em'}}>
              <StaticMathField>{ questionObject.questionLatex }</StaticMathField>
          </div>
        </div>
        {errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>    
        )}
        <IntegrationAnswerForm
            questionObject={questionObject}
            quizProgress={quizProgress}  
        />
      </>
    )}      
      <Link to="/integrationTopics">
        <button type="button" className="btn btn-lg btn-success mt-3">OTHER TOPICS</button><br /><br />
      </Link>
      <AbsoluteValueInstructions
          absoluteValue={absoluteValue}
      />
    </div>
  );
}

function AbsoluteValueInstructions({absoluteValue}) {
  if (absoluteValue) {
    return (
      <>
        <p>The integral of <StaticMathField>{`\\frac{1}{x}`}</StaticMathField> is <StaticMathField>{`\\ln\\mid x\\mid + C`}</StaticMathField>.</p>
        <p>To draw the absolute value lines you use the \mid command.</p>
        <p>To enter <StaticMathField>{`\\ln\\mid x\\mid + C`}</StaticMathField> you type <strong>ln\mid x\mid+C</strong> with a space before the x.</p>
        <p>The two \mid commands will display the absolute value symbol around x.</p>
      </>
    )

  } else {
    return(
      <>
      </>
    )
  }
}

function ModalComponent ({currentTopic}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  if (currentTopic === 3010) {
    return(
      <>
        <Button className="m-2" variant="info" onClick={handleShow}>
          Explain!
        </Button>
        <IndefiniteIntegralSingleTerm 
          show={show}
          handleClose={handleClose}
        />
      </>
    )
  } else if (currentTopic === 3020) {
    return(
      <>
        <Button className="m-2" variant="info" onClick={handleShow}>
          Explain!
        </Button>
        <IndefiniteIntegralsBinomial
          show={show}
          handleClose={handleClose}
        />
      </>
    )
  } else if (currentTopic === 3030) {
    return(
      <>
        <Button className="m-2" variant="info" onClick={handleShow}>
          Explain!
        </Button>
        <IndefiniteIntegralsPolynomial
          show={show}
          handleClose={handleClose}
        />
      </>
    )
  } else if (currentTopic === 3040) {
    return(
      <>
        <Button className="m-2" variant="info" onClick={handleShow}>
          Explain!
        </Button>
        <IndefiniteIntegralsTrigonometric
          show={show}
          handleClose={handleClose}
        />
      </>
    )
  } else if (currentTopic === 3050) {
    return(
      <>
        <Button className="m-2" variant="info" onClick={handleShow}>
          Explain!
        </Button>
        <IndefiniteIntegralsNaturalExponential
          show={show}
          handleClose={handleClose}
        />
      </>
    )
  } else if (currentTopic === 3060) {
  return(
    <>
      <Button className="m-2" variant="info" onClick={handleShow}>
        Explain!
      </Button>
      <IndefiniteIntegralsNaturalLog
        show={show}
        handleClose={handleClose}
      />
    </>
  )
} else if (currentTopic === 3070) {
  return(
    <>
      <Button className="m-2" variant="info" onClick={handleShow}>
        Explain!
      </Button>
      <IndefiniteIntegralsNaturalLogBinomial
        show={show}
        handleClose={handleClose}
      />
    </>
  )
} else if (currentTopic === 3080) {
  return(
    <>
      <Button className="m-2" variant="info" onClick={handleShow}>
        Explain!
      </Button>
      <DefiniteIntegrals
        show={show}
        handleClose={handleClose}
      />
    </>
  )
}
}