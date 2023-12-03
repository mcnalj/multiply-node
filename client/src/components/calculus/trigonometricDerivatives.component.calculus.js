import React, { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ProgressBar, Button, Offcanvas} from 'react-bootstrap';
import { addStyles, StaticMathField, EditableMathField, MathQuill } from 'react-mathquill'
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
    simpleTrigonometric,
    simpleChainRuleTrigonometric
} from '../math-scripts/derivative-scripts.js'

import { getRandomIntInclusive } from '../math-scripts/utilities-scripts.js';

import { config} from '../constants.js';
var url = config.url.API_URL;

const questionTopics = {
  "trigonometricFunctions": [
        {
        topicId: 1100,
        topicName: "simpleTrigonometric",
        questionEngine: simpleTrigonometric,
        },
        {
          topicId: 1110,
          topicName: "simpleChainRuleTrigonometric",
          questionEngine: simpleChainRuleTrigonometric,
        },

    ]
}
addStyles();

const startTime = new Date();

function setQuestionEngine(topicId) {
  let engineArray = questionTopics["trigonometricFunctions"];
  let engine = engineArray.find((engine) => engine.topicId == topicId)
  // TODO Need proper error handling.
  if (engine) {
    return(engine.questionEngine);
  } else {
    return("We could not find that engine!");
  }
}

export default function TrigonometricDerivatives({username}) {

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
  let standard = 12;
  
  // why do we need this?
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
    //   const response = await fetch(`${url}/record/topic/${unitName}`)
    //   if (!response.ok) {
    //     const message = `An error occurred: ${response.statusText}`;
    //     window.alert(message);
    //     return;
    //   }
    //   const topics = await response.json();
    //   const unitTopics = topics.unitTopics;
    //   setTopics({topicId: unitTopics[0].topicId, topicsArray: unitTopics});
      let questionEngine = setQuestionEngine(currentTopic);
      let [questionLatex, answerArrayLatex] = questionEngine();
      questionLatex = 'f(x) = '+ questionLatex;
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
          // questionsToMeet: unitTopics[0].topicData.standard,
          questionsToMeet: 12,
          progressBar: 0,
          doneWithTopic: done,
          questionTopic: "Trigonometric Derivatives",
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
            trigonometricFunctions: {
                skillData: {
                  skill: topicName,
                  sessionsData: sessionObj
                }
            }
        }        
      }
    }
    // TODO - This is not saving any incorrect answers and might not have the total right.
    const response = await fetch(`${url}/record/metStandard/trigonometricFunctions`, {
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
    let questionTopic = questionTopics[unit].find((topic) => topic.topicId == topicId);
    let questionEngine = questionTopic.questionEngine;
    let topicArrayIndex = topics.topicsArray.findIndex((topic)=>topic.topicId==topicId);
    let standard = 12;
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
      questionTopic: topics.topicsArray[topicArrayIndex].topicData.displayName,
      questionPrompt: topics.topicsArray[topicArrayIndex].topicData.prompt,
    });
  }

  const latexExpression = '2cosx^7';
  const latexDerivative = '-2sin(x^7)7x^6'

  return (
    <>
      <div className="row">
        <div className="col-12">
          <ProgressBar variant="primary" style={{borderRadius: '0', backgroundColor: "LightGray"}}now={questionState.progressBar} label={`${questionState.progressBar}%`} max='100'/>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mt-2 fs-2">
            <StaticMathField>{ questionState.questionLatex }</StaticMathField>
        </div> 
      </div>
      <AnswerForm
          questionState={questionState}
      />
      <Link to="/trigonometricTopics">
        <button type="button" className="btn btn-lg btn-success mt-3">TRIG TOPICS</button><br /><br />
      </Link>
      <h5 className="text-center">{questionState.questionTopic}</h5>
      <div className="row fs-6">
      <p>For derivatives that do not need the chain rule, type x without parentheses.</p>
        <p>For the Chain Rule Trig Derivatives, put parentheses around the variable term.</p>
        <p>Type the left parenthesis and the right will fill in for you.</p>
        <p>Then arrow back to enter the variable term.</p>
        <p>After the closing parenthesis of the variable term, type the derivative of the "inside function."</p>
        <p>Put no space between the closing parenthesis and the derivative of the "inside function".</p>
        <p>Below is an example of the correct format:</p>
      </div> 
      <StaticMathField>f(x) = {latexExpression}</StaticMathField>
      <StaticMathField>f'(x) = {latexDerivative}</StaticMathField>
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

//   function updateSituation(value) {
//      return setUserAnswer((prev) => {
//       return {...prev, ...value}
//     });
//   }
// function updateSituation(value) {
//     // change this to a regex to remove those \left and \right
//     console.log(value);
//     if (value.userAnswer == '\\left(\\right)') {
//         return setUserAnswer((prev) => {
//             return {...prev, ...{userAnswer: "()"}}
//         })
//     } else {
//         return setUserAnswer((prev) => {
//             return {...prev, ...value}
//         })
        
//     }
// }

// function updateSituation(value) {
//   // change this to a regex to remove those \left and \right
//   console.log(value);
//   let regex = /\\left\(\\right\)/;
//   if (regex.test(value.userAnswer)) {
//       return setUserAnswer((prev) => {
//           return {...prev, ...{userAnswer: "()"}}
//       })
//   } else {
//       return setUserAnswer((prev) => {
//           return {...prev, ...value}
//       })
//   }
// }

function updateSituation(value) {
  // This is a regex that removes MathQuill's default big parens \left and \right.
  let regex = /\\left\(\\right\)/g;
  if ( regex.test(value.userAnswer)) {
    let beginning = regex.lastIndex - 13
    let trimmedString = value.userAnswer.slice(0, beginning);
    let replacedString = trimmedString + "()";
    return setUserAnswer((prev) => {
        return {...prev, ...{userAnswer: replacedString}}
    })
  } else {
      return setUserAnswer((prev) => {
          return {...prev, ...value}
      })
  }
}
  const handleKeyDown = event => {
    if (event.key == 'Enter') {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  function checkAnswer(answer) {
    var correct = false;
    console.log(props.questionState.answerArrayLatex);
    props.questionState.answerArrayLatex.forEach((latex) => {
      console.log(answer);
      console.log(latex)
      if(answer == latex) {
        console.log("got here")
        correct = true;
        console.log(correct);
      }
    });
    console.log(correct);
    return correct;
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
    console.log("Typed answer: ");
    console.log(userObj.userAnswer);
    let answer = userObj.userAnswer.replace(/\s/g, '');
    console.log("new asnwer: " + answer);
    let correct = checkAnswer(answer);
    console.log("Here's the return");
    console.log(correct);
    // if (userObj.userAnswer === props.questionState.answerLatex) {
    if (correct) {
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
      updateSituation({answerMessage: answerMessage, correctAnswer: props.questionState.answerArrayLatex[0]})
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
                  placeholder={userObj.userAnswer} //does nothing?
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