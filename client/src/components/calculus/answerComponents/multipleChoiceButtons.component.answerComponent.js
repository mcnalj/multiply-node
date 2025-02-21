import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { addStyles, StaticMathField } from 'react-mathquill'

import '../../../App.scss';
import '../../../index.scss';
import './multipleChoiceButtons.component.answerComponent.scss';

addStyles();

export default function MultipleChoiceButtons({questionObject, handleIncrement, setQuizProgress, quizProgress, setAnswerMessage, startTime}) {
    const [isDisabled, setIsDisabled] = useState(false);
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
        if (isDisabled) return; // Prevent multiple clicks
        setIsDisabled(true);

        const isCorrect = value === questionObject.questionData.answers.correctAnswer;
        const buttonClicked = "button" + questionObject.answersArray.indexOf(value);
    
        setAnswerMessage(isCorrect ? "Correct!" : "Incorrect!");
        // setButtonClass({[buttonClicked]: isCorrect ? 'matched' : 'incorrect'});
        
        setButtonClass(prevState => ({
            ...prevState,
            [buttonClicked]: isCorrect ? 'matched' : 'incorrect'
        }));
        
        setTimeout(function() {
            handleIncrement(
                {
                    questionsAttempted: quizProgress.questionsAttempted + 1,
                    questionsCorrect: isCorrect ? quizProgress.questionsCorrect + 1 : quizProgress.questionsCorrect,
                    questionsIncorrect: isCorrect ? quizProgress.questionsIncorrect : quizProgress.questionsIncorrect + 1,
                    questionsStreak: isCorrect ? quizProgress.questionsStreak + 1 : 0,
                    progressBar: Math.round(((quizProgress.questionsCorrect + (isCorrect ? 1 : 0))/quizProgress.questionsToMeet)*100),
                    metStandard: (quizProgress.questionsCorrect + (isCorrect ? 1 : 0)) >= quizProgress.questionsToMeet         
                }
            );
            
            updateQuizProgress(isCorrect);
            
            setAnswerMessage('');
            setButtonClass({ [buttonClicked]: '' }); 
            setIsDisabled(false);   
        }, 1000);
    }
    
    return (
        <div className="matching p-2">
            <div className="row">
                {questionObject.answersArray.map((answer, index) => (
                    <div className="col-10 offset-1 col-md-6 offset-md-0 text-center mt-3" key={index}>
                        <Button
                            onClick={() =>handleButtonClick(answer)}
                            variant="outline-light"
                            className={`col-12 fs-3 p-1 box ${buttonClass[`button${index}`]}`}
                            // disabled={isDisabled}
                        >        
                            <StaticMathField>{answer}</StaticMathField>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}