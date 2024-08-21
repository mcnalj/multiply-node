import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ProgressBar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

import { recordProgress, setSessionData } from '../infrastructure/recordProgress.js';
import './cubesAndSquares.component.summerPrep.scss';

import {
  TypedInputAnswerFormCubesAndSquares
} from '../calculus/answerComponents/typedInputAnswerInput.component.answerCompoments.js';

export default function CubesAndSquares({username}){
  
  const parameter = useParams()
  const tempTopic = parameter.topic;
  const [topic, setTopic] = useState(tempTopic);

  function getTitle(topic) {
    let title = "";
    if (topic === "squares") {
      title = "Squares Practice";
    } else if (topic === "cubes") {
      title = "Cubes Practice";
    } else if (topic === "mixed") {
      title = "Mixed Squares and Cubes Practice";
    }
    return title;
  }

  const [title, setTitle]= useState(getTitle(topic));

  const [isFinished, setIsFinished] = useState(false);
  // This is really just an array of numbers, not the questionArray
  // Next step is make it a real question array.
  const [questionArray, setQuestionArray] = useState([]);
  const [questionsRequired, setQuestionsRequired] = useState(10);

  const [questionObject, setQuestionObject] = useState({
    multiplicand: 0,
    multiplier: 0, 
    questionLatex: ``,
    questionAnswer: 0,
    answersArray:[]
  });

  const [questionIndex, setQuestionIndex] = useState(0);
  
  const [showSquares, setShowSquares] = useState(true)

  const [quizProgress, setQuizProgress] = useState({  
      questionsAttempted: 0,
      questionsCorrect: 0,
      questionsIncorrect: 0,
      questionsStreak: 0,
      questionsToMeet: questionsRequired,
      progressBar: 0,
      metStandard: false,
      getNextQuestion: next,
      doneWithTopic: done     
  })

const startTime = useRef(new Date());
var initialTime = 180;

useEffect(() => {
  let [tempQuestionArray, tempQuestionsRequired]  = loadQuestionArray(topic);
  setQuestionArray(tempQuestionArray);
  setQuestionsRequired(tempQuestionsRequired);
  setQuizProgress(prevState => ({
    ...prevState,
    questionsToMeet: tempQuestionsRequired
  }));
}, [topic]);

useEffect(() => {
    getNextQuestion();
}, [questionArray, questionIndex]);

function next(){
    setQuestionIndex(prevState => (
        prevState + 1
    ));
}

async function done(){
    try {
        setIsFinished(true);
        const endTime = new Date();
        const totalTime = endTime - startTime;
        const sessionData = setSessionData(quizProgress, startTime, totalTime, "summerPrep", "cubesAndSquare", "squares", username);
        const result = await recordProgress(sessionData, "summerPrep");
        // what should we do with this result?
    } catch (error) {
        console.error("Failed to record progress: ", error);
        // Show a message to the user
    }
}

function loadQuestionArray(topic) {
  // the populates the questionArray with the numbers from 1 to 17 and if
  // if random is true, it sorts them into random order.
  let tempQuestionArray = [];
  let tempTotalQuestions = 10;
  if (topic === "squares") {
    for (let i = 1; i < 11; i++) {
      tempQuestionArray.push(i);
    }
  } else if (topic === "cubes") {
    for (let i = 1; i < 8; i++) { 
      tempQuestionArray.push(i);
    }
    tempTotalQuestions = 7;
  } else if (topic === "mixed") {
    for (let i = 1; i < 18; i++) {  
      tempQuestionArray.push(i);
    }
    tempQuestionArray = shuffle(tempQuestionArray);
    tempTotalQuestions = 17;
  }
  return [tempQuestionArray, tempTotalQuestions];
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

function getNextQuestion(){
  const multiplicand = questionArray[questionIndex];
  let multiplier = questionArray[questionIndex];
  let question = setQuestion(multiplier, topic, false);
  let answer = 0;
  if (topic === "squares") {
    answer = multiplier * multiplier;
  } else if (topic === "cubes") {
    answer = multiplier * multiplier * multiplier;
  } else if (topic === "mixed") {
    let isCubed = false;
    if (multiplier >= 11) {
      isCubed = true;
      multiplier = multiplier - 10;
      answer = multiplier * multiplier * multiplier;
      question = setQuestion(multiplier, "cubes", isCubed);
    } else {
      answer = multiplier * multiplier;
    }
  }
  setQuestionObject({
    multiplicand: multiplicand,
    multiplier: multiplier,
    questionLatex: question,
    questionAnswer: answer,
    answersArray:[answer]
  })
}

function setQuestion(multiplierX, topic, isCubed) {
  let question = "";
  if (topic === "squares") {
    question = `${multiplierX}^2 =`;
    setShowSquares(true)
  } else if (topic === "cubes") {
    question = `${multiplierX}^3 =`;
    setShowSquares(false);
  } else if (topic === "mixed") {
    if (isCubed) {
      let multiplier = multiplierX - 10;
      question = `${multiplier}^3 =`;
      setShowSquares(false);
    } else {
      question = `${multiplierX}^2 =`;
      setShowSquares(true);
    }
  }
  return question
}

// let questionArray, totalQuestions  = setQuestionArray(isRandom, true);


if (isFinished) {
  return (
    <>
        <div className="p-4 fs-4">
          <p>
            Congratulations! 
          </p>
          <p>You have completed the {title} set.</p>
          <p>Practice until these are automatic.</p> 
        </div>
        <div>
          <Link to="/multiplicationTopics" className="btn btn-primary">Back To Topics</Link>
        </div>
    </>
  )
  } else {
    return (
      <>
        <div className="row">
          <div className="progressBar col-12">
            <ProgressBar now={quizProgress.progressBar} label={`${quizProgress.progressBar}%`} max='100'/>
          </div>
        </div>
        <div className="pt-3">
          <h3>{title} </h3> 
        </div>
        <CirclesPage
          questionObject={questionObject}
          quizProgress={quizProgress}
          setQuizProgress={setQuizProgress}
          topic={topic}
          initialTime={initialTime}
          showSquares={showSquares}
        />
      </>
    );
  }
}

function CirclesPage({questionObject, quizProgress, setQuizProgress, topic, initialTime, showSquares})  {

  return (
    <div>
        <TypedInputAnswerFormCubesAndSquares
          questionObject={questionObject}
          quizProgress={quizProgress}
          setQuizProgress={setQuizProgress}
          topic={topic}
        />
        {/* <div id="infoRow" className="row">
          <CountdownTimer initialTime={initialTime} />
        </div> */}
        {showSquares ? (
        <div id="svgRow" className="row">
          <div className="col-8 offset-2">
            <SVGComponent
              color="red"
              multiplicand={questionObject.multiplicand}
              multiplier={questionObject.multiplier}
            />
          </div>
        </div>
        )
        : null}
        <div>
          <Link to="/multiplicationTopics" className="btn btn-primary">Back To Topics</Link>
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

function SVGComponent({color, multiplier, multiplicand}) {
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
