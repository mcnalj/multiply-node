import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import './quizBaseImages.component.quiz.scss';

import first_deriv from './assets/images/first_deriv.png';
import second_deriv from './assets/images/second_deriv.png';
import cosine_graph_rect from './assets/images/cosine_graph_rect.png';
import cosine_graph_square from './assets/images/cosine_graph_square.png';
import cosine_graph from './assets/images/cosine_graph.svg';
import concave_up_down_svg from './assets/images/concave_up_down.svg';
import concave_up_down from './assets/images/concave_up_down.png';
import training_function_svg from './assets/images/training_function.svg';
import training_function from './assets/images/training_function.png';
import tutorial_graph_svg from './assets/images/tutorial_graph.svg';
import tutorial_graph from './assets/images/tutorial_graph.png';
import tutorial_graph_derivative_svg from './assets/images/tutorial_graph_derivative.svg';
import tutorial_graph_derivative from './assets/images/tutorial_graph_derivative.png';
import tutorial_graph_second_derivative_svg from './assets/images/tutorial_graph_second_derivative.svg';
import tutorial_graph_second_derivative from './assets/images/tutorial_graph_second_derivative.png';

import { config } from '../constants.js';
var url = config.url.API_URL;

export default function QuizTutorial({username}) {
    
    const data = { questionsArray: [
        {
            questionId: 1,
            stem:"We can use the first and second derivative to explore the shape of the graph of a function.",
            question: `What is the relationship between a function's behavior and the value of the first derivative, f'(x) ?`,
            latex1: "whatever",
            imageTitle: "f(x) - the function",
            imageFile: tutorial_graph_svg,
            imageTitle2: "f'(x) - the derivative",
            imageFile2: tutorial_graph_derivative_svg,
            imageTitle3: "f''(x)",
            imageFile3: tutorial_graph_svg,
            randomizableAnswers: false,
            correctAnswerPosition: 1,
            correctAnswer: "When the function is increasing, the first derivative is positive.",
            distractor1: "When the function is positive, the first derivative is positive.",
            distractor2: "When the function is concave up, the first derivative is positive.",
            distractor3: "When the function is continuous, the first derivative is positive.",
            distractor4: null
        },
        {
            questionId: 2,
            stem:"When the function is increasing, its derivative is positive. When the function is decreasing, its derivative is neagative.",
            question: `On what interval(s) is f(x) increasing?`,
            latex1: "whatever",
            imageTitle: "f'(x) - the derivative",
            imageFile: tutorial_graph_derivative_svg,
            imageTitle2: null,
            imageFile2: null,
            imageTitle3: null,
            imageFile3: null,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(-1, 2)",
            distractor1: "(-∞, -1.8) and (0, 2.2) ",
            distractor2: "(0, ∞)",
            distractor3: "(0, 2)",
            distractor4: null
        },
        {
            questionId: 3,
            stem:"Right! The function is increasing on the interval (-1, 2).",
            question: `Even though the function has a negative value on the interval (-1, 0), the derivative from (-1,0) is __________.`,
            latex1: "whatever",
            imageTitle: "f(x) - the function",
            imageFile: tutorial_graph_svg,
            randomizableAnswers: false,
            correctAnswerPosition: 1,
            correctAnswer: "positive",
            distractor1: "negative",
            distractor2: "0",
            distractor3: "undefined",
            distractor4: null
        },        
        {
            questionId:4,
            stem:"The function is decreasing on the intervals (-∞, -1) and (2, ∞), so the derivative is negative.",
            question: `Since the function is decreasing, the derivative at x = -2 and x = 3 is __________.`,
            latex1: "whatever",
            imageTitle: "f(x) - the function",
            imageFile: tutorial_graph_svg,
            imageTitle2: "f'(x) - the derivative",
            imageFile2: tutorial_graph_derivative_svg,
            randomizableAnswers: false,
            correctAnswerPosition: 1,
            correctAnswer: "negative",
            distractor1: "positive",
            distractor2: "0",
            distractor3: "There is not enough information to know.",
            distractor4: null
        },        
        {
            questionId: 5,
            stem:"Whenever the function is at a peak or a valley, it has a horizontal tangent line and the derivative is 0.",
            question: `What is the value of the derivative at x = -1 and x = 2 ?`,
            latex1: "whatever",
            imageTitle: "f(x) - the function",
            imageFile: tutorial_graph_svg,
            randomizableAnswers: false,
            correctAnswerPosition: 0,
            correctAnswer: "0",
            distractor1: "positive",
            distractor2: "negative",
            distractor3: "not enough information to know",
            distractor4: null
        },
        {
            questionId: 6,
            stem:"Let's use the deivative, f'(x) to think about the shape of the graph of the function, f(x).",
            question: `As the graph shows, the derivative is positive on the interval (-1, 2). What does that tell us about the function?`,
            latex1: "whatever",
            imageTitle: "f'(x) - the derivative",
            imageFile: tutorial_graph_derivative_svg,
            randomizableAnswers: false,
            correctAnswerPosition: 1,
            correctAnswer: "it is increasing on the interval (-1, 2)",
            distractor1: "it is positive on the interval (-1, 2)",
            distractor2: "it is concave up on the interval (-1, 2)",
            distractor3: "not much",
            distractor4: null
        },                
        {
            questionId: 7,
            stem:"The value of f'(x) is negative on the intervals (-∞, -1) and (2, ∞).",
            question: `What does this tell us about the graph of f(x) on the intervals (-∞, -1) and (2, ∞)?`,
            latex1: "whatever",
            imageTitle: "f'(x) - the derivative",
            imageFile: tutorial_graph_derivative_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "f(x) is decreasing on the intervals (-∞, -1) and (2, ∞)",
            distractor1: "f(x) is negative on the intervals (-∞, -1) and (2, ∞)",
            distractor2: "f(x) is concave up on the intervals (-∞, -1) and (2, ∞)",
            distractor3: "f(x) is constant on the intervals (-∞, -1) and (2, ∞)",
            distractor4: null
        },                        
        {
            questionId: 8,
            stem:"We know that all the peaks and valleys of the function happen when the derivative is 0.",
            question: `At what x value(s) does f(x) have a potential peak or valley?`,
            latex1: "whatever",
            imageTitle: "f'(x) - the derivative",
            imageFile: tutorial_graph_derivative_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "x = -1 and x = 2 ",
            distractor1: "x = 0.5",
            distractor2: "x = -∞, ∞, and 0.5",
            distractor3: "there is not enough information to answer",
            distractor4: null
        },                        
        {
            questionId: 9,
            stem:"The first derivative test is used to determine where the original function has relative extrema.",
            question: `When the first derivative changes from negative to positive, the original function is at a __________.`,
            latex1: "whatever",
            imageTitle: "f'(x) - the derivative",
            imageFile: tutorial_graph_derivative_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "relative maximum",
            distractor1: "relative minimum",
            distractor2: "absolute maximum",
            distractor3: "0",
            distractor4: null
        },
        {
            questionId: 10,
            stem:"The sign of the derivative tells us whether the function is increasing or decreasing.",
            question: `x = -1 is a relative minimum of f(x) because ______________ ?`,
            latex1: "whatever",
            imageTitle: "f(x) - the function",
            imageFile: tutorial_graph_svg,
            imageTitle2: "f'(x) - the derivative",
            imageFile2: tutorial_graph_derivative_svg,
            randomizableAnswers: false,
            correctAnswerPosition: 0,
            correctAnswer: "f'(x) changes from negative to positive so f(x) changes from decreasing to increasing",
            distractor1: "f'(x) changes from negative to positive so f(x) changes from negative to positive",
            distractor2: "f'(x) changes from decreasing to increasing so f(x) changes from decreasing to increasing",
            distractor3: "f'(x) changes from positive to negative so f(x) changes from increasing to decreasing",
            distractor4: null
        },                        
        {
            questionId: 11,
            stem: "The first derivative test tells us that x = 2 is a local maximum of f(x).",
            question: `We know x = 2 is a local maximum because _____________.`,
            latex1: "whatever",
            imageTitle: "f'(x) - the derivative",
            imageFile: tutorial_graph_derivative_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "f'(x) changes from positive to negative, so f(x) changes from increasing to decreasing",
            distractor1: "f'(x) changes from positive to negative, so f(x) changes from positive to negative",
            distractor2: "f'(x) changes from increasing to decreasing, so f(x) changes from increasing to decreasing",
            distractor3: "f'(x) changes from increasing to decreasing, so f(x) changes from positive to negative",
            distractor4: null
        },  
        {
            questionId: 12,
            stem: "We can use the second derivative, f''(x), to describe the concavity of f(x).",
            question: `When f''(x) is positive, f(x) is concave up. When f''(x) is negative, f(x) is ___________`,
            latex1: "whatever",
            imageTitle: "f''(x) - the second derivative",
            imageFile: tutorial_graph_second_derivative_svg,
            imageTitle2: "f(x) - the function",
            imageFile2: tutorial_graph_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "concave down",
            distractor1: "decreasing",
            distractor2: "negative",
            distractor3: "undefined",
            distractor4: null
        },   
        {
            questionId: 13,
            stem:"When f''(x) changes sign, f(x) changes concavity and has an inflection point.",
            question: `When does f(x) change from concave up to concave down and have an inflection point?`,
            latex1: "whatever",
            imageTitle: "f''(x) - the second derivative",
            imageFile: tutorial_graph_second_derivative_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "0.5",
            distractor1: "0",
            distractor2: "1",
            distractor3: "-1",
            distractor4: null
        },
        {
            questionId: 14,
            stem:"When f''(x) is positive, f'(x) is increasing. That means the slope of f(x) is increasing.",
            question: `On what interval is the slope of f(x) increasing?`,
            latex1: "whatever",
            imageTitle: "f(x) - the function",
            imageFile: tutorial_graph_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(-∞, 0.5)",
            distractor1: "(-1, 2)",
            distractor2: "(-∞, -1.75) and (0, 3.3)",
            distractor3: "(0.5, ∞)",
            distractor4: null
        },
        {
            questionId: 15,
            stem:"When f''(x) is negative, f'(x) is decreasing. That means the slope of f(x) is decreasing.",
            question: `On what interval is the slope of f(x) decreasing?`,
            latex1: "whatever",
            imageTitle: "f(x) - the function",
            imageFile: tutorial_graph_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "(0.5, ∞)",
            distractor1: "(-1, 2)",
            distractor2: "(-∞, -1.75) and (0, 3.3)",
            distractor3: "(-∞, 0.5)",
            distractor4: null
        },
        {
            questionId: 16,
            stem:"f(x) has an inflection point at x = 0.5 and changes from concave up to concave down.",
            question: `What happens to f'(x) around x = 0.5?`,
            latex1: "whatever",
            imageFile: tutorial_graph_svg,
            randomizableAnswers: true,
            correctAnswerPosition: null,
            correctAnswer: "f'(x) changes from increasing to decreasing",
            distractor1: "f'(x) changes from positive to negative",
            distractor2: "f'(x) changes from concave up to concave down",
            distractor3: "f'(x) is undefined",
            distractor4: null
        },        
    ]
    }
    const [count, setCount] = useState(0)
    var incorrectAnswers = [data.questionsArray[count].distractor1, data.questionsArray[count].distractor2, data.questionsArray[count].distractor3];

    const [randomizedAnswers, setRandomizedAnswers] = useState(sortArray(incorrectAnswers.concat(data.questionsArray[0].correctAnswer), []));
    const [graded, setGraded] = useState('true');
    const [alreadyClicked, setAlreadyClicked] = useState('false');
    const [finishedTutorial, setFinishedTutorial] = useState('false');
    // this is what we could do for lifted state
    const [quizState, setQuizState] = useState({questionsCorrect: 0, questionsIncorrect: 0, streak: 0});
    const startTime = new Date();

    function sortArray(array, randomizedAnswers) {
        var pick = 0;
        while (array.length > 0) {
            pick = Math.floor(Math.random() * array.length);
            randomizedAnswers.push(array[pick]);
            array.splice(pick, 1);
        }
        return randomizedAnswers;
    }

    function setClicked(clicked) {
        setAlreadyClicked(clicked);
    }

    function nextQuestion() {
        setCount(count + 1);
        setGraded(!graded);
        setClicked("false")
        if (count >= data.questionsArray.length - 1) {
            setFinishedTutorial('true');
            done()
        } else {
            incorrectAnswers = [data.questionsArray[count+1].distractor1, data.questionsArray[count+1].distractor2, data.questionsArray[count+1].distractor3];
            setRandomizedAnswers(sortArray(incorrectAnswers.concat(data.questionsArray[count+1].correctAnswer), []))    
        }
    }

    async function done(){
        let topicName = 'curveSketching';
        const endTime = new Date()
        const totalTime = endTime - startTime;
        let sessionObj = {
          "metStandard": true,
          "datetimeStarted": startTime,
          "totalTime": totalTime,
        }
        let sessionData = {
          userData: {
              username: username,
          },
          progress: {
            calculus: {
                tutorials: {
                    tutorialData: {
                      skill: topicName,
                      sessionsData: sessionObj
                    }
                }
            }        
          }
        }
        try {
            const response = await fetch(`${url}/record/finishedTutorial`, {
                method: "POST",
                mode: 'cors',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sessionData),
            });
            if (!response.ok) {
                console.error(`Failed to post results. Status: ${response.status}`)
                return;
            }
        } catch (error) {
            console.error("An error occurred while recording progress:", error);
        }
    };
    if (finishedTutorial=="false") {
        return (
            <Container>
                <div id="quizContent" className="mt-2">
                    <QuestionArea
                        question={data?.questionsArray[count]}
                        answers={randomizedAnswers}
                        graded={graded}
                        alreadyClicked={alreadyClicked}
                        setClicked={setClicked}
                        first_deriv={first_deriv}
                    />
                    <div>
                        <Button className="btn btn-lg mt-2" variant="success" type="submit" onClick={nextQuestion}>Next</Button>
                    </div>
                    <div>
                    <Link to="/tutorialTopics">
                        <button type="button" className="btn btn-lg btn-info mt-5">TUTORIAL TOPICS</button><br /><br />
                    </Link>
                </div>

                </div>
            </Container>    
        );
    } else {
        return (
            <Container>
                <div id="quizContent" className="mt-2 p-2">
                    <div className="p-3">
                        <h2>Congratulations!</h2>
                        <h4>You finished the curve sketcing tutorial. Thanks for your effort!</h4>
                    </div>
                    <div className="m-2 p-2">
                        <Link to="/tutorialTopics">
                            <button type="button" className="btn btn-lg btn-success mt-3">TUTORIAL TOPICS</button><br /><br />
                        </Link>
                        <Link to="/derivativesTopics">
                            <button type="button" className="btn btn-lg btn-success mt-3">DERIVATIVES TOPICS</button><br /><br />
                        </Link>
                    </div>
                </div>
            </Container>    
        );        
    }
}

export function QuestionArea({question, answers, graded, alreadyClicked, setClicked, first_deriv}) {
    return (
        <div className="mt-2">
            <ImageArea 
                question={question}
            />
            <div className="row mt-2">
              <p dangerouslySetInnerHTML={{__html: question.stem}}></p>
            </div>
            <div className="row mt-2">
              <p dangerouslySetInnerHTML={{__html: question.question}}></p>
            </div>
            <div id="aArea" className="mt-2">
                <div className="answerA">
                    <p>a.&nbsp;&nbsp;&nbsp;&nbsp;
                        <Answer 
                            answer={answers[0]}
                            correctAnswer={question?.correctAnswer}
                            graded={graded}
                            alreadyClicked={alreadyClicked}
                            setClicked={setClicked}
                        />
                    </p>
                </div>
                <div className="answerB">
                <p>b.&nbsp;&nbsp;&nbsp;&nbsp; 
                    <Answer 
                        answer={answers[1]}
                        correctAnswer={question?.correctAnswer}
                        graded={graded}
                        alreadyClicked={alreadyClicked}
                        setClicked={setClicked}
                    />
                </p>
                </div>
                <div className="answerC">
                <p>c.&nbsp;&nbsp;&nbsp;&nbsp; 
                    <Answer 
                        answer={answers[2]}
                        correctAnswer={question?.correctAnswer}
                        graded={graded}
                        alreadyClicked={alreadyClicked}
                        setClicked={setClicked}

                    />
                </p>
                </div>
                <div className="answerC">
                <p>d.&nbsp;&nbsp;&nbsp;&nbsp; 
                    <Answer 
                        answer={answers[3]}
                        correctAnswer={question?.correctAnswer}
                        graded={graded}
                        alreadyClicked={alreadyClicked}
                        setClicked={setClicked}
                    />  
                </p>
                </div>                              
            </div>
        </div>
    );
}

export function ImageArea({question}) {
    if (question.imageFile2) {
        return (
                <div className="row">
                    <div className="col-6">
                        <p>{question.imageTitle}</p>
                        <Image src={question.imageFile} fluid />
                    </div>
                    <div className="col-6">
                        <p>{question.imageTitle2}</p>
                        <Image src={question.imageFile2} fluid />
                    </div>
                </div>
                )                
    } else {
        return (
                <div className="row">
                    <div className="col-xsm-12 offset-xsm-3 col-sm-6 offset-sm-3 ">
                        <p>{question.imageTitle}</p>
                        <Image src={question.imageFile} fluid />
                    </div>
                </div>
        )
    }
}

// UseEffect forces the change in the value of graded to update state in this child.
export function Answer({answer, correctAnswer, graded, alreadyClicked, setClicked}){
    const [grade, setGrade] = useState(graded)
    useEffect(()=> {
        setGrade("#E7E7E7");
    }, [graded])
    
    function checkAnswer() {
        // These changes are to allow for multiple answers.
        // setClicked('true');
        // if (alreadyClicked == 'false') {
            if (answer === correctAnswer) {
                setGrade("green");
            } else {
                setGrade("red");
            }

            // this is where we would lift state - pass down a question state variable and set it here
            // let's test this
            graded = false;
//        }
    }

    const styles = {
        correct: {
            color:grade
        }
    }
    return (
        <span
            style={styles.correct}
            onClick={checkAnswer}
            dangerouslySetInnerHTML={{__html: answer}}>
        </span>
    )
}