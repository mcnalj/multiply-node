import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
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
  // const [initialTime, setInitialTime] = useState(180)
  const [multiplicand, setMultiplicand] = useState(5);
  const [multiplier, setMultiplier] = useState(4);
  const [questionDisplay, setQuestionDisplay] = useState("5 x 4 = ");
  const [questionsArray, setQuestionsArray] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [sequential, setSequential] = useState(true);
  const [wantsSequential, setWantsSequential] = useState(false);
  const [timesTable, setTimesTable] = useState(1);
  const [isCorrect, setIsCorrect] = useState("");

  
  var initialTime = 180;
  // var multiplicand = 5;
  // var multiplier = 4;
  var questionsArrayX = [];
  const [makeChoice, setMakeChoice] = useState(true);
  // let timesTable = Math.floor(Math.random() * 6) + 5;
  // let timesTable = 1 // starts out as 6-9 randoms
  var missedList = [];
  var sessionMissedList = [];
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
    let multiplicandX = 0
    let multiplierX = 0;
    let timesTableX = 1
    questionsArrayX = [];
    timesTableX = e.target.value;
    setTimesTable(timesTableX);
    if (timesTableX > 1) {
      // figure out if it's sequential
      // sequential = true;
    } else {
      // sequential = false;
      tableArray = populateTableArray(tableArray, timesTableX);
      tableArraySet = 0;
    }
    setMakeChoice(false);
    missedList = [];
    // numCorrect = 0;
    setNumCorrect(0);
    totalTime = 0;
    questionsArrayX = loadQuestionsArray(timesTableX, sequential, tableArraySet);
    setQuestionsArray(questionsArrayX);
    [multiplicandX, multiplierX, startTime] = pickNumbersAndDrawCircles(questionNumber, questionsArrayX);
    setMultiplicand(multiplicandX);
    setMultiplier(multiplierX);
  };

  function handleSequentialChange(e) {
    questionsArrayX = [];
    let multiplicandX = 0;
    let multiplierX = 0;
    // sequential = e.target.value;
    setSequential(e.target.value);
    missedList = [];
    // numCorrect = 0;
    setNumCorrect(0);

    // this should be e.target.value instead of sequential
    questionsArrayX = loadQuestionsArray(timesTable, sequential, tableArraySet);
    setQuestionsArray(questionsArrayX);
    [multiplicandX, multiplierX, startTime] = pickNumbersAndDrawCircles(questionNumber, questionsArrayX);
    setMultiplicand(multiplicandX);
    setMultiplier(multiplierX);
  };

  // This is the main loop
  // tableArray = populateTableArray(tableArray, timesTable);
  // questionsArray = loadQuestionsArray(timesTable, questionsArray, sequential, tableArraySet);
  // [multiplicand, multiplier, startTime] = pickNumbersAndDrawCircles(questionNumber, questionsArrayX);
  const handleSubmitAnswer = (userAnswer) => {
    let timesTableX = timesTable;
    let tempQuestionNumber = questionNumber;
    let questionsArrayChanged = false;
    let multiplicandX = 0;
    let multiplierX = 0;

    questionTime = recordTime(startTime);
    totalTime = totalTime + questionTime;
    // If the answer is correct
    if (checkAnswer(multiplicand, multiplier, questionTime, userAnswer)) {
      // numCorrect = numCorrect + 1;
      setNumCorrect(numCorrect + 1);
      // apply correct answer styles
      setIsCorrect("√")

      setTimeout(function() {
        tempQuestionNumber++
        setQuestionNumber(tempQuestionNumber);
        // We've reached the end of this array of questions
        // if (tempQuestionNumber >= questionsArray.length) {
          if (tempQuestionNumber >= 3) {
          // At the end of the array.
          // there are missed questions
          if (missedList.length>0) {
            // Presenting missed quesions
            // questionsArray = missedList;
            questionsArrayX = missedList
            setQuestionsArray(questionsArrayX);
            questionsArrayChanged = true;
            missedList = [];
            setQuestionNumber(0);
          // there are no more missed questions
          } else {
            // At the end of the array, no missed questions
            if (sequential) {
              //Finished a number in sequence. Setting sequential to false.
              // switchToRandomMode(sequential);
              setSequential(false);
              setQuestionNumber(0);
              questionsArrayX = loadQuestionsArray(timesTable, false, tableArraySet);
              // why is questionsArrayX undefined here?
              setQuestionsArray(questionsArrayX);
              questionsArrayChanged = true;
            } else {
              // Finished sequential and random, now moving to next table
              
              // TODO we will have to deal with when we're at 9 later
              if (timesTable > 1) {
                timesTableX++
                setTimesTable(timesTableX);
              } else {
                tableArraySet++;
              }
              // if they have gone through all the tables
              if (timesTableX >= 11 || (tableArraySet >= tableArray.length && timesTable <=1)) {
                // review questions they've missed this session
                if (sessionMissedList > 0) {
                  // Let's go over the ones you missed
                  questionsArrayX = sessionMissedList;
                  setQuestionsArray(questionsArrayX);
                  questionsArrayChanged = true;
                  setQuestionNumber(0);
                } else {
                  timesTableX = 1;
                  setTimesTable(timesTableX);
                  if (tableArraySet >= tableArray.length) {
                    tableArray = populateTableArray(tableArray, timesTableX);
                    tableArraySet = 0
                  }
                  // Congratulations! You know this! Here's more if you want to keep practicing.
                  // wantsSequential = false;
                  setWantsSequential(false);
                  // sequential = false;
                  setSequential(false);
                  questionsArrayX = loadQuestionsArray(timesTableX, false, tableArraySet);
                  setQuestionsArray(questionsArrayX);
                  questionsArrayChanged = true;
                  setQuestionNumber(0);
                }
              // this is if they are not done with all the tables
              } else {
                // Got to Not done with all tables
                setQuestionNumber(0);
                if (wantsSequential) {
                  // sequential = true;
                  setSequential(true);
                }
                // This sequentiual need to flip if that's appropriate, it will never flip to true as is
                questionsArrayX = loadQuestionsArray(timesTableX, wantsSequential, tableArraySet);
                setQuestionsArray(questionsArrayX);
                questionsArrayChanged = true;
              }
            }
          }
        }
        if (questionsArrayChanged) {
          [multiplicandX, multiplierX, startTime] = pickNumbersAndDrawCircles(0, questionsArrayX);  
        } else {
          [multiplicandX, multiplierX, startTime] = pickNumbersAndDrawCircles(tempQuestionNumber, questionsArray);
        }
        setMultiplicand(multiplicandX);
        setMultiplier(multiplierX);
        // resetAnswerStyles
        setIsCorrect("");
      }, 1000);
    } else {
      // applyIncorrectAnswerStyles
      setIsCorrect("X");
      // I should add a check to see if it's already in the missedList
      missedList = addQuestionToMissedList(questionsArray[questionNumber], missedList);
      sessionMissedList = addQuestionToSessionMissedList(questionsArray[questionNumber], sessionMissedList);
      const wrongTimeout = setTimeout(function(){
        // resetAnswerStyles
        setIsCorrect("")
        startTime = setStartTime();
      }, 1600);
    }
  };

  function pickNumbersAndDrawCircles(questionNumber, questionsArrayX) {
    let multiplicandX = 0;
    let multiplierX = 0;  
    [multiplicandX, multiplierX] = pickNumbers(questionsArrayX, questionNumber);
    setQuestion(multiplicandX, multiplierX);
    startTime = setStartTime();
    return [multiplicandX, multiplierX, startTime];
  }

  function setQuestion(multiplicandX, multiplierX) {
    // setMultiplicand(multiplicand);
    // setMultiplier(multiplier);
    let question = multiplicandX + " x " + multiplierX + " =";
     setQuestionDisplay(question);
    // setNumCorrect(numCorrect);
  }

  function checkAnswer(multiplicand, multiplier, questionTime, userAnswer) {
    let isCorrect = false;
    let questionAnswer = multiplicand * multiplier;
    if (questionAnswer == userAnswer) {
      isCorrect = true;
    }
    return isCorrect;
  }

  // TODO This had the move to missed fuctionality
  function pickNumbers(questionsArrayX, questionNumber) {
    let multiplicandX = questionsArrayX[questionNumber][0];
    let multiplierX = questionsArrayX[questionNumber][1];
    return [multiplicandX, multiplierX];
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
    // Excellent! Let's mix it up and test your knowledge of the " + timesTable + "'s table.
    // sequential = false;
    // return sequential;
    setSequential(false);
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

  function loadQuestionsArray(timesTable, sequential, tableArraySet) {
    let questionsArrayX = [];
    if (timesTable == 0) {
      // questionsArray = getQuestions(questionsArray, 10, 1, 0);
      questionsArrayX = tableArray[tableArraySet];
    } else if (timesTable == 1) {
      // questionsArray = getQuestions(questionsArray, 6, 5, 1);
      questionsArrayX = tableArray[tableArraySet];
    } else if (timesTable > 1) {
      questionsArrayX = getQuestionsForSingleMultiplicand(timesTable, sequential, questionsArray);
      // This is quesionsArrayX inside loadQuestionsArray: " + questionsArrayX
    }
    return questionsArrayX;
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
    questionsArray = [];
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
        <Form>
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
          questionDisplay={questionDisplay}
          handleSubmitAnswer={handleSubmitAnswer}
          isCorrect={isCorrect}
        />
      </>

    )
  }
}

function CirclesPage({numCorrect, numWrong, initialTime, multiplicand, multiplier, questionDisplay, handleSubmitAnswer, isCorrect})  {
      const [inputs, setInputs] = useState({});
      const inputRef = useRef(null);

      const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]:value}));
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        let answer = parseInt(inputs.answerInput);
        handleSubmitAnswer(answer);
        setTimeout(function() {
          inputRef.current.value = '';
        }, 1000);
      }

      useEffect(() => {
        inputRef.current.focus();
      }, []);

      function setInputAnswerStyles(isCorrect) {
        let inputBackgroundColor = "";
        let textColor = "black";
        if (isCorrect) {
          if (isCorrect === "√") {
            inputBackgroundColor = 'green';
            textColor = "white";
          } else {
            inputBackgroundColor = 'red';
            textColor = "white";
          }
        }
        return [inputBackgroundColor, textColor];
      }

      const [inputBackgroundColor, textColor] = setInputAnswerStyles(isCorrect);
      const inputAnswerStyle = {
        backgroundColor: inputBackgroundColor,
        color: textColor
        // borderColor: inputBorderColor,
        // borderWidth: "3px"
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
            <InputGroup.Text
              id="questionLabel"
            >
              {questionDisplay}
            </InputGroup.Text>
            <Form.Control
              ref={inputRef}
              type="text"
              name="answerInput"
              placeholder="your answer"
              aria-label="your answer"
              aria-describedby="questionLabel"
              onChange={handleChange}
              style={inputAnswerStyle}
            />
          </InputGroup>
          <Button
            variant="primary"
            type="submit"
            id="submitBtn"
            size="lg"  
          >
            SUBMIT
          </Button><br></br>
          <Form.Text>
            {isCorrect === "√" ? (
              <span style={{ color: 'green'}}>{isCorrect}</span>
            ) : (
              <span style={{ color: 'red'}}>{isCorrect}</span>
            )}
          </Form.Text>

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

