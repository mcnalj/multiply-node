import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import { useParams } from "react-router-dom";
import './quizBase.component.quiz.scss';

export default function GetQuestions() {
    const [data, setData] = useState({
        questionsArray: [{question: "", correct_answer:"", incorrect_answers: ["", "", ""]}]
    });
    const [randomizedAnswers, setRandomizedAnswers] = useState([]);
    const [error, setError] = useState({
        error: ""
    });
    const [isLoaded, setIsLoaded] = useState({
        isLoaded: false
    });
    const [count, setCount] = useState(0)
    const [graded, setGraded] = useState('true')
    const [alreadyClicked, setAlreadyClicked] = useState('false')

    const category = useParams()
    console.log(category.categoryId);
    const categoryId = category.categoryId;

    function sortArray(array, randomizedAnswers) {
        var pick = 0;
        while (array.length > 0) {
            pick = Math.floor(Math.random() * array.length);
            randomizedAnswers.push(array[pick]);
            array.splice(pick, 1);
        }
        console.log(randomizedAnswers);
        return randomizedAnswers;
    }

    async function handleClick() {
        // await fetch("http://localhost:5000/quiz/getQuestions")
        await fetch(`http://localhost:5000/quiz/getQuestions/${categoryId}`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("This is result");
                    console.log(result);
                    return result
                    // this is where we will fail if the route is protected
                  })
            .then((result) => {
              setIsLoaded({isLoaded: true});
              setData({questionsArray: result.results});
              setRandomizedAnswers(sortArray(result.results[0].incorrect_answers.concat(result.results[0].correct_answer), randomizedAnswers))
            },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
            })
    }

    function setClicked(clicked) {
        setAlreadyClicked(clicked);
    }

    function nextQuestion() {
        setCount(count + 1);
        setGraded(!graded);
        setClicked("false")
        setRandomizedAnswers(sortArray(data.questionsArray[count+1].incorrect_answers.concat(data.questionsArray[count+1].correct_answer), []))    
    }

    // var answerArray = data.questionsArray[count].incorrect_answers.concat(data.questionsArray[count].correct_answer);
    // randomizedAnswers = sortArray(answerArray, randomizedAnswers);

    if (!isLoaded.isLoaded) {
        return (
            <Container id="quizContent">
                <Button variant="info" type="submit" onClick={handleClick}>Get Questions</Button>
            </Container>
        )
    } else {
        return (
            <Container id="quizContent">
                <QuestionArea
                    question={data?.questionsArray[count]}
                    answers={randomizedAnswers}
                    graded={graded}
                    alreadyClicked={alreadyClicked}
                    setClicked={setClicked}
                />
                <div>
                    <Button variant="info" type="submit" onClick={nextQuestion}>Next</Button>
                </div>
            </Container>
        );
    }
}

export function QuestionArea({question, answers, graded, alreadyClicked, setClicked}) {
    return (
        <div className="qArea">
            <div className="quest">
              <p dangerouslySetInnerHTML={{__html: question.question}}></p>
            </div>
            <div id="aArea">
                <p>a.&nbsp;&nbsp;
                    <Answer 
                        answer={answers[0]}
                        correctAnswer={question?.correct_answer}
                        graded={graded}
                        alreadyClicked={alreadyClicked}
                        setClicked={setClicked}
                    />
                </p>
                <p>b.&nbsp;&nbsp; 
                    <Answer 
                        answer={answers[1]}
                        correctAnswer={question?.correct_answer}
                        graded={graded}
                        alreadyClicked={alreadyClicked}
                        setClicked={setClicked}
                    />
                </p>
                <p>c.&nbsp;&nbsp; 
                    <Answer 
                        answer={answers[2]}
                        correctAnswer={question?.correct_answer}
                        graded={graded}
                        alreadyClicked={alreadyClicked}
                        setClicked={setClicked}
                    />
                </p>
                <p>d.&nbsp;&nbsp; 
                    <Answer 
                        answer={answers[3]}
                        correctAnswer={question?.correct_answer}
                        graded={graded}
                        alreadyClicked={alreadyClicked}
                        setClicked={setClicked}
                    />  
                </p>                              
            </div>
        </div>
    );
}
// UseEffect forces the change in the value of graded to update state in this child.
export function Answer({answer, correctAnswer, graded, alreadyClicked, setClicked}){
    const [grade, setGrade] = useState(graded)
    useEffect(()=> {
        setGrade("#E7E7E7");
    }, [graded])
    
    console.log("This is grade:" + grade);
    console.log("This is graded: " + graded);

    function checkAnswer() {
        console.log(alreadyClicked);
        setClicked('true');
        if (alreadyClicked == 'false') {
            console.log(correctAnswer);
            if (answer === correctAnswer) {
                console.log("correct");
                setGrade("green");
            } else {
                console.log("incorrect");
                setGrade("red");
            }
            graded = false;
        }
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