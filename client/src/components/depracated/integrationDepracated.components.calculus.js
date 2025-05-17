import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, NavLink, useNavigate } from "react-router-dom";
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

import { IntegrationAnswerForm } from '../calculus/calculus.component.answerForm.js';

import {
  questionTopics
} from '../infrastructure/question-topics.js';

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

  const [currentTopic, setCurrentTopic] = useState(initialTopic);

  return (
    <>
      <Integrals
        currentTopic={currentTopic}
        setCurrentTopic={setCurrentTopic}
        questionTopics={questionTopics.integrals}
        // username={username}
        userId={userId}
        startTime={startTime}
      />
    </>
  );
}

// function Integrals({username, currentTopic, setCurrentTopic, questionTopics, startTime}) {
function Integrals({userId, currentTopic, setCurrentTopic, questionTopics, startTime}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  let unit = "integrals";
  let standard = 2;
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
          questionsToMeet: 2,
          progressBar: 0,
          doneWithTopic: done,
          questionTopic: "Integrals",
          questionPrompt: "f'(x)",
        }
      )
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
        progressBar: liftedState.progressValue,
        doneWithTopic: done,
        questionTopic: questionState.questionTopic,
        questionPrompt: questionState.questionPrompt,
      });
  }

  async function done(liftedState){
    console.log("sending progress record");
    try {
      const endTime = new Date()
      console.log("End Time: " + endTime);
      const totalTime = endTime - startTime.current;
      console.dir(startTime);
      console.log(totalTime);
      // Determine topic name;
      const currentTopicObj = questionTopics.find((name) => name.topicId === currentTopic)
      const topicName = currentTopicObj?.topicName || "errantName";

      const actionDetails = {
        topic: topicName,
        "metStandard": true,
        "questionsAttempted": liftedState.questionsAttempted,
        "questionsCorrect": liftedState.questionsCorrect,
        "questionsIncorrect": liftedState.questionsIncorrect,
        "questionsStreak": liftedState.questionsStreak,
        "datetimeStarted": startTime,
        "totalTime": totalTime,
      }
      console.log("userId before action: " + userId);
      const action =
      {
        // username: username,
        userId: userId,
        actionType: "skillCompleted",
        timeStamp: new Date(),
        details: actionDetails,
      }
      console.log("User Id in Action before recording: " + action.userId);
      const response = await fetch(`${url}/record/metStandard/integration`, {
        method: "POST",
        mode: 'cors',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action),
      });

      if (!response.ok) {
        switch (response.status) {
            case 400:
                throw new Error("Invalid data sent to the server. Please check and try again.");
            case 401:
                throw new Error("You are not authorized to perform this action. Please log in again.");
            case 500:
                throw new Error("A server error occurred. Please try again later.");
            default:
                throw new Error(`Unexpected error: ${response.status} ${response.statusText}`);
        }
      }

      const answer = await response.json();
      console.log("Server response: ", answer); 
      // This is where we would navigate to a success page:
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
      {errorMessage && (
        <div className="alert alert-danger mt-3" role="alert">
          {errorMessage}
        </div>
      )}
      <IntegrationAnswerForm
          questionState={questionState}  
      />
      <Link to="/integrationTopics">
        <button type="button" className="btn btn-lg btn-success mt-3">OTHER TOPICS</button><br /><br />
      </Link>
      <AbsoluteValueInstructions
          absoluteValue={absoluteValue}
      />
      <NavLink to="/skillComplete">
        <Button>Skill Complete</Button>
      </NavLink>
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