import React, { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ProgressBar, Button, Offcanvas} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { addStyles, StaticMathField, EditableMathField } from 'react-mathquill'
import '../../App.scss';
import '../../index.scss';
import './derivatives.component.derivatives.scss';

import NaturalExponential from '../explanations/explanations.component.naturalExponentialLog.js'
import { NaturalLog, NaturalLogBinomials, ExponentialBaseA, LogBaseA  } from '../explanations/explanations.component.naturalExponentialLog.js'

import { AnswerForm } from '../calculus/calculus.component.answerForm.js';
import {
  naturalExponential,
  complexNaturalExponential,
  simpleNaturalLog,
  complexNaturalLog,
  mixNaturalExponentialAndLog,
  exponentialFunctionsBaseA,
  logFunctionsBaseA
} from '../math-scripts/natural-scripts.js';

import {
  questionTopics
} from '../infrastructure/question-topics.js';

import {
  setAction,
  recordAction
} from '../infrastructure/recordProgress.js';

import { config} from '../constants.js';
var url = config.url.API_URL;

addStyles();

function setQuestionEngine(topicId) {
  let engineArray = questionTopics["derivatives"];
  let engine = engineArray.find((engine) => engine.topicId == topicId)
  // TODO Need proper error handling.
  if (engine) {
    return(engine.questionEngine);
  } else {
    return("We could not find that engine!");
  }
}

export default function NaturalDerivatives({username}) {

  const parameter = useParams()
  var initialTopic = parseInt(parameter.topic);


  const [currentTopic, setCurrentTopic] = useState(initialTopic);
  return (
    <>
      <Derivatives 
        currentTopic={currentTopic}
        setCurrentTopic={setCurrentTopic}
        questionTopics={questionTopics.derivatives}
        username={username}
      />
    </>
  )
}

function Derivatives({username, currentTopic, setCurrentTopic, questionTopics}) {
  const startTime = useRef(new Date());
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  let unit = "derivatives";
  let standard = 8;

  let questionEngine = setQuestionEngine(currentTopic);
  const [questionState, setQuestionState] = useState({
    questionEngine: questionEngine,
    questionEngine: '',
    questionLatex: '',
    answerArrayLatex: [],
    getNextQuestion: next,
    questionsAttempted: 0,
    questionsCorrect: 0,
    questionsIncorrect: 0,
    questionsStreak: 0,
    questionsToMeet: standard,
    progressBar: 0,
    doneWithTopic: done,
    questionTopic: '',
    questionPrompt: '',
  });

  useEffect(() => {
    async function getTopics(unitName) {
      let questionEngine = setQuestionEngine(currentTopic);
      console.log(currentTopic);
      console.log(questionEngine);
      let [questionLatex, answerArrayLatex] = questionEngine();
      questionLatex = 'f(x) = '+ questionLatex;
      console.log(questionLatex);
      setQuestionState(
        {
          questionEngine: questionEngine,
          questionLatex: questionLatex,
          answerArrayLatex: answerArrayLatex,
          getNextQuestion: next,
          questionsAttempted: 0,
          questionsCorrect: 0,
          questionsIncorrect: 0,
          questionsStreak: 0,
          questionsToMeet: 7,
          progressBar: 0,
          doneWithTopic: done,
          questionTopic: "Natural Exponential and Log",
          questionPrompt: "f'(x)",
        }
      )
    }
    getTopics(unit);
    console.dir(questionState);

    return;
  }, [currentTopic]);

  function next(liftedState){
      let questionEngine = setQuestionEngine(currentTopic);
      
      let [questionLatex, answerArrayLatex] = questionEngine();
      console.log("Question: " + questionLatex);
      console.log("Answer: " + answerArrayLatex[0]);
      questionLatex = 'f(x) = ' + questionLatex;
      setQuestionState({
        questionEngine: questionEngine,
        questionLatex: questionLatex,
        answerArrayLatex: answerArrayLatex,
        getNextQuestion: next,
        questionsAttempted: liftedState.questionsAttempted,
        questionsCorrect: liftedState.questionsCorrect,
        questionsIncorrect: liftedState.questionsIncorrect,
        questionsStreak: liftedState.questionsStreak,
        questionsToMeet: questionState.questionsToMeet,
        // progressBar: Math.round((liftedState.questionsCorrect/questionState.questionsToMeet)*100),
        progressBar: liftedState.progressValue,
        doneWithTopic: done,
        questionTopic: questionState.questionTopic,
        questionPrompt: questionState.questionPrompt,
      });
  }
  async function done(liftedState){
    try {
      const endTime = new Date()
      const totalTime = endTime - startTime.current;
      // Determine topic name
      let topicName = '';
      const currentTopicName = questionTopics.find((name) => name.topicId == currentTopic)
      if (currentTopicName) {
        topicName = currentTopicName.topicName;
      }  else {
        topicName = "errantName";
      }
      const actionDetails = {
        section: "calculus",
        unit: "derivatives",
        topic: topicName,
        "metStandard": true,
        "questionsAttempted": liftedState.questionsAttempted,
        "questionsCorrect": liftedState.questionsCorrect,
        "questionsIncorrect": liftedState.questionsIncorrect,
        "questionsStreak": liftedState.questionsStreak,
        "datetimeStarted": startTime,
        "totalTime": totalTime,
      }
      const action = setAction("skillCompleted", actionDetails);
      const result = await recordAction(action);
      navigate("/skillComplete", {state: actionDetails});
    } catch (error) {
      if (error.name === "TypeError") {
        console.error("Network error or issue with recording progress:", error);
        setErrorMessage("We are unable to record your progress. Please check your inernet connection.");
      } else {
        console.error("Error processing request:", error);
        setErrorMessage("error.message" || "Sorry, there was an error recording your progress. Please try again later.");
      }
    }
  }

  const changeEngine = function (e) {
    let topicId = e.currentTarget.dataset.key;
    // make the imported question topics handle this
    // let questionTopic = questionTopics[unit].find((topic) => topic.topicId == topicId);
    // let questionEngine = questionTopic.questionEngine;
    // let topicArrayIndex = topics.topicsArray.findIndex((topic)=>topic.topicId==topicId);
    let standard = 7;
    let [questionLatex, answerArrayLatex] = questionEngine();
    questionLatex = 'f(x) = ' + questionLatex;
    setCurrentTopic(topicId);
    setQuestionState({
      questionEngine: questionEngine,
      questionLatex: questionLatex,
      answerArrayLatex: answerArrayLatex,
      getNextQuestion: next,
      questionsAttempted: 0,
      questionsCorrect: 0,
      questionsIncorrect: 0,
      questionsStreak: 0,
      questionsToMeet: standard,
      progressBar: 0,
      doneWithTopic: done,
      // questionTopic: topics.topicsArray[topicArrayIndex].topicData.displayName,
      // questionPrompt: topics.topicsArray[topicArrayIndex].topicData.prompt,
    });
  }
  return (
    <>
      <div className="row">
        <div className="col-12">
          <ProgressBar variant="primary" style={{borderRadius: '0', backgroundColor: "LightGray"}}now={questionState.progressBar} label={`${questionState.progressBar}%`} max='100'/>
        </div>
      </div>
      <div className="row">
        <div className="col-2">

        </div>
        <div className="col-8 mt-2 fs-2">
            <StaticMathField>{ questionState.questionLatex }</StaticMathField>
        </div>
        <div className="col-2">
          <ModalComponent
            currentTopic={currentTopic}
          />
        </div> 
      </div>
      <AnswerForm
          questionState={questionState}
      />
      <Link to="/naturalTopics">
        <button type="button" className="btn btn-lg btn-success mt-3">OTHER TOPICS</button><br /><br />
      </Link>
      <h2 className="text-center">{questionState.questionTopic}</h2>
      <div className="row">
        <p className="col-12">{questionState.questionPrompt}</p>
      </div>
    </>
  );
}

function ModalComponent ({currentTopic}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  if (currentTopic == 500) {
    return(
      <>
        <Button className="m-2" variant="info" onClick={handleShow}>
          Explain!
        </Button>
        <NaturalExponential 
          show={show}
          handleClose={handleClose}
        />
      </>
    )
  } else if (currentTopic == 520) {
    return(
      <>
        <Button className="m-2" variant="info" onClick={handleShow}>
          Explain!
        </Button>
        <NaturalLog
          show={show}
          handleClose={handleClose}
        />
      </>
    )
  } else if (currentTopic == 530) {
    return(
      <>
        <Button className="m-2" variant="info" onClick={handleShow}>
          Explain!
        </Button>
        <NaturalLogBinomials
          show={show}
          handleClose={handleClose}
        />
      </>
    )
  } else if (currentTopic == 550) {
    return(
      <>
        <Button className="m-2" variant="info" onClick={handleShow}>
          Explain!
        </Button>
        <ExponentialBaseA
          show={show}
          handleClose={handleClose}
        />
      </>
    )
  } else if (currentTopic == 560) {
    return(
      <>
        <Button className="m-2" variant="info" onClick={handleShow}>
          Explain!
        </Button>
        <LogBaseA
          show={show}
          handleClose={handleClose}
        />
      </>
    )
  }
}