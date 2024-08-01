import React, { useState, useEffect }from 'react';
import { Link, NavLink, useParams } from "react-router-dom";
import { ProgressBar, Button } from 'react-bootstrap';
import { addStyles, StaticMathField } from 'react-mathquill';

import './plottingPoints.component.summerPrep.scss';

import {
  streakMessages,
  getRandomCorrectMessage,
  getRandomIncorrectMessage,
} from '../infrastructure/messages.js';

 import {
   SVGCoordinatePlane,

  } from '../SVGs/graphs/svgGraphCore.component.graphs.js';
 
 import {
    XSquaredGraphPath,
    HalfXSquaredGraphPath,
    HalfXSquaredGraphPathMinusFour,
    XSquaredPlusTwoXMinusFiveGraphPath,
    XSquaredPlusTwoXPlusThreeGraphPath,


 } from '../SVGs/graphs/svgGraphPaths.component.graphs.js';

 import {
    setSessionData,
    recordProgress
} from '../infrastructure/recordProgress.js';

addStyles();

export default function PlottingPointsPolynomials({username}) {
//   const parameter = useParams()
//   const topic = parameter.topic;
    const topic = "Polynomials";

  const [coordinates, setCoordinates] = useState(null);
  const [yCoordinateLabel, setYCoordinateLabel] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

const polynomialArray = [
  {
    functionLatex: `f(x)=x^2`,
    xLatex: '0',
    yLatex: '1',
    xAnswer: 0,
    yAnswer: 0,
    fOfXLatex: `f(0)`,
    questionLatex: `0^2`,
    answerLatex: `0^ = 0`,
  },
  {
    functionLatex: `f(x)=x^2`,
    xLatex: '1',
    yLatex: '1',
    xAnswer: 2,
    yAnswer: -2,
    fOfXLatex: `f(1)`,
    questionLatex: `1^2`,
    asnwerLatex: `1^2 = 1`,
  },
  {
    functionLatex: `f(x)=x^2`,
    xLatex: '2',
    yLatex: '4',
    xAnswer: 4,
    yAnswer: -8,
    fOfXLatex: `f(2)`,
    questionLatex: `2^2`,
    answerLatex: `2^2 = 4`,
  },
  {
    functionLatex: `f(x)=x^2`,
    xLatex: '-1',
    yLatex: '1',
    xAnswer: -2,
    yAnswer: -2,
    fOfXLatex: `f(-1)`,
    questionLatex: `(-1)^2`,
    answerLatex: `(-1^2) = 1`,
  },                
  {
    functionLatex: `f(x)=x^2`,
    xLatex: '-2',
    yLatex: '4',
    xAnswer: -4,
    yAnswer: -8,
    fOfXLatex: `f(-2)`,
    questionLatex: `(-2)^2`,
    answerLatex: `(-2)^2 = 4`,
  },
  {
    functionLatex: `f(x)=\\frac{1}{2}x^2`,
    xLatex: '2',
    yLatex: '2',
    xAnswer: 4,
    yAnswer: -4,
    fOfXLatex: `f(2)`,
    questionLatex: `\\frac{1}{2}(2)^2`,
    answerLatex: `\\frac{1}{2}(2)^2 = 2`,
  },        
  {
    functionLatex: `f(x)=\\frac{1}{2}x^2`,
    xLatex: '-2',
    yLatex: '2',
    xAnswer: -4,
    yAnswer: -4,
    fOfXLatex: `f(-2)`,
    questionLatex: `\\frac{1}{2}(-2)^2`,
    answerLatex: `\\frac{1}{2}(-2)^2=2`,
  },
  {
    functionLatex: `f(x)=\\frac{1}{2}x^2-4`,
    xLatex: '2',
    yLatex: '-2',
    xAnswer: 4,
    yAnswer: 4,
    fOfXLatex: `f(2)`,
    questionLatex: `\\frac{1}{2}(2)^2-4`,
    answerLatex: `\\frac{1}{2}(2)^2-4=-2`,
  },        
  {
    functionLatex: `f(x)=\\frac{1}{2}x^2-4`,
    xLatex: '-2',
    yLatex: '-2',
    xAnswer: -4,
    yAnswer: 4,
    fOfXLatex: `f(-2)`,
    questionLatex: `\\frac{1}{2}(-2)^2-4`,
    answerLatex: `\\frac{1}{2}(-2)^2-4=-2`,
  },
  {
    functionLatex: `f(x)=\\frac{1}{2}x^2-4`,
    xLatex: '4',
    yLatex: '4',
    xAnswer: 8,
    yAnswer: -8,
    fOfXLatex: `f(4)`,
    questionLatex: `\\frac{1}{2}(4)^2-4`,
    answerLatex: `\\frac{1}{2}(4)^2-4=4`,
  },        
  {
    functionLatex: `f(x)=\\frac{1}{2}x^2-4`,
    xLatex: '-4',
    yLatex: '4',
    xAnswer: -8,
    yAnswer: -8,
    fOfXLatex: `f(-4)`,
    questionLatex: `\\frac{1}{2}(-4)^2-4`,
    answerLatex: `\\frac{1}{2}(-4)^2-4=4`,
  },
  {
    functionLatex: `f(x)=x^2+2x-5`,
    xLatex: '1',
    yLatex: '-2',
    xAnswer: 2,
    yAnswer: 4,
    fOfXLatex: `f(1)`,
    questionLatex: `(1)^2+2(1)-5`,
    answerLatex: `(1)^2+2(1)-5 = -2`,
  },        
  {
    functionLatex: `f(x)=x^2+2x+3`,
    xLatex: '-1',
    yLatex: '2',
    xAnswer: -2,
    yAnswer: -4,
    fOfXLatex: `f(-1)`,
    questionLatex: `(-1)^2+2(-1)-5`,
    answerLatex: `(-1)^2+2(-1)-5 = -2`,
  },
  {
    functionLatex: `f(x)=x^2+2x-5`,
    xLatex: '2',
    yLatex: '3',
    xAnswer: 4,
    yAnswer: -6,
    fOfXLatex: `f(2)`,
    questionLatex: `(2)^2+2(2)-5`,
    answerLatex: `(2)^2+2(2)-5 =3`,
  },        
  {
    functionLatex: `f(x)=x^2+2x-5`,
    xLatex: '-4',
    yLatex: '3',
    xAnswer: -8,
    yAnswer: -6,
    fOfXLatex: `f(-4)`,
    questionLatex: `(-4)^2+2(-4)-5`,
    answerLatex: `(-4)^2+2(-4)-5 =3`,
  },                                                                  
]
  let questionArray = polynomialArray;
  
  function getYCoordinateLabel(yCoordinate) {
    if (yCoordinate === 0) {
      return '0';
    } else if (yCoordinate === 2) {
      return '-1';
    } else if (yCoordinate === 4) {
      return '-2';
    } else if (yCoordinate === 6) {
      return '-3';
    } else if (yCoordinate === 8) {
      return '-4';
    } else if (yCoordinate === 10) {
      return '-5';
    }  else if (yCoordinate === -2) {
        return '1';  
    } else if (yCoordinate === -4) {
      return '2';
    } else if (yCoordinate === -6) {
      return '3';
    } else if (yCoordinate === -8) {
      return '4';
    } else if (yCoordinate === -10) {
      return '5';
    }    
  }

  function shuffleArray(array) {
    for(let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i - 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledGraphDataArray = shuffleArray([...questionArray]);

  const [answerMessage, setAnswerMessage] = useState("");
  
  const [questionObject, setQuestionObject] = useState({
    questionData: shuffledGraphDataArray[questionIndex], 
  });

  const [quizProgress, setQuizProgress] = useState({
    getNextQuestion: next,
    questionsAttempted: 0,
    questionsCorrect: 0,
    questionsIncorrect: 0,
    currentStreak: 0,
    questionsStreak: 0,
    questionsToMeet: 8,
    progressBar: 0,
    doneWithTopic: done,
    metStandard: false,
  });

  useEffect(() => {
        
    const graphQuestionObject = shuffledGraphDataArray[questionIndex];
  
    setQuestionObject(
      {
        questionData: graphQuestionObject,
      }
    );
  }, [questionIndex]);

  const startTime = new Date();

  function next() {
    setQuestionIndex(prevState => (
      prevState + 1
    ));
  }

  async function done() { 
    try {
        const endTime = new Date();
        const totalTime = endTime - startTime;
        let topicName = "plottingPoints" + topic;
        const sessionData = setSessionData(quizProgress, startTime, totalTime, "summerPrep", "functions", topicName, username);
        // we are going to need to pass url information if we're not in summerPrep
        console.dir(sessionData);
        const result = await recordProgress(sessionData, "summerPrep");
        console.log(result.msg);
        // what should we do with this result?
        setQuestionIndex(prevState => (
          prevState + 1
        ));
    } catch (error) {
        console.error("Failed to record progress: ", error);
        // Show a message to the user
    }
  }

  const handleClick = (event) => {
      const svg = event.currentTarget;
      const point = svg.createSVGPoint();
      point.x = event.clientX;
      console.log("x: " + event.clientX);
      point.y = event.clientY;
      console.log("y: " + event.clientY);
      const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());
      console.log("x: " + svgPoint.x);
        console.log("y: " + svgPoint.y);
      const nearestGridPoint = getNearestGridPointTrig(svgPoint);
    //    const finalCoordinates = translateToCorrectCoordinates(nearestGridPoint);
    //    console.log(finalCoordinates);
      setCoordinates(nearestGridPoint);
      const yCoordinateLabel = getYCoordinateLabel(nearestGridPoint.y);
      setYCoordinateLabel(yCoordinateLabel);
  };

  const getNearestGridPointTrig = (point) => {
      let x = 0;
      let y = 0;
      const xNegative = point.x < 0 ? true : false;
      const yNegative = point.y < 0 ? true : false;
      if (Math.abs(point.x)< 1.0) {
        x = 0;
      } else if (Math.abs(point.x) < 3) {
        x = xNegative ? -2.0 : 2.0;
      } else if (Math.abs(point.x) < 5) {
        x = xNegative ? -4.0 : 4.0;
      } else if (Math.abs(point.x) < 7) {
        x = xNegative ? -6.0 : 6.0;
      }  else if (Math.abs(point.x) < 9) {
        x = xNegative ? -8.0 : 8.0;
      }   else if (Math.abs(point.x) < 11) {
        x = xNegative ? -10.0 : 10.0;
      }
      if (Math.abs(point.y)< 1.0) {
        y = 0;
      } else if (Math.abs(point.y) < 3) {
        y = yNegative ? -2.0 : 2.0;
      } else if (Math.abs(point.y) < 5) {
        y = yNegative ? -4.0 : 4.0;
      } else if (Math.abs(point.y) < 7) {
        y = yNegative ? -6.0 : 6.0;
      }  else if (Math.abs(point.y) < 9) {
        y = yNegative ? -8.0 : 8.0;
      }   else if (Math.abs(point.y) < 11) {
        y = yNegative ? -10.0 : 10.0;
      }      
      return {x, y}
  };

  const translateToCorrectCoordinates = (point) => {
        let x = point.x/2;
        let y = (point.y/2) * -1;
        return {x, y};
    };


  function handleSubmit(event) {
    event.preventDefault();
    if (!coordinates) {
      setAnswerMessage("Please plot a point on the graph.");
    } else {
      if (isChecking) {
      setCoordinates(null);
      setAnswerMessage("");
      if (quizProgress.questionsCorrect >= quizProgress.questionsToMeet) {
        done()
      } else {
        next(); 
      } 
    } else {
      let answerMessage = '';
      let answerIsCorrect = false;
      if (coordinates.x === questionObject.questionData.xAnswer && coordinates.y === questionObject.questionData.yAnswer) {
          answerIsCorrect = true;
          setIsCorrect(true);
      }
      if (answerIsCorrect) { 
        let currentStreak = quizProgress.currentStreak + 1;
        if (currentStreak < 4) {
          answerMessage = getRandomCorrectMessage();
            // let index = getRandomIntInclusive(0, ((correctMessages.length)))
            // answerMessage = correctMessages[index];
        } else {
            let questionsStreakIndex = currentStreak - 4;
            // answerMessage = streakMessages[index];
            if (questionsStreakIndex >= streakMessages.length) {
              questionsStreakIndex = 0;
            }
            // answerMessage = streakMessages(questionsStreakIndex);
            answerMessage = getRandomCorrectMessage();
        }
        if (currentStreak > quizProgress.questionsStreak) {
        setQuizProgress(prevState => ({
          ...prevState,
          questionsAttempted: prevState.questionsAttempted + 1,
          questionsCorrect: prevState.questionsAttempted + 1,
          questionsStreak: prevState.questionsStreak + 1,
          currentStreak:prevState.currentStreak + 1,
          progressBar: Math.round(((prevState.questionsCorrect + 1) / prevState.questionsToMeet) * 100), 
        }));
        } else {
          setQuizProgress(prevState => ({
            ...prevState,
            questionsAttempted: prevState.questionsAttempted + 1,
            questionsCorrect: prevState.questionsAttempted + 1,
            questionsStreak: prevState.questionsStreak + 1,
            currentStreak:prevState.currentStreak + 1,
            progressBar: Math.round(((prevState.questionsCorrect + 1) / prevState.questionsToMeet) * 100), 
          }));
        }
        console.dir(quizProgress);
    } else {
        setIsCorrect(false);
        answerMessage = getRandomIncorrectMessage();
        setQuizProgress(prevState => ({
          ...prevState,
          questionsAttempted: prevState.questionsAttempted + 1,
          questionsIncorrect: prevState.questionsIncorrect + 1,
          questionsStreak: 0,
        }));
    }
      setAnswerMessage(answerMessage);
    }
    setIsChecking(!isChecking);
  } // if coordinates
  }
  if (quizProgress.questionsCorrect >= quizProgress.questionsToMeet) {
    console.log("Met the standard!");
   return (
    <div className="col-12 mt-3">
      <div className="row">
          <h1>Plotting Points</h1>
      </div>
      <div className="row">
          <p className="col-sm-12 fs-5">Excellent! You met the standard!</p>
      </div>
      <div className="mt-3">
        <NavLink to="/plottingPointsPolynomials">
            <Button type="button" variant="primary" size="lg">Polynomial Functions</Button>
        </NavLink>
        <br /><br />                
        <NavLink to="/plottingPoints/Sine">
            <Button type="button" variant="primary" size="lg">Sine Function</Button>
        </NavLink>
        <br /><br />
        <NavLink to="/plottingPoints/Cosine">
            <Button type="button" variant="primary" size="lg">Cosine Function</Button>
        </NavLink>
        <br /><br />
        <NavLink to="/summerPrepTopics">
            <Button type="button" variant="primary" size="lg">Back to Summer Prep</Button>
        </NavLink>                
      </div>
    </div>
  ) } else {


  return (
    <div>
      <div className="row">
        <div className="col-12">
          <ProgressBar variant="primary" style={{borderRadius: '0', backgroundColor: "LightGray"}}now={quizProgress.progressBar} label={`${quizProgress.progressBar}%`} max='100'/>
        </div>
      </div>
      <div className="row">
        <p className="fs-5">Plotting Points: Click to add the point on the graph.</p>
      </div>
      <div>
        <p className="fs-3"><StaticMathField>{questionObject.questionData.functionLatex}</StaticMathField></p>
        <p className={`fs-3 ${isChecking ? (isCorrect ? 'green' : 'red') : 'black'}`}>{answerMessage}</p>
        {isChecking ? (
            <p>  
              <StaticMathField className={`fs-3 ${isChecking ? (isCorrect ? 'green' : 'black') : 'black'}`}>{questionObject.questionData.answerLatex}</StaticMathField>
            </p>
         ) : (
            <p>  
            <StaticMathField className={`fs-3 ${isChecking ? (isCorrect ? 'green' : 'red') : 'black'}`}>{questionObject.questionData.fOfXLatex}</StaticMathField>
          </p>
         )}
      </div> 
      <form id="answerForm" onSubmit={handleSubmit} method="post" action="#">
        <Button 
            variant="primary"
            type="submit"
            size="lg"
        >
            {isChecking ? 'CONTINUE' : 'SUBMIT'}
        </Button>
      </form>
    <div className="svg-container">
        <svg 
          viewBox="-12 -12 24 24"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleClick}
          preserveAspectRatio="xMidYMid meet"
        >
          <SVGCoordinatePlane />
            {isChecking && questionObject.questionData.questionLatex === `f(x)=x^2` ? <XSquaredGraphPath />
                : isChecking && questionObject.questionData.questionLatex === `f(x)=\\frac{1}{2}x^2` ? <HalfXSquaredGraphPath />
                : isChecking && questionObject.questionData.questionLatex === `f(x)=\\frac{1}{2}x^2-4` ? <HalfXSquaredGraphPathMinusFour />
                : isChecking && questionObject.questionData.questionLatex === `f(x)=x^2+2x-5` ? <XSquaredPlusTwoXMinusFiveGraphPath />
                : isChecking && questionObject.questionData.questionLatex === `f(x)=x^2+2x+3` ? <XSquaredPlusTwoXPlusThreeGraphPath />
                : null } 
          {coordinates && (
            <>
            <circle cx={coordinates.x} cy={coordinates.y} r="0.3" fill={isChecking ? (isCorrect ? 'green' : 'red') : 'blue'} />
            <rect x={coordinates.x + 1} y={coordinates.y + 0.25} width="4" height="1" fill="white" stroke="white" />
            <text x={coordinates.x + 1} y={coordinates.y + 1.25} fontSize="1.2" fill={isChecking ? (isCorrect ? 'green' : 'red') : 'black'}>
              {`y = ${yCoordinateLabel}`}
            </text>
            </>
          )
          }
        </svg>
      </div>



      <Link to="/plottingPointsTopics">
            <button type="button" className="btn btn-lg btn-success mt-3">BACK TO TOPICS</button><br /><br />
      </Link>     
    </div>
    );
}
}