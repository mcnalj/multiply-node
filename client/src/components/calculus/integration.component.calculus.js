import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ProgressBar, Button} from 'react-bootstrap';
import { addStyles, StaticMathField } from 'react-mathquill'
import '../../App.scss';
import '../../index.scss';
import './calculus.component.derivatives.scss';

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

import { IntegrationAnswerForm } from './answerForm.component.calculus.js';

import {
  questionTopics
} from '../infrastructure/question-topics.js';

import { config } from '../constants.js';
var url = config.url.API_URL;

addStyles();

const startTime = new Date();

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

export default function Integration({username}) {

  const parameter = useParams()
  var initialTopic = parseInt(parameter.topic);

  const [currentTopic, setCurrentTopic] = useState(initialTopic);
  return (
    <>
      <Integrals
        currentTopic={currentTopic}
        setCurrentTopic={setCurrentTopic}
        questionTopics={questionTopics.integrals}
        username={username}
      />
    </>
  )
}

function Integrals({username, currentTopic, setCurrentTopic, questionTopics}) {

  // const [absoluteValue, setAbsoluteValue] = useState(false);
  let unit = "integrals";
  let standard = 8;
  let absoluteValue = false;
  if (currentTopic === 3060 || currentTopic === 3070) {
    absoluteValue = true;
  }

  let questionEngine = setQuestionEngine(currentTopic);
  const [questionState, setQuestionState] = useState({
    questionEngine: questionEngine,
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
      let [questionLatex, answerArrayLatex] = questionEngine();
      questionLatex = "f'(x) = " + questionLatex;
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
          questionsToMeet: 8,
          progressBar: 0,
          doneWithTopic: done,
          questionTopic: "Integrals",
          questionPrompt: "f'(x)",
        }
      )
    }
    getTopics(unit);
    return;
  }, [currentTopic]);

  function next(liftedState){
      let questionEngine = setQuestionEngine(currentTopic);
      
      let [questionLatex, answerArrayLatex] = questionEngine();
      questionLatex = "f'(x) = " + questionLatex;
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
    const currentTopicName = questionTopics.find((name) => name.topicId === currentTopic)
    if (currentTopicName) {
      topicName = currentTopicName.topicName;
      if (topicName === "indefiniteIntegralsNaturalLog" || topicName === "indefiniteIntegralsNaturalLogBinomial") {
        absoluteValue = true;
      }
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
            integration: {
                skillData: {
                  skill: topicName,
                  sessionsData: sessionObj
                }
            }
        }        
      }
    }
    // TODO - This is not saving any incorrect answers and might not have the total right.
    const response = await fetch(`${url}/record/metStandard/integration`, {
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
  };

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
      <IntegrationAnswerForm
          questionState={questionState}  
      />
      <Link to="/integrationTopics">
        <button type="button" className="btn btn-lg btn-success mt-3">OTHER TOPICS</button><br /><br />
      </Link>
      <AbsoluteValueInstructions
          absoluteValue={absoluteValue}
      />
    </>
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