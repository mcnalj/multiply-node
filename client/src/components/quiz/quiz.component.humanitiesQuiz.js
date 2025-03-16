import React, { useEffect, useState } from "react";
import { NavLink, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import './quiz.component.humanitiesQuiz.scss';

import {
    rule400s,
    rule600s,
    rule800s,
    rule850s,
} from './assets/questions/mockTrialQuestions.js';

export default function QuizHumanities() {
    const category = useParams()
    const categoryId = category.categoryId;
    let questionBank = rule400s;
    if (categoryId == 600) {
        questionBank = rule600s;
    } else if (categoryId == 800) {
        questionBank = rule800s;
    } else if (categoryId == 850) {
        questionBank = rule850s;
    } else if (categoryId == 1000) {
        const mix = [...rule400s, ...rule600s, ...rule800s, ...rule850s];
        const sortedMix = sortQuestions(mix);
        const mixQuestions = sortedMix.slice(0, 10);
        questionBank = mixQuestions;
    }
    

    const [questions, setQuestions] = useState([]);
    const [count, setCount] = useState(0);
    const [randomizedAnswers, setRandomizedAnswers] = useState([]);
    const [graded, setGraded] = useState(false);
    const [alreadyClicked, setAlreadyClicked] = useState(false);
    const [answerMessage, setAnswerMessage] = useState(null);
    const [questionsCorrect, setQuestionsCorrect] = useState(0);
    const [questionsAttempted, setQuestionsAttempted] = useState(0);

    useEffect(() => {
        const sortedQuestions = sortQuestions(questionBank);
        setQuestions(sortedQuestions);
    }, []);
    
    useEffect(() => {
        if (questions.length === 0) return;
        const currentQuestion = questions[count];
        let incorrect = [];
        if (currentQuestion.distractor4) {
            incorrect = [currentQuestion.distractor1, currentQuestion.distractor2, currentQuestion.distractor3, currentQuestion.distractor4];
        } else {
            incorrect = [currentQuestion.distractor1, currentQuestion.distractor2, currentQuestion.distractor3];
        }
        if (currentQuestion.randomizableAnswers) {
            setRandomizedAnswers(sortArray(incorrect.concat(currentQuestion.correctAnswer)));
        } else {
            incorrect.splice(currentQuestion.correctAnswerPosition, 0, currentQuestion.correctAnswer);
            setRandomizedAnswers(incorrect);
        }
    }, [questions, count]);
    
    function sortArray(array) {
        let randomizedAnswers = [];
        let tempArray = [...array];
        
        while (tempArray.length > 0) {
            let pick = Math.floor(Math.random() * tempArray.length);
            randomizedAnswers.push(tempArray[pick]);
            tempArray.splice(pick, 1);
        }
        return randomizedAnswers;
    }

    function sortQuestions(array) {
        let randomizedQuestions = [];
        let tempArray = [...array];
        var pick = 0;
        while (tempArray.length > 0) {
            pick = Math.floor(Math.random() * tempArray.length);
            randomizedQuestions.push(tempArray[pick]);
            tempArray.splice(pick, 1);
        }
        return randomizedQuestions;
    }    

    function setClicked(clicked) {
        setAlreadyClicked(clicked);
    }

    function nextQuestion() {
        if (count < questions.length - 1) {
            setCount(count + 1);
            setGraded(!graded);
            setClicked(false);
            // setIncorrectAnswers([questions[count+1]?.distractor1, questions[count+1]?.distractor2, questions[count+1]?.distractor3]);
            // // setIncorrectAnswers([data.questionsArray[count+1].distractor1, data.questionsArray[count+1].distractor2, data.questionsArray[count+1].distractor3]);
            // // incorrectAnswers = [data.questionsArray[count+1].distractor1, data.questionsArray[count+1].distractor2, data.questionsArray[count+1].distractor3];
            // // setRandomizedAnswers(sortArray(incorrectAnswers.concat(data.questionsArray[count+1].correctAnswer), [])) 
            // setRandomizedAnswers(
            //     questions[count +1]?.randomizableAnswers ? 
            //     sortArray(incorrectAnswers.concat(questions[count+1].correctAnswer), []) : 
            //     incorrectAnswers.splice(questions[count+1], 0, questions[count+1].correctAnswer)
            //);
            setAnswerMessage(null);
        } else {
            setAnswerMessage("You've reached the end of the quiz!");
        }
    }

    return (
        <Container>
            <div id="quizContent" className="mt-2">
                {randomizedAnswers.length > 0 ? (
                <>
                <div>
                    <div className="row col-12 justify-content-right">
                        <p>{questionsCorrect} / {questionsAttempted}</p>
                    </div>
                    <div className="row col-12 text-center">
                        <h4>Question {count + 1} of {questions.length}</h4>
                    </div>
                </div>
                <QuestionArea
                    question={questions[count]}
                    answers={randomizedAnswers}
                    graded={graded}
                    setGraded={setGraded}
                    alreadyClicked={alreadyClicked}
                    setClicked={setClicked}
                    answerMessage={answerMessage}
                    setAnswerMessage={setAnswerMessage}
                    setQuestionsCorrect={setQuestionsCorrect}
                    setQuestionsAttempted={setQuestionsAttempted}
                />
                <div>
                    <Button variant="primary" type="submit" onClick={nextQuestion}>Next</Button>
                </div>
                <br /><br />
                <NavLink to="/quizHumanitiesTopics">
                    <Button type="button" variant="info" size="lg">Back Quiz Topics</Button>
                </NavLink>
                </>
                ) : (
                <div>
                    <p>Loading Questions...</p>
                </div>
                )}
            </div>
        </Container>    
    );
}

export function QuestionArea({question, answers, graded, setGraded, alreadyClicked, setClicked, answerMessage, setAnswerMessage, setQuestionsCorrect, setQuestionsAttempted}) {
    
    return (
        <div className="mt-2">
            {question?.imageFile && (
                <div className="row">
                    <div className="col-xsm-12 offset-xsm-3 col-sm-6 offset-sm-3 ">
                        <Image src={question?.imageFile} fluid />
                    </div>
                </div>
            )}
            <div className="row mt-2">
              <p dangerouslySetInnerHTML={{__html: question?.stem}}></p>
            </div>
            <div className="row mt-2">
              <p dangerouslySetInnerHTML={{__html: question.question}}></p>
            </div>
            <div id="aArea" className="mt-2">
                {answers.map((answer, index) => (
                    <div key={index}>
                        <Answer
                            answer={answer}
                            correctAnswer={question?.correctAnswer}
                            graded={graded}
                            setGraded={setGraded}
                            alreadyClicked={alreadyClicked}
                            setClicked={setClicked}
                            setAnswerMessage={setAnswerMessage} 
                            setQuestionsCorrect={setQuestionsCorrect}
                            setQuestionsAttempted={setQuestionsAttempted}   
                        />
                    </div>
                ))}
            </div>
            {answerMessage && (
                <div>
                    <p>{answerMessage ? answerMessage : "Correct!"}</p>
                </div>
            )}
            <p></p>
        </div>
    );
}
//UseEffect forces the change in the value of graded to update state in this child.
export function Answer({answer, correctAnswer, graded, setGraded, alreadyClicked, setClicked, setAnswerMessage, setQuestionsCorrect, setQuestionsAttempted}) {
    const [color, setColor] = useState("#E7E7E7");
    useEffect(() => {
        setColor("darkViolet");
    }, [graded]);
    
    function handleClick(value) {
        if (alreadyClicked) {
            return;
        }
        if (value === correctAnswer) {
            setColor("green");
            setAnswerMessage(null);  
            setQuestionsCorrect((prev) => prev + 1);
                          
        } else {
            setColor("red");      
            setAnswerMessage('Sorry! "' + correctAnswer + '" is the correct answer.'); 
        }
        setQuestionsAttempted((prev) => prev + 1);
        setClicked(true);
    }

    return (
        <div 
            className="answerText col-10 offset-1 col-md-6 offset-md-3 text-left mt-3"
            style={{backgroundColor: color, padding: "2%", paddingLeft: "5%"}}
            onClick={() => handleClick(answer)}
        >
            <p dangerouslySetInnerHTML={{__html: answer}}></p>
        </div>
    )
}
