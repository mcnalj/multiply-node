import React, { useState, useEffect, useRef } from "react";
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { recordProgress, setSessionData } from '../infrastructure/recordProgress.js';
import './cubesAndSquares.component.summerPrep.scss';

import {
  TypedInputAnswerFormCubesAndSquares
} from '../calculus/answerComponents/typedInputAnswerInput.component.answerCompoments.js';

export default function CubesAndSquares({username}){

  const [makeChoice, setMakeChoice] = useState(true);
  const [topic, setTopic] = useState("squares");

  const [questionObject, setQuestionObject] = useState({
    multiplicand: 0,
    multiplier: 0, 
    questionLatex: ``,
    questionAnswer: 0,
    answersArray:[]
  });

  const [questionIndex, setQuestionIndex] = useState(0);
  const [isRandom, setIsRandom] = useState(false);

  const [quizProgress, setQuizProgress] = useState({  
      questionsAttempted: 0,
      questionsCorrect: 0,
      questionsIncorrect: 0,
      questionsStreak: 0,
      questionsToMeet: 10,
      progressBar: 0,
      metStandard: false,
      getNextQuestion: next,
      doneWithTopic: done     
  })

const startTime = new Date();
var initialTime = 180;

useEffect(() => {
    getNextQuestion(questionArray, questionIndex, topic);
}, [questionIndex, topic]);

function next(){
    setQuestionIndex(prevState => (
        prevState + 1
    ));
}

async function done(){
    try {
        const endTime = new Date();
        const totalTime = endTime - startTime;
        const sessionData = setSessionData(quizProgress, startTime, totalTime, "summerPrep", "functions", "equationsOfLines", username);
        const result = await recordProgress(sessionData, "summerPrep");
        // what should we do with this result?
        console.log(result.msg);
    } catch (error) {
        console.error("Failed to record progress: ", error);
        // Show a message to the user
    }
}

function setQuestionArray(random, type) {
  // the populates the questionArray with the numbers from 1 to 15 and if
  // if random is true, it sorts them into random order.
  let questionArray = [];
  if (type = "squares") {
  for (let i = 1; i < 16; i++) {
    questionArray.push(i);
  }
  } else if (type === "cubes") {
    for (let i = 1; i < 7; i++) { 
      questionArray.push(i);
    }
  } else if (type === "mixed") {
    for (let i = 1; i < 16; i++) {  
      questionArray.push(i);
    }
  }
  if (random) {
    questionArray = shuffle(questionArray);
  }
  return questionArray;
}

function shuffle(array) {
  // This shuffles the array
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function getNextQuestion(questionArray, questionIndex, topic){
  const multiplicand = questionArray[questionIndex];
  const multiplier = questionArray[questionIndex];
  const question = setQuestion(multiplier, topic);
  let answer = 0;
  if (topic === "squares") {
    answer = multiplier * multiplier;
  } else if (topic === "cubes") {
    answer = multiplier * multiplier * multiplier;
  }
  setQuestionObject({
    multiplicand: multiplicand,
    multiplier: multiplier,
    questionLatex: question,
    questionAnswer: answer,
    answersArray:[answer]
  })
}

function setQuestion(multiplierX, topic) {
  let question = "";
  if (topic === "squares") {
    question = `${multiplierX}^2 =`;
  } else if (topic === "cubes") {
    question = `${multiplierX}^3 =`;
  }
  return question
}

let questionArray = setQuestionArray(isRandom, true);

function handleTopicChange(e) {
  let topicSelected = e.target.value;
  questionArray = setQuestionArray(isRandom, topicSelected);
  setMakeChoice(false);
  setQuestionIndex(0);
  setTopic(topicSelected);
}

const [isCorrect, setIsCorrect] = useState(false);
  
var initialTime = 180;
var missedList = [];
var sessionMissedList = [];


function checkAnswer(multiplicand, multiplier, userAnswer) {
  let isCorrect = false;
  let questionAnswer = multiplicand * multiplier;
  if (questionAnswer == userAnswer) {
    isCorrect = true;
  }
  return isCorrect;
}

function addQuestionToMissedList(questionTuple, missedList) {
  if (!missedList.some(item => item[0] === questionTuple[0] && item[1] === questionTuple[1])) {
    missedList.push(questionTuple);
  }
  return missedList;
}

if (makeChoice) {
  return (
    <>
      <Container>
        <div>
          <h3>
            Squares and Cubes!
          </h3>
          <p>Practice these until they are automatic.</p> 
        </div>
        <Form>
          <Form.Select size="lg" aria-label="select a challenge" onChange={handleTopicChange}>
            <option>Select your challenge</option>
            <option value="squares">Practice Squares</option>
            <option value="cubes">Practice Cubes</option>
            <option value="mixed">Mix of Squares and Cubes</option>
          </Form.Select>
          <Form.Check
            type="switch"
            label="Ask questions in sequence"
            id="sequenceSwitch"
          />
        </Form>
      </Container>
    </>
  )
  } else {
    return (
      <>
        <CirclesPage
          questionObject={questionObject}
          quizProgress={quizProgress}
          setQuizProgress={setQuizProgress}
          topic={topic}
          initialTime={initialTime}
        />
      </>
    );
  }
}

function CirclesPage({questionObject, quizProgress, setQuizProgress, topic, initialTime})  {

  return (
    <div>
        <div>
          <h3>Squaring Practice</h3>
        </div>
        <TypedInputAnswerFormCubesAndSquares
          questionObject={questionObject}
          quizProgress={quizProgress}
          setQuizProgress={setQuizProgress}
          topic={topic}
        />
        <div id="infoRow" className="row">
          <CountdownTimer initialTime={initialTime} />
        </div>
        <div id="svgRow" className="row">
          <div className="col-8 offset-2">
            <SVGComponent
              color="red"
              multiplicand={questionObject.multiplicand}
              multiplier={questionObject.multiplier}
            />
          </div>
        </div>
      </div>
  );
}

function CountdownTimer({ initialTime }) {
  function setClock(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    let clock = "";
    if (minutes > 0) {
      clock = minutes + ":";
    } else {
      clock = "0:";
    }
    if (seconds < 10) {
      clock = clock + "0" + seconds;
    } else {
      clock = clock + seconds;
    }
    return clock;
  }
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const clockDisplay = setClock(timeLeft)
  
  

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  return (
    <div>
      {timeLeft > 0 ? (
        <p>{clockDisplay}</p>
      ) : (
        <p>Time's up!</p>
      )}
    </div>
  );
}

export function SVGComponent({color, multiplier, multiplicand}) {
  const circles = []
  function populateCircleList(circles, multiplier, multiplicand) {
    circles = [];
    let fillColors = ['rgb(0,0,0)', 'rgb(255,0,0)', 'rgb(0,0,255)', 'rgb(0,255,0)', 'rgb(139,69,10)', 'rgb(0,0,128)', 'rgb(0,100,0)','rgb(220,20,0)','rgb(153,50,204)', 'rgb(153,50,204)'];
    let fillColor = "lightGray";
    let x = 50;
    let y = 60;
    for (let j = 0; j < 10; j++) {
      for (let i = 0; i<10; i++) {
        if (j < multiplicand && i < multiplier) {
          fillColor = fillColors[multiplier];
        } else {
          fillColor = "lightGray"
        }
        let circleDict = {"x": x, "y": y, "fillColor":fillColor }
        circles.push(circleDict);
        x = x + 80;
      }
      x = 50;
      y = y + 80;
    }
    return circles;
  }
  let circleList2 = populateCircleList(circles, multiplicand, multiplier); 
  return(
      <Container>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox ="0 0 810 810"
        id="circleField"
        >
          {circleList2.map(circle => <circle key={circle.x.toString() + circle.y.toString()}
              cx={circle.x}
              cy={circle.y}
              r = "30"
              // stroke={color} strokeWidth="2"
              fill={circle.fillColor}
              />)
          }
        </svg>
      </Container>
  );
}

