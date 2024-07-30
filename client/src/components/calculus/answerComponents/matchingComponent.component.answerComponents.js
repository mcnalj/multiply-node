import React, { useState, useEffect } from 'react';
import { Button} from 'react-bootstrap';
import { addStyles, StaticMathField } from 'react-mathquill'
import { Link } from "react-router-dom";
import { FaCheckCircle } from 'react-icons/fa';

import '../../../App.scss';
import '../../../index.scss';
import './matchingComponent.component.answerComponents.scss';

export function MatchingComponent ({ matchObjects, leftOptions, rightOptions, setQuizProgress, setIsFinished, }) {
    const [clickedIndex, setClickedIndex] = useState(null);
    const [currentLeft, setCurrentLeft] = useState({option: null, index: null});
    const [currentRight, setCurrentRight] = useState({option: null, index: null});
    const [incorrectIndex, setIncorrectIndex] = useState([]);
    const [matches, setMatches] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);
    
    const handleLeftClick = (option, index) => {
      setCurrentLeft({option: option, index: index});
      checkMatch({option: option, index: index}, currentRight, index);
    };

    const handleRightClick = (option, index) => {
      setCurrentRight({option: option, index: index});
      checkMatch(currentLeft, {option: option, index:index}, index);
    };

    const checkMatch = (left, right, index) => {
        if (left?.option && right?.option) {
          const leftButton = matchObjects.findIndex(obj => obj.leftLatex === left.option);
          const rightButton = matchObjects.findIndex(obj => obj.rightLatex === right.option);  
          if (leftButton === rightButton) {
              setMatches(prevMatches => [...prevMatches, left.index, right.index]);
              if (matches.length === 8) {
                setIsCompleted(true); // this triggers the animation
                setTimeout(()=> { 
                    setQuizProgress(prevState => ({
                        ...prevState,
                        questionsAttempted: prevState.questionsAttempted + 1,
                        questionsCorrect: prevState.questionsCorrect + 1,
                        questionsIncorrect: prevState.questionsIncorrect,
                        questionsStreak: prevState.questionsStreak + 1,
                        progressBar: Math.round((((prevState.questionsCorrect + 1) / prevState.questionsToMeet) * 100)), 
                        metStandard: (prevState.questionsCorrect + 1) >= prevState.questionsToMeet ? true : false,
                    }));        
                    setIsFinished(true); // do we still need isFinished? bc we have quizProgress 
                }, 2000); // this changes the JSX returned in the parent
              }
          } else {
              setIncorrectIndex([left.index, right.index])
              setTimeout(()=> {
                  setIncorrectIndex([]);
              }, 1800);
          }
          setCurrentLeft({option: null, index: null});
          setCurrentRight({option: null, index: null});
          setClickedIndex(null);
        } else {
          console.log("Setting clicked index: " + index);
          setClickedIndex(index);
        }
    };

    const getButtonClass = (index, isLeft) => {
        const clicked = isLeft ? clickedIndex === index : clickedIndex === index;
        const matched = matches.includes(index);
        const incorrect = incorrectIndex.includes(index);
        return `col-12 fs-3 p-1 box ${clicked ? 'clicked' : ''} ${matched ? 'matched' : ''} ${incorrect ? 'incorrect' : ''}`;
    };

    return (
        <div>
            {isCompleted && (
                <div className="checkmark-container">
                    <FaCheckCircle className="checkmark" />
                </div>
            )}
            {/* <div className={`col-12 p-3 ${isCompleted ? 'completed matching' : 'matching'}`}> */}
            <div className="col-12 p-3 matching">
                {[...Array(5)].map((_, index) => (
                    <div className="row mt-3" key={index}>
                        <div className="col-6 text-center mt-2">
                            <Button
                                onClick={() => handleLeftClick(leftOptions[index], index+'left')}
                                variant="outline-light"
                                className={getButtonClass(index+'left', true)}
                            >
                                <StaticMathField>{leftOptions[index]}</StaticMathField>
                            </Button>
                        </div>
                        <div className="col-6 text-center mt-2">
                            <Button
                                onClick={() => handleRightClick(rightOptions[index], index+'right')}
                                variant="outline-light"
                                className={getButtonClass(index+'right', false)}
                            >
                                <StaticMathField>{rightOptions[index]}</StaticMathField>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <Link to="/summerPrepTopics">
                <button type="button" className="btn btn-lg btn-success mt-2">BACK TO SUMMER TOPICS</button><br /><br />
            </Link>
        </div>
    );
};