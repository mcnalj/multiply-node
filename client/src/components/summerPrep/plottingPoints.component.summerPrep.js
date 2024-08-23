import React, { useState, useEffect, useRef }from 'react';
import { Link, useParams, NavLink } from "react-router-dom";
import { ProgressBar, Button } from 'react-bootstrap';
import { addStyles, StaticMathField } from 'react-mathquill';

import './plottingPoints.component.summerPrep.scss';

import {
  streakMessages,
  getRandomCorrectMessage,
  getRandomIncorrectMessage,
} from '../infrastructure/messages.js';

import {
  SinPath2
 } from '../SVGs/graphs/sinGraph2.component.graphs.js';

 import {
   SVGXAndYAxes2,
   SVGGridLines2,
   SVGHashMarks2,
  } from '../SVGs/graphs/coreComponents.component.graph.js';

 import {
    CosPath2
 } from '../SVGs/graphs/cosGraph2.component.graphs.js';
 
 import {
    setSessionData,
    recordProgress
} from '../infrastructure/recordProgress.js';

addStyles();

export default function PlottingPoints({username}) {
  const parameter = useParams()
  const topic = parameter.topic;

  const points = [
    { angle: 0, label: '0', sin: '0', cos: '1', sinOffset: -15, cosOffset: 20, hypotenuseColor: 'blue' },
    { angle: Math.PI / 6, label: 'π/6', sin: '1/2', cos: '√3/2', sinOffset: 5, cosOffset: 20, hypotenuseColor: 'black' },
    { angle: Math.PI / 4, label: 'π/4', sin: '√2/2', cos: '√2/2', sinOffset: 5, cosOffset: 20, hypotenuseColor: 'black' },
    { angle: Math.PI / 3, label: 'π/3', sin: '√3/2', cos: '1/2', sinOffset: 5, cosOffset: 20, hypotenuseColor: 'black' },
    { angle: Math.PI / 2, label: 'π/2', sin: '1', cos: '0', sinOffset: 5, cosOffset: 20, hypotenuseColor: 'green' },
    { angle: ( 2 * Math.PI ) / 3, label: '2π/3', sin: '√3/2', cos: '-1/2', sinOffset: -35, cosOffset: 20, hypotenuseColor: 'black' },
    { angle: ( 3 * Math.PI ) / 4, label: '3π/4', sin: '√2/2', cos: '-√2/2', sinOffset: -35, cosOffset: 20, hypotenuseColor: 'black' },
    { angle: ( 5 * Math.PI ) / 6, label: '5π/6', sin: '1/2', cos: '-√3/2', sinOffset: -35, cosOffset: 20, hypotenuseColor: 'black' },
    { angle: Math.PI, label: 'π', sin: '0', cos: '-1', sinOffset: 5, cosOffset: 20, hypotenuseColor: 'blue' },
    { angle: ( 7 * Math.PI ) / 6, label: '7π/6', sin: '-1/2', cos: '-√3/2', sinOffset: -45, cosOffset: -10, hypotenuseColor: 'black' },
    { angle: ( 5 * Math.PI ) / 4, label: '5π/4', sin: '-√2/2', cos: '-√2/2', sinOffset: -40, cosOffset: -10, hypotenuseColor: 'black' },
    { angle: ( 4 * Math.PI ) / 3, label: '4π/3', sin: '-√3/2', cos: '-1/2', sinOffset: -35, cosOffset: -10, hypotenuseColor: 'black' },
    { angle: ( 3 * Math.PI ) / 2, label: '3π/2', sin: '-1', cos: '0', sinOffset: 5, cosOffset: -10, hypotenuseColor: 'green' },
    { angle: ( 5 * Math.PI ) / 3, label: '5π/3', sin: '-√3/2', cos: '1/2', sinOffset: 5, cosOffset: -10, hypotenuseColor: 'black' },
    { angle: ( 7 * Math.PI ) / 4, label: '7π/4', sin: '-√2/2', cos: '√2/2', sinOffset: 5, cosOffset: -10, hypotenuseColor: 'black' },
    { angle: ( 11 * Math.PI ) / 6, label: '11π/6', sin: '-1/2', cos: '√3/2', sinOffset: 5, cosOffset: -10, hypotenuseColor: 'black' },
    { angle: 2 * Math.PI, label: '', sin: '0', cos: '1', sinOffset: -15, cosOffset: 20, hypotenuseColor: 'blue' },
  ];

  const [coordinates, setCoordinates] = useState(null);
  const [yCoordinateLabel, setYCoordinateLabel] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const sinArray = [
    {
      functionLatex: `f(x)=\\sin(x)`,
      xLatex: '0',
      yLatex: '0',
      xAnswer: 0,
      yAnswer: 0,
      fOfXLatex: `f(0)`,
      questionLatex: `\\sin(0)`,
      answerLatex: `\\sin(0) = 0`,
    },
    {
      functionLatex: `f(x)=\\sin(x)`,
      xLatex: 'π/6',
      yLatex: '1/2',
      xAnswer: 2.62,
      yAnswer: -3.9,
      fOfXLatex: `f(π/6)`,
      questionLatex: `\\sin\\left(\\frac{\\pi}{6}\\right)`,
      asnwerLatex: `\\sin\\left(\\frac{\\pi}{6}\\right) = \\frac{1}{2}`,
    },
    {
      functionLatex: `f(x)=\\sin(x)`,
      xLatex: 'π/4',
      yLatex: '√2/2',
      xAnswer: 3.93,
      yAnswer: -5.5,
      fOfXLatex: `f(π/4)`,
      questionLatex: `\\sin\\left(\\frac{\\pi}{4}\\right)`,
      answerLatex: `\\sin\\left(\\frac{\\pi}{4}\\right) = \\frac{\\sqrt{2}}{2}`,
    },
    {
      functionLatex: `f(x)=\\sin(x)`,
      xLatex: 'π/3',
      yLatex: '√3/2',
      xAnswer: 5.23,
      yAnswer: -6.8,
      fOfXLatex: `f(π/3)`,
      questionLatex: `\\sin\\left(\\frac{\\pi}{3}\\right)`,
      answerLatex: `\\sin\\left(\\frac{\\pi}{3}\\right) = \\frac{\\sqrt{3}}{2}`,
    },                
    {
      functionLatex: `f(x)=\\sin(x)`,
      xLatex: 'π/2',
      yLatex: '1',
      xAnswer: 7.85,
      yAnswer: -8,
      fOfXLatex: `f(π/2)`,
      questionLatex: `\\sin\\left(\\frac{\\pi}{2}\\right)`,
      answerLatex: `\\sin\\left(\\frac{\\pi}{2}\\right) = 1`,
    },
    {
      functionLatex: `f(x)=\\sin(x)`,
      xLatex: '2π/3',
      yLatex: '√3/2',
      xAnswer: 10.47,
      yAnswer: -6.8,
      fOfXLatex: `f(2π/3)`,
      questionLatex: `\\sin\\left(\\frac{2\\pi}{3}\\right)`,
      answerLatex: `\\sin\\left(\\frac{2\\pi}{3}\\right) = \\frac{\\sqrt{3}}{2}`,
    },        
    {
      functionLatex: `f(x)=\\sin(x)`,
      xLatex: '3π/4',
      yLatex: '√2/2',
      xAnswer: 11.78,
      yAnswer: -5.5,
      fOfXLatex: `f(3π/4)`,
      questionLatex: `\\sin\\left(\\frac{3\\pi}{4}\\right)`,
      answerLatex: `\\sin\\left(\\frac{3\\pi}{4}\\right) = \\frac{\\sqrt{2}}{2}`,
    },
    {
      functionLatex: `f(x)=\\sin(x)`,
      xLatex: '5π/6',
      yLatex: '1/2',
      xAnswer: 13.08,
      yAnswer: -3.9,
      fOfXLatex: `f(5π/6)`,
      questionLatex: `\\sin\\left(\\frac{5\\pi}{6}\\right)`,
      answerLatex: `\\sin\\left(\\frac{5\\pi}{6}\\right) = \\frac{1}{2}`,
    },        
    {
      functionLatex: `f(x)=\\sin(x)`,
      xLatex: 'π',
      yLatex: '0',
      xAnswer: 15.7,
      yAnswer: 0,
      fOfXLatex: `f(π)`,
      questionLatex: `\\sin(\\pi)`,
      answerLatex: `\\sin(\\pi) = 0`,
    },
    {
      functionLatex: `f(x)=\\sin(x)`,
      xLatex: '7π/6',
      yLatex: '-1/2',
      xAnswer: 18.32,
      yAnswer: 3.9,
      fOfXLatex: `f(7π/6)`,
      questionLatex: `\\sin\\left(\\frac{7\\pi}{6}\\right)`,
      answerLatex: `\\sin\\left(\\frac{7\\pi}{6}\\right) = -\\frac{1}{2}`,
    },        
    {
      functionLatex: `f(x)=\\sin(x)`,
      xLatex: '5π/4',
      yLatex: '-√2/2',
      xAnswer: 19.63,
      yAnswer: 5.5,
      fOfXLatex: `f(5π/4)`,
      questionLatex: `\\sin\\left(\\frac{5\\pi}{4}\\right)`,
      answerLatex: `\\sin\\left(\\frac{5\\pi}{4}\\right) = -\\frac{\\sqrt{2}}{2}`,
    },
    {
      functionLatex: `f(x)=\\sin(x)`,
      xLatex: '4π/3',
      yLatex: '-√3/2',
      xAnswer: 20.93,
      yAnswer: 6.8,
      fOfXLatex: `f(4π/3)`,
      questionLatex: `\\sin\\left(\\frac{4\\pi}{3}\\right)`,
      answerLatex: `\\sin\\left(\\frac{4\\pi}{3}\\right) = -\\frac{\\sqrt{3}}{2}`,
    },        
    {
      functionLatex: `f(x)=\\sin(x)`,
      xLatex: '3π/2',
      yLatex: '-1',
      xAnswer: 23.55,
      yAnswer: 8,
      fOfXLatex: `f(3π/2)`,
      questionLatex: `\\sin\\left(\\frac{3\\pi}{2}\\right)`,
      answerLatex: `\\sin\\left(\\frac{3\\pi}{2}\\right) = -1`,
    },
    {
      functionLatex: `f(x)=\\sin(x)`,
      xLatex: '5π/3',
      yLatex: '-√3/2',
      xAnswer: 26.17,
      yAnswer: 6.8,
      fOfXLatex: `f(5π/3)`,
      questionLatex: `\\sin\\left(\\frac{5\\pi}{3}\\right)`,
      answerLatex: `\\sin\\left(\\frac{5\\pi}{3}\\right) = -\\frac{\\sqrt{3}}{2}`,
    },        
    {
      functionLatex: `f(x)=\\sin(x)`,
      xLatex: '7π/4',
      yLatex: '-√2/2',
      xAnswer: 27.48,
      yAnswer: 5.5,
      fOfXLatex: `f(7π/4)`,
      questionLatex: `\\sin\\left(\\frac{7\\pi}{4}\\right)`,
      answerLatex: `\\sin\\left(\\frac{7\\pi}{4}\\right) = -\\frac{\\sqrt{2}}{2}`,
    },        
    {
      functionLatex: `f(x)=\\sin(x)`,
      xLatex: '11π/6',
      yLatex: '-1/2',
      xAnswer: 28.78,
      yAnswer: 3.9,
      fOfXLatex: `f(11π/6)`,
      questionLatex: `\\sin\\left(\\frac{11\\pi}{6}\\right)`,
      answerLatex: `\\sin\\left(\\frac{11\\pi}{6}\\right) = -\\frac{1}{2}`,
    },
    {
      functionLatex: `f(x)=\\sin(x)`,
      xLatex: '2π',
      yLatex: '0',
      xAnswer: 31.4,
      yAnswer: 0,
      fOfXLatex: `f(2π)`,
      questionLatex: `\\sin(2\\pi)`,
      answerLatex: `\\sin(2\\pi) = 0`,
    },                                                                
]

const cosArray = [
  {
    functionLatex: `f(x)=\\cos(x)`,
    xLatex: '0',
    yLatex: '1',
    xAnswer: 0,
    yAnswer: -8,
    fOfXLatex: `f(0)`,
    questionLatex: `\\cos(0)`,
    answerLatex: `\\cos(0) = 1`,
  },
  {
    functionLatex: `f(x)=\\cos(x)`,
    xLatex: 'π/6',
    yLatex: '√3/2',
    xAnswer: 2.62,
    yAnswer: -6.8,
    fOfXLatex: `f(π/6)`,
    questionLatex: `\\cos\\left(\\frac{\\pi}{6}\\right)`,
    answerLatex: `\\cos\\left(\\frac{\\pi}{6}\\right) = \\frac{\\sqrt{3}}{2}`,
  },
  {
    functionLatex: `f(x)=\\cos(x)`,
    xLatex: 'π/4',
    yLatex: '√2/2',
    xAnswer: 3.93,
    yAnswer: -5.5,
    fOfXLatex: `f(π/4)`,
    questionLatex: `\\cos\\left(\\frac{\\pi}{4}\\right)`,
    answerLatex: `\\cos\\left(\\frac{\\pi}{4}\\right) = \\frac{\\sqrt{2}}{2}`,
  },
  {
    functionLatex: `f(x)=\\cos(x)`,
    xLatex: 'π/3',
    yLatex: '1/2',
    xAnswer: 5.23,
    yAnswer: -3.9,
    fOfXLatex: `f(π/3)`,
    questionLatex: `\\cos\\left(\\frac{\\pi}{3}\\right)`,
    answerLatex: `\\cos\\left(\\frac{\\pi}{3}\\right) = \\frac{\\sqrt{3}}{2}`,
  },                
  {
    functionLatex: `f(x)=\\cos(x)`,
    xLatex: 'π/2',
    yLatex: '0',
    xAnswer: 7.85,
    yAnswer: 0,
    fOfXLatex: `f(π/2)`,
    questionLatex: `\\cos\\left(\\frac{\\pi}{2}\\right)`,
    answerLatex: `\\cos\\left(\\frac{\\pi}{2}\\right) = 0`,
  },
  {
    functionLatex: `f(x)=\\cos(x)`,
    xLatex: '2π/3',
    yLatex: '-1/2',
    xAnswer: 10.47,
    yAnswer: 3.9,
    fOfXLatex: `f(2π/3)`,
    questionLatex: `\\cos\\left(\\frac{2\\pi}{3}\\right)`,
    answerLatex: `\\cos\\left(\\frac{2\\pi}{3}\\right) = -\\frac{1}{2}`,
  },        
  {
    functionLatex: `f(x)=\\cos(x)`,
    xLatex: '3π/4',
    yLatex: '-√2/2',
    xAnswer: 11.78,
    yAnswer: 5.5,
    fOfXLatex: `f(3π/4)`,
    questionLatex: `\\cos\\left(\\frac{3\\pi}{4}\\right)`,
    answerLatex: `\\cos\\left(\\frac{3\\pi}{4}\\right) = -\\frac{\\sqrt{2}}{2}`,
  },
  {
    functionLatex: `f(x)=\\cos(x)`,
    xLatex: '5π/6',
    yLatex: '-√3/2',
    xAnswer: 13.08,
    yAnswer: 6.8,
    fOfXLatex: `f(5π/6)`,
    questionLatex: `\\cos\\left(\\frac{5\\pi}{6}\\right)`,
    answerLatex: `\\cos\\left(\\frac{5\\pi}{6}\\right) = -\\frac{\\sqrt{3}}{2}`,
  },        
  {
    functionLatex: `f(x)=\\cos(x)`,
    xLatex: 'π',
    yLatex: '-1',
    xAnswer: 15.7,
    yAnswer: 8,
    fOfXLatex: `f(π)`,
    questionLatex: `\\cos(\\pi)`,
    answerLatex: `\\cos(\\pi) = -1`,
  },
  {
    functionLatex: `f(x)=\\cos(x)`,
    xLatex: '7π/6',
    yLatex: '-√3/2',
    xAnswer: 18.32,
    yAnswer: 6.8,
    fOfXLatex: `f(7π/6)`,
    questionLatex: `\\cos\\left(\\frac{7\\pi}{6}\\right)`,
    answerLatex: `\\cos\\left(\\frac{7\\pi}{6}\\right) = -\\frac{\\sqrt{3}}{2}`,
  },        
  {
    functionLatex: `f(x)=\\cos(x)`,
    xLatex: '5π/4',
    yLatex: '-√2/2',
    xAnswer: 19.63,
    yAnswer: 5.5,
    fOfXLatex: `f(5π/4)`,
    questionLatex: `\\cos\\left(\\frac{5\\pi}{4}\\right)`,
    answerLatex: `\\cos\\left(\\frac{5\\pi}{4}\\right) = -\\frac{\\sqrt{2}}{2}`,
  },
  {
    functionLatex: `f(x)=\\cos(x)`,
    xLatex: '4π/3',
    yLatex: '-1/2',
    xAnswer: 20.93,
    yAnswer: 3.9,
    fOfXLatex: `f(4π/3)`,
    questionLatex: `\\cos\\left(\\frac{4\\pi}{3}\\right)`,
    answerLatex: `\\cos\\left(\\frac{4\\pi}{3}\\right) = -\\frac{1}{2}`,
  },        
  {
    functionLatex: `f(x)=\\cos(x)`,
    xLatex: '3π/2',
    yLatex: '0',
    xAnswer: 23.55,
    yAnswer: 0,
    fOfXLatex: `f(3π/2)`,
    questionLatex: `\\cos\\left(\\frac{3\\pi}{2}\\right)`,
    answerLatex: `\\cos\\left(\\frac{3\\pi}{2}\\right) = 0`,
  },
  {
    functionLatex: `f(x)=\\cos(x)`,
    xLatex: '5π/3',
    yLatex: '1/2',
    xAnswer: 26.17,
    yAnswer: -3.9,
    fOfXLatex: `f(5π/3)`,
    questionLatex: `\\cos\\left(\\frac{5\\pi}{3}\\right)`,
    answerLatex: `\\cos\\left(\\frac{5\\pi}{3}\\right) = \\frac{1}{2}`,
  },        
  {
    functionLatex: `f(x)=\\cos(x)`,
    xLatex: '7π/4',
    yLatex: '√2/2',
    xAnswer: 27.48,
    yAnswer: -5.5,
    fOfXLatex: `f(7π/4)`,
    questionLatex: `\\cos\\left(\\frac{7\\pi}{4}\\right)`,
    answerLatex: `\\cos\\left(\\frac{7\\pi}{4}\\right) = \\frac{\\sqrt{2}}{2}`,
  },        
  {
    functionLatex: `f(x)=\\cos(x)`,
    xLatex: '11π/6',
    yLatex: '√3/2',
    xAnswer: 28.78,
    yAnswer: -6.8,
    fOfXLatex: `f(11π/6)`,
    questionLatex: `\\cos\\left(\\frac{11\\pi}{6}\\right)`,
    answerLatex: `\\cos\\left(\\frac{11\\pi}{6}\\right) = \\frac{\\sqrt{3}}{2}`,
  },
  {
    functionLatex: `f(x)=\\cos(x)`,
    xLatex: '2π',
    yLatex: '0',
    xAnswer: 31.4,
    yAnswer: -8,
    fOfXLatex: `f(2π)`,
    questionLatex: `\\cos(2\\pi)`,
    answerLatex: `\\cos(2\\pi) = 1`,
  },                                                                
]
  let questionArray = sinArray;
  if (topic === "Cosine") {
    questionArray = cosArray;
  } 
  
  function getYCoordinateLabel(yCoordinate) {
    if (yCoordinate === 0) {
      return '0';
    } else if (yCoordinate === 3.9) {
      return '-1/2';
    } else if (yCoordinate === 5.5) {
      return '-√2/2';
    } else if (yCoordinate === 6.8) {
      return '-√3/2';
    } else if (yCoordinate === 8.0) {
      return '-1';
    } else if (yCoordinate === -3.9) {
      return '1/2';
    } else if (yCoordinate === -5.5) {
      return '√2/2';
    } else if (yCoordinate === -6.8) {
      return '√3/2';
    } else if (yCoordinate === -8.0) {
      return '1';
    }
  }

  function shuffleArray(array) {
    for(let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i - 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledGraphDataArrayRef = useRef(shuffleArray([...questionArray]));
  
  const [answerMessage, setAnswerMessage] = useState("");
  
  const [questionObject, setQuestionObject] = useState({
    questionData: shuffledGraphDataArrayRef.current[questionIndex], 
  });

  // const [questionObject, setQuestionObject] = useState({
  //   questionData: questionArray[questionIndex], 
  // });

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
        
    const graphQuestionObject = shuffledGraphDataArrayRef.current[questionIndex];
  
    setQuestionObject(
      {
        questionData: graphQuestionObject,
      }
    );
  }, [questionIndex]);

  const startTime = useRef(new Date());

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
        const result = await recordProgress(sessionData, "summerPrep");
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
      point.y = event.clientY;
      const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());
      const nearestGridPoint = getNearestGridPointTrig(svgPoint);
      setCoordinates(nearestGridPoint);
      const yCoordinateLabel = getYCoordinateLabel(nearestGridPoint.y);
      setYCoordinateLabel(yCoordinateLabel);
  };

  const getNearestGridPointTrig = (point) => {
      const xGridSize = 6.28 / 24 * 5;
      let y = 0;
      const yNegative = point.y < 0 ? true : false;
      if (Math.abs(point.y)< 2.0) {
        y = 0;
      } else if (Math.abs(point.y) < 4.5) {
        y = yNegative ? -3.90 : 3.90;
      } else if (Math.abs(point.y) < 6) {
        y = yNegative ? -5.5 : 5.5;
      } else if (Math.abs(point.y) < 7.5) {
        y = yNegative ? -6.8 : 6.8;
      }  else if (Math.abs(point.y) < 9.0) {
        y = yNegative ? -8.0 : 8.0;
      }
      const x = Math.round((Math.round(point.x /xGridSize) * xGridSize)*100)/100;
      return {x, y}
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


  // const xArray = ['0', 'π/6', 'π/4', 'π/3', 'π/2', '2π/3', '3π/4', '5π/6', 'π', '7π/6', '5π/4', '4π/3', '3π/2', '5π/3', '7π/4', '11π/6', '2π'];
  if (!isChecking && (quizProgress.questionsCorrect >= quizProgress.questionsToMeet)) {
   return (
    <div className="col-12 mt-3">
      <div className="row">
          <h1>Plotting Points</h1>
      </div>
      <div className="row">
          <p className="col-sm-12 fs-5">Excellent! You met the standard!</p>
      </div>
      <div className="mt-3">
        <NavLink to="/plottingPointsTopics">
            <Button type="button" variant="primary" size="lg">Plotting Points Topics</Button>
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
        <p className="fs-3">Plotting Points</p>
        <p>Click to add the point on the graph.</p>
      </div>
    <div className="svg-container">
        <svg 
          viewBox="-3 -12 38 22"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleClick}
          preserveAspectRatio="xMidYMid meet"
        >
          <SVGXAndYAxes2 />
          <SVGGridLines2 />
          <SVGHashMarks2 />
          {isChecking && (topic === "Cosine" ? <CosPath2 /> : <SinPath2 />)}
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
      <div>
        <p className={`fs-3 ${isChecking ? (isCorrect ? 'green' : 'red') : 'black'}`}>{answerMessage}</p>
        {isChecking ? (
            <p>  
              <StaticMathField className={`fs-3 ${isChecking ? (isCorrect ? 'green' : 'black') : 'black'}`}>{questionObject.questionData.answerLatex}</StaticMathField>
            </p>
         ) : (
            <p>  
            <StaticMathField className={`fs-3 ${isChecking ? (isCorrect ? 'green' : 'red') : 'black'}`}>{questionObject.questionData.questionLatex}</StaticMathField>
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
      <Link to="/plottingPointsTopics">
            <button type="button" className="btn btn-lg btn-success mt-3">Back to Functions Topics</button><br /><br />
      </Link>     
    </div>
    );
} // end of if quizProgress.questionsCorrect === quizProgress.questionsToMeet
}


  