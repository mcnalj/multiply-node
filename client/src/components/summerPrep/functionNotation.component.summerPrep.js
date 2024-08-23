import React, { useState, useEffect, useRef }from 'react';
import { Link } from "react-router-dom";
import { Button, ProgressBar } from 'react-bootstrap';
import { addStyles, StaticMathField } from 'react-mathquill';

import {
  setSessionData,
  recordProgress
} from '../infrastructure/recordProgress.js';

import {
  correctMessages,
  incorrectMessages,
  streakMessages,
  getRandomCorrectMessage,
  getRandomIncorrectMessage,
  getRandomStreakMessage
} from '../infrastructure/messages.js';

import {  
  FunctionCoordinates
} from '../explanations/summerPrep.component.explanations.js'

addStyles();

const questionArray = [
  {
      functionLatex: `f(x) = 2x-1`,
      x:-2,
      y:-5,
      questionLatex: `( -2, f(-2) )`
  },
  {
      functionLatex: `f(x) = 2x-1`,
      x:-1,
      y:-3,
      questionLatex: `( -1, f(-1) )`
  },
  {
      functionLatex: `f(x) = 2x-1`,
      x:0,
      y:-1,
      questionLatex: `( 0, f(0) )`
  },
  {
      functionLatex: `f(x) = 2x-1`,
      x:1,
      y:1,
      questionLatex: `( 1, f(1) )`
  },
  {
      functionLatex: `f(x) = 2x-1`,
      x:2,
      y:3,
      questionLatex: `( 2, f(2) )`
  },
  {
      functionLatex: `f(x) = 2x-1`,
      x:3,
      y:5,
      questionLatex: `( 3, f(3) )`
  },
  {
    functionLatex: `f(x) = x^2 + 1`,
    x:-1,
    y:2,
    questionLatex: `( -1, f(-1) )`
},
{
    functionLatex: `f(x) = x^2 + 1`,
    x:1,
    y:2,
    questionLatex: `( 1, f(1) )`
},
{
    functionLatex: `f(x) = x^2 - 2`,
    x:2,
    y:2,
    questionLatex: `( 2, f(2) )`
},
{
  functionLatex: `f(x) = x^2 + 2`,
  x:1,
  y:3,
  questionLatex: `( 1, f(1) )`
},
{
  functionLatex: `f(x) = \\frac{x}{2} + 3`,
  x:4,
  y:5,
  questionLatex: `( 4, f(4) )`
},
{
  functionLatex: `f(x) = \\frac{x}{2} + 3`,
  x:-2,
  y:2,
  questionLatex: `( -2, f(-2) )`
},
{
  functionLatex: `f(x) = \\sqrt{x} + 3`,
  x:4,
  y:5,
  questionLatex: `( 4, f(4) )`
},
{
  functionLatex: `f(x) = -\\sqrt{x} + 1`,
  x:1,
  y:0,
  questionLatex: `( 1, f(1) )`
},
{
  functionLatex: `f(x) = -\\sqrt{x} + 1`,
  x:4,
  y:-1,
  questionLatex: `( 4, f(4) )`
},
{
  functionLatex: `f(x) = x^3 -5`,
  x:2,
  y:3,
  questionLatex: `( 2, f(2) )`
},
{
  functionLatex: `f(x) = x^3 - 2`,
  x:-1,
  y:-3,
  questionLatex: `( -1, f(-1) )`
},
{
  functionLatex: `f(x) = x^3 - 4`,
  x:1,
  y:-3,
  questionLatex: `( 1, f(1) )`
},
{
  functionLatex: `f(x) = x^3 - 2x + 5`,
  x:1,
  y:4,
  questionLatex: `( 1, f(1) )`
},
{
  functionLatex: `f(x) = x^2 - \\frac{x}{2} -1`,
  x:2,
  y:2,
  questionLatex: `( 2, f(2) )`
},
{
  functionLatex: `f(x) = \\frac{x^3}{4} - 2x`,
  x:2,
  y:-2,
  questionLatex: `( 2, f(2) )`
},
{
  functionLatex: `f(x) = \\frac{x^3}{4} - 2x`,
  x:-2,
  y:2,
  questionLatex: `( -2, f(-2) )`
},
{
  functionLatex: `f(x) = \\frac{2x}{3} - 2x + 2`,
  x:3,
  y:-2,
  questionLatex: `( 3, f(3) )`
},
{
  functionLatex: `f(x) = \\frac{5x}{2} - 2x -3`,
  x:2,
  y:3,
  questionLatex: `( 2, f(2) )`
},
]; // 24 questions

export default function FunctionNotation({username}) {

    const [coordinates, setCoordinates] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);


    function shuffleArray(array) {
      for(let i = array.length -1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i - 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }
    const [questionObject, setQuestionObject] = useState({
        questionData: {
            functionLatex: " ",
            x: 0,
            y: 0,
            questionLatex: " "
        }
    });
    const [quizProgress, setQuizProgress] = useState({
            questionsAttempted: 0,
            questionsCorrect: 0,
            questionsIncorrect: 0,
            questionsStreak: 0,
            questionsToMeet: 8,
            progressBar: 0,
            metStandard: false,            
    });

    const [shuffledQuestionsArray, setShuffledQuestionsArray] = useState([]); 
    const [pointColor, setPointColor] = useState("blue");
    const [buttonVariant, setButtonVariant] = useState("light");
    const [buttonText, setButtonText] = useState("Submit");
    const [answerMessage, setAnswerMessage] = useState(" ");
    const [isFinished, setIsFinished] = useState(false);  
  
  useEffect(() => {
    const shuffledArray = shuffleArray(questionArray);
    setShuffledQuestionsArray(shuffledArray);
  }, []);

  useEffect(() => {
    if (shuffledQuestionsArray.length > 0) {
      const tempQuestionObject = shuffledQuestionsArray[questionIndex];
      setQuestionObject({ questionData: tempQuestionObject });
    }
  }, [shuffledQuestionsArray, questionIndex]);

  const startTime = useRef(new Date());

function updateQuizProgress(isCorrect) {
  setQuizProgress(prevState => {
      return {
          ...prevState,
          questionsAttempted: prevState.questionsAttempted + 1,
          questionsCorrect: isCorrect ? prevState.questionsCorrect + 1 : prevState.questionsCorrect,
          questionsIncorrect: isCorrect ? prevState.questionsIncorrect : prevState.questionsIncorrect + 1,
          questionsStreak: isCorrect ? prevState.questionsStreak + 1 : 0,
          progressBar: Math.round(((prevState.questionsCorrect + (isCorrect ? 1 : 0))/prevState.questionsToMeet)*100)
      };
  });
};

function next() {
    setAnswerMessage("");
    setCoordinates(null);
    setPointColor("blue");
}

async function done() {
    try {
      const endTime = new Date()
      const totalTime = endTime - startTime;
      const sessionData = setSessionData(quizProgress,startTime, totalTime, "summerPrep", "functions", "functionNotation", username);
      const result = await recordProgress(sessionData, "summerPrep");
      // what should we do with this result?
      setQuestionIndex(0);
      setIsFinished(true);
    } catch (error) {
      console.error("Failed to record progress: ", error);
      // Show a message to the user      
    }
  }

    const handleClick = (event) => {
        const svg = event.currentTarget;
        const point = svg.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());
        const nearestGridPoint = getNearestGridPoint(svgPoint);
        setCoordinates(nearestGridPoint);
        setButtonVariant("primary");
    };

    const getNearestGridPoint = (point) => {
        const gridSize = 2;
        const x = Math.round(point.x /gridSize) *gridSize;
        const y = Math.round(point.y /gridSize) *gridSize;
        return {x, y}
    };

    function handleSubmit(event) {
        event.preventDefault();
        if (buttonText === "Submit") {
        let answerIsCorrect = false;
        if (coordinates.x == (questionObject.questionData.x * 2) && coordinates.y == (questionObject.questionData.y * -2)) {
            answerIsCorrect = true;
        }
        setAnswerMessage(answerIsCorrect ? "Correct!" : "Incorrect!");
        updateQuizProgress(answerIsCorrect);
        setPointColor(answerIsCorrect ? "green" : "red");
        setButtonText("Next");
        } else if (buttonText === "Next") {
          if (quizProgress.questionsCorrect === quizProgress.questionsToMeet) {
            done();
          } else {
            setQuestionIndex(prevIndex => prevIndex + 1);
            next();
          }
          setButtonText("Submit");
          setButtonVariant("light");    
        }
      }
  
  if (isFinished) {
    return (
      <>
        <div className="row">
            <div className="col-12">
                <p className="fs-2">Solid Work with function notation and plotting points!</p>
                <Link to="/summerPrepTopics" className="btn btn-primary">Summer Prep Topics</Link>
            </div>
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
      <div className="row">  
        <div className="col-6 offset-3" id="centered">
          <p className="fs-4">
            <StaticMathField>{questionObject.questionData.functionLatex}</StaticMathField>
          </p>
        </div>
        <div className="col-2">
          <ModalComponent />
        </div>
      </div>
      <div className="row">
        <div className="col-6 offset-3">
        <p className="fs-4">Plot the point
          <StaticMathField>{questionObject.questionData.questionLatex}</StaticMathField>.
        </p>
        </div>
      </div>
      
      <div>
        <svg
            width="400"
            height="400"
            viewBox="-12 -12 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleClick}
        >
          <defs>
              <marker id="arrow-left-up" markerWidth="3" markerHeight="3" refX="3" refY="1.5" orient="auto" markerUnits="strokeWidth">
              <path d="M3,0 L3,3 L0,1.5 z" fill="black" />
              </marker>
              <marker id="arrow-right-down" markerWidth="3" markerHeight="3" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,3 L3,1.5 z" fill="black" />
              </marker>
          </defs>

          <line x1="-10" y1="0" x2="10" y2="0" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />        
          <line x1="0" y1="-10" x2="0" y2="10" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)"  />

          <text x="10" y="-0.5" textAnchor="middle" fontSize="1.0">x</text>
          <text x="2" y="-10" textAnchor="end" fontSize="1.0">f(x)</text>

          <g id="gridLinesX">
            {[...Array(11)].map((_, i) => {
              const y = 2*(i - 5);
              return (
                <g key={i}>
                  <line key={i} x1="-10" x2="10" y1={y} y2={y} stroke="gray" strokeWidth="0.05" />
                </g>
              );
            })}
          </g>

          <g id="gridLinesY">
            {[...Array(11)].map((_, i) => {
              const x = 2*(i - 5);
              return (
                <g key={i}>
                  <line key={i} x1={x} x2={x} y1="-10" y2="10" stroke="gray" strokeWidth="0.05" />
                </g>
              );
            })}
          </g>

          <g id="hashMarksX">
              {[...Array(11)].map((_, i) => {
                  const x = 2*i - 10;
                  return (
                      <g key={i}>
                      <line key={i} x1={x} y1="-0.3" x2={x} y2="0.3" stroke="black" strokeWidth="0.1" />
                      <text x={x} y="1.2" textAnchor="middle" fontSize="1">{i-5 !== 0 ? i-5: ""}</text>
                      </g>
                  );
              })}
          </g>

          <g id="hashMarksY">
              {[...Array(11)].map((_, i) => {
                  const y = 2*i - 10;
                  return (
                      <g key={i}>
                      <line key={i} x1="-0.3" y1={y} x2="0.3" y2={y} stroke="black" strokeWidth="0.1" />
                      <text x="-1" y={y} textAnchor="middle" fontSize="1">{i-5 !== 0 ? 5-i : ""}</text>
                      </g>
                  );
              })}
          </g>
          {coordinates && <circle cx={coordinates.x} cy={coordinates.y} r="0.3" fill={pointColor} />}
        </svg>
      </div> 
      <form id="answerForm" onSubmit={handleSubmit} method="post" action="#">
        <Button
            variant={buttonVariant}
            type="submit"
            size="lg" 
        >
            {buttonText}
        </Button>
        <p className="fs-4 mt-1">{answerMessage}</p>
      </form>
      <Link to="/plottingPointsTopics">
            <button type="button" className="btn btn-lg btn-success">Back to Function Topics</button><br /><br />
      </Link>     
    </>
    )
}
}

function ModalComponent () {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
      <Button className="m-2" variant="info" onClick={handleShow}>
        Explain!
      </Button>
      <FunctionCoordinates 
        show={show}
        handleClose={handleClose}
      />
    </>
  )
}
