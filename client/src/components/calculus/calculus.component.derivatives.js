import React, { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ProgressBar, Button, Offcanvas} from 'react-bootstrap';
import { addStyles, StaticMathField, EditableMathField } from 'react-mathquill'
import '../../App.scss';
import '../../index.scss';
import './calculus.component.derivatives.scss';
import {
  rewriteNegativeExponents,
  rewriteFractionalExponents,
  useNegativeExponents,
  useFractionalExponents,
} from '../math-scripts/exponents-scripts.js'
import {
  simplePowerRule,
  simplePowerRuleWithIntegerCoefficient,
  simplePowerRuleWithFractionalCoefficient,
  simplePowerRuleWithNegativeExponent,
  simplePowerRuleWithNegativeExponentAndIntegerCoefficient,
  simplePowerRuleWithNegativeExponentAndFractionalCoefficient,
  simplePowerRuleWithFractionalExponent,
  simplePowerRuleWithFractionalExponentAndIntegerCoefficient,
  simplePowerRuleWithFractionalExponentAndFractionalCoefficient,
  simplePowerRuleWithNegativeFractionalExponent,
  simplePowerRuleWithNegativeFractionalExponentAndIntegerCoefficient,
  simplePowerRuleWithNegativeFractionalExponentAndFractionalCoefficient,
  powerRuleMix,
} from '../math-scripts/derivative-scripts.js'

import { getRandomIntInclusive } from '../math-scripts/utilities-scripts.js';

import { config} from '../constants.js';
var url = config.url.API_URL;

const questionTopics = {
  "derivatives": [
    {
      topicId: 210,
      topicName: "simplePowerRule",
      questionEngine: simplePowerRule,
    },
    {
      topicId: 220,
      topicName: "simplePowerRuleWithIntegerCoefficient",
      questionEngine: simplePowerRuleWithIntegerCoefficient,
    },
    {
      topicId: 230,
      topicName: "simplePowerRuleWithFractionalCoefficient",
      questionEngine: simplePowerRuleWithFractionalCoefficient,
    },
    {
      topicId: 240,
      topicName: "simplePowerRuleWithNegativeExponent",
      questionEngine: simplePowerRuleWithNegativeExponent,
    },
    {
      topicId: 250,
      topicName: "simplePowerRuleWithNegativeExponentAndIntegerCoefficient", 
      questionEngine: simplePowerRuleWithNegativeExponentAndIntegerCoefficient,
    },
    {
      topicId: 260,
      topicName: "simplePowerRuleWithNegativeExponentAndFractionalCoefficient",
      questionEngine: simplePowerRuleWithNegativeExponentAndFractionalCoefficient,
    },
    {
      topicId: 270,
      topicName: "simplePowerRuleWithFractionalExponent",
      questionEngine: simplePowerRuleWithFractionalExponent,
    },
    {
      topicId: 280,
      topicName: "simplePowerRuleWithFractionalExponentAndIntegerCoefficient",
      questionEngine: simplePowerRuleWithFractionalExponentAndIntegerCoefficient,
    },
    {
      topicId: 290,
      topicName: "simplePowerRuleWithFractionalExponentAndFractionalCoefficient",
      questionEngine: simplePowerRuleWithFractionalExponentAndFractionalCoefficient,
    },
    {
      topicId: 300,
      topicName: "simplePowerRuleWithNegativeFractionalExponent",
      questionEngine: simplePowerRuleWithNegativeFractionalExponent,
    },
    {
      topicId: 310,
      topicName: "simplePowerRuleWithNegativeFractionalExponentAndIntegerCoefficient",
      questionEngine: simplePowerRuleWithNegativeFractionalExponentAndIntegerCoefficient,
    },
    {
      topicId: 320,
      topicName: "simplePowerRuleWithNegativeFractionalExponentAndFractionalCoefficient",
      questionEngine: simplePowerRuleWithNegativeFractionalExponentAndFractionalCoefficient,
    },                           
    {
      topicId: 330,
      topicName: "powerRuleMix",
      questionEngine: powerRuleMix,
    },                           
],
  "exponents": [
    {
      topicId: 10,
      questionEngine: rewriteNegativeExponents,
    },
    {
      topicId: 20,
      questionEngine: rewriteFractionalExponents,
    },
    {
      topicId: 30,
      questionEngine: useNegativeExponents,
    },
    {
      topicId: 40,
      questionEngine: useFractionalExponents,
    },
  ],
}
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

export default function TopDerivatives({username}) {

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

export function Derivatives({username, currentTopic, setCurrentTopic, questionTopics}) {
  let unit = "derivatives";
  let standard = 7;
  
  const [topics, setTopics] = useState(
    {
      topicId: 210,
      topicsArray: [{
        topicId: 210,
        topicData: {
          topicEngine: "",
          displayName: "",
          description: "",
          prompt:"",
          standard:"",
        },
      }]
    });

  let topicObj =
    {
      "topicId": 260,
      "topicData": {
        "topicEngine": "simplePowerRuleWithNegativeExponentAndFractionalCoefficient",
        "displayName": "The Power Rule (with Negative Exponents)",
        "description": "Practice taking the derivative of power functions.",
        "prompt": "Take the derivative of each power function.",
        "standard": 7,
    }
  }

  let questionEngine = setQuestionEngine(currentTopic);
  const [questionState, setQuestionState] = useState({
    questionEngine: questionEngine,
    questionEngine: '',
    questionLatex: '',
    answerLatex: '',
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
      const response = await fetch(`${url}/record/topic/${unitName}`)
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const topics = await response.json();
      const unitTopics = topics.unitTopics;
      setTopics({topicId: unitTopics[0].topicId, topicsArray: unitTopics});
      let questionEngine = setQuestionEngine(currentTopic);
      let [questionLatex, answerLatex] = questionEngine();
      questionLatex = 'f(x) = '+ questionLatex;
      setQuestionState(
        {
          questionEngine: questionEngine,
          questionLatex: questionLatex,
          answerLatex: answerLatex,
          getNextQuestion: next,
          questionsAttempted: 0,
          questionsCorrect: 0,
          questionsIncorrect: 0,
          questionsStreak: 0,
          questionsToMeet: unitTopics[0].topicData.standard,
          progressBar: 0,
          doneWithTopic: done,
          questionTopic: unitTopics[0].topicData.displayName,
          questionPrompt: unitTopics[0].topicData.prompt,
        }
      )
    }
    getTopics(unit);

    return;
  }, [currentTopic]);

  function next(liftedState){
      let questionEngine = setQuestionEngine(currentTopic);
      
      let [questionLatex, answerLatex] = questionEngine();
      questionLatex = 'f(x) = ' + questionLatex;
      setQuestionState({
        questionEngine: questionEngine,
        questionLatex: questionLatex,
        answerLatex: answerLatex,
        getNextQuestion: next,
        questionsAttempted: liftedState.questionsAttempted,
        questionsCorrect: liftedState.questionsCorrect,
        questionsIncorrect: liftedState.questionsIncorrect,
        questionsStreak: liftedState.questionsStreak,
        questionsToMeet: questionState.questionsToMeet,
        progressBar: Math.round((liftedState.questionsCorrect/questionState.questionsToMeet)*100),
        doneWithTopic: done,
        questionTopic: questionState.questionTopic,
        questionPrompt: questionState.questionPrompt,
      });
  }
  // This is untested.
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
      // "username": username,
      // "topicId": topicObj.topicId,
      // "topicName": topicName,
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
            derivatives: {
                skillData: {
                  skill: topicName,
                  sessionsData: sessionObj
                }
            }
        }        
      }
    }
    const response = await fetch(`${url}/record/metStandard/derivatives`, {
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

    // I used this to add new topics
    // const response = await fetch("http://localhost:5000/topic/add", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(topicObj),
    // })
    // .catch(error => {
    //   window.alert(error);
    //   return; // is this right?
    // });
    // const stuff = await response.json()

    // await fetch("http://localhost:5000/session/add", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(sessionObj),
    // })
    // .catch(error => {
    //   window.alert(error);
    //   return; // is this right?
    // });

  const changeEngine = function (e) {
    let topicId = e.currentTarget.dataset.key;
    let questionTopic = questionTopics[unit].find((topic) => topic.topicId == topicId);
    let questionEngine = questionTopic.questionEngine;
    let topicArrayIndex = topics.topicsArray.findIndex((topic)=>topic.topicId==topicId);
    let standard = (topics.topicsArray[topicArrayIndex].topicData.standard);
    let [questionLatex, answerLatex] = questionEngine();
    questionLatex = 'f(x) = ' + questionLatex;
    setCurrentTopic(topicId);
    setQuestionState({
      questionEngine: questionEngine,
      questionLatex: questionLatex,
      answerLatex: answerLatex,
      getNextQuestion: next,
      questionsAttempted: 0,
      questionsCorrect: 0,
      questionsIncorrect: 0,
      questionsStreak: 0,
      questionsToMeet: standard,
      progressBar: 0,
      doneWithTopic: done,
      questionTopic: topics.topicsArray[topicArrayIndex].topicData.displayName,
      questionPrompt: topics.topicsArray[topicArrayIndex].topicData.prompt,
    });
  }

  function topicsList() {
    return topics.topicsArray.map((topic) => {
      return (
        <div className="row" data-key={topic.topicId} key={topic.topicId} onClick={changeEngine}>
          <a>{topic.topicData.displayName}</a>
        </div>
      )
    })
  }

  return (
    <div className="col-12">
      <p id="prompt" className="col-sm-8 offset-2 text-center mt-4 fs-4">
        <StaticMathField>{ questionState.questionLatex }</StaticMathField>
      </p>
      <p id="prompt" className="col-sm-8 offset-2 text-center mt-1 fs-4">
        <StaticMathField>f'(x) = </StaticMathField>
      </p>
      <AnswerForm
          questionState={questionState}
      />
      <div className="progressBar mt-4 mb-4 col-8 offset-2">
        <ProgressBar now={questionState.progressBar} label={`${questionState.progressBar}%`} max='100'/>
      </div>
      <div>
        <h2 className="text-center mt-4">{questionState.questionTopic}</h2>
        <p id="instructions" className="col-sm-12">{questionState.questionPrompt}</p>
        <Link to="/derivativesTopics">
          <button type="button" className="btn btn-lg btn-success">Back to Topics</button><br /><br />
        </Link>
      </div>
    </div>
  );
}

function AnswerForm(props) {
  const mathFieldRef = useRef(null);
  
  useEffect(() => {
    if (mathFieldRef.current) {
      mathFieldRef.current.focus();
    }
  }, []);

  const [userObj, setUserAnswer] = useState({
    userAnswer: '\\3x^2',
    correctAnswer: '',
    answerMessage: ''
  });

  function updateSituation(value) {
    return setUserAnswer((prev) => {
      return {...prev, ...value}
    });
  }

  const handleKeyDown = event => {
    if (event.key == 'Enter') {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    let stateToLift = {
      questionsAttempted: props.questionState.questionsAttempted + 1,
      questionsCorrect: props.questionState.questionsCorrect,
      questionsStreak: props.questionState.questionsStreak,
      questionsIncorrect: props.questionState.questionsIncorrect,
    }

    let correctMessages = [
      `Yes, that is correct!`,
      `Great answer.`,
      `Exactly!`,
      `Yup, that's right . . .`,
      `You got it!`,
      `Boom!!`,
      `Ka-ching!`,
      `Exacto!`,
      `Superb!`,
      `Right on!`,
      `Uh, huh, You got it.`,
      `That's it. Keep it up!`,
    ];

    // let incorrectMessages = [
    //   `Sorry, it's ${props.questionState.answerLatex}.`,
    //   `${props.questionState.answerLatex} is the answer I was looking for.`,
    //   `Not exactly. ${props.questionState.answerLatex} is a correct answer.`,
    //   `You got this! ${props.questionState.answerLatex} is what I was looking for.`,
    //   `This one was ${props.questionState.answerLatex}. You'll get the next one.`,
    //   `I was thinking, ${props.questionState.answerLatex}, but no sweat. You'll get it.`,
    //   `It's ${props.questionState.answerLatex}, but no worries, your moment is coming!`,
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
    if (userObj.userAnswer == props.questionState.answerLatex) {
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
    updateSituation({answerMessage: answerMessage, userAnswer: '', correctAnswer: props.questionState.answerLatex})
    props.questionState.getNextQuestion(stateToLift);
    if (stateToLift.questionsCorrect >= props.questionState.questionsToMeet) {
      props.questionState.doneWithTopic(stateToLift);
    }
  } // end of handleSubmit

  return (
    <form id="questionArea" onSubmit={handleSubmit} method="post" action="#" role="form" className="col-sm-10 offset-1 mt-4">
      <div className="col-8 offset-2">
          <EditableMathField
            id="answerInput"
            className="form-control text-center fs-3"
            aria-describedby="answer input"
            latex={userObj.userAnswer}
            // value={userObj.userAnswer} // does nothing?
            // placeholder={userObj.userAnwer} //does nothing?
            onChange={(mathField)=>updateSituation({userAnswer: mathField.latex()})}
            mathquillDidMount={mathField => (mathFieldRef.current = mathField)}
            onKeyDown={handleKeyDown}
          />
      </div>      
      <p id="answerFeedback" className="col-12 text-center">{userObj.answerMessage}</p>
      <Button
        variant="primary"
        type="submit"
        size="lg" 
      >
        SUBMIT
      </Button>
    </form>
  )
}

// function Sidebar(props) {
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow} className="col-sm-4 offset-4" id="changeTopics">
//         CHANGE TOPICS
//       </Button>

//       <Offcanvas show={show} onHide={handleClose} style={{backgroundColor: "#E7E7E7", color: "#003348", paddingTop: "2em", fontSize: "1.3em"}}>
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title style={{fontSize: "1.6em"}}>TOPICS</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           {props.function()}

//         </Offcanvas.Body>
//       </Offcanvas>
//     </>
//   );
// }


