import React, { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ProgressBar, Button, Offcanvas} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { addStyles, StaticMathField, EditableMathField } from 'react-mathquill'
import '../../App.scss';
import '../../index.scss';
import './calculus.component.derivatives.scss';

import AnswerForm from './answerForm.component.calculus.js';
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

import { config} from '../constants.js';
var url = config.url.API_URL;

addStyles();

const startTime = new Date();

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
    let topicName = '';
    const endTime = new Date()
    const totalTime = endTime - startTime;
    const currentTopicName = questionTopics.find((name) => name.topicId == currentTopic)
    if (currentTopicName) {
      topicName = currentTopicName.topicName;
    }  else {
      topicName = "errantName";
    }
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
      progress: {
        calculus: {
            naturalExponentialLog: {
                skillData: {
                  skill: topicName,
                  sessionsData: sessionObj
                }
            }
        }        
      }
    }
    // TODO - This is not saving any incorrect answers and might not have the total right.
    const response = await fetch(`${url}/record/metStandard/naturalExponentialLog`, {
      method: "POST",
      mode: 'cors',
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
    // we need to go somewhere from here.
  };

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
  return(
    <>
      <Button className="m-2" variant="info" onClick={handleShow}>
        Explain!
      </Button>
      <ModalField
        currentTopic={currentTopic}
        show={show}
        handleClose={handleClose} 
      />          
    </>
  )
}
function ModalField({currentTopic, show, handleClose}) {
  if (currentTopic == 500) {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Derivative of the Natural Exponential</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The natural exponential function is its own derivative: </p>
          <div className="row">
            <StaticMathField className="col-4 offset-4 text-center">{`\\frac{d}{dx} e^x = e^x`}</StaticMathField>
          </div>
          <p>When the x term is multiplied by a coefficient, we apply the chain rule to find the derivative. </p>
          <div className="row">
            <StaticMathField className="col-4 offset-4 text-center">{`\\frac{d}{dx} e^u = e^u u'`}</StaticMathField><br />
          </div>
          <div className="row mt-2">
            <div className="col-4">
              <StaticMathField className="text-end">{`\\frac{d}{dx} e^{4x} = e^{4x} \\cdot 4`}</StaticMathField><br />
              <StaticMathField className="text-end">{`\\frac{d}{dx} e^{4x} = 4e^{4x}`}</StaticMathField>
            </div>
            <div className="col-4">
              <StaticMathField className="text-end">{`\\frac{d}{dx} 3e^{5x} = 3e^{5x} \\cdot 5`}</StaticMathField><br />
              <StaticMathField className="text-end">{`\\frac{d}{dx} 3e^{5x} = 15e^{5x}`}</StaticMathField>
            </div>            
            <div className="col-4">
              <StaticMathField className="text-end">{`\\frac{d}{dx} 2e^{-\\frac{1}{3}x} = 2e^{-\\frac{1}{3}x} \\cdot -\\frac{1}{3}`}</StaticMathField><br />
              <StaticMathField className="text-end">{`\\frac{d}{dx} 2e^{-\\frac{1}{3}x} = -\\frac{2}{3}e^{-\\frac{1}{3}x}`}</StaticMathField>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  } else {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Derivative of the Natural Log</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The term inside the logarithm (the argument) gets pushed to the denominator. The derivative of the argument stays in the numerator.</p>
          <div className="row">
            <div className="col-4 offset-1 text-center">
              <StaticMathField>{`\\frac{d}{dx} lnx = \\frac{1}{x}`}</StaticMathField>
            </div>
            <div className="col-4 offset-1 text-center">
            <StaticMathField>{`\\frac{d}{dx} lnu = \\frac{u'}{u}`}</StaticMathField><br />
            </div>            
          </div>        
          <div className="row mt-3">
            <div className="col-4">
              <p>Example 1</p>
              <StaticMathField className="text-end">{`\\frac{d}{dx} ln 3x = \\frac{3}{3x}`}</StaticMathField><br />
              <StaticMathField className="text-end">{`\\frac{d}{dx} ln 3x = \\frac{1}{x}`}</StaticMathField>
            </div>
            <div className="col-4">
              <p>Example 2</p>
              <StaticMathField className="text-end">{`\\frac{d}{dx} ln 17x = \\frac{17}{17x}`}</StaticMathField><br />
              <StaticMathField className="text-end">{`\\frac{d}{dx} ln 17x = \\frac{1}{x}`}</StaticMathField>
            </div>          
            <div className="col-4">
              <p>Example 3</p>  
              <StaticMathField className="text-end">{`\\frac{d}{dx} ln \\frac{2}{3}x = \\frac{\\frac{2}{3}}{\\frac{2}{3}x}`}</StaticMathField><br />
              <StaticMathField className="text-end">{`\\frac{d}{dx} ln \\frac{2}{3}x = {\\frac{1}{x}}`}</StaticMathField>
            </div>
          </div>
          <p>The examples above show that the derivative of <StaticMathField>{`ln cx`}</StaticMathField> will simplify to <StaticMathField>{`\\frac{1}{x}`}</StaticMathField>.</p>
          <div className="row mt-3">
            <div className="col-4">
              <p>Example 4</p>
              <StaticMathField className="text-end">{`\\frac{d}{dx} ln x^4 = \\frac{4x^3}{x^4}`}</StaticMathField><br />
              <StaticMathField className="text-end">{`\\frac{d}{dx} ln x^4 = \\frac{4}{x}`}</StaticMathField>
            </div>
            <div className="col-4">
              <p>Example 5</p>
              <StaticMathField className="text-end">{`\\frac{d}{dx} ln x^7 = \\frac{7x^6}{x^7}`}</StaticMathField><br />
              <StaticMathField className="text-end">{`\\frac{d}{dx} ln x^7 = \\frac{7}{x}`}</StaticMathField>
            </div>          
            <div className="col-4">
              <p>Example 6</p>  
              <StaticMathField className="text-end">{`\\frac{d}{dx} ln 3x^2 = \\frac{6x}{3x^2}`}</StaticMathField><br />
              <StaticMathField className="text-end">{`\\frac{d}{dx} ln 3x^2 = \\frac{2}{x}`}</StaticMathField>
            </div>
          </div>
          <p>Notice that the derivative of <StaticMathField>{`ln x^a`}</StaticMathField> is always <StaticMathField>{`\\frac{a}{x}`}</StaticMathField>.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}