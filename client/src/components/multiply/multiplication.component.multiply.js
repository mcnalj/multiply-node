import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router";
import './styles.component.multiply.scss';

export default function Multiplication(){
  const [numWrong, setNumWrong] = useState();
  const [numCorrect, setNumCorrect] = useState(0)
  const [initialTime, setInitialTime] = useState(180)
  var [multiplicand, setMultiplicand] = useState(5);
  var [multiplier, setMultiplier] = useState(4);
  const [questionDisplay, setQuestionDisplay] = useState(0);

  let questionsArray = [];
  var wantsSequential = false;
  var sequential = false;
  // let timesTable = Math.floor(Math.random() * 6) + 5;
  let timesTable = 1 // starts out as 6-9 randoms
  var missedList = [];
  var sessionMissedList = [];
  var questionNumber = 0;
  var startTime = 0;
  var questionTime = 0;
  var totalTime = 0;
  var tableArray = [];
  var fill = "blue";
  var fillColor = "";
  var messageParagraph = "";
  let tableArraySet = 0;
  var userAnswer = "none";

  function handleTableChange(e) {
    timesTable = e.target.value;
    if (timesTable > 1) {
      // figure out if it's sequential
      sequential = true;
    } else {
      sequential = false;
      tableArray = populateTableArray(tableArray, timesTable);
      tableArraySet = 0;
    }
    missedList = [];
    numCorrect = 0;
    totalTime = 0;
    questionsArray = loadQuestionsArray(timesTable, questionsArray, sequential, tableArraySet);
    [multiplicand, multiplier, startTime] = pickNumbersAndDrawCircles(questionNumber, questionsArray);
  };

  function handleSequentialChange(e) {
    sequential = e.target.value;
    missedList = [];
    numCorrect = 0;
    questionsArray = loadQuestionsArray(timesTable, questionsArray, sequential, tableArraySet);
    [multiplicand, multiplier, startTime] = pickNumbersAndDrawCircles(questionNumber, questionsArray);
  };

  // This is the main loop
  tableArray = populateTableArray(tableArray, timesTable);
  questionsArray = loadQuestionsArray(timesTable, questionsArray, sequential, tableArraySet);
  [multiplicand, multiplier, startTime] = pickNumbersAndDrawCircles(questionNumber, questionsArray);
  function handleSubmit(e) {
    e.preventDefault();
    userAnswer = "Whatever they typed into the input."
    questionTime = recordTime(startTime);
    totalTime = totalTime + questionTime;
    if (checkAnswer(multiplicand, multiplier, questionTime, userAnswer)) {
      numCorrect = numCorrect + 1;
      console.log("apply correct answer styles");
      const myTimeout = setTimeout(function() {
        questionNumber++
        if (questionNumber >= questionsArray.length) {
          if (missedList.length>0) {
            questionsArray = missedList;
            missedList = [];
            console.log(questionsArray);
            questionNumber = 0;
          } else {
            if (sequential) {
              sequential = switchToRandomMode(sequential);
              questionNumber = 0;
              questionsArray = loadQuestionsArray(timesTable, questionsArray, sequential, tableArraySet);
            } else {
              console.log("Excellent, let's move to the next times table.")
              // TODO we will have to deal with when we're at 9 later
              if (timesTable > 1) {
                timesTable++;
              } else {
                tableArraySet++;
              }
              // if they have gone through all the tables
              if (timesTable >= 11 || tableArraySet >= tableArray.length) {
                // review questions they've missed this session
                if (sessionMissedList > 0) {
                  console.log("Great work. Let's go over the ones you missed.");
                  questionsArray = sessionMissedList;
                  questionNumber = 0;
                } else {
                  timesTable = 1;
                  if (tableArraySet >= tableArray.length) {
                    tableArray = populateTableArray(tableArray, timesTable);
                    tableArraySet = 0
                  }
                  console.log("Congratulations! You know this! Here's more if you want to keep practicing.");
                  wantsSequential = false;
                  sequential = false;
                  questionsArray = loadQuestionsArray(timesTable, questionsArray, sequential, tableArraySet);
                  questionNumber = 0;
                }
              // this is if they are not done with all the tables
              } else {
                questionNumber = 0;
                if (wantsSequential) {
                  sequential = true;
                }
                questionsArray = loadQuestionsArray(timesTable, questionsArray, sequential, tableArraySet);
              }
            }
          }
        }
        [multiplicand, multiplier, startTime] = pickNumbersAndDrawCircles(questionNumber, questionsArray);
        console.log("resetAnswerStyles");
      }, 1000);
    } else {
      console.log("applyIncorrectAnswerStyles");
      // I should add a check to see if it's already in the missedList
      missedList = addQuestionToMissedList(questionsArray[questionNumber], missedList);
      sessionMissedList = addQuestionToSessionMissedList(questionsArray[questionNumber], sessionMissedList);
      const wrongTimeout = setTimeout(function(){
        console.log("resetAnswerStyles");
        startTime = setStartTime();
      }, 1600);
    }
  };

  function pickNumbersAndDrawCircles(questionNumber, questionsArray) {  
    [multiplicand, multiplier] = pickNumbers(questionsArray, questionNumber);
    setQuestion(multiplicand, multiplier);
    startTime = setStartTime();
    return [multiplicand, multiplier, startTime];
  }

  function setQuestion(multiplicand, multiplier) {
    // setMultiplicand(multiplicand);
    // setMultiplier(multiplier);
    let question = multiplicand + " x " + multiplier + " =";
    // setQuestionDisplay(question);
    // setNumCorrect(numCorrect);
  }

  function checkAnswer(multiplicand, multiplier, questionTime, userAnswer) {
    let isCorrect = false;
    let questionAnswer = multiplicand * multiplier;
    if (questionAnswer == userAnswer) {
      isCorrect = true;
    }
    recordAnswer(isCorrect, questionTime);
    return isCorrect;
  }

  // TODO This had the move to missed fuctionality
  function pickNumbers(questionsArray, questionNumber) {
    multiplicand = questionsArray[questionNumber][0];
    multiplier = questionsArray[questionNumber][1];
    return [multiplicand, multiplier];
  }

  function setStartTime() {
    startTime = new Date();
    return startTime;
  }

  function recordTime(startTime) {
    let endTime = new Date();
    questionTime = endTime - startTime;
    return questionTime;
  }
  function recordAnswer(isCorrect, questionTime) {
    console.log(questionTime);
  }

  function addQuestionToMissedList(questionTuple, missedList) {
    if (!missedList.some(item => item[0] === questionTuple[0] && item[1] === questionTuple[1])) {
      missedList.push(questionTuple);
    }
    return missedList;
  }

  function addQuestionToSessionMissedList(questionTuple, sessionMissedList) {
    if(!sessionMissedList.some(item => item[0] === questionTuple[0] && item[1] === questionTuple[1])) {
      sessionMissedList.push(questionTuple);
    }
    return sessionMissedList;
  }

  function switchToRandomMode(sequential) {
    console.log("Excellent! Let's mix it up and test your knowledge of the " + timesTable + "'s table.")
    sequential = false;
    return sequential;
  }


  // // need to fix this to use the new missed list
  // function showSummaryMessage() {
  //   let avgTime = totalTime / 10000;
  //   let missedItems = "";
  //   let msg = ""
  //   if (missedList.length == 0) {
  //     msg = "Perfect! You answered in an average of " + Math.round(avgTime, 1) + " seconds.\nHere's the next level . . ."
  //   } else {
  //     console.log("In the else with missed Q's");
  //     for (var i = 0; i<missedList.length; i++) {
  //       if (i = 0) {
  //         missedItems = missedItems + " " + multiplicand + " x " + missedList[i];
  //       } else {
  //         if (i <= missedList.length - 1) {
  //           missedItems = missedItems + ", " + multiplicand + " x " + missedList[i];
  //         } else {
  //           missedItems = missedItems + ", and " + multiplicand + " x " + missedItems[i];
  //         }
  //       }
  //     }
  //     console.log("finished the for");
  //     if (numCorrect == 9) {
  //       console.log("9");
  //       msg = "Excellent! You only missed " + missedItems + " and answered in an average of " + avgTime + " seconds. Let's redo the one you missed.";
  //     } else if (numCorrect > 6) {
  //       console.log("7, 8");
  //       msg = "Not bad. You missed " + missedItems + " and answered in an average of " + avgTime + " seconds. Let's practice the one's you missed.";
  //     } else {
  //       console.log("5");
  //       msg = "You missed " + missedItems + " and answered in an average of " + avgTime + " seconds. Let's practice the one's you missed.";
  //     }
  //   }
  //   messageParagraph.innerHTML = msg;
  //   messageParagraph.style.visibility = "visible";
  // }

  function loadQuestionsArray(timesTable, questionsArray, sequential, tableArraySet) {
    questionsArray = [];
    if (timesTable == 0) {
      // questionsArray = getQuestions(questionsArray, 10, 1, 0);
      questionsArray = tableArray[tableArraySet];
    } else if (timesTable == 1) {
      // questionsArray = getQuestions(questionsArray, 6, 5, 1);
      questionsArray = tableArray[tableArraySet];
    } else if (timesTable > 1) {
      questionsArray = getQuestionsForSingleMultiplicand(timesTable, sequential, questionsArray);
    }
    return questionsArray;
  }

  function getQuestions(questionsArray, topRand, offset, fixedMultiplicand) {
    multiplicand = 0;
    multiplier = 0
    let duplicate = true;
    while (questionsArray.length < 10) {
      multiplicand = Math.floor(Math.random() * topRand) + offset;
      duplicate = true;
      while (duplicate) {
        multiplier = Math.floor(Math.random() * topRand) + offset;
        duplicate = false;
        for (var i = 0; i<questionsArray.length; i++) {
          if (questionsArray[i][0] == multiplicand && questionsArray[i][1] == multiplier){
            duplicate = true;
            break;
          }
        }
        if (duplicate == false) {
          questionsArray.push([multiplicand, multiplier]);
        }
      } // end inner while
    } // end outer while
    return questionsArray;
  }

  function populateTableArray(tableArray, timesTable) {
    tableArray = [];
    let tableTuple = [];
    let multiplicands, multipliers;
    if (timesTable == 0) {
      multiplicands = [...Array(10).keys()].map(x => x + 1);
      multipliers = [...Array(10).keys()].map(x => x + 1);
    } else {
      multiplicands = [...Array(4).keys()].map(x => 5 + (x + 1));
      multipliers = [...Array(5).keys()].map(x => 4 + (x + 1));
      console.log(multiplicands)
    }
    for (let multiplicant of multiplicands) {
      for (let multiple of multipliers) {
        tableTuple = [multiplicant, multiple];
        tableArray.push(tableTuple);
      }
    }
    tableArray = shuffleMultipliers(tableArray);
    tableArray = splitTableArrayIntoSubArrays(tableArray);
    return tableArray;
  }

  function splitTableArrayIntoSubArrays(tableArray){
    let numSubArrays = parseInt(tableArray.length/10);
    let newTableArray = [];
    let subArray =[];
    for (let i = 0; i<numSubArrays; i++) {
      subArray = []
      for (let j = (0 + (i*10)); j<((i+1)*10); j++) {
        subArray.push(tableArray[j]);
      }
      newTableArray.push(subArray);
    }
    return newTableArray;
  }

  function getQuestionsForSingleMultiplicand(timesTable, sequential, questionsArray) {
    let multipliers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    if (!sequential) {
      multipliers = shuffleMultipliers(multipliers);
    }
    for (let i = 0; i < 10; i++) {
      questionsArray.push([timesTable, multipliers[i]]);
    }
    return questionsArray;
  }

  function shuffleMultipliers(multipliers) {
    for (let i = multipliers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = multipliers[i];
        multipliers[i] = multipliers[j];
        multipliers[j] = temp;
    }
    return multipliers;
  }
  console.log(multiplicand);
  console.log(multiplier);


  let makeChoice = false;
  if (makeChoice) {
  return (
    <>
      <Container>
        <div>
          <h3>
            Multiply!
          </h3>
          <p>Practice and lock in your times tables.</p> 
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Select size="lg" aria-label="select a challenge" onChange={handleTableChange}>
            <option>Select your challenge</option>
            <option value="0">Full Table (Random)</option>
            <option value="1">Sixes through Nines (Random)</option>
            <option value="2">Twos</option>
            <option value="3">Threes</option>
            <option value="4">Fours</option>
            <option value="5">Fives</option>
            <option value="6">Sixes</option>
            <option value="7">Sevens</option>
            <option value="8">Eights</option>
            <option value="9">Nines</option>
            <option value="10">Tens</option>
          </Form.Select>
          <Form.Check
            type="switch"
            label="Ask questions in sequence"
            id="sequenceSwitch"
          />
        </Form>

      </Container>
    </>
  );
  }else {
    return (
      <>
        <CirclesPage
          numCorrect={numCorrect}
          numWrong={numWrong}
          initialTime={initialTime}
          multiplicand={multiplicand}
          multiplier={multiplier}
        />
      </>

    )
  }
}

function CirclesPage({numCorrect, numWrong, initialTime, multiplicand, multiplier})  {

      const [inputs, setInputs] = useState({});

      const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]:value}));
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs.table);
        console.dir(inputs);
      }
  return (
    <Container>
        <Row id="infoRow">
          <Col>
            <SVGRedX numWrong={numWrong} />
          </Col>
          <Col>{numCorrect}</Col>
          <Col>
            <CountdownTimer initialTime={initialTime} />
          </Col>
        </Row>
        <Row id="svgRow">
          <SVGComponent
            color="red"
            multiplicand={multiplicand}
            multiplier={multiplier}
          />
        </Row>
        <Form
          id="answerForm" 
          onSubmit={handleSubmit}>
          <InputGroup>
            <InputGroup.Text id="questionLabel">5 x 9 = </InputGroup.Text>
            <Form.Control
              type="text"
              name="answerInput"
              placeholder="your answer"
              aria-label="your answer"
              aria-describedby="questionLabel"
              onChange={handleChange}
            />
          </InputGroup>
          <Button
            variant="primary"
            type="submit"
            id="submitBtn"
            size="lg"  
          >
            SUBMIT
          </Button>
        </Form>
    </Container>
  );
}

function SVGRedX({numWrong}) {
  const xList=[];
  for (let i = 0; i < numWrong; i++) {
    xList.push(i);
  }
  return (
    <Container>
      {xList.map(num =>
        <svg
          width="20" height="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox ="0 0 100 100"
        >
          <line x1="10" y1="10" x2="90" y2="90" stroke="purple" strokeWidth="25"/>
          <line x1="90" y1="10" x2="10" y2="90" stroke="purple" strokeWidth="25"/>
        </svg>
        )
      }
    </Container>
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
  const circleList = [
      {"x": 20, "y": 20},
      {"x": 45, "y": 20},
      {"x": 70, "y": 20}
    ]
  const circles = []
  function populateCircleList(circles, multiplier, multiplicand) {
    circles = [];
    let fillColors = ['rgb(0,0,0)', 'rgb(255,0,0)', 'rgb(0,0,255)', 'rgb(0,255,0)', 'rgb(139,69,10)', 'rgb(0,0,128)', 'rgb(0,100,0)','rgb(220,20,0)','rgb(153,50,204)', 'rgb(153,50,204)'];
    let fillColor = "lightGray";
    let x = 50;
    let y = 60;
    console.log("Multiplicand: " + multiplicand);
    for (let j = 0; j < 12; j++) {
      for (let i = 0; i<12; i++) {
        if (j < multiplicand && i < multiplier) {
          fillColor = fillColors[i];
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
    console.log(circles)
    return circles;
  }
  let circleList2 = populateCircleList(circles, multiplicand, multiplier); 
  return(
      <Container>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox ="0 0 1000 1000"
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

