import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";


function Question({data}) {
    return (
        <div>
            <div id="question">
                {data.question}
            </div>
        </div>
    );
}

function AnswerChoice({answer, letter}) {
    return (
        <div>
            {letter} {answer}
        </div>
    );
}

function AnswerArea() {

    const answerArray = [{letter: "a.", answer: "Mount Everest"}, {letter: "b.", answer: "Mount McKinley"},{letter: "c.", answer: "K2"}, {letter: "d.", answer: "Mount Kilimanjaro"}];
    
    const listElements = answerArray.map(answer => 
        <AnswerChoice
            id="distractor1"
            answer={answer.answer}
            letter={answer.letter}
         />   
    );
    return (
        <div id="answerArea">
            {listElements}         
        </div>
    );
}


export default function QuestionArea(selected){ 
    const [questionJSON, setQuestionJSON] = useState({
        question: "What is the tallest mountain in the world?",
        correctAnswer: "Mount Everest",
        distractor1: "Mount McKinley",
        distractor2: "K2",
        distractor3: "Mount Kilimanjaro"
    });
    const navigate = useNavigate();

    

    function handleClick(e) {
        alert("You clicked me.");
    }
   
    return (
        <div id="questionArea">
            <Question
                data = {{question: questionJSON.question}} />
            <AnswerArea />
            <button className="btn btn-large btn-success" type="submit">SUBMIT</button>
        </div>

    );
}