import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { Button, ProgressBar } from 'react-bootstrap';
import { addStyles, StaticMathField } from 'react-mathquill'

import '../../App.scss';
import '../../index.scss';
import './identifyingFunctions.component.summerPrep.scss';

 import {
    setSessionData,
    recordProgress
} from '../infrastructure/recordProgress.js';

addStyles();

const multipleChoiceQuestions = [
    {
        level: 1,
        question: `2^3`,
        answers: {
            correctAnswer: `8`,
            distractor1: `6`,
            distractor2: `9`,
            distractor3: `16`,
        }
    },
    {
        level: 1,
        question: `3^3`,
        answers: {
            correctAnswer: `27`,
            distractor1: `9`,
            distractor2: `18`,
            distractor3: `6`,
        }
    },
    {
        level: 1,
        question: `3^1`,
        answers: {
            correctAnswer: `3`,
            distractor1: `\\frac{1}{3}`,
            distractor2: `0`,
            distractor3: `1`,
        }
    },
    {
        level: 1,
        question: `4^3`,
        answers: {
            correctAnswer: `64`,
            distractor1: `12`,
            distractor2: `16`,
            distractor3: `8`,
        }
    },
    {
        level: 1,
        question: `2^4`,
        answers: {
            correctAnswer: `16`,
            distractor1: `8`,
            distractor2: `4`,
            distractor3: `32`,
        }
    },
    {
        level: 1,
        question: `5^2`,
        answers: {
            correctAnswer: `25`,
            distractor1: `10`,
            distractor2: `15`,
            distractor3: `20`,
        }
    },
];
    
function shuffleArray(array) {
    for(let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i - 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default function IdentifyingFunctionsExtractAnswers({username}) {

    const [questionIndex, setQuestionIndex] = useState(0);
    const [questionObject, setQuestionObject] = useState({
        questionData: '',
        answersArray: []
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
        
    const [answerMessage, setAnswerMessage] = useState('');
    const [buttonClass, setButtonClass] = useState({button0: '', button1: '', button2: '', button3: ''});
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        initializeQuestion();
    }, [questionIndex]);

    const startTime = useRef(new Date());

    function initializeQuestion() {
        const shuffledQuestionsArray = shuffleArray([...multipleChoiceQuestions]);
        const matchingQuestionObject = shuffledQuestionsArray[questionIndex];
        const answersArray = shuffleArray(Object.values(matchingQuestionObject.answers));

        setQuestionObject({
            questionData: matchingQuestionObject,
            answersArray: answersArray
        });
    }

    function updateQuizProgress(isCorrect) {
        setQuizProgress(prevState => {
            return {
                ...prevState,
                questionsAttempted: prevState.questionsAttempted + 1,
                questionsCorrect: isCorrect ? prevState.questionsCorrect + 1 : prevState.questionsCorrect,
                questionsIncorrect: isCorrect ? prevState.questionsIncorrect : prevState.questionsIncorrect + 1,
                questionsStreak: isCorrect ? prevState.questionsStreak + 1 : 0,
                progressBar: Math.round((prevState.questionsCorrect/prevState.questionsToMeet)*100)
            };
        });
    };

    function handleClick(value) {
        const isCorrect = value === questionObject.questionData.answers.correctAnswer;
        const buttonClicked = "button" + questionObject.answersArray.indexOf(value);

        setAnswerMessage(isCorrect ? "Correct!" : "Incorrect!");
        setButtonClass({[buttonClicked]: isCorrect ? 'matched' : 'incorrect'});
        updateQuizProgress(isCorrect);
        
        setTimeout(function() {
            setAnswerMessage('');
            setButtonClass({ [buttonClicked]: '' });
            if (questionIndex === quizProgress.questionsToMeet - 1) {
                done();
            } else {
                next();
            }    
        }, 1500);
    }

    function next() {
        setQuestionIndex(prevIndex => prevIndex + 1);
    }

    async function done() {
        try {
            const endTime = new Date();
            const totalTime = endTime - startTime;
            const sessionData = setSessionData(quizProgress, startTime, totalTime, "summerPrep", "functions", "matchingTest", username);
            const result = await recordProgress(sessionData, "summerPrep");
            console.log(result.msg);
            // what should we do with this result?
            setQuestionIndex(0);
            setIsFinished(true);
        } catch (error) {
            console.error("Failed to record progress: ", error);
            // Show a message to the user
        }
    }

    if (isFinished) {   
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <h1>Great job!</h1>
                        <p>You've completed the identifying functions quiz.</p>
                        <Link to="/summerPrepTopics" className="btn btn-primary">Summer Prep Topics</Link>
                    </div>
                </div>
            </div>
        )
    } else {
    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <ProgressBar variant="primary" style={{borderRadius: '0', backgroundColor: "LightGray"}}now={quizProgress.progressBar} label={`${quizProgress.progressBar}%`} max='100'/>
                </div>
            </div>
            <p className="fs-5">Evaluate the exponential term.</p>
            <div>
                <p className="fs-2">
                    <StaticMathField>{questionObject.questionData.question}</StaticMathField>
                    =
                 </p>
            </div>
            <div>
                <p>{answerMessage}</p>
            </div>
            <MultipleChoice
                questionObject={questionObject}
                buttonClass={buttonClass}
                handleClick={handleClick}
            />
            <Link to="/summerPrepTopics">
                <button type="button" className="btn btn-lg btn-success mt-3">BACK TO SUMMER PREP</button><br /><br />
            </Link>
     </div>
    )
    }
}

function MultipleChoice({questionObject, buttonClass, handleClick}){
    return (
        <div className="matching p-2">
            <div className="row">
                {questionObject.answersArray.map((answer, index) => (
                    <div className="col-6 text-center mt-2" key={index}>
                        <Button
                            onClick={() =>handleClick(answer)}
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
