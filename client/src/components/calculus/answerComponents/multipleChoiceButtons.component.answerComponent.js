import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { addStyles, StaticMathField } from 'react-mathquill'

import '../../../App.scss';
import '../../../index.scss';
import './multipleChoiceButtons.component.answerComponent.scss';

addStyles();

export default function MultipleChoiceButtons({questionObject, handleIncrement, setQuizProgress, setAnswerMessage, startTime}) {
    const [buttonClass, setButtonClass] = useState({button0: '', button1: '', button2: '', button3: ''});

    function updateQuizProgress(isCorrect) {
        setQuizProgress(prevState => {
            return {
                ...prevState,
                questionsAttempted: prevState.questionsAttempted + 1,
                questionsCorrect: isCorrect ? prevState.questionsCorrect + 1 : prevState.questionsCorrect,
                questionsIncorrect: isCorrect ? prevState.questionsIncorrect : prevState.questionsIncorrect + 1,
                questionsStreak: isCorrect ? prevState.questionsStreak + 1 : 0,
                progressBar: Math.round(((prevState.questionsCorrect + (isCorrect ? 1 : 0))/prevState.questionsToMeet)*100),
                metStandard: prevState.questionsCorrect + (isCorrect ? 1 : 0) >= prevState.questionsToMeet       
            };
        });
    };
    
    function handleButtonClick(value) {
        const isCorrect = value === questionObject.questionData.answers.correctAnswer;
        const buttonClicked = "button" + questionObject.answersArray.indexOf(value);
    
        setAnswerMessage(isCorrect ? "Correct!" : "Incorrect!");
        setButtonClass({[buttonClicked]: isCorrect ? 'matched' : 'incorrect'});
        // updateQuizProgress(isCorrect);
        
        setTimeout(function() {
            updateQuizProgress(isCorrect);
            handleIncrement();
            setAnswerMessage('');
            setButtonClass({ [buttonClicked]: '' });    
        }, 1500);
    }
    
    return (
        <div className="matching p-2">
            <div className="row">
                {questionObject.answersArray.map((answer, index) => (
                    <div className="col-6 text-center mt-2" key={index}>
                        <Button
                            onClick={() =>handleButtonClick(answer)}
                            variant="outline-light"
                            className={`col-12 fs-3 p-1 box ${buttonClass[`button${index}`]}`}
                        >        
                            <StaticMathField>{answer}</StaticMathField>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}