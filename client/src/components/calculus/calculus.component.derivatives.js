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

import PowerRule from '../explanations/powerRule.component.explanations.js'
import {  PowerRuleCoefficients,
          PowerRuleFractionalCoefficients,
          PowerRuleNegativeExponents,
          PowerRuleNegativeExponentsCoefficients,
          PowerRuleFractionalExponents,
          PowerRuleFractionalExponentsIntegerCoefficients,
          PowerRuleFractionalExponentsFractionalCoefficients,
          PowerRuleNegativeFractionalExponents,
          PowerRuleNegativeFractionalExponentsIntegerCoefficients,
          PowerRuleNegativeFractionalExponentsFractionalCoefficients,

       } from '../explanations/powerRule.component.explanations.js'

import { config } from '../constants.js';
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
  let standard = 8;
  
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

  // const questionField = useRef(null);

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
      console.log(questionLatex);
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
          // questionsToMeet: unitTopics[0].topicData.standard,
          questionsToMeet: 7,
          progressBar: 0,
          doneWithTopic: done,
          questionTopic: unitTopics[0].topicData.displayName,
          questionPrompt: unitTopics[0].topicData.prompt,
        }
      )
    }
    getTopics(unit);
    // questionField.reflow();

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
        // progressBar: Math.round((liftedState.questionsCorrect/questionState.questionsToMeet)*100),
        progressBar: liftedState.progressValue,
        doneWithTopic: done,
        questionTopic: questionState.questionTopic,
        questionPrompt: questionState.questionPrompt,
      });
      // questionField.reflow();
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
            derivatives: {
                skillData: {
                  skill: topicName,
                  sessionsData: sessionObj
                }
            }
        }        
      }
    }
    // TODO - This is not saving any incorrect answers and might not have the total right.
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
    // let standard = (topics.topicsArray[topicArrayIndex].topicData.standard);
    let standard = 7;
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
      <Link to="/derivativesTopics">
        <button type="button" className="btn btn-lg btn-success mt-3">OTHER TOPICS</button><br /><br />
      </Link>
      <h2 className="text-center">{questionState.questionTopic}</h2>
      <div className="row">
        <p className="col-12">{questionState.questionPrompt}</p>
      </div>
    </>
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
    userAnswer: '',
    correctAnswer: '',
    answerMessage: ''
  });
  const [boxStyle, setBoxStyle] = useState({backgroundColor: "white", color: "black", borderWidth: "0px", borderColor: "gray"})

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
      progressValue: 0,
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
      `Sorry, that's not the answer: `,
      `That's not the answer we were looking for: `,
      `Not exactly: `,
      `That's not right, but you got this: `,
      `You'll get the next one: `,
      `Not exactly, but no sweat. You'll get it: `,
      `Sorry, that's not it. But no worries, your moment is coming: `,
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
    let pause = 1500;
    if (userObj.userAnswer === props.questionState.answerLatex) {
        setBoxStyle({backgroundColor: "green", color:"white", borderWidth: "0px", borderColor: "gray"})
        stateToLift.questionsStreak = stateToLift.questionsStreak + 1;
        if (stateToLift.questionsStreak < 4) {
          let index = getRandomIntInclusive(0, ((correctMessages.length)-1))
          answerMessage = correctMessages[index];
        } else {
          let index = stateToLift.questionsStreak - 4;
          answerMessage = streakMessages[index];
          if (index >= streakMessages.length) {
            stateToLift.questionsStreak = 0;
          }
        }        
        stateToLift.questionsCorrect = stateToLift.questionsCorrect + 1;
        if (stateToLift.questionsCorrect >= props.questionState.questionsToMeet) {
          answerMessage = "Success! You met the standard. Go to the Next Topic . . ."
          pause = 3000;
        }
        updateSituation({answerMessage: answerMessage, correctAnswer: ''})
    } else {  // this is for an incorrect Message
      pause = 4000;
      setBoxStyle({backgroundColor:"white", color: "red", borderWidth: "2px", borderColor: "red"})
      let index = getRandomIntInclusive(0, ((incorrectMessages.length)-1))
      answerMessage = incorrectMessages[index];
      updateSituation({answerMessage: answerMessage, correctAnswer: props.questionState.answerLatex})
      stateToLift.questionsIncorrect = stateToLift.questionsIncorrect + 1;
      stateToLift.questionsStreak = 0
    }
    stateToLift.progressValue = Math.round((stateToLift.questionsCorrect/props.questionState.questionsToMeet)*100)

    setTimeout(function() {
      setBoxStyle({backgroundColor:"white", color: "black", borderWidth: "0px", borderColor: "gray"})        
      if (stateToLift.questionsCorrect >= props.questionState.questionsToMeet) {
        props.questionState.doneWithTopic(stateToLift);
        stateToLift.questionsAttempted = 0;
        stateToLift.questionsCorrect = 0;
        stateToLift.questionsIncorrect = 0;
        stateToLift.questionsStreak = 0;
        stateToLift.progressValue = 100;
      }
      updateSituation({answerMessage: '', userAnswer: '', correctAnswer: ''})
      props.questionState.getNextQuestion(stateToLift);
    }, pause)
  } // end of handleSubmit
  // const answerBox = {
  //   backGroundColor:"white",
  //   color: "black"
  // }

  return (
    <div className="row">
      <div className="col-12 m-0 p-0 mt-3">
        <div className="row">
          <div className="col-12 text-center m-0 p-0">
            <p id="answerFeedback">{userObj.answerMessage}<StaticMathField>{userObj.correctAnswer}</StaticMathField></p>   
          </div>
        </div>
        <form id="questionArea" onSubmit={handleSubmit} method="post" action="#">
          <div className="row">
            <div className="col-4 fs-2 text-end m-0 p-0">
                <StaticMathField>f'(x) = </StaticMathField>
            </div>
            <div className="col-5 m-0 p-0">
                <EditableMathField
                  type="input"
                  id="answerInput"
                  className="form-control text-center fs-3"
                  style={boxStyle}
                  aria-describedby="answer input"
                  latex={userObj.userAnswer}
                  // value={userObj.userAnswer} // does nothing?
                  // placeholder={userObj.userAnwer} //does nothing?
                  onChange={(mathField)=>updateSituation({userAnswer: mathField.latex()})}
                  mathquillDidMount={mathField => (mathFieldRef.current = mathField)}
                  onKeyDown={handleKeyDown}
                />
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-4">
              <Button
                variant="primary"
                type="submit"
                size="lg" 
              >
                SUBMIT
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

function ModalComponent ({currentTopic}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  if (currentTopic == 210) {
    return(
      <>
        <Button className="m-2" variant="info" onClick={handleShow}>
          Explain!
        </Button>
        <PowerRule 
          show={show}
          handleClose={handleClose}
        />
      </>
    )
  } else if (currentTopic == 220) {
    return(
      <>
        <Button className="m-2" variant="info" onClick={handleShow}>
          Explain!
        </Button>
        <PowerRuleCoefficients 
          show={show}
          handleClose={handleClose}
        />
      </>
    )
  } else if (currentTopic == 230) {
    return(
      <>
        <Button className="m-2" variant="info" onClick={handleShow}>
          Explain!
        </Button>
        <PowerRuleFractionalCoefficients 
          show={show}
          handleClose={handleClose}
        />
      </>
    )
  } else if (currentTopic == 240) {
    return(
      <>
        <Button className="m-2" variant="info" onClick={handleShow}>
          Explain!
        </Button>
        <PowerRuleNegativeExponents 
          show={show}
          handleClose={handleClose}
        />
      </>
    )
  } else if (currentTopic == 250) {
    return(
      <>
        <Button className="m-2" variant="info" onClick={handleShow}>
          Explain!
        </Button>
        <PowerRuleNegativeExponentsCoefficients 
          show={show}
          handleClose={handleClose}
        />
      </>
    )
  } else if (currentTopic == 270) {
    return(
      <>
        <Button className="m-2" variant="info" onClick={handleShow}>
          Explain!
        </Button>
        <PowerRuleFractionalExponents 
          show={show}
          handleClose={handleClose}
        />
      </>
    )
  } else if (currentTopic == 280) {
    return(
      <>
        <Button className="m-2" variant="info" onClick={handleShow}>
          Explain!
        </Button>
        <PowerRuleFractionalExponentsIntegerCoefficients 
          show={show}
          handleClose={handleClose}
        />
      </>
    )
  } else if (currentTopic == 290) {
    return(
      <>
        <Button className="m-2" variant="info" onClick={handleShow}>
          Explain!
        </Button>
        <PowerRuleFractionalExponentsFractionalCoefficients 
          show={show}
          handleClose={handleClose}
        />
      </>
    )
  } else if (currentTopic == 300) {
    return(
      <>
        <Button className="m-2" variant="info" onClick={handleShow}>
          Explain!
        </Button>
        <PowerRuleNegativeFractionalExponents 
          show={show}
          handleClose={handleClose}
        />
      </>
    )
  } else if (currentTopic == 310) {
    return(
      <>
        <Button className="m-2" variant="info" onClick={handleShow}>
          Explain!
        </Button>
        <PowerRuleNegativeFractionalExponentsIntegerCoefficients 
          show={show}
          handleClose={handleClose}
        />
      </>
    )
  } else if (currentTopic == 320) {
    return(
      <>
        <Button className="m-2" variant="info" onClick={handleShow}>
          Explain!
        </Button>
        <PowerRuleNegativeFractionalExponentsFractionalCoefficients 
          show={show}
          handleClose={handleClose}
        />
      </>
    )
  }
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


